import type { AnalysisResult } from './schema';

/**
 * A realistic, schema-valid analysis used as a fallback when no Gemini API
 * key is configured. Models a student venting about exam stress: green risk,
 * a body-first breathing intervention, and an encouraging, validate-first tone.
 */
export const DEMO_ANALYSIS: AnalysisResult = {
  riskLevel: 'green',
  technique: 'breathing',
  moodScore: 4,
  emotions: ['anxious', 'overwhelmed', 'tired'],
  stressors: ['upcoming finals', 'falling behind on revision', 'comparing myself to friends'],
  reflection:
    "It sounds like the exams are weighing on you, and the closer they get the louder that worry feels. That kind of pressure is exhausting — and it makes a lot of sense that you're feeling stretched thin right now.",
  insight:
    "Most of the intensity seems to come from racing 'what if I fail' thoughts rather than the studying itself. When the body is this keyed up, calming it first usually makes the thinking part feel clearer.",
  encouragement:
    "You've handled hard exam weeks before and gotten through them — that counts. Let's slow the body down for a moment, and then take revision one small block at a time. You don't have to do all of it at once.",
};
