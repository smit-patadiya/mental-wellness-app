# MindMitra — AI Wellness Companion for Exam-Stressed Students

> Planning + ideation doc. **No code yet.** Working name: **MindMitra** (mind + *mitra* = friend).
> Goal: a generative-AI tool that helps students monitor and improve mental well-being through high-stakes exams (SSC / HSC / JEE / NEET / UPSC / engineering).

---

## 1. Concept (one-liner)
A private, empathic AI companion that turns a student's **daily journals + mood check-ins** into **insight** (hidden stress patterns, triggers, trends) and **personalized support** (coping strategies, mindfulness, encouragement) — available any time during their exam journey.

## 2. Who + the real problem
- **User:** a student (often 15–24, sometimes a minor) grinding toward a make-or-break exam.
- **Pain:** chronic stress, burnout, sleep loss, self-doubt, comparison, family/social pressure, isolation, exam-day panic.
- **Today they:** bottle it up, doom-scroll, or have no outlet; therapy is costly/stigmatized; generic apps don't understand exam context.
- **"Solved" =** they feel heard, understand their own patterns, and get the *right* small intervention at the *right* moment.

## 3. Design principles (read before any feature)
1. **Tool, not just a chatbot.** The core value is *analysis + tracking + tailored action* — structured insight from their data, not an open chat. Chat is one feature, guard-railed.
2. **Safety-first (§4 is non-negotiable).** This is a mental-health product for possibly-minor users. Crisis handling, disclaimers, and privacy come before features.
3. **Hyper-personalized.** Uses the student's history + exam timeline, not generic advice.
4. **Low-friction.** Stressed users won't fill long forms — fast check-ins, voice option.
5. **Evidence-informed.** Grounded in CBT / mindfulness / self-compassion, not vibes.

---

## 4. ⚠️ Safety, ethics & privacy — the #1 constraint
This section gates everything. A wellness app that mishandles a crisis is worse than no app.

### 4.1 Crisis detection & response (must-have, build early)
- Every journal/chat input passes a **conservative risk check** (self-harm, suicidal ideation, abuse, severe hopelessness).
- On any signal → **immediate safety flow**: calm empathic message + **India helplines** + encourage contacting a trusted adult / professional. Do **not** try to "treat" it.
- **Helplines (verify current numbers before shipping):**
  - **Tele-MANAS** (Govt of India): **14416** / 1-800-891-4416
  - **KIRAN** (MoSJE): **1800-599-0019**
  - **iCall** (TISS): 9152987821
  - **Vandrevala Foundation:** 1860-2662-345 / +91 9999 666 555
  - **AASRA:** +91 98204 66726
- Risk classification should be **deterministic + conservative** (err toward showing help), not buried in a creative generation.

### 4.2 Boundaries & disclaimers
- Clear, persistent: *"MindMitra is a supportive companion, **not** a therapist, doctor, or emergency service."*
- Never diagnose, never prescribe, never replace professional care. Encourage real help when appropriate.

### 4.3 Privacy (journals = highly sensitive PII)
- **Consent** on first run; explain what's stored and why.
- **Data minimization**; let users **view, export, and delete** everything.
- Prefer **local-first** or **encrypted** storage; if cloud (Firestore), **deny-by-default rules scoped to the user**; never share/sell.
- **Gemini key server-side only** (lesson from the warm-up). No PII in logs/analytics.
- Minors: extra caution; consider guardian-consent framing.

### 4.4 Responsible AI
- Empathic, non-judgmental tone; culturally aware (Indian exam culture, family pressure).
- Avoid toxic positivity ("just relax!"); validate first.
- Be transparent that it's AI.

---

## 5. Feature set (pillars)
| # | Feature | What it does | Gemini's role | Agentic? |
|---|---------|--------------|---------------|:--------:|
| 1 | **Daily journal** | Free-text or guided prompt entry | Analyze → structured insight (mood, emotions, stressors, thinking traps, themes, risk flag) | ✅ |
| 2 | **Mood check-in** | 10-sec log: scale + tags (sleep, study load, exam proximity) | Correlate with journal over time | — |
| 3 | **Pattern & trigger detection** | "Your mood dips before mock tests"; "self-doubt spikes on low-sleep days" | Synthesize across entries → correlations + weekly insight | ✅ |
| 4 | **Personalized coping** | The right micro-intervention now (reframe, breathe, break, sleep) | Pick + tailor strategy to entry + history + exam timeline | ✅ |
| 5 | **Adaptive mindfulness** | Guided breathing / grounding / body-scan, length by stress level | Choose exercise; optional voice narration | ✅ |
| 6 | **Encouragement** | Contextual nudges grounded in *their* real progress | Generate specific, honest affirmations (no toxic positivity) | — |
| 7 | **Companion chat** | Talk it out, guard-railed, empathic | Supportive CBT/ACT-lite responses + safety routing | ✅ |
| 8 | **Voice** | Speak a journal; optionally talk with the companion | Multimodal audio → transcript + analysis; TTS for exercises | ✅ |
| 9 | **Insights dashboard** | Mood trends, streaks, wins, stress-vs-study-calendar heatmap | Weekly narrative summary of progress | ✅ |
| 10 | **Crisis safety net** | Always-available help (see §4.1) | Conservative risk classification → resources | ✅ |

## 6. How AI actually *improves* wellbeing (science → feature)
Not "AI magic" — established techniques, delivered at the right moment.
| Technique | What it does | Where in app |
|-----------|--------------|--------------|
| **CBT cognitive reframing** | Catch + reframe distortions (catastrophizing, all-or-nothing, "I'll fail everything") | Journal analysis flags the distortion; coping suggests a reframe |
| **Mindfulness / breathing** | Activates calm (parasympathetic), breaks panic loops | Adaptive mindfulness, exam-day SOS |
| **Mood tracking → metacognition** | Naming feelings reduces their grip; seeing patterns builds control | Mood log + trends |
| **Behavioral activation / structure** | Study-break rhythm, sleep hygiene combat burnout | Coping suggestions, nudges |
| **Self-compassion (Neff)** | Counters harsh self-talk common in toppers | Tone of all responses + targeted prompts |
| **Expressive writing (Pennebaker)** | Journaling itself lowers stress | The journal feature is therapeutic by design |
| **Positive psychology** | Gratitude, strengths, small wins build resilience | Encouragement, weekly wins |

## 7. Gemini usage (concrete)
- **Journal analysis → strict JSON:** `{ moodScore, emotions[], stressors[], cognitiveDistortions[], themes[], riskLevel, suggestedSupport }`. Validated, fail-loud.
- **Pattern synthesis:** feed recent entries + mood logs → weekly insight + correlations (RAG-lite over their own history).
- **Personalized generation:** empathic reply + tailored coping, conditioned on entry + history + exam date.
- **Safety classifier:** separate, conservative pass → `riskLevel` → routes to §4.1 (kept deterministic, not creative).
- **Voice:** Gemini multimodal (audio) for spoken journals; or browser STT. TTS for guided exercises.
- **Function calling (agentic actions):** `logMood`, `startExercise(type,minutes)`, `saveInsight`, `surfaceResource(crisis|sleep|focus)`, `generateWeeklyReport`, `scheduleCheckIn`. ← makes it a tool, not a chatbot.

## 8. Voice / "talk with AI" options
| Option | How | Pros | Cons |
|--------|-----|------|------|
| **Web Speech API** (STT + TTS, browser) | Mic → text → Gemini → text → speak | Free, simple, no audio upload | Browser-dependent, less natural |
| **Gemini multimodal audio** | Upload voice note → Gemini transcribes + analyzes | One model, good quality, voice journaling | Needs audio handling |
| **Gemini Live (real-time)** | Live two-way voice conversation | Most "companion"-like | Heaviest; do last / stretch |
**Recommendation:** MVP = text. Add **voice journaling** (speak instead of type) first — biggest low-friction win for stressed users. Real-time talk = stretch.

## 9. Data model (high level)
- `user` (auth, consent, exam profile: target exam + date)
- `journalEntry` (text/audio, timestamp, analysis JSON)
- `moodLog` (score, tags, timestamp)
- `insight` (weekly summaries, detected patterns)
- `examTimeline` (key dates → drives context + proximity logic)

## 10. Architecture (high level — no code yet)
- **Frontend:** mobile-first React/Next (or simple) — calm, low-stimulation UI.
- **AI:** Gemini behind a **server-side proxy** (key never client). Structured JSON + function calling.
- **Voice:** Web Speech API (MVP) → Gemini audio (next).
- **Storage:** local-first or Firebase (Auth + Firestore, deny-by-default rules). Encrypt sensitive fields.
- **Deploy:** Vercel / Firebase Hosting. Key in env var.

## 11. MVP vs stretch (MoSCoW)
- **Must:** consent + disclaimer, mood check-in, journal + Gemini insight, **crisis safety net**, one personalized coping action, basic trends, privacy (view/delete).
- **Should:** pattern detection, adaptive mindfulness, weekly insight, voice journaling, exam-timeline context.
- **Could:** companion chat, real-time voice, reminders, streaks/gamification (gentle), multilingual (Hindi + regional).
- **Won't (now):** clinical diagnosis, social/community feed, wearable integration.

## 12. Build steps (phased — safety is NOT last)
1. **Safety & privacy design first:** crisis flow, helplines, disclaimer, consent, data model, key-server-side.
2. Scaffold + deploy a live shell (auth + storage).
3. Mood check-in + journal entry (store).
4. Gemini analysis → structured insight per entry (incl. `riskLevel`).
5. **Wire the crisis safety net** (risk → resources) — before fancy features.
6. Personalized coping + one adaptive mindfulness exercise.
7. Insights/trends dashboard (patterns, mood-vs-calendar).
8. Voice journaling.
9. Companion chat (guard-railed) — optional.
10. Accessibility, privacy controls, polish, re-deploy, verify live.

## 13. Hyper-personalization approach
Context fed to Gemini each time: recent entries + mood trend + **exam type & days-remaining** + what's helped before. Days-to-exam changes everything (proximity → more grounding, less heavy reflection). This timeline-awareness is the differentiator vs a generic wellness chatbot.

## 14. Differentiators (the pitch)
- **Exam-context aware** — advice changes with days-to-exam; understands Indian exam pressure.
- **Insight, not just chat** — surfaces *your* hidden patterns and triggers.
- **Safety-first & private** — crisis-aware, local/encrypted, you own your data.
- **Low-friction voice journaling** — for when typing feels like too much.
- **Evidence-based** — CBT + mindfulness + self-compassion, not platitudes.

## 15. Judging / scoring map
| Criterion | How we earn it |
|-----------|----------------|
| AI integration | Multimodal analysis, structured insight, function-calling, personalization |
| Problem alignment | Real, named pain; tool that acts; favored (health/education) domain |
| Security & responsibility | Crisis safety, privacy, key server-side, disclaimers — **heavily weighted here** |
| Efficiency / scalability | Fast check-ins, bounded queries, live deploy |
| Testing | Safety-classifier tests, schema-validation, failure paths |
| Accessibility | Calm UI, voice option, contrast, keyboard, multilingual potential |

## 16. Open decisions (your call)
1. **Scope of voice now** — text-only MVP, or voice journaling in MVP? (lean: text MVP, voice next)
2. **Storage** — local-first (max privacy) vs Firebase (multi-device, easier dashboard)?
3. **Companion chat in MVP** — yes (richer) or later (safer to nail analysis first)?
4. **Languages** — English only, or Hindi/regional from start?
5. **Name** — MindMitra, or another (below)?
6. **Target exam framing** — one (e.g. JEE/NEET) for the demo, or generic?

## 17. Name ideas
**MindMitra** · Manas · ShantiMind · ExamEase · SaathiMind · CalmKaksha · MannSe
