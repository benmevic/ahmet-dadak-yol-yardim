import { describe, expect, it } from 'vitest';
import { jobs } from '../../src/data/jobs';

describe('jobs', () => {
  it('has the eight real jobs', () => {
    expect(jobs.length).toBe(8);
  });

  it('every job has a vehicle, place and alt text', () => {
    for (const job of jobs) {
      expect(job.vehicle.trim()).not.toBe('');
      expect(job.place.trim()).not.toBe('');
      expect(job.alt.trim()).not.toBe('');
      expect(job.image).toBeTruthy();
    }
  });

  it('ids are unique', () => {
    expect(new Set(jobs.map((j) => j.id)).size).toBe(jobs.length);
  });

  it('carries no dates, ratings or customer names', () => {
    const banned = /\d{1,2}[./]\d{1,2}[./]\d{2,4}|yıldız|puan|müşteri/i;
    for (const job of jobs) {
      for (const field of [job.id, job.vehicle, job.place, job.alt]) {
        expect(field).not.toMatch(banned);
      }
    }
  });
});
