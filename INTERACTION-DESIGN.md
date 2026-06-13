# MindMitra — Interaction & Data Design

> How the user interacts, the UX principles, the flows, the output form, and how stored data
> becomes *future help*. Builds on [FRAMEWORK.md](FRAMEWORK.md) + [SOLUTION.md](SOLUTION.md). No code.

## 0. Locked decisions
- **Exam scope:** generic — supports JEE / NEET / CUET / CAT / GATE / UPSC / board.
- **Voice:** in the MVP (not later).
- **Storage:** **local-first** (on-device) — max privacy, user owns their data.
- **Chat:** **backup only.** Primary interaction = *guided structured activities*, not an open chat box (open chat is weak/risky for stressed users; structure helps more).
- **Tech:** React / **Next.js** (App Router) + TypeScript + Tailwind; serverless **API route** as the Gemini proxy (key server-side); **localStorage** for data; mobile-first.
- **Visual tone:** **calm-minimal** — soft neutrals, one gentle accent, spacious, quiet.
- **Onboarding:** **zero-friction** — straight to the first check-in; exam + date added later via a gentle nudge.
- **Voice (MVP):** voice **journaling** (speech→text) + **spoken guided exercises** (TTS). Two-way talk = stretch.

## 1. Positioning & tone
- Frame it as a **calm study companion**, not a "mental health app" (cuts stigma — a top friction).
- Voice & visual tone: warm, gentle, unhurried, non-clinical. Never alarmist, never gamified-hype.

## 2. UX design principles (for stressed students)
1. **Calm, low-stimulation** — muted palette, generous space, no dopamine-bait, no red badges.
2. **Low-friction default** — the 10-second check-in is the home action; everything deeper is optional.
3. **One thing at a time** — never a wall of options; one prompt, one action.
4. **Guided > open** — structured prompts/activities beat a blank chat box for an overwhelmed mind.
5. **Safety always one tap away** — persistent "Get help" affordance.
6. **Shame-free** — no streaks, no "you missed 3 days," no guilt. Gentle, opt-in nudges only.
7. **Private & transparent** — data stays on device; it's clearly an AI, clearly not a therapist.
8. **Accessible** — voice option, high contrast, big tap targets, mobile-first, Hinglish-ready.
9. **Respect autonomy** — suggest, never nag or pressure.
10. **Return them to studying (anti-engagement)** — sessions are ≤2 min; every result ends with a gentle nudge *back to study*. We deliberately do **not** chase retention: no streaks, no infinite content, no hooks. Success = the student leaves calmer, fast. (This is the opposite of Calm/Headspace — see [MARKET.md](MARKET.md).)

## 2.5 Friction-zero — one input, AI does the rest (governing principle)
The user may be exhausted, low, or out of time (exam close). So the core loop is **one step in, one card out.**

**One calm home screen** — *"How are you feeling right now?"* — with three zero-effort ways to answer:
1. **Tap a feeling chip** — Anxious · Overwhelmed · Can't focus · Panicking · Low · Okay — instant, no typing.
2. **Tap the mic and talk** (voice → text).
3. **Type a line** (optional).

Then **Gemini infers everything else** — mood score, emotions, triggers, the matching technique — so there is **no mood-slider, no tags, no forms, no onboarding** to fill. Mood trend is built from AI-inferred scores (fully passive). One optional tap to do the suggested activity.

→ **1–2 taps to real support.** This is the governing rule; the modes below are all just this same single input.

## 3. Interaction model
```
        ┌──────────── PRIMARY (structured) ────────────┐     ┌── BACKUP ──┐
Check-in (10s)   Journal (type/voice)   Activity        Insights        Companion chat
   mood+tags        rich signal       breathing/CBT/…   pattern map     (guard-railed,
      │                 │                  │               │              when they
      └─────────────────┴──── dual-pass AI ┴───────────────┘              want to talk)
                         (empathic reply + structured extract + safety check)
```
Primary value is the **analysis + the right activity**. Chat exists as a fallback for "I just need to vent" — guard-railed by the same safety tiers.

## 4. Core user flows

### 4.1 First run (zero-friction)
Welcome + one-line **consent/privacy** ("stays on your device") → straight to the first check-in. **No exam/date/profile asked upfront.** Later, a gentle nudge offers to add exam + date to unlock exam-aware help.

### 4.2 Daily check-in (the habit — 10s)
Open → mood (5 faces) + one-tap tags (sleep, mock today, energy, mood-word) → instant tiny reflection + *optional* one micro-action. That's it. Streak-free.

### 4.3 Journal (text or voice)
Write or **tap-to-speak** → AI dual-pass → the **result payload** (§5). Voice: speech→transcript→analyze; raw audio discarded, only transcript+analysis stored (privacy + size).

### 4.4 Activity
Pick or be offered an interactive exercise (breathing, reframe, grounding…) → **mood before/after** captured → feeds the closed loop (what works for *you*).

### 4.5 Insights (weekly + on-demand)
Pattern map (triggers, correlations), mood trend vs exam timeline, wins, and a short AI **weekly narrative**. This is the "things standard trackers miss" payoff.

### 4.6 Crisis (any time, auto)
Safety classifier fires → tiered response (Green→Red) → Red = helplines + urge human contact (see [FRAMEWORK.md](FRAMEWORK.md) §7).

## 5. Output form — the result card
Every journal/check-in returns the same predictable shape (= [FRAMEWORK.md](FRAMEWORK.md) §5):
```
┌─────────────────────────────────────────┐
│ Reflect   "Sounds like today was heavy." │  ← empathic, 1 line
│ Reveal    insight chip: "3rd dip after   │  ← one hidden pattern
│           evening mocks this week"        │
│ Act       [ interactive activity card ]   │  ← ONE ≤2-min action
│ Encourage grounded, specific             │  ← tied to real effort
│ Next      "Back to studying →"  (calmer)  │  ← exit: send them back to study
└─────────────────────────────────────────┘
```
One primary action. Calm card, not a report dump.

## 6. Voice design (MVP)
- **Voice journaling** — speak your day; transcript + analysis stored (raw audio not kept).
- **Spoken guided exercises** — calm TTS narration for breathing / grounding / body-scan.
- (Stretch) two-way "talk with companion" — later; needs more safety testing.

## 7. Data utilization — how stored data becomes *future help*
Local store: `moodLogs`, `journalEntries(+analysis)`, `activityOutcomes(before/after)`, `detectedPatterns`, `examTimeline`, `preferences`. How it's used over time:
| Use | What it enables |
|-----|-----------------|
| **Continuity context** | Each new entry is analyzed *with* recent history → "you mentioned the chemistry backlog last week — how's that now?" Feels like it remembers. |
| **Longitudinal pattern detection** | Triggers/correlations emerge only across weeks (the hero insight). |
| **Closed-loop personalization** | before/after mood on activities → learn what *actually* helps this student → recommend that. |
| **Proactive care** | On open, surface a rising pattern or a timely nudge (no push infra needed). |
| **Weekly narrative & pre-exam prep** | Generated summary of the emotional arc + a tailored plan as exam nears. |
| **Self-reflection for the student** | They see their own journey, wins, growth → agency & motivation. |
| **Safety trajectory** | Detect *worsening* trends / sudden drops → escalate earlier. |
- **Privacy guardrails:** all local; user can view, **export, and delete** everything; nothing leaves the device except the (server-proxied) Gemini call, which carries minimal context, not a profile.

## 8. Alignment with the problem statement (don't miss anything)
| Brief phrase | Where it lives |
|--------------|----------------|
| monitor well-being | check-in + journal + insights (§4.2, 4.5) |
| improve well-being | activities + coping + encouragement (§4.4, §5) |
| open-ended journaling + mood logs | journal (text/voice) + check-in (§4.3, 4.2) |
| hidden triggers / patterns trackers miss | longitudinal pattern detection (§7) + insights |
| conversational AI | dual-pass replies + companion-chat backup (§3) |
| hyper-personalized, contextual | exam timeline + history + closed loop (§7) |
| real-time coping | inline activity in result card (§5) |
| adaptive mindfulness | activity library, stress-matched (§4.4) |
| motivational encouragement | "Encourage" in payload (§5) |
| safely / empathetic / always-available | safety tiers + calm tone + proactive (§4.6, §1) |
| target exams | exam scope generic (§0) |

## 9. To confirm (open questions → asked in chat)
1. Voice scope in MVP (journaling only / + spoken exercises / full two-way talk)?
2. Tech: reuse the warm-up vanilla stack, or React/Next?
3. Visual tone (calm-minimal vs warm-friendly)?
4. Onboarding: ask exam+date upfront (better context) or keep anonymous zero-friction start?
