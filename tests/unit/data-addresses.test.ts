import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const dir = join(__dirname, '../../src/data');
const banned = ['Sk. No', 'Mevlana Mah', 'Çambel Mah', 'Mevlana Mahalle', 'Çambel Mahalle'];

describe('street addresses live in business.ts only', () => {
  const files = readdirSync(dir).filter((f) => f !== 'business.ts');
  it.each(files)('%s has no street or neighbourhood address', (file) => {
    const text = readFileSync(join(dir, file), 'utf8');
    for (const word of banned) expect(text, `${file}: ${word}`).not.toContain(word);
  });
});
