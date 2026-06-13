# SCOPE — what we actually build (keep it simple)

> Governs the build. Principle: **simple enough that a stressed, time-poor student finishes in 1–2 taps.**
> Alignment is already confirmed ([ALIGNMENT.md](ALIGNMENT.md)) — nothing here is *off-statement*. This doc only **trims breadth** so we don't over-engineer. Extras → backlog, traps → cut.

## ✅ MVP — build now (this is the whole app)
- **One-input home** — feeling chip · mic · type. No login, no forms, no onboarding.
- **`/api/analyze`** — ONE Gemini call → inferred mood + reflection + one hidden insight + `riskLevel` + `technique` + encouragement (Zod-validated, fail-loud).
- **Crisis safety (core, never cut)** — deterministic keyword guard → crisis screen + helplines + disclaimer + always-visible "Get help".
- **Result card** — Reflect → Reveal → Act → Encourage → Next.
- **3 activities** — box breathing (animated), CBT reframe, 5-4-3-2-1 grounding; routed by `technique`.
- **Voice journaling** — Web Speech STT.
- **localStorage** — entries + inferred mood; simple mood trend; export/delete.
- **Calm-minimal, mobile, accessible.** Deploy on Vercel, key server-side.

## 🟦 MVP+ — add in THIS order as time allows
> You picked all four. Honest math: ≈ **+1h55m** on top of the ~2.5h core ≈ **~4.5h total** — over the 2–3h budget. Ordered by value/effort; **drop the tail if the clock runs out.** Storage stays **local-first**.
1. **Spoken exercises (TTS)** — ~15m · Web Speech reads breathing/grounding aloud.
2. **Light pattern view** — ~30m · mood trend + top 3 triggers (the hero, kept light — not a dashboard).
3. **Distraction break + 1 calming game** — ~40m · DBT "take a real break" menu + a built-in breathing-bubble game (no scores). **No external videos/movies.**
4. **Companion chat (backup)** — ~30m · guard-railed vent mode, same safety tiers.

## 🔜 Backlog — aligned, valuable, but NOT now
- **Cloud sync (multi-device)** — needs auth + deny-default rules; sensitive data → fast-follow after MVP
- Full pattern-map / correlations dashboard *(MVP+ ships the light view)*
- Weekly AI narrative report
- Exam-context engine (exam + date + proximity tuning)
- Closed-loop "learns what works"
- Proactive nudges
- Hinglish / vernacular
- Two-way voice talk
- Extra activities (ACT defusion, values check-in, self-compassion break, if-then, DBT TIPP…)

## ⛔ Cut — over-engineering, do NOT build
- Fine-tuning / custom "micro-model" → use prompt + context instead
- Push-notification infrastructure
- Heavy multi-screen analytics dashboards (beyond the light pattern view)
- Gamification: **streaks / points / leaderboards** → harmful for stressed students (a *calming* micro-game is fine; scoring is not)
- **Recommending or hosting external videos / movies** → doomscroll risk (33% of their stress is social media). The AI may *suggest* an intentional break, but we don't host or feed content.

## Role of the other docs (don't mistake reference for build scope)
- **[FRAMEWORK.md](FRAMEWORK.md) / [PSYCHOLOGY.md](PSYCHOLOGY.md)** = design *grounding* for the system prompt + the 3 MVP activities. **Not** a build checklist — we do **not** build all 18 methods or 9 activities.
- **[SOLUTION.md](SOLUTION.md)** 11 differentiators = *vision*; only the few inside MVP ship now.
- **[BUILD-PLAN.md](BUILD-PLAN.md)** sprint = the real build order.

## Why this stays aligned *and* simple
Every MVP item maps to a brief clause (see [ALIGNMENT.md](ALIGNMENT.md)); we trimmed only breadth, never a requirement. The two most-weighted clauses — *hidden patterns trackers miss* and *safely* — stay in the core. Result: a tool real students can use in seconds.
