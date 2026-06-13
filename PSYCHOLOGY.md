# MindMitra — Psychology Methods → Product

> The edge: every interaction is grounded in **named, evidence-based psychology**, not generic "take a deep breath." This doc maps real methods to how the AI detects, responds, and intervenes. Feeds the companion's system prompt + the activity selector. Pairs with [FRAMEWORK.md](FRAMEWORK.md) + [INTERACTION-DESIGN.md](INTERACTION-DESIGN.md).

## Why this is our moat
Most teams hardcode breathing + a chatbot. We encode a **library of clinical techniques** and route to the *right one* for the detected state — and shape the companion's very voice with these principles. It also reads as serious to judges (AI integration + responsibility).

> Responsible-use line: these are **self-help applications** of established methods, **not therapy**. The AI *applies techniques*; it does not diagnose or treat. Crisis → humans ([FRAMEWORK.md](FRAMEWORK.md) §7).

## How the AI uses psychology (3 layers)
1. **Persona/voice** — the companion's tone *embodies* the principles (autonomy-supportive, validate-first, name emotions, common-humanity, growth language).
2. **Analysis** — detects which framework fits (a distortion → CBT; avoidance → behavioral activation; harsh self-talk → self-compassion; acute panic → DBT/breathing; comparison → social-comparison).
3. **Intervention** — serves the matching evidence-based activity.

## The method library
| Method (author) | Core idea | How MindMitra uses it |
|-----------------|-----------|------------------------|
| **CBT** (Beck) | Thoughts drive feelings; catch + restructure distortions | Detect distortions in journal → reframe activity |
| **REBT / ABC** (Ellis) | Adversity → Belief → Consequence; dispute irrational beliefs | "Dispute the belief" prompt for exam catastrophizing |
| **ACT** (Hayes) | Psychological flexibility: accept thoughts, defuse, act on values | **Cognitive defusion** ("I'm *having the thought* that I'll fail"); **values** check-in |
| **DBT distress tolerance** (Linehan) | Survive a crisis without making it worse; **TIPP** | Acute-panic reset: **paced breathing, cold water, movement, PMR** |
| **MBSR / mindfulness** (Kabat-Zinn) | Non-judgmental present awareness | Grounding, body-scan, breathing |
| **Affect labeling** (Lieberman) | "Name it to tame it" — labeling emotion lowers its intensity | Micro-exercise: name 3 feelings; the companion always names emotions back |
| **Self-compassion** (Neff) | Self-kindness + common humanity + mindfulness | **Self-compassion break**; counters topper perfectionism + harsh self-talk |
| **Self-Determination Theory** (Deci & Ryan) | Autonomy, competence, relatedness drive healthy motivation | Companion **offers, never commands** (autonomy); surfaces small wins (competence); reduces isolation (relatedness) |
| **Growth mindset** (Dweck) | Ability grows; failure = information | Reframe failure; "not yet" language; mock = data, not verdict |
| **Self-efficacy** (Bandura) | Belief from mastery experiences | Highlight past coping that worked (closed loop) to rebuild belief |
| **Yerkes-Dodson law** | Inverted-U: some arousal helps, too much hurts | Normalize stress ("some nerves sharpen you"); flag when it tips over |
| **Transactional stress model** (Lazarus & Folkman) | Appraisal → problem- vs emotion-focused coping | Sort the stressor: changeable → action plan; uncontrollable → acceptance/regulation |
| **Behavioral activation** | Action precedes motivation; counter avoidance | Tiny next-step when paralyzed/procrastinating |
| **Implementation intentions** (Gollwitzer) | "If X, then Y" plans beat willpower | Turn a stuck task into an if-then plan |
| **Affect/attribution + learned helplessness** (Seligman) | Stable-internal blame breeds helplessness | Reframe "I'm stupid" → specific, changeable causes |
| **Positive psychology / PERMA** (Seligman) · **broaden-and-build** (Fredrickson) | Positive emotion widens thinking, builds resilience | Gratitude / 3-good-things; one-win |
| **Social comparison theory** (Festinger) | We judge ourselves vs others (↑ on social media) | Name + defuse comparison (a top driver — 33%) |
| **Expressive writing** (Pennebaker) | Writing about stress lowers it | The journal itself is therapeutic by design |
| **Habit loop** (cue-routine-reward) | Habits form via cue→routine→reward | Gentle daily check-in habit (no guilt) |

## Detected state → technique routing (the intervention selector)
This is the interaction logic the AI follows.
| Detected state | Primary technique → activity |
|----------------|------------------------------|
| Acute anxiety / panic | DBT TIPP + box breathing (calm the body first) |
| Catastrophizing / "I'll fail everything" | CBT/REBT reframe + growth-mindset "yet" |
| Harsh self-criticism / perfectionism | Self-compassion break (Neff) |
| Avoidance / procrastination / stuck | Behavioral activation + if-then plan |
| Rumination / looping worry | Worry-postponement + ACT defusion |
| Comparison / social-media spiral | Affect labeling + social-comparison defusion |
| Loss of meaning / "why am I doing this" | ACT values check-in (autonomy/relatedness, SDT) |
| Overwhelm / can't name it | Affect labeling ("name 3 feelings") + brain-dump |
| Low mood / self-doubt | Self-efficacy (recall what worked) + one-win/gratitude |
| Uncontrollable stressor | Lazarus: acceptance + emotion-focused regulation |

## New activities these unlock (extend the library)
Beyond breathing/grounding/reframe already in [FRAMEWORK.md](FRAMEWORK.md) §6:
- **ACT defusion** ("leaves on a stream"; "I'm having the thought that…")
- **Values check-in** ("why does this exam matter *to you*?") — meaning + autonomy
- **Self-compassion break** (3 lines: this is hard / others feel it too / may I be kind to myself)
- **If-then plan** for one stuck task
- **DBT TIPP cold-water reset** for exam-morning panic
- **Yerkes-Dodson explainer** (normalize nerves) — a 20-sec psychoeducation card
- **Comparison defusion** card for the social-media trigger

## How it shapes the companion's voice (system-prompt principles)
1. **Validate first** (DBT) before any suggestion.
2. **Name the emotion** back (affect labeling).
3. **Autonomy-supportive** (SDT): offer choices, never command or pressure.
4. **Common humanity** (self-compassion): "lots of students feel this."
5. **Growth language** (Dweck): "not yet", effort + strategy over ability.
6. **Present-focused, non-judgmental** (mindfulness).
7. **No toxic positivity**; acceptance over "just cheer up" (ACT).
8. **Build competence** (self-efficacy): point to what they've already handled.

## Improves the plan
- The **activity library + intervention selector** are now psychology-routed (not ad-hoc).
- The **system prompt** has explicit grounding principles → consistent, safe, credible tone.
- Pitch gains a real **"evidence-based, method-grounded"** differentiator.
- Detection schema should tag the **applicable method(s)** so routing is deterministic.

---

### References
- [Self-Determination Theory (APA)](https://www.apa.org/research-practice/conduct-research/self-determination-theory.html) · [SDT (Ryan & Deci 2000, PDF)](https://selfdeterminationtheory.org/SDT/documents/2000_RyanDeci_SDT.pdf)
- [Acceptance & Commitment Therapy (Cleveland Clinic)](https://my.clevelandclinic.org/health/treatments/acceptance-and-commitment-therapy-act-therapy) · [ACT (Simply Psychology)](https://www.simplypsychology.org/acceptance-and-commitment-therapy.html)
- [Affect labeling (Wikipedia)](https://en.wikipedia.org/wiki/Affect_labeling) · [Putting Feelings Into Words — Torre & Lieberman 2018](https://journals.sagepub.com/doi/10.1177/1754073917742706)
- [DBT distress tolerance / TIPP (mentalhealth.com)](https://www.mentalhealth.com/library/dbt-distress-tolerance-skills)
- [Self-compassion (Wikipedia)](https://en.wikipedia.org/wiki/Self-compassion) · [Neff's 3 elements](https://self-compassion.org/what-is-self-compassion/)
- [Yerkes-Dodson law (Simply Psychology)](https://www.simplypsychology.org/what-is-the-yerkes-dodson-law.html)
- Also drawn on: CBT (Beck), REBT (Ellis), growth mindset (Dweck), self-efficacy (Bandura), transactional stress (Lazarus & Folkman), behavioral activation, implementation intentions (Gollwitzer), PERMA/broaden-build (Seligman, Fredrickson), social comparison (Festinger), expressive writing (Pennebaker).
