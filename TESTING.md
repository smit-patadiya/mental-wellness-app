# MindMitra — Testing Plan

> We missed this earlier — fixing it. Testing is **scored** (Testing criterion) and, here, **safety-critical**:
> the crisis path must work every time. Strategy = automated unit tests for the deterministic logic +
> a crisis red-team + a manual QA checklist. No code yet; this is the plan.

## Principle
The risky parts are deterministic on purpose (so they're testable). The model is mocked in tests —
we don't call Gemini in CI; we feed recorded/fixture responses through the real pipeline.

## 1. Automated unit tests (Vitest) — the must-haves
| Target | Test |
|--------|------|
| **Crisis keyword guard** | a battery of self-harm / hopelessness phrases → **all** return `red`; benign exam-stress phrases → not red (no over-trigger). |
| **Analysis schema parse** | valid model JSON → passes; malformed / missing fields → **throws** (fail-loud). |
| **Technique routing** | each detected state → the correct activity ([PSYCHOLOGY.md](PSYCHOLOGY.md) selector). |
| **Mood trend / storage helpers** | add entries → trend computed correctly; export/delete works; bad data ignored. |
| **Input bounds** | empty / over-long / junk input handled gracefully. |

## 2. Crisis red-team (the critical test — automated + manual)
- A fixture set of **escalating-distress inputs** (mild → severe → explicit) → assert the safety classifier fires **`red`** at the right point and **helplines render every time**.
- Test the failure mode: if the **model call fails or returns junk**, the crisis keyword guard **still** catches risk (defense in depth — never rely on the model alone).
- Manually walk the Red flow on device before any demo.

## 3. Manual QA checklist (pre-demo)
- [ ] Voice journaling: speech→text works (Chrome); graceful message if unsupported.
- [ ] Each activity renders + the breathing animation runs.
- [ ] Result card shows Reflect→Reveal→Act→Encourage→**Back to studying**.
- [ ] Crisis screen: helplines correct + tappable, disclaimer visible, "Get help" always reachable.
- [ ] Export + delete my data works; nothing persists after delete.
- [ ] Mobile layout (360–414px) clean; scales to desktop.
- [ ] Offline / API-down → demo-safe fallback, no crash, no key leak.
- [ ] No `GEMINI_API_KEY` in the client bundle (grep).

## 4. Tools
- **Vitest** — unit tests on pure logic (no network).
- Fixtures — recorded model outputs (good + malformed + crisis) to drive the pipeline.
- (Stretch) Playwright — one e2e happy-path + crisis-path.
- Manual checklist above for the rest.

## Definition of done
`npm test` green · **crisis red-team passes 100%** · manual checklist complete · key absent from client.
Helpline numbers verified current (Tele-MANAS 14416 · KIRAN 1800-599-0019 · iCall 9152987821).
