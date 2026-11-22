import { describe, expect, it } from 'vitest';
import { services } from '../../src/data/services';
import { jobs } from '../../src/data/jobs';

const SLUGS = [
  'ariza-kurtarma',
  'kaza-oto-kurtarma',
  'aku-takviyesi',
  'lastik-destegi',
  'yakit-destegi',
  'alkollu-surucu-arac-tasima',
];

describe('services', () => {
  it('has the six services with the agreed slugs', () => {
    expect(services.map((s) => s.slug)).toEqual(SLUGS);
  });

  it('slugs and metaTitles are unique', () => {
    expect(new Set(services.map((s) => s.slug)).size).toBe(services.length);
    expect(new Set(services.map((s) => s.metaTitle)).size).toBe(services.length);
  });

  it('metaTitle is at most 60 chars and names İzmir', () => {
    for (const s of services) {
      expect(s.metaTitle.length).toBeLessThanOrEqual(60);
      expect(s.metaTitle).toContain('İzmir');
    }
  });

  it('metaDescription is 120 to 160 chars', () => {
    for (const s of services) {
      expect(s.metaDescription.length).toBeGreaterThanOrEqual(120);
      expect(s.metaDescription.length).toBeLessThanOrEqual(160);
    }
  });

  it('has at least two FAQ items each', () => {
    for (const s of services) expect(s.faq.length).toBeGreaterThanOrEqual(2);
  });

  it('has body copy and a when-to-call list', () => {
    for (const s of services) {
      expect(s.lead.trim()).not.toBe('');
      expect(s.body.length).toBeGreaterThanOrEqual(1);
      expect(s.whenToCall.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('jobId points at a real job', () => {
    const ids = new Set(jobs.map((j) => j.id));
    for (const s of services) expect(ids.has(s.jobId)).toBe(true);
  });

  it('states no prices and no promised minutes', () => {
    const banned = /₺|TL\b|\d+\s*dk/;
    for (const s of services) {
      const text = [
        s.name, s.metaTitle, s.metaDescription, s.lead,
        ...s.body, ...s.whenToCall, ...s.faq.flatMap((f) => [f.q, f.a]),
      ].join('\n');
      expect(text).not.toMatch(banned);
    }
  });
});
