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
    expect(i.neighbours.length).toBeGreaterThanOrEqual(1);
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

  it('names exactly equal the spec list', () => {
    const spec = ['Aliağa', 'Balçova', 'Bayındır', 'Bayraklı', 'Bergama', 'Beydağ', 'Bornova', 'Buca', 'Çeşme', 'Çiğli', 'Dikili', 'Foça', 'Gaziemir', 'Güzelbahçe', 'Karabağlar', 'Karaburun', 'Karşıyaka', 'Kemalpaşa', 'Kınık', 'Kiraz', 'Konak', 'Menderes', 'Menemen', 'Narlıdere', 'Ödemiş', 'Seferihisar', 'Selçuk', 'Tire', 'Torbalı', 'Urla'];
    expect(ilceler.map((i) => i.name)).toEqual(spec);
  });

  describe('drafts are complete', () => {
    it.each(ilceler.map((i) => [i.name, i] as const))('%s meets the content minimums', (_n, i) => {
      expect(i.intro.length).toBeGreaterThanOrEqual(250);
      expect(i.roads.length).toBeGreaterThanOrEqual(i.status === 'live' ? 2 : 1);
      expect(i.landmarks.length).toBeGreaterThanOrEqual(2);
      expect(i.neighbours.length).toBeGreaterThanOrEqual(1);
      expect(i.faq.length).toBeGreaterThanOrEqual(2);
      const names = new Set(ilceler.map((x) => x.name));
      for (const n of i.neighbours) {
        expect(names.has(n)).toBe(true);
        expect(n).not.toBe(i.name);
      }
    });

    it('no two intros are name-swaps of each other (all 30, Jaccard < 0.5)', () => {
      for (let a = 0; a < ilceler.length; a++) {
        for (let b = a + 1; b < ilceler.length; b++) {
          const sim = jaccard(
            wordsWithoutName(ilceler[a].intro, ilceler[a].name),
            wordsWithoutName(ilceler[b].intro, ilceler[b].name),
          );
          expect(sim, `${ilceler[a].name} / ${ilceler[b].name}`).toBeLessThan(0.5);
        }
      }
    });

    it('every district has a district-specific FAQ question', () => {
      const all = ilceler.flatMap((i) => i.faq.map((f) => f.q));
      for (const i of ilceler) {
        expect(i.faq.some((f) => all.filter((q) => q === f.q).length === 1)).toBe(true);
      }
    });
  });
});
