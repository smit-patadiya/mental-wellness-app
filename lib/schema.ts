import { z } from 'zod';

export const TechniqueEnum = z.enum([
  'breathing',
  'reframe',
  'grounding',
  'self_compassion',
  'break',
  'affect_labeling',
]);
export type Technique = z.infer<typeof TechniqueEnum>;

export const RiskLevelEnum = z.enum(['green', 'yellow', 'orange', 'red']);

export const UserInputSchema = z.object({
  text: z.string().min(1).max(2000),
  source: z.enum(['chip', 'voice', 'text']).default('text'),
});
export type UserInput = z.infer<typeof UserInputSchema>;

export const AnalysisResultSchema = z.object({
  reflection: z.string().min(1),
  insight: z.string().min(1),
  moodScore: z.number().int().min(1).max(10),
  emotions: z.array(z.string()),
  stressors: z.array(z.string()),
  technique: TechniqueEnum,
  encouragement: z.string().min(1),
  riskLevel: RiskLevelEnum,
});
export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;

export class AnalysisError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = 'AnalysisError';
  }
}

export function parseAnalysis(raw: unknown): AnalysisResult {
  let data: unknown = raw;

  if (typeof raw === 'string') {
    try {
      data = JSON.parse(raw);
    } catch (err) {
      throw new AnalysisError('Invalid JSON in analysis payload', err);
    }
  }

  const result = AnalysisResultSchema.safeParse(data);
  if (!result.success) {
    throw new AnalysisError(result.error.message, result.error);
  }

  return result.data;
}
