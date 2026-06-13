# 🌿 MindMitra — an AI wellness companion for exam-stressed students

A calm minute, then back to your books. Built for the PromptWars **Mental Wellness Tracker** challenge — for students under high-stakes exam pressure (NEET · JEE · CUET · CAT · GATE · UPSC). Private, on-device, safety-first.

> **Live demo:** _add your Vercel URL here_

## Chosen vertical
A generative-AI mental-wellness tool: a student says how they feel (tap a mood · speak · type), and MindMitra responds with an empathic reflection, the **hidden trigger** behind it, and **one grounded thing to do** — then nudges them back to studying.

## Approach & logic
- **One input → AI analysis.** `/api/analyze` sends the message (plus light personal **context** — recent moods, recurring stressors, exam countdown) to **Gemini**, which returns strict JSON: reflection, insight, mood score, emotions, stressors, a matched **technique**, encouragement, and a risk level.
- **7 evidence-based techniques**, chosen to fit (not always breathing): box breathing · CBT reframe · 5-4-3-2-1 grounding · self-compassion · take-a-break · affect-labeling · **gentle yoga**. Grounded in CBT, mindfulness, self-compassion, DBT.
- **Insights (the hero):** surfaces hidden triggers + mood trends across entries — patterns standard mood-sliders miss.
- **Safety first:** a deterministic crisis keyword guard runs **before** the model and can only *escalate* risk — so even if the model fails, self-harm signals route to Indian helplines (Tele-MANAS 14416, KIRAN, iCall).
- **Color + sound therapy:** background palette shifts by mood/time; ambient sound therapy plays across the app.
- **Return-to-studying:** ≤2-min sessions, no streaks, no engagement traps.

## How it works
```
mood/voice/text  →  /api/analyze (server, holds Gemini key)  →  Gemini (strict JSON, context-aware)
                         │  deterministic crisis guard escalates risk
                         ▼
        result card (reflect · insight · activity · encourage)  +  saved locally
        tabs: Today · Insights (triggers/trend) · Sounds · You (exam countdown, what-helps)
```

## Tech stack
Next.js (App Router) · TypeScript · SCSS design tokens · **Gemini `gemini-2.5-flash`** behind a serverless route · **localStorage** (no accounts) · Web Audio (sound therapy) · Vitest. Deployed on Vercel.

## Run locally
```bash
npm install
echo "GEMINI_API_KEY=YOUR_AIza_KEY" > .env   # gitignored
npm run dev        # http://localhost:3000
```
No key → runs in demo mode. Get a key at https://aistudio.google.com/apikey

## Deploy (Vercel)
```bash
npx vercel                                    # deploy
npx vercel env add GEMINI_API_KEY production  # paste your AIza… key (server-side only)
npx vercel --prod                             # live URL
```

## Security
Gemini key is **server-side only** (never in the client/repo). Deterministic crisis guard. Input validated; model output Zod-validated (fail-loud). Journals stay on the device.

## Testing
`npm test` — 19 Vitest tests: crisis guard red-team, schema validation, technique routing.

## Accessibility
Mobile-first, dark mode, keyboard-navigable, AA contrast, status by text+colour, `prefers-reduced-motion` honoured, voice input.

## Assumptions
Cost/well-being suggestions are general guidance, **not medical advice**. Single-day focus. Built for India (helplines, exam context). Crisis routing depends on current helpline numbers — verify before production.
