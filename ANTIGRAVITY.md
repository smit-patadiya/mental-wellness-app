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
| A10 | **Background music** — optional ambient audio + mute toggle (persist pref); pause on crisis screen | Antigravity | ⬜ |
| A11 | **Per-mood background art/images** — soft imagery/illustration layered behind the gradient per `data-mood` (calm/low/anxious) | Antigravity | ⬜ |
| A12 | **Per-exercise animations** — richer breathing guide, grounding step reveals, reframe input affordance | Antigravity | ⬜ |
| A13 | **Desktop device-frame polish** — refine the phone frame (notch/status bar optional), responsive scaling | Antigravity | ⬜ |
| A14 | **Dashboard visuals** — nicer trend chart, streak-free progress, entry cards polish | Antigravity | ⬜ |
| A15 | **Welcome / onboarding screen** — low-text, animated breathing orb, "Begin" (see design-variant.html) | Antigravity | ⬜ |
| A16 | **Interaction animations** — page-enter, button press, mood-select, card rise (subtle, reduced-motion safe) | Antigravity | ⬜ |
| A17 | **Background music + mood-based sound** (sound therapy) — ambient tracks, change by mood, mute toggle, pause on crisis | Antigravity | ⬜ |
| A18 | **Light blurred background images/art** per mood (color therapy) behind the gradient | Antigravity | ⬜ |
| A19 | **Redesign result + activity screens** per design-variant — graphic-first, **less text**, animated orb, big activity card | Antigravity + Claude | ⬜ |
| A20 | **Icon bottom bar** — Today · Insights · **Breathe** (center FAB) · Sounds · You | Claude (struct) + Antigravity (polish) | ⬜ |
| A21 | **Mobile UI polish** — spacing, tap targets, safe areas, full-bleed on phones | Antigravity | ⬜ |
| A22 | **Exercise animations** — box-breathing orb, grounding reveals, optional human/figure SVG motion | Antigravity | ⬜ |

> **Latest feedback (captured):** welcome screen+anim · interaction anims · exercise anims · mood/daytime/interaction color change · blurred bg images · background music by mood · low-text + graphics-first · rethink result & other screens · color therapy + sound therapy + meditation + CBT + self-compassion · richer icon bottom bar. All mapped above → **pending design-direction approval** (design-variant.html).

## Hooks already in place for you
- `data-daypart` is set on `<html>` by `components/Theme.tsx` (values: morning/day/evening/night) — style via `:root[data-daypart='…']` in SCSS.
- `.dark` class on `<html>` toggled by the header button — your themes must work in light + dark.
- Result emotions are available in the page; wiring `data-mood` (A1) is a small change in `app/page.tsx` — ask Claude or leave a note.

## Overall project status (whole app)
- ✅ Foundation + SCSS design tokens · ✅ Safety guard + tests · ✅ Schema + tests · ✅ Techniques + demo + tests · ✅ Icons + UI primitives · ✅ Storage · ✅ `/api/analyze` (key server-side, **live Gemini verified**) · ✅ Single-input UI + result + 6 activities + crisis + voice + dark · ✅ **Device-frame redesign + mood-reactive background** · ✅ **Dashboard (past tracking, mood trend, export/delete)** · ✅ Bottom nav · ✅ Animated breathing · ✅ Daypart theme · ✅ ESLint + Prettier
- ⬜ Antigravity visual polish (A1–A14) · ⬜ Crisis red-team sign-off · ⬜ README · ⬜ Vercel deploy
- **Tests: 19 passing.** Build + lint clean. Next 14.2.35 (patched). Verified in browser: home · result · crisis · dashboard.
