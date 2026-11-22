import { ilceler, type Ilce } from '../data/ilceler';

const TR_MAP: Record<string, string> = {
  ç: 'c', Ç: 'c', ğ: 'g', Ğ: 'g', ı: 'i', İ: 'i', I: 'i',
  ö: 'o', Ö: 'o', ş: 's', Ş: 's', ü: 'u', Ü: 'u',
};

export function slugifyTr(name: string): string {
  return name
    .replace(/[çÇğĞıİIöÖşŞüÜ]/g, (c) => TR_MAP[c]!)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function liveIlceler(): Ilce[] {
  return ilceler.filter((i) => i.status === 'live');
}

export function ilcePath(i: Pick<Ilce, 'slug'>): string {
  return `/izmir/${i.slug}-cekici/`;
}

const lower = (s: string) => s.replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase();

export function wordsWithoutName(text: string, name: string): Set<string> {
  const own = new Set(lower(name).split(/[^\p{L}\p{N}]+/u).filter(Boolean));
  const words = lower(text).split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  return new Set(words.filter((w) => !own.has(w)));
}

export function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  let inter = 0;
  for (const w of a) if (b.has(w)) inter++;
  return inter / (a.size + b.size - inter);
}
