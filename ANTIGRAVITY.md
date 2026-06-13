# Antigravity — work plan + live status tracker

> Single source of truth anyone can check anytime. Claude owns the engine (logic, API, tests, tokens);
> **Antigravity owns the visual layer** (graphics, icons, animation, motion, mood/daypart theming).
> Rules: [COLLAB.md](COLLAB.md). Design language: [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

## How to initialise Antigravity on this project
1. Open the folder `mental-wellness-app/` as the project in Antigravity.
2. Terminal: `npm install` then `npm run dev` → http://localhost:3000 (works in demo mode without a key).
3. Read this file + [COLLAB.md](COLLAB.md) + [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). Pick an unchecked task below, claim it (put your initials), build it, then check it off.
4. (For live AI) add `GEMINI_API_KEY=...` to a local `.env` (gitignored).

## Ground rules (do not break)
- **Styling = SCSS** (`app/globals.scss`). Use the CSS custom-property **tokens** (`--p-500`, `--bg`, `--r-lg`, …). **No hardcoded colors. No emoji** (use `components/icons.tsx`).
- Keep **WCAG AA** contrast and honor `prefers-reduced-motion` (already wired globally).
- Don't touch `lib/**`, `app/api/**`, or any `*.test.ts` (Claude's). If you need a logic change, leave a note in this file.
- Before every commit: `npm test` (green) + `npm run lint` + `npm run format`. Small, conventional commits. `git pull --rebase` first.

## Task tracker  (status: ⬜ todo · 🟡 in-progress · ✅ done)
| ID | Task | Owner | Status |
|----|------|-------|:------:|
| A1 | **Mood-based accent** — set `data-mood` on `<html>` from the result's emotions; add subtle SCSS palette per mood (calm/anxious/low/panic) | Antigravity | ⬜ |
| A2 | **Daypart palette** — refine morning/day/evening/night gradients started in `globals.scss` (subtle, AA-safe) | Antigravity | ⬜ |
| A3 | **Breathing visual** — upgrade the activity to a polished animated guide (inhale/hold/exhale phases, soft) | Antigravity | ⬜ |
| A4 | **Micro-interactions** — chip press, card enter, button feedback (subtle, reduced-motion safe) | Antigravity | ⬜ |
| A5 | **Calm graphics/illustrations** — home + empty states using the provided assets | Antigravity | ⬜ |
| A6 | **Screen transitions** — home ↔ result ↔ activity (gentle fade/rise) | Antigravity | ⬜ |
| A7 | **Activity visuals** — grounding step transitions, reframe input affordances | Antigravity | ⬜ |
| A8 | **Icon set expansion** — more crafted SVGs in `components/icons.tsx` as needed | Antigravity | ⬜ |
| A9 | **A11y + motion QA** — focus rings, contrast recheck across themes, motion off | Antigravity | ⬜ |

## Hooks already in place for you
- `data-daypart` is set on `<html>` by `components/Theme.tsx` (values: morning/day/evening/night) — style via `:root[data-daypart='…']` in SCSS.
- `.dark` class on `<html>` toggled by the header button — your themes must work in light + dark.
- Result emotions are available in the page; wiring `data-mood` (A1) is a small change in `app/page.tsx` — ask Claude or leave a note.

## Overall project status (whole app)
- ✅ Foundation, design tokens (SCSS), layout · ✅ Safety guard + tests · ✅ Schema + tests · ✅ Techniques + demo + tests · ✅ Icons + UI primitives · ✅ Storage · ✅ `/api/analyze` (key server-side) · ✅ Single-input UI + result + 6 activities + crisis + voice + dark · ✅ ESLint + Prettier · 🟡 Daypart theme (scaffolded) · ⬜ Mood theme (A1) · ⬜ Visual polish (A3–A8) · ⬜ Mood trend view · ⬜ Crisis red-team sign-off · ⬜ README · ⬜ Vercel deploy
- **Tests: 19 passing.** Build: clean. Next: 14.2.35 (patched).
