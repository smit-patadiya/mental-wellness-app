import { describe, it, expect, beforeEach } from 'vitest';

const store = new Map<string, string>();
(globalThis as any).localStorage = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => {
    store.set(k, v);
  },
  removeItem: (k: string) => {
    store.delete(k);
  },
  clear: () => store.clear(),
};

import { saveEntry, getEntries, getTrend, clearAll } from './storage';
import type { AnalysisResult } from './schema';

const A = (mood: number): AnalysisResult => ({
  reflection: 'r',
  insight: 'i',
  moodScore: mood,
  emotions: ['x'],
  stressors: ['exam'],
  technique: 'breathing',
  encouragement: 'e',
  riskLevel: 'green',
});

beforeEach(() => store.clear());

describe('storage', () => {
  it('saves and reads an entry', () => {
    saveEntry('hi', 'chip', A(5));
    const e = getEntries();
    expect(e.length).toBe(1);
    expect(e[0].stressors).toEqual(['exam']);
    expect(e[0].moodScore).toBe(5);
  });

  it('builds a mood trend oldest→newest', () => {
    saveEntry('a', 'chip', A(4));
    saveEntry('b', 'chip', A(7));
    expect(getTrend()).toEqual([4, 7]);
  });

  it('clears all entries', () => {
    saveEntry('a', 'chip', A(5));
    clearAll();
    expect(getEntries()).toEqual([]);
  });

  it('normalizes older entries missing emotions/stressors', () => {
    store.set(
      'mindmitra.entries.v1',
      JSON.stringify([{ id: '1', text: 't', source: 'chip', moodScore: 5, technique: 'breathing', riskLevel: 'green', ts: 1 }]),
    );
    const e = getEntries();
    expect(e[0].stressors).toEqual([]);
    expect(e[0].emotions).toEqual([]);
  });
});
