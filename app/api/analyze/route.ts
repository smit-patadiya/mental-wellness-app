import { NextResponse, type NextRequest } from 'next/server';
import { UserInputSchema, parseAnalysis, type AnalysisResult } from '@/lib/schema';
import { checkCrisis, type RiskLevel } from '@/lib/safety';
import { DEMO_ANALYSIS } from '@/lib/demo';

export const runtime = 'nodejs';

const ORDER: RiskLevel[] = ['green', 'yellow', 'orange', 'red'];
/** Defense in depth: the deterministic guard may only ESCALATE risk, never lower the model's. */
function escalate(a: RiskLevel, b: RiskLevel): RiskLevel {
  return ORDER.indexOf(a) >= ORDER.indexOf(b) ? a : b;
}

function buildPrompt(text: string): string {
  return `You are MindMitra, a warm, evidence-based wellness companion for a student under exam stress in India.
Read the student's message and respond with empathy grounded in CBT / mindfulness / self-compassion.
Validate first; name the emotion; never be dismissive; never give medical advice.

Student said: """${text}"""

Return ONLY a JSON object (no markdown) with exactly these fields:
{
  "reflection": "1-2 sentences, empathic, names how they feel",
  "insight": "1 sentence pointing at the likely hidden trigger/pattern",
  "moodScore": integer 1-10 (1 = very low, 10 = great) inferred from the message,
  "emotions": ["2-4 lowercase emotion words"],
  "stressors": ["1-3 short specific stressors you infer"],
  "technique": one of "breathing" | "reframe" | "grounding" | "self_compassion" | "break" | "affect_labeling",
  "encouragement": "1-2 sentences, honest and grounded, then nudge them gently back to studying",
  "riskLevel": "green" | "yellow" | "orange" | "red"
}
Pick technique by need: acute panic->breathing; harsh self-criticism->self_compassion; catastrophizing->reframe; spiraling->grounding; can't name it->affect_labeling; burnt out->break.
Set riskLevel green for normal stress; yellow if persistently low; orange/red only for hopelessness or self-harm signals.`;
}

async function callGemini(key: string, text: string): Promise<string> {
  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' +
    encodeURIComponent(key);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(text) }] }],
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

  const key = process.env.GEMINI_API_KEY;
  let analysis: AnalysisResult;
  if (!key) {
    analysis = { ...DEMO_ANALYSIS };
  } else {
    try {
      analysis = parseAnalysis(await callGemini(key, text));
    } catch {
      analysis = { ...DEMO_ANALYSIS };
    }
  }

  analysis = { ...analysis, riskLevel: escalate(analysis.riskLevel, guard) };
  return NextResponse.json(analysis);
}
