# MindMitra — Design System

> A real, elegant design language — calm, premium, accessible. Not "flat primary colors + big boxes."
> Think *a quiet room*: soft, warm, unhurried, trustworthy. Mobile-first, dark-mode native.
> Build rule: **everything uses these tokens — no hardcoded hex.** (Code Quality + theming.)

## 1. Brand & feel
- **Personality:** calm, safe, warm, quietly confident. Never clinical, never hype, never childish.
- **Metaphors:** dawn light · breath · still water · a steady friend.
- **References (the bar):** Headspace's calm + Linear's precision + a warmer, human edge.

## 2. Color tokens
Low-saturation, nature-calm. All pairings meet **WCAG AA**. Provided as a 50–900 ramp + semantics, light & dark.

**Primary — Sage (calm, growth)**
`50 #EEF6F3 · 100 #D6EAE3 · 200 #AED5C8 · 300 #7FBBA9 · 400 #4F9E88 · 500 #2E8270 (brand) · 600 #1F6A5A · 700 #185447 · 800 #123F36 · 900 #0C2A24`

**Accent — Apricot (warmth, encouragement — used sparingly)**
`200 #FBE0CF · 400 #F2B58C · 500 #E89A6B · 700 #B66B3E`

**Neutrals — warm sand-gray** (never pure gray — warmth = calm)
`bg #FBFAF8 · surface #FFFFFF · surface-2 #F5F3EF · ink #1C1B1A · ink-soft #4A4843 · muted #6E6A65 · line #ECEAE6`

**Semantic**
- Positive/calm → Primary 500/600
- Caution → `amber-700 #B45309` on `amber-50 #FEF7EC`
- **Crisis** → clear but *not* alarmist: `rose-700 #B42318` on `rose-50 #FEF3F2` (serious, steady — never a flashing red)

**Dark mode** (students study at night — caring default)
`bg #121517 · surface #1A1E21 · surface-2 #232A2D · ink #ECECEA · ink-soft #B9BEC0 · muted #8A9094 · line #2C3438` · primary lifts to `300/400` for contrast.

## 3. Typography
- **UI / body:** **Inter** (Google Fonts) — clean, legible, neutral. Weights 400 / 500 / 600.
- **Empathic moments (optional, elegant):** a soft serif — **Fraunces** or **Newsreader** — for the "Reflect" line + big affirmations. A literary, human calm. Use *sparingly*.
- **Scale** (mobile): display 30/36 · h1 24/30 · h2 20/26 · h3 17/24 · body 16/26 · small 14/21 · caption 12/16.
- Rules: sentence case, generous line-height (calm), max ~2 weights per screen, never ALL CAPS for content.

## 4. Spacing, radius, elevation
- **Space** (4px base): 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 72.
- **Radius** (soft = calm): sm 10 · md 14 · lg 18 · xl 24 · pill 999. Cards = lg/xl.
- **Elevation** (subtle, soft, low — never harsh): 
  - e1 `0 1px 2px rgba(18,40,34,.05)`
  - e2 `0 8px 24px rgba(18,40,34,.07)`
  - focus ring `0 0 0 3px rgba(46,130,112,.35)`

## 5. Motion (gentle, accessible)
- Durations: fast 150 · base 250 · slow 400ms. Easing `cubic-bezier(.4,0,.2,1)`.
- **Breath** animation: 4s ease-in-out scale loop (the breathing visual).
- Transitions are soft fades/rises (8–12px), never bouncy.
- **Respect `prefers-reduced-motion`** — disable non-essential motion (accessibility, and kinder to anxious users).

## 6. Surfaces & texture
- App background: warm off-white (light) / deep calm slate (dark). Optional **very soft dawn gradient** on the home hero only (low-contrast, calming) — solid elsewhere.
- Cards: surface + e1, radius lg, 1px line border in light / subtle in dark.

## 7. Iconography
- **Lucide** outline icons, 1.75 stroke, rounded. Consistent 20/24px. Decorative → `aria-hidden`; icon-only → `aria-label`.

## 8. Core components (specs + states)
| Component | Spec |
|-----------|------|
| **Button (primary)** | Primary 500 bg, white text, radius pill, 48px tall (44+ tap target), e1; hover 600; active scale .99; disabled 40%; focus ring. |
| **Button (quiet)** | transparent, ink-soft text, line border; for secondary actions. |
| **Feeling chip** | pill, surface + line; selected = Primary 500 fill / white. 40px+ tall. |
| **Mic button** | 64px circle, Primary 500, white mic, soft pulse when listening (reduced-motion: static). |
| **Text input** | 16px text (no iOS zoom), radius md, line border, focus = primary border + ring. |
| **Card** | surface, radius lg, e1, 16–20 padding. |
| **Result card** | sectioned: Reflect (serif, larger) · Reveal (chip) · Act (activity card) · Encourage · "Back to studying →". |
| **Activity card** | Primary 50 bg, primary border, icon + title + duration; tappable. |
| **Breathing visual** | 120px circle, Primary 50 fill + 400 ring, breath animation, count label. |
| **Crisis card** | rose-50 surface, rose border, calm heading, large tappable helpline rows, persistent "Get help". Steady, warm, unmissable — not alarming. |
| **Trend** | minimal line/sparkline, primary stroke, no gridline clutter. |

## 9. Accessibility (built-in, scored)
- Contrast **AA** everywhere (verified pairings above). Crisis text is high-contrast.
- Tap targets ≥ 44px. Visible focus rings. Full keyboard nav.
- Every input labelled; icons have `aria-label`/`aria-hidden`.
- Status by **text + color**, never color alone (esp. crisis + budget-style states).
- `prefers-reduced-motion` honored. Voice input as a low-friction alternative.
- Dark mode for low-light comfort.

## 10. Delivery (how the build consumes this)
- Tokens live in **Tailwind theme config + CSS variables** (`--color-*`, `--radius-*`, `--ease-*`). Light/dark via CSS variables.
- Components in a small `ui/` library (Button, Card, Chip, Input, etc.) — reused everywhere.
- **No hardcoded colors/spacing in feature code** — only tokens. This is enforced in review.
