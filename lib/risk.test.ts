import { describe, it, expect } from 'vitest';
import { escalate } from './risk';

describe('escalate', () => {
  it('takes the higher of two risk levels', () => {
    expect(escalate('green', 'red')).toBe('red');
    expect(escalate('red', 'green')).toBe('red');
    expect(escalate('orange', 'yellow')).toBe('orange');
    expect(escalate('yellow', 'orange')).toBe('orange');
  });
  it('keeps the level when equal', () => {
    expect(escalate('green', 'green')).toBe('green');
    expect(escalate('red', 'red')).toBe('red');
  });
  it('never lowers below the model risk (green is lowest)', () => {
    expect(escalate('green', 'yellow')).toBe('yellow');
    expect(escalate('yellow', 'green')).toBe('yellow');
  });
  it('red always wins (safety-critical)', () => {
    (['green', 'yellow', 'orange', 'red'] as const).forEach((l) => {
      expect(escalate('red', l)).toBe('red');
      expect(escalate(l, 'red')).toBe('red');
    });
  });
});
