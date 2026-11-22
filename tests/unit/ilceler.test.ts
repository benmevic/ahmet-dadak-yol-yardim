import { describe, expect, it } from 'vitest';
import { ilceler } from '../../src/data/ilceler';
import { slugifyTr, liveIlceler, jaccard, wordsWithoutName } from '../../src/lib/ilce';

describe('slugifyTr', () => {
  it.each([
    ['Çiğli', 'cigli'],
    ['Karşıyaka', 'karsiyaka'],
    ['Ödemiş', 'odemis'],
    ['Güzelbahçe', 'guzelbahce'],
    ['İzmir', 'izmir'],
    ['Kemalpaşa', 'kemalpasa'],
  ])('%s -> %s', (input, expected) => {
    expect(slugifyTr(input)).toBe(expected);
  });
});

describe('ilceler', () => {
  it('has 30 districts with unique slugs matching their names', () => {
    expect(ilceler).toHaveLength(30);
    expect(new Set(ilceler.map((i) => i.slug)).size).toBe(30);
    for (const i of ilceler) expect(i.slug).toBe(slugifyTr(i.name));
  });

  it('only Bornova and Kemalpaşa are live', () => {
    expect(liveIlceler().map((i) => i.name).sort()).toEqual(['Bornova', 'Kemalpaşa']);
  });

  const live = ilceler.filter((i) => i.status === 'live');

  it.each(live.map((i) => [i.name, i] as const))('%s meets the live minimums', (_n, i) => {
    expect(i.intro.length).toBeGreaterThanOrEqual(250);
    expect(i.roads.length).toBeGreaterThanOrEqual(2);
    expect(i.landmarks.length).toBeGreaterThanOrEqual(2);
    expect(i.neighbours.length).toBeGreaterThanOrEqual(2);
    expect(i.faq.length).toBeGreaterThanOrEqual(2);
  });

  it('live intros are not name-swaps of each other (Jaccard < 0.5)', () => {
    for (let a = 0; a < live.length; a++) {
      for (let b = a + 1; b < live.length; b++) {
        const sim = jaccard(
          wordsWithoutName(live[a].intro, live[a].name),
          wordsWithoutName(live[b].intro, live[b].name),
        );
        expect(sim).toBeLessThan(0.5);
      }
    }
  });
});
