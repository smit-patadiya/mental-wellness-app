// Local-first storage. Journals + inferred mood stay on the device. No accounts, no cloud.
import type { Technique, AnalysisResult } from './schema';
import type { RiskLevel } from './safety';

export interface Entry {
  id: string;
  text: string;
  source: string;
  moodScore: number;
  technique: Technique;
  riskLevel: RiskLevel;
  emotions: string[];
  stressors: string[];
  ts: number;
}

const KEY = 'mindmitra.entries.v1';

function read(): Entry[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || '[]') as Entry[];
    // Normalize older entries saved before emotions/stressors existed.
    return list.map((e) => ({ ...e, emotions: e.emotions ?? [], stressors: e.stressors ?? [] }));
  } catch {
    return [];
  }
}

function write(list: Entry[]): void {
  if (typeof localStorage !== 'undefined') localStorage.setItem(KEY, JSON.stringify(list));
}

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return 'e' + Math.floor(performance.now()).toString(36) + read().length;
}

export function saveEntry(text: string, source: string, a: AnalysisResult): Entry {
  const entry: Entry = {
    id: newId(),
    text,
    source,
    moodScore: a.moodScore,
    technique: a.technique,
    riskLevel: a.riskLevel,
    emotions: a.emotions,
    stressors: a.stressors,
    ts: typeof performance !== 'undefined' ? Math.floor(performance.timeOrigin + performance.now()) : 0,
  };
  write([...read(), entry]);
  return entry;
}

export function getEntries(): Entry[] {
  return read();
}

/** Recent mood scores, oldest→newest, for the trend sparkline. */
export function getTrend(limit = 14): number[] {
  return read().slice(-limit).map((e) => e.moodScore);
}

export function exportData(): string {
  return JSON.stringify(read(), null, 2);
}

export function clearAll(): void {
  if (typeof localStorage !== 'undefined') localStorage.removeItem(KEY);
}
