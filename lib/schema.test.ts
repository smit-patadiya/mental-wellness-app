import { describe, it, expect } from 'vitest';
import { parseAnalysis, AnalysisError, type AnalysisResult } from './schema';

const valid: AnalysisResult = {
  reflection: 'You sound overwhelmed by your workload right now.',
  insight: 'Most of the pressure traces back to one looming deadline.',
  moodScore: 4,
  emotions: ['anxious', 'tired'],
  stressors: ['deadline', 'sleep'],
  technique: 'breathing',
  encouragement: 'You have handled tight weeks before, and you can again.',
  riskLevel: 'yellow',
};

describe('parseAnalysis', () => {
  it('parses a valid object and returns equal data', () => {
    expect(parseAnalysis(valid)).toEqual(valid);
  });

  it('parses a valid JSON string', () => {
    expect(parseAnalysis(JSON.stringify(valid))).toEqual(valid);
  });

  it('throws AnalysisError when a required field is missing', () => {
    const { insight, ...missing } = valid;
    void insight;
    expect(() => parseAnalysis(missing)).toThrow(AnalysisError);
  });

  it('throws on an invalid technique enum', () => {
    expect(() => parseAnalysis({ ...valid, technique: 'meditation' })).toThrow(
      AnalysisError,
    );
  });

  it('throws when moodScore is 0', () => {
    expect(() => parseAnalysis({ ...valid, moodScore: 0 })).toThrow(AnalysisError);
  });

  it('throws when moodScore is 11', () => {
    expect(() => parseAnalysis({ ...valid, moodScore: 11 })).toThrow(AnalysisError);
  });

  it('throws AnalysisError on a non-JSON string', () => {
    expect(() => parseAnalysis('not json')).toThrow(AnalysisError);
  });
});
