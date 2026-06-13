import { describe, expect, it } from 'vitest';
import type { Technique } from './schema';
import { parseAnalysis } from './schema';
import { TECHNIQUES, activityFor } from './techniques';
import { DEMO_ANALYSIS } from './demo';

describe('techniques', () => {
  it('resolves every Technique key to an ActivityMeta with a non-empty title', () => {
    const keys = Object.keys(TECHNIQUES) as Technique[];
    for (const key of keys) {
      const meta = activityFor(key);
      expect(meta).toBeDefined();
      expect(meta.title.length).toBeGreaterThan(0);
    }
  });

  it("maps 'breathing' to Box breathing", () => {
    expect(activityFor('breathing').title).toBe('Box breathing');
  });
});

describe('demo', () => {
  it('is schema-valid (parseAnalysis does not throw)', () => {
    expect(() => parseAnalysis(DEMO_ANALYSIS)).not.toThrow();
  });
});
