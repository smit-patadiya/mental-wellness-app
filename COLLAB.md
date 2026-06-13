# Claude + Antigravity — collaboration workflow

> Both AIs write code into the **same git repo**. To avoid conflicts: clear file ownership, small commits, pull-before-work. Single branch (`main`) per the rules.

## File ownership (avoid stepping on each other)
| Area | Owner | Path |
|------|-------|------|
| Core logic, schema, safety, AI route | **Claude** | `lib/**`, `app/api/**` |
| Automated tests | **Claude** | `lib/**/*.test.ts`, `vitest.config.ts` |
| Design tokens / base styles | **Claude** (from [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)) | `app/globals.css` |
| UI polish, extra activities, micro-interactions | **Antigravity** | `components/**`, screen refinements |
| Docs / README | shared | `*.md` |

## Git rules (both follow)
1. **Pull before you start** (`git pull --rebase`) and **after each task**.
2. **One commit per finished + tested task.** Conventional Commits (`feat:`, `fix:`, `test:`, `style:`).
3. Keep commits small + focused → fewer conflicts.
4. Never commit secrets. Key only in Vercel env / local `.env` (gitignored).
5. If you touch the other's area, say so in the commit body.

## Handshake
- Claude builds the **engine + tests + tokens** first (this is the risky/scored part — esp. Testing, Security).
- Antigravity layers **visual polish + extra activities** on top, using the design tokens (no hardcoded colors).
- Both run `npm test` before committing — green or it doesn't ship.

## Human gates (either AI pauses + pings you)
GitHub repo + remote · Gemini key in Vercel · crisis red-team sign-off · final deploy. (See [IMPLEMENTATION-WORKFLOW.md](IMPLEMENTATION-WORKFLOW.md).)
