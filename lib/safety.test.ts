import { describe, it, expect } from 'vitest';
import { checkCrisis } from './safety';

describe('checkCrisis', () => {
  it('flags explicit suicidal intent as red', () => {
    expect(checkCrisis('i want to kill myself').level).toBe('red');
  });

  it('is case-insensitive for red phrases', () => {
    expect(checkCrisis('I WANT TO DIE').level).toBe('red');
  });

  it('escalates severe hopelessness to at least orange', () => {
    // "can't do this anymore" + "no point anymore" are orange signals.
    const level = checkCrisis("i can't do this anymore, there's no point anymore").level;
    expect(['orange', 'red']).toContain(level);
  });

  it('treats normal exam stress as green', () => {
    expect(checkCrisis("i'm so stressed about my NEET mock tomorrow").level).toBe('green');
  });

  it('treats tiredness / focus complaints as green', () => {
    expect(checkCrisis('tired and can\'t focus today').level).toBe('green');
  });

  it('does not false-trigger on substrings (die inside diet)', () => {
    expect(checkCrisis('i need to diet').level).toBe('green');
  });

  it('treats empty and whitespace-only input as green', () => {
    expect(checkCrisis('').level).toBe('green');
    expect(checkCrisis('   ').level).toBe('green');
  });

  it('populates the matched array for a red case', () => {
    const result = checkCrisis('i want to kill myself');
    expect(result.level).toBe('red');
    expect(result.matched.length).toBeGreaterThan(0);
    expect(result.matched).toContain('kill myself');
  });

  it('prefers red over orange when both match (conservative)', () => {
    // "worthless" is orange, "want to die" is red -> must return red.
    const result = checkCrisis("i feel worthless and i want to die");
    expect(result.level).toBe('red');
    expect(result.matched).toContain('want to die');
    expect(result.matched).not.toContain('worthless');
  });
});
