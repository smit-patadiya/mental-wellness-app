import { NextResponse, type NextRequest } from 'next/server';
import { UserInputSchema, parseAnalysis, type AnalysisResult, type Technique } from '@/lib/schema';
import { checkCrisis } from '@/lib/safety';
import { escalate } from '@/lib/risk';
import { DEMO_ANALYSIS } from '@/lib/demo';

export const runtime = 'nodejs';

// When no key is set (demo mode), still vary the technique from the message
// so it isn't always breathing.
function pickDemoTechnique(text: string): Technique {
  const t = text.toLowerCase();
  if (/(panic|overwhelm|can'?t breathe|racing|anxious)/.test(t)) return 'breathing';
  if (/(stupid|fail|failure|not good enough|hate myself|worthless|useless)/.test(t)) return 'self_compassion';
  if (/(what if|i'?ll fail|never|always|everything|catastroph)/.test(t)) return 'reframe';
  if (/(can'?t focus|distract|scattered|spiral|restless mind)/.test(t)) return 'grounding';
  if (/(tired|exhaust|burnt|burnout|drained|no energy)/.test(t)) return 'break';
  if (/(tense|stiff|restless|headache|neck|back|body)/.test(t)) return 'yoga';
  if (/(numb|don'?t know|confus|can'?t name|empty)/.test(t)) return 'affect_labeling';
  const opts: Technique[] = ['breathing', 'reframe', 'grounding', 'self_compassion', 'break', 'affect_labeling', 'yoga'];
  return opts[text.length % opts.length];
}

function buildPrompt(text: string, context: string): string {
  return `You are MindMitra, a warm, evidence-based wellness companion for a student under exam stress in India.
Read the student's message and respond with empathy grounded in CBT / mindfulness / self-compassion.
Validate first; name the emotion; never be dismissive; never give medical advice. You may gently suggest hydration, a snack, regular meals, light movement or sleep when relevant (food, movement and sleep affect mood).
${context}Student said: """${text}"""

Return ONLY a JSON object (no markdown) with exactly these fields:
{
  "reflection": "1-2 sentences, empathic, names how they feel",
  "insight": "1 sentence pointing at the likely hidden trigger/pattern",
  "moodScore": integer 1-10 (1 = very low, 10 = great) inferred from the message,
  "emotions": ["2-4 lowercase emotion words"],
  "stressors": ["1-3 short specific stressors you infer"],
  "technique": one of "breathing" | "reframe" | "grounding" | "self_compassion" | "break" | "affect_labeling" | "yoga",
  "encouragement": "1-2 sentences, honest and grounded, then nudge them gently back to studying",
  "riskLevel": "green" | "yellow" | "orange" | "red"
}
Pick the technique that truly fits — do NOT default to breathing: acute panic->breathing; harsh self-criticism->self_compassion; catastrophizing->reframe; spiraling->grounding; can't name it->affect_labeling; burnt out->break; physical tension/stiffness/restless body->yoga.
Set riskLevel green for normal stress; yellow if persistently low; orange/red only for hopelessness or self-harm signals.`;
}

async function callGemini(key: string, text: string, context: string): Promise<string> {
  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' +
    encodeURIComponent(key);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(text, context) }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.6 },
    }),
  });
  if (!res.ok) throw new Error('Gemini ' + res.status);
  const json = await res.json();
  const out = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!out) throw new Error('Empty model response');
  return out;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const parsed = UserInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  const { text } = parsed.data;

  // Deterministic safety guard ALWAYS runs first — even if the model fails.
  const guard = checkCrisis(text).level;

  // Optional personalization context from the client (recent moods, stressors, exam).
  const c = (body as { context?: Record<string, unknown> }).context;
  let context = '';
  if (c) {
    const parts: string[] = [];
    if (Array.isArray(c.recentMoods) && c.recentMoods.length) parts.push(`recent mood scores ${c.recentMoods.slice(-5).join(', ')}`);
    if (Array.isArray(c.topStressors) && c.topStressors.length) parts.push(`recurring stressors ${c.topStressors.slice(0, 4).join(', ')}`);
    const exam = c.exam as { name?: string; daysLeft?: number } | undefined;
    if (exam?.name) parts.push(`exam ${String(exam.name).slice(0, 40)} in ${Number(exam.daysLeft) || '?'} days`);
    if (parts.length) context = `Context about this student (use to personalize; do not repeat verbatim): ${parts.join('; ')}.\n`;
  }

  const key = process.env.GEMINI_API_KEY;
  let analysis: AnalysisResult;
  if (!key) {
    analysis = { ...DEMO_ANALYSIS, technique: pickDemoTechnique(text) };
  } else {
    try {
      analysis = parseAnalysis(await callGemini(key, text, context));
    } catch {
      analysis = { ...DEMO_ANALYSIS, technique: pickDemoTechnique(text) };
    }
  }

  analysis = { ...analysis, riskLevel: escalate(analysis.riskLevel, guard) };
  return NextResponse.json(analysis);
}
