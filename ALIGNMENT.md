# MindMitra — Alignment Check vs Problem Statement

> Final gate: does our solution match the official brief — nothing dropped, nothing drifting?
> Audited against the verbatim slide text. Verdict at bottom.

## Verbatim brief (atomized into requirements)
> Build a **Generative AI-powered** solution that helps students **monitor and improve their mental well-being** during **high-stakes board exams and competitive entrance tests (NEET, JEE, CUET, CAT, GATE, UPSC)**. Students face **stress, burnout, self-doubt**. Create a **simple, engaging** tool that leverages GenAI to **analyze open-ended daily journaling and mood logs, uncovering hidden stress triggers and emotional patterns that standard trackers miss**. Use **conversational AI** to provide **hyper-personalized, contextual** wellness support — **real-time tailored coping strategies, adaptive mindfulness exercises, motivational encouragement** — **safely** acting as an **empathetic, always-available digital companion** throughout their academic journey.

## Requirement-by-requirement audit
| # | Requirement | Covered? | Where |
|---|-------------|:--------:|-------|
| 1 | Generative-AI-powered | ✅ | Gemini is the core engine |
| 2 | Monitor well-being | ✅ | one-input check-in/journal → inferred mood + passive trend |
| 3 | Improve well-being | ✅ | coping activities, mindfulness, encouragement, reframes |
| 4 | During high-stakes exams (NEET…UPSC) | ✅ | exam-generic; exam-context optional add |
| 5 | Address stress / burnout / self-doubt | ✅ | detection taxonomy covers all three |
| 6 | **Simple, engaging** | ✅✅ | friction-zero one-input model; calm-minimal UI |
| 7 | Analyze **open-ended journaling** | ✅ | text + voice journal (open-ended) |
| 8 | Analyze **mood logs** | ✅ | feeling chips (explicit) + AI-inferred mood scores |
| 9 | **Uncover hidden triggers/patterns trackers miss** | ✅ | per-entry "Reveal" insight (core) + longitudinal pattern map (next) — **the hero** |
| 10 | **Conversational AI** | ✅ | empathic conversational replies on every entry + companion chat (backup) |
| 11 | Hyper-personalized | ✅ | history + closed-loop (what coping worked) |
| 12 | Contextual | ✅ | inferred content + history; exam timeline optional |
| 13 | Real-time tailored coping | ✅ | inline activity matched to detected state |
| 14 | Adaptive mindfulness | ✅ | breathing/grounding, stress-matched |
| 15 | Motivational encouragement | ✅ | "Encourage" in result payload, grounded |
| 16 | **Safely** | ✅✅ | crisis classifier + tiers + helplines + disclaimer |
| 17 | Empathetic | ✅ | psychology-grounded, validate-first tone |
| 18 | Always-available companion | ✅ | on-device, any time, proactive |
| 19 | Throughout academic journey | ✅ | longitudinal local data + trends |

## Watch-items (not drift — just "don't cut these from the core")
1. **Keep the per-entry "Reveal" insight in the MVP** — it carries requirement #9 (the headline differentiator). The full pattern map can be stretch, but the in-the-moment hidden-insight must ship.
2. **Keep open-ended journal (text/voice) first-class** — feeling chips are a quick shortcut, but the open-ended input (#7) must stay, or we lose "open-ended journaling."
3. **Safety (#16) stays in core**, never stretch.

## Pitch articulation (pre-empt judge questions)
- *"Conversational AI"* → we use it on **every** entry (empathic conversational replies + psychology-grounded tone) and offer a chat backup. We deliberately lead with *guided* interaction because open chat is weaker/riskier for stressed students — a responsible UX choice, not a drop.
- *"Contextual"* → delivered via the student's own history + content; exam-date context is one tap away to deepen it.

## Verdict
**Aligned. No drift.** Every clause of the brief maps to a feature; the two most-weighted clauses — *hidden patterns trackers miss* and *safely* — are exactly where we've invested most. Just hold the 3 watch-items in the build.
