# MindMitra — Research-Grounded Framework

> Built from real data on Indian student mental health (ages ~15–24). Defines: the problem model,
> what patterns we detect, how the user interacts, what we deliver, the **safety/escalation protocol**,
> and the real friction. Pairs with [SOLUTION.md](SOLUTION.md) + [PLAN.md](PLAN.md). No code.

## 1. The reality (why this matters, with numbers)
- **69.9%** of Indian students report moderate–high anxiety, **59.9%** depression, **70.3%** distress (2025 study, 1,628 students, 8 cities). Yet **<10%** of youth access any mental-health service.
- **NCRB 2024: 14,488 student deaths by suicide** — rising *faster* than the national average (+4.3% YoY). Exam failure is the **leading recorded cause among under-18s** (1,071 cases). ~35 students/day.
- **Kota** (coaching hub): 26 (2023) → 17 (2024) exam-linked suicides; hostels now install anti-suicide fan grills.
- Top drivers: **academic stress (37%)**, **social media (33%)**, **loneliness (29%)**. Medical students: 37.2% suicidal ideation.
- Kota-specific stressors: mock-test rankings, batch reshuffling, **parental "no going back,"** hostel loneliness, **fear of wasting family money**, chronic sleep loss, "every aspirant is a competitor" (no friendships).
- Policy context: **July 2025 — Supreme Court issued 15 binding mental-health guidelines** for institutions. (Tailwind + credibility for this product.)

**Implication:** the bar isn't "a nice journaling app." Lives are involved → **safety, escalation, and trust are the product**, not features bolted on.

## 2. Problem framework — stressor → manifestation → risk
```
ROOT STRESSORS                MANIFESTATIONS                 RISK TRAJECTORY
academic load / mocks    →    anxiety, panic            →    Green  (normal stress)
parental & family money  →    self-doubt, guilt         →    Yellow (elevated / persistent)
peer comparison / social →    burnout, exhaustion       →    Orange (hopelessness, withdrawal)
isolation / hostel       →    sleep loss, withdrawal    →    Red    (self-harm ideation)
exam proximity           →    numbness, "can't do this"
```
The job: **read the open-ended signals, locate the student on this map, intervene at the right level, and escalate to humans when it crosses the line.**

## 3. Pattern taxonomy — what GenAI detects that mood-sliders miss
This is the hero. A slider captures "sad 3/5." Free-text reveals *why* and *what predicts it*.
| Layer | Examples |
|-------|----------|
| **Emotions** | anxiety, hopelessness, burnout, self-doubt, guilt, loneliness, anger, numbness |
| **Cognitive distortions** (CBT) | catastrophizing, all-or-nothing, comparison, mind-reading, fortune-telling, "should" |
| **Stressor sources** | specific subject, mock ranking, parental pressure, money guilt, social-media comparison, sleep, hostel isolation |
| **Behavioral signals** | sleep disruption, withdrawal, procrastination, over-study/no breaks, appetite change |
| **Temporal patterns** | time-of-day dips, pre/post-mock, day-of-week, **escalation as exam nears** |
| **Correlations (the magic)** | multi-factor: *low sleep + mock + comparison → next-day anxiety* |
| **Trajectory** | improving / worsening / **sudden drop** (a safety trigger) |

## 4. How the user interacts (modes)
1. **10-second check-in** — mood + one-tap tags (sleep, mock today, energy). Lowest friction; the daily habit.
2. **Open journaling** — type *or* **speak** (voice → transcript). The rich signal.
3. **Companion chat** — talk it out; empathic, guard-railed.
4. **Do an activity** — interactive exercise (see §6).
5. **Receive proactive care** — gentle nudge when a pattern rises (§5).
6. **See themselves** — pattern map + mood trend + wins.

## 5. What we deliver — the "result payload" (after each entry)
Not a wall of text. A tight, engaging response = **Reflect → Reveal → Act → Encourage → Next**:
1. **Reflect** (empathy first): *"Sounds like the physics mock really shook you today."*
2. **Reveal** (one insight): *"That's the 3rd evening this week your mood dipped after a mock."*
3. **Act** (ONE matched micro-action, ≤2 min): a reframe card, breathing, grounding, or a break.
4. **Encourage** (grounded, specific — not "you got this!"): tied to their real effort/progress.
5. **Next** (closed loop): *"Want to log how you feel now?"* or *"Talk a bit more?"*
- Plus: mood-trend tick, and — if risk is detected — the safety flow overrides everything (§7).

**Rule:** one primary action per result. More = friction = abandonment.

## 6. Interactive activity library (the "exercises")
Matched to state; each is a small interactive UI, optionally voice-guided.
| Activity | When | Interaction |
|----------|------|-------------|
| **Box breathing** (4-4-4-4) | acute anxiety/panic | animated expanding circle + timer |
| **5-4-3-2-1 grounding** | spiraling / dissociation | step-through prompts |
| **Thought reframe** (CBT) | distortion detected | type the worry → AI offers reframe → you pick/edit |
| **2-min brain-dump** | overwhelm | timed free-write, then "park it" |
| **Progressive muscle relaxation** | body tension, pre-sleep | voice-guided sequence |
| **Worry postponement** | rumination | schedule the worry for later |
| **One-win / gratitude** | low mood, self-doubt | single micro-prompt |
| **Exam-Day SOS** | exam morning panic | guided 3-step calm protocol |
| **Mood before/after** | every activity | slider → feeds closed-loop learning (what works for *this* student) |

## 7. ⚠️ Safety & escalation protocol (the core)
Grounded in current AI-safety guidance: **escalation must be a boring, explicit, deterministic workflow** — a *separate* conservative classifier, **not** something the empathic generation decides. Research warns LLMs are **slow to escalate** → we err toward escalating.

### Risk tiers + response + handover
| Tier | Signals | AI does | Hands to human? |
|------|---------|---------|-----------------|
| 🟢 **Green** | normal exam stress | coping, journaling, encouragement | no |
| 🟡 **Yellow** | persistent stress, rising anxiety, poor sleep pattern | targeted CBT/mindfulness, proactive check-ins, *gently* suggest talking to someone | soft suggestion |
| 🟠 **Orange** | hopelessness, burnout, withdrawal, "I can't do this anymore" | validate + de-escalate, **strongly** encourage a trusted adult/counsellor, surface helplines, offer to help draft a message to someone | **strong nudge + resources** |
| 🔴 **Red** | self-harm / suicidal ideation, intent, or plan | **STOP normal flow** → crisis protocol: empathic grounding + **immediate helplines** + urge contacting a person *now*. Never counsel/treat. | **immediate, primary** |

### The "hand-off to a real person" rule (what you asked)
- The AI is a **bridge to humans, not a replacement.** Its escalation job is to *connect*, fast and conservatively.
- **Red = hard handover:** crisis resources front-and-center, every time, identically (boring + consistent).
- **Helplines (verify before shipping):** **Tele-MANAS 14416** · **KIRAN 1800-599-0019** · **iCall 9152987821** · Vandrevala 1860-2662-345 · AASRA +91-9820466726.
- An always-visible **"Get help now"** button — never buried.

### Safety design rules (non-negotiable)
- Separate **deterministic safety classifier** runs on every input *before* the friendly reply.
- **Track emotional trajectory** across sessions; flag sudden drops toward hopelessness/panic.
- **Limit human-likeness & sycophancy**; never validate self-harm; never claim to be a therapist.
- **Be transparent it's AI.** Persistent disclaimer.
- **Privacy:** journals are highly sensitive; consent, local/encrypted, user can delete, key server-side, no PII in logs.
- **Red-team the escalation** with escalating-distress prompts before any demo. Test that Red *always* fires.
- Minors likely → extra caution; align with the SC 2025 guidance framing.

## 8. Real friction (and how we beat it)
| Friction | Reality | Mitigation |
|----------|---------|------------|
| Won't journal daily | stressed, time-poor | 10-sec check-in, voice input, gentle proactive prompts, **no guilt-streaks** |
| Stigma | "mental health app" feels heavy | position as a **study companion**; private by default |
| No time for exercises | every minute is "study time" | **≤2-min** micro-actions framed as focus/energy boosts |
| Won't be honest with AI | trust | privacy-first, transparent, references their *own* words |
| Language | English excludes many | **Hinglish / vernacular** support |
| Generic advice fatigue | seen it all | hyper-personal, cites their patterns |
| Over-reliance / avoiding real help | AI can't fix everything | actively **bridge to humans**, encourage real support |
| Phone-first, patchy net | most users | lightweight, offline-friendly check-ins |
| Notification fatigue | nagging backfires | sparse, kind, opt-in nudges |

## 9. How this improves the plan (deltas vs SOLUTION/PLAN)
- **Add the 4-tier escalation framework (§7) as a core module** — was under-specified; now it's the spine.
- **Define the result payload (§5)** — concrete "what we send at end" = Reflect→Reveal→Act→Encourage→Next.
- **Add the interactive activity library (§6)** with before/after mood = closed-loop personalization.
- **Reposition as a "study companion"** to cut stigma friction.
- **Make the safety classifier deterministic + separate**, trajectory-aware, red-teamed.
- **Lean on credibility:** SC-2025 guidelines + APA advisory + evidence-based (CBT/MBSR) framing in the pitch.

## 10. Open decisions → then we lock the build plan
1. Demo exam focus (JEE/NEET sharp vs generic)?
2. Voice in MVP or text-first?
3. Storage: local-first vs Firebase?
4. Companion chat depth in MVP?
5. Confirm risk-tier wording + helpline list for India.

---

### Sources
- [69.9% anxiety / mental-health crisis among Indian students (2025)](https://www.notesly.in/article/699-of-indian-students-have-high-anxiety-the-mental-health-crisis-no-ones-fixing) · [Tier-1 cities study (PubMed)](https://pubmed.ncbi.nlm.nih.gov/40088751/)
- [NCRB 2024 — 14,488 student deaths (The Logical Indian)](https://thelogicalindian.com/ncrb-reports-14488-student-deaths-in-2024-rising-faster-than-overall-suicide-numbers/) · [What the 2024 NCRB report shows (The Wire)](https://m.thewire.in/article/education/rising-student-deaths-by-suicide-what-the-2024-ncrb-report-shows) · [Exam-failure suicides & policy (The Lancet SEA)](https://www.thelancet.com/journals/lansea/article/PIIS2772-3682(24)00093-3/fulltext)
- [Kota coaching stress & suicides (The Hans India)](https://www.thehansindia.com/hans/education-careers/kota-a-city-of-nurturing-dreams-or-increasing-stress-972313) · [Kota: the fatal flaws of a coaching factory (Deccan Herald)](https://www.deccanherald.com/opinion/the-fatal-flaws-of-a-coaching-factory-2665540)
- [APA health advisory: AI chatbots & wellness apps for mental health](https://www.apa.org/topics/artificial-intelligence-machine-learning/health-advisory-chatbots-wellness-apps) · [7 AI safety strategies for therapy chatbots (Galileo)](https://galileo.ai/blog/ai-chatbot-therapy-strategies) · [Framework for safety in mental-wellness AI chatbots (arXiv)](https://arxiv.org/pdf/2407.11387)
- [CBT + MBSR for test anxiety (BMC Med Education)](https://link.springer.com/article/10.1186/s12909-025-07130-w) · [Mindful breathing & test anxiety (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5072593/)
