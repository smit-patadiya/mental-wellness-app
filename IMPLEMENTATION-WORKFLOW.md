# MindMitra — Implementation Workflow (parallel-agent build loop)

> How we actually build it: the main thread (orchestrator) decomposes the sprint into tasks,
> **fans independent tasks out to parallel sub-agents**, keeps dependent ones sequential, and for
> **each task: implement → test (its success criterion) → commit**. You're pulled in only at the
> **human gates**. Informed by agent-orchestrator (parallel worktrees + escalate-when-needed),
> BMAD (specialist roles + human decision gates), and the Karpathy guidelines (simplicity, surgical,
> goal-driven). Source of scope: [BUILD-PLAN.md](BUILD-PLAN.md) + [SCOPE.md](SCOPE.md).

## Principles (the quality bar)
- **Goal-driven:** every task states a success criterion (usually a test). No "make it work."
- **Simplicity-first / surgical:** minimum code; touch only what the task needs; tokens not hardcodes.
- **Parallel only where independent.** Don't fan out coupled work — coordination cost > benefit on an app this size.
- **Isolation:** sub-agents that write files concurrently run in **separate git worktrees** to avoid conflicts; results merge back.
- **Safety is human-verified.** The crisis path is never "agent-approved" alone.

## Per-task loop (every task)
```
plan (success criterion)  →  implement  →  run test/check
   → pass? → commit (conventional msg) → next
   → fail? → fix (retry ≤2) → still failing → ESCALATE to human
```
Commits: one per completed+tested task · Conventional Commits · co-author trailer · auto-push once the remote exists.

## Task graph (waves)
**Sequential foundation (must be in order):**
- T0 Scaffold Next.js + Tailwind + deploy shell (Vercel) — *verify: site loads*
- T1 Design tokens → Tailwind config + CSS vars + `ui/` primitives (Button, Card, Chip, Input) — *verify: a token sample renders light/dark* · ([DESIGN-SYSTEM.md](DESIGN-SYSTEM.md))

**▶ Parallel wave A (independent modules → sub-agents, worktrees):**
- A1 Zod schemas + types (`AnalysisResult`, `SafetyVerdict`) — *verify: unit test parse good/malformed*
- A2 Safety: deterministic crisis keyword guard + tiers — *verify: red-team fixtures all fire red*
- A3 localStorage data layer (entries, mood, export/delete) — *verify: unit test add/trend/delete*
- A4 More `ui/` components (Mic, ResultCard shell, ActivityCard, CrisisCard) — *verify: render in isolation*

**Sequential integration (needs A):**
- T2 `/api/analyze` route (Gemini, server-side key, uses A1 schema + A2 guard) — *verify: mocked-model test → valid object; key absent from client*
- T3 Single-input home (chips · mic · type, uses A3 + A4) — *verify: submitting routes to result*
- T4 Result card wiring (Reflect→Reveal→Act→Encourage→**Back to studying**) — *verify: renders an analysis fixture*

**▶ Parallel wave B (activities — independent → sub-agents):**
- B1 Box breathing (animated) · B2 CBT reframe · B3 Grounding — each *verify: renders + before/after mood logs*

**Sequential finish:**
- T5 Voice journaling (Web Speech STT) — *verify: speech→text populates input (Chrome); graceful fallback*
- T6 Mood trend (light) — *verify: trend from fixtures*
- T7 **Tests pass + crisis red-team** — *verify: `npm test` green; red-team 100%* ← human signs off
- T8 Calm-minimal polish (motion, a11y, dark mode) + re-deploy — *verify: Lighthouse a11y, mobile 360–414px*

**MVP+ (if time, parallelizable):** TTS exercises · distraction break + calming game · companion chat · richer pattern view.

## 🙋 Human-intervention gates (I pause + ping you)
| Gate | Why it needs you |
|------|------------------|
| **G1 · GitHub repo** | create the **public** repo + give me the remote → enables auto-push/commits |
| **G2 · Gemini key + Vercel** | set `GEMINI_API_KEY` in Vercel env (your secret) + authorize deploy |
| **G3 · Design sign-off** | approve the design system + first real screen before we build all UI on it |
| **G4 · Crisis red-team sign-off** | safety-critical — you verify the Red path fires + helplines are right |
| **G5 · Final submission** | confirm live URL, README, repo public/single-branch/<10MB |
At each, I stop, show what's done, and tell you exactly what to do.

## How parallelism runs here
- I orchestrate **in-session**: spawn sub-agents (Agent tool, `isolation: worktree` for concurrent file writers) for waves A and B; do sequential tasks myself.
- Each sub-agent gets: the task, its success criterion (test), the relevant doc section, and "commit when green."
- Failures/escalations surface to me; I fix or raise a gate.
- *(A full headless Workflow script is overkill + fights the interactive human gates — in-session orchestration is simpler and right for this size.)*

## Aligned with the 5 scored criteria
- **Code Quality** — token-driven UI, small `ui/` lib, modular, surgical commits, conventional messages.
- **Efficiency** — one Gemini call, localStorage, stateless route, mobile-light.
- **Accessibility** — design-system a11y baked in (AA, focus, reduced-motion, voice, dark).
- **Security** — key server-side, deterministic crisis guard, data local, no key in client (tested).
- **Testing** — per-task success criteria + crisis red-team gate.

## Definition of done (whole app)
Live URL · full flow incl. crisis path (human-verified) · `npm test` green · README · key server-side · public, single branch, <10MB · mobile-first + dark mode + AA.
