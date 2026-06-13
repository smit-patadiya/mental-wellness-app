/**
 * SAFETY-CRITICAL crisis guard for MindMitra.
 *
 * This module performs a DETERMINISTIC keyword/phrase scan to detect
 * self-harm / suicidal-intent signals in user text. It is intentionally
 * dumb and rule-based: no model, no randomness, no network. The same input
 * always yields the same output, which is what a safety gate requires.
 *
 * Design rules:
 * - CONSERVATIVE escalation: if any RED phrase matches we return 'red',
 *   even when ORANGE phrases also matched. We never downgrade a hit.
 *   We would rather over-trigger the human-support pathway than miss a
 *   genuine crisis.
 * - WORD-BOUNDARY matching: each phrase is wrapped in boundary assertions
 *   so substrings cannot false-trigger. Classic example: the word "die"
 *   must NOT fire inside "diet". See `boundaried()` below for how single
 *   words and multi-word phrases (including ones with apostrophes like
 *   "can't go on") are both handled.
 * - Normal exam stress is GREEN. This guard only distinguishes green vs
 *   orange vs red; 'yellow' is a separate, softer signal decided elsewhere
 *   by the model, not here.
 *
 * Phrase lists (lowercased, apostrophes normalised to straight quotes):
 *   RED    — explicit self-harm / suicidal intent.
 *   ORANGE — severe hopelessness / burdensomeness, no explicit intent.
 *
 * Tuning these lists is a safety change: keep them additive and review
 * with care before removing anything.
 */

export type RiskLevel = 'green' | 'yellow' | 'orange' | 'red';

/**
 * RED: explicit self-harm or suicidal intent. Any match => 'red'.
 */
const RED_PHRASES: readonly string[] = [
  'kill myself',
  'killing myself',
  'want to die',
  'wanna die',
  'end my life',
  'end it all',
  'suicide',
  'suicidal',
  'self harm',
  'self-harm',
  'hurt myself',
  'cut myself',
  'no reason to live',
  'better off dead',
  "don't want to live",
  'do not want to live',
  'kms',
];

/**
 * ORANGE: severe hopelessness / feeling like a burden, without explicit
 * self-harm intent. Matches only escalate to 'orange' when no RED hit.
 */
const ORANGE_PHRASES: readonly string[] = [
  "can't go on",
  'cannot go on',
  "can't do this anymore",
  'cannot do this anymore',
  'give up on everything',
  'hopeless',
  'no point anymore',
  'worthless',
  'everyone would be better without me',
  "i'm a burden",
  'i am a burden',
];

/**
 * Collapse curly apostrophes to straight ones and lowercase, so phrase
 * lists (which use straight quotes) match regardless of how the user's
 * keyboard produced the apostrophe.
 */
function normalize(text: string): string {
  return text.toLowerCase().replace(/[‘’ʼ]/g, "'");
}

/**
 * Build a word-boundaried regex for a phrase.
 *
 * We can't rely solely on \b because \b sits between a word char and a
 * non-word char, and apostrophes are non-word chars — so "can't" would
 * have an internal boundary that breaks naive anchoring. Instead we assert
 * the phrase is not flanked by an ASCII letter or digit:
 *   (^|[^a-z0-9]) ... ($|[^a-z0-9])
 * This guarantees "die" won't match inside "diet" or "modified", while
 * still allowing punctuation/whitespace on either side. The leading group
 * is non-capturing and we use a lookahead for the trailing edge so that
 * adjacent phrases can still each match independently.
 */
function buildMatcher(phrase: string): RegExp {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?:^|[^a-z0-9])${escaped}(?=$|[^a-z0-9])`);
}

const RED_MATCHERS: ReadonlyArray<readonly [string, RegExp]> = RED_PHRASES.map(
  (p) => [p, buildMatcher(p)] as const,
);

const ORANGE_MATCHERS: ReadonlyArray<readonly [string, RegExp]> =
  ORANGE_PHRASES.map((p) => [p, buildMatcher(p)] as const);

/**
 * Deterministically classify `text` for crisis risk.
 *
 * @returns level (conservative: 'red' wins over 'orange' wins over 'green')
 *          and the list of matched phrases for transparency / logging.
 */
export function checkCrisis(text: string): { level: RiskLevel; matched: string[] } {
  const haystack = normalize(text);

  const redHits: string[] = [];
  for (const [phrase, matcher] of RED_MATCHERS) {
    if (matcher.test(haystack)) redHits.push(phrase);
  }
  if (redHits.length > 0) {
    return { level: 'red', matched: redHits };
  }

  const orangeHits: string[] = [];
  for (const [phrase, matcher] of ORANGE_MATCHERS) {
    if (matcher.test(haystack)) orangeHits.push(phrase);
  }
  if (orangeHits.length > 0) {
    return { level: 'orange', matched: orangeHits };
  }

  return { level: 'green', matched: [] };
}
