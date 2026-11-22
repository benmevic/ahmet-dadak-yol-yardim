import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ilceler } from '../../src/data/ilceler';

const svg = readFileSync(new URL('../../src/assets/izmir-ilceler.svg', import.meta.url), 'utf8');

describe('izmir-ilceler.svg', () => {
  it('has one path per district, slugs matching ilceler', () => {
    const slugs = [...svg.matchAll(/data-ilce="([^"]+)"/g)].map((m) => m[1]).sort();
    expect(slugs).toEqual(ilceler.map((i) => i.slug).sort());
  });

  it('stays under 60 KB', () => {
    expect(Buffer.byteLength(svg)).toBeLessThan(60 * 1024);
  });
});
