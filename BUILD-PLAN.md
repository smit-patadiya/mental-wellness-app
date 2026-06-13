# MindMitra — Build Plan

> The phased roadmap. Safety-first ordering. Stack locked. Pairs with
> [SOLUTION.md](SOLUTION.md) · [FRAMEWORK.md](FRAMEWORK.md) · [INTERACTION-DESIGN.md](INTERACTION-DESIGN.md).

## Stack (locked)
- **Next.js (App Router) + TypeScript + Tailwind** — calm-minimal UI, mobile-first.
- **API route** (`/api/*`) = Gemini proxy; **key server-side only** (env var).
- **localStorage** for all user data (local-first, no accounts).
- **Web Speech API** — STT (voice journaling) + TTS (spoken exercises). No raw audio stored.
- **Gemini** (`gemini-2.5-flash`) — dual-pass (empathic reply + structured extract) + deterministic safety classifier.
- Deploy: **Vercel** (env key). Public repo, single branch, <10MB.

## Guardrails carried from the warm-up
Key server-side · strict JSON schema (Zod) validated, fail-loud · pure logic separated/testable · clean folders · README · accessibility.

## Reality check — 4–5 hour, AI-built MVP (still don't over-engineer)
Simple > clever. Use AI only where only AI helps; plain code for everything else. **Mobile-first** (most students are on phones), responsive up to desktop. Engine = **Gemini**.

### Gemini usage map (the whole AI surface = ~1 endpoint)
| Step | Engine | Why |
|------|--------|-----|
| one input (chip/voice/text) → **inferred mood + emotions** + insight + empathic reply + `riskLevel` + `technique` | 🤖 Gemini (1 call) | AI does the tagging so the user fills nothing |
| crisis **keyword pre-check** | ⚙️ deterministic code | instant, reliable safety net — never trust only the model |
| route to activity from `technique` | ⚙️ code | simple lookup ([PSYCHOLOGY.md](PSYCHOLOGY.md) selector) |
| mood trend, storage | ⚙️ code + localStorage | no AI needed |
| voice (STT/TTS) | ⚙️ browser Web Speech API | free, no audio upload, private |
| weekly narrative | 🤖 Gemini | summarize history (stretch) |

### "Micro-model / self-improvement" — realistic version
- **Don't** fine-tune/train a model (wrong tool for 2–3 hrs; needs data + infra).
- Our "specialized model" = **strong system prompt grounded in [PSYCHOLOGY.md](PSYCHOLOGY.md) + strict schema + few-shot examples**.
- **Self-improving = context/memory:** feed recent history + what coping worked (closed loop) into each prompt → more personal over time, **zero training**. Cheap + scalable.

### Why this is secure + scalable (without over-engineering)
- **Secure:** key server-side · deterministic crisis guard · input validation · escape output · data local (only minimal context leaves device).
- **Scalable:** stateless serverless route + localStorage = no DB load; **one** model call per entry.

### Sprint order (~4–5h budget)
1. Scaffold Next.js + deploy shell (Vercel), mobile-first — ~15m
2. **Single-input home** (feeling chips · mic · type) + localStorage — no forms/onboarding — ~30m
3. `/api/analyze` (1 Gemini call, Zod) — **infers mood/emotions/technique** + **keyword crisis guard** — ~30m
4. Result card (ends with **"Back to studying"**) + crisis screen + helplines + disclaimer — ~30m
5. 3 coded activities (breathing / CBT reframe / grounding) + routing — ~30m
6. Voice journaling (Web Speech STT) — ~15m
7. Mood trend + **tests** (crisis red-team + unit) — ~35m
8. Calm-minimal polish + re-deploy — ~20m
> **MVP+ (now fits the 4–5h budget, build in order):** TTS spoken exercises (~15m) → light pattern view (~30m) → distraction break + calming game (~40m) → companion chat (~30m).
> **Backlog:** cloud sync (multi-device), weekly narrative, exam context, vernacular, two-way voice.

## Phases (safety is NOT last)
| # | Phase | Delivers | MVP? |
|---|-------|----------|:----:|
| 1 | **Scaffold + deploy shell** | Next.js app live on Vercel (empty, calm shell) | ✅ |
| 2 | **Safety & privacy foundation** | consent/disclaimer, **deterministic crisis classifier + tiered flow + helplines**, always-visible "Get help", localStorage schema + export/delete | ✅ |
| 3 | **Check-in + journal (text)** | 10-sec mood+tags; text journal entry; stored locally | ✅ |
| 4 | **Gemini dual-pass + result card** | `/api/analyze` → empathic reply + structured extract (mood, stressors, distortions, **riskLevel**) → render **Reflect→Reveal→Act→Encourage→Next** | ✅ |
| 5 | **Activity library (interactive)** | box-breathing (animated), CBT reframe, 5-4-3-2-1 grounding + **mood before/after** (closed loop) | ✅ |
| 6 | **Voice** | tap-to-speak journaling (STT) + spoken guided exercises (TTS) | ✅ |
| 7 | **Insights** | pattern map + mood trend + weekly AI narrative (longitudinal use of stored data) | ◻ should |
| 8 | **Exam context** | optional exam+date → context in analysis + proximity-aware tone | ◻ should |
| 9 | **Companion chat (backup)** | guard-railed vent space, same safety tiers | ◻ could |
| 10 | **Polish** | calm-minimal pass, a11y, **red-team the crisis path**, re-deploy, README | ✅ |

## MVP cut line (must ship, end-to-end)
Scaffold+deploy · safety foundation (classifier+tiers+helplines+privacy) · check-in+journal · dual-pass+result card · 3 activities w/ before-after · voice journaling + spoken exercises · basic mood trend · local storage + export/delete.

## Data model (localStorage)
`moodLogs[]` · `journalEntries[]` (text + analysis) · `activityOutcomes[]` (before/after) · `detectedPatterns[]` · `examTimeline?` · `preferences`. → used for continuity, longitudinal patterns, closed-loop, weekly narrative, safety trajectory ([INTERACTION-DESIGN.md](INTERACTION-DESIGN.md) §7).

## Strict schemas (one source of truth, Zod)
- **AnalysisResult:** `{ reflection, insight, moodScore, emotions[], stressors[], distortions[], riskLevel: green|yellow|orange|red, suggestedActivity, encouragement }`
- **SafetyVerdict (separate, conservative):** `{ riskLevel, reason }` — runs *before* the friendly reply; Red overrides everything.

## Critical safety tasks (do, then test)
- Deterministic classifier separate from the empathic generation.
- Red tier **always** shows helplines (Tele-MANAS 14416 · KIRAN 1800-599-0019 · iCall 9152987821) — verify numbers.
- Red-team with escalating-distress inputs before any demo; assert Red fires every time.
- Persistent "not a therapist / not emergency" disclaimer + "Get help" button.

## Definition of done (demo-ready)
Live URL · full flow (check-in → journal/voice → result card → activity → trend) · crisis path verified · data export/delete works · calm-minimal + mobile · README (vertical, approach, safety, assumptions) · key server-side · <10MB, public, single branch.
