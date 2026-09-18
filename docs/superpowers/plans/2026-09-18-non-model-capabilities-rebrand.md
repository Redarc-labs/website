# Non-Model Capabilities Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild redarclabs.com around the field term "non-model capabilities", the five NeurIPS 2026 workshop papers, and an eight-module curriculum, with every fabricated entry removed.

**Architecture:** Astro static site. Content lives in markdown collections under `src/content/` validated by `src/content.config.ts`; page copy lives in `.astro` files under `src/pages/`. The homepage keeps its data-array-plus-template shape; only the arrays and the prose change. Layout, components, CSS, and nav are untouched.

**Tech Stack:** Astro 5, Tailwind v4, Zod content schemas, Node 26 via mise.

**Spec:** `docs/superpowers/specs/2026-09-18-non-model-capabilities-rebrand-design.md`

## Global Constraints

- Build command (the only automated check): `cd /home/manan/Projects/website && mise exec node@26.7.0 -- npm run build`. If `node_modules/.bin/astro` is missing, first run `mise exec node@26.7.0 -- npm install --ignore-scripts`. Do not run `astro check` (needs dev deps the project does not have). Do not add dependencies.
- Work on branch `rebrand/non-model-capabilities`, never on `main`. Task 1 creates it.
- `.astro/` and `.wrangler/` are tracked despite being in `.gitignore` and change on every build. Never `git add` them; every commit step names its files explicitly.
- Confidential: never write "SAFL", "Secure AI Futures Lab", "Delhi", a cohort date, or a link to `github.com/Manan-Wadhwa/mech_interp-notebooks` anywhere under `src/`.
- Words that must not appear under `src/` after this plan: "actively non-cooperative", "non-cooperative", "intersection nobody", "no dedicated institution", "until now", "survives adversarial pressure", "holds up under adversarial pressure", "safety layer holds", "example.com", "Placeholder", "Getting in SHAPe", "deflection vector".
- Copy rules for every rewritten sentence: no em-dashes; no "from X to Y" journey frames; no bold-label-plus-dash list items; no absolutes ("only", "never", "nobody", "no prior paper") without a link beside them; each site-wide claim appears once; numbers appear only where the paper states them.
- Author marker: `*` after a name means co-first author. Render the footnote wherever the marker appears.
- The definition paragraph in spec section 2.1 appears verbatim only in the homepage hero sub-line and the JSON-LD; other pages reference it in a clause.

---

## File Structure

| Path | Responsibility | Action |
|---|---|---|
| `src/content.config.ts` | Zod schemas for the four collections | Modify (optional dates, `status`, `order`, `milestone`) |
| `src/content/curriculum/0[1-8]-*.md` | Eight modules | Create; delete the three old files |
| `src/content/workshops/cohort-0[12]*.md` | Two cohort entries | Create; delete the two old files |
| `src/content/talks/*.md` | Two real talks | Create; delete the two old files |
| `src/content/research-log/week-0[1-3]-*.md` | Three draft placeholders | Rewrite in place |
| `src/pages/curriculum/index.astro`, `[...slug].astro` | Curriculum list and module page | Modify copy, show milestone |
| `src/pages/workshops/index.astro`, `[...slug].astro` | Workshop list and page | Modify for optional date and status |
| `src/pages/talks.astro` | Talks list | Modify for optional date and venue |
| `src/pages/research-log/index.astro` | Log list | Modify copy and empty state |
| `src/pages/community.astro` | Hub | Modify copy |
| `src/pages/index.astro` | Homepage | Modify data block and template |
| `src/layouts/Base.astro` | JSON-LD | Modify one string |
| `src/components/Footer.astro` | Slogan | Modify one line |
| `README.md` | Project structure | Modify the tree |

---

### Task 1: Branch and content schemas

**Files:**
- Modify: `src/content.config.ts`

**Interfaces:**
- Produces: `talks` schema with `date` and `venue` optional and `order: number` (default 0); `workshops` schema with `date` optional, `status: 'completed' | 'upcoming'` (default `'completed'`), `order: number` (default 0); `curriculum` schema with `milestone?: string`. Later tasks' content files and templates rely on exactly these names.

- [ ] **Step 1: Create the branch**

```bash
cd /home/manan/Projects/website
git checkout -b rebrand/non-model-capabilities
```

- [ ] **Step 2: Confirm the toolchain builds the current site**

Run: `mise exec node@26.7.0 -- npm run build 2>&1 | tail -3`
Expected: last lines contain `[build] Complete!`. If `astro: command not found`, run `mise exec node@26.7.0 -- npm install --ignore-scripts` and retry.

- [ ] **Step 3: Replace `src/content.config.ts`**

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Community content. One markdown file per entry; add a file, no code change.
// `draft: true` hides an entry from the live site (still buildable locally).
// `order` breaks ties and orders undated entries (lower first).

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    venue: z.string().optional(),
    location: z.string().optional(),
    speaker: z.string().optional(),
    order: z.number().default(0),
    tags: z.array(z.string()).default([]),
    slides: z.string().url().optional(),
    video: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const workshops = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/workshops' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    status: z.enum(['completed', 'upcoming']).default('completed'),
    cohort: z.string().optional(),
    format: z.string().optional(),
    location: z.string().optional(),
    order: z.number().default(0),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    materials: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const curriculum = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/curriculum' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
    summary: z.string(),
    duration: z.string().optional(),
    milestone: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const researchLog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research-log' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    week: z.string().optional(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { talks, workshops, curriculum, researchLog };
```

- [ ] **Step 4: Build**

Run: `mise exec node@26.7.0 -- npm run build 2>&1 | tail -3`
Expected: `[build] Complete!`. The old content still validates because every new field is optional or defaulted. (The old templates still call `.valueOf()` on dates that are present, so nothing breaks yet; Tasks 4 and 5 fix the templates before removing dates.)

- [ ] **Step 5: Commit**

```bash
git add src/content.config.ts
git commit -m "feat(content): optional dates, workshop status, curriculum milestone"
```

---

### Task 2: Curriculum content, eight modules

**Files:**
- Delete: `src/content/curriculum/01-foundations.md`, `src/content/curriculum/02-steering-and-control.md`, `src/content/curriculum/03-adversarial-settings.md`
- Create: `src/content/curriculum/01-why-did-it-say-that.md` through `src/content/curriculum/08-why-is-your-work-cool.md`

**Interfaces:**
- Consumes: `curriculum` schema from Task 1 (`title`, `order`, `summary`, `duration`, `milestone`, `tags`).
- Produces: eight entries with ids `01-why-did-it-say-that` … `08-why-is-your-work-cool`; Task 3's index page sorts by `order`.

- [ ] **Step 1: Delete the placeholder modules**

```bash
git rm src/content/curriculum/01-foundations.md src/content/curriculum/02-steering-and-control.md src/content/curriculum/03-adversarial-settings.md
```

- [ ] **Step 2: Create `src/content/curriculum/01-why-did-it-say-that.md`**

```markdown
---
title: "Why did it say that?"
order: 1
duration: "90 minutes"
milestone: "Teams formed, two or three candidate concepts"
summary: "Open a language model, watch it assemble an answer layer by layer, then check whether it does the same thing for Hindi as it does for French."
tags: ["hooks", "logit lens", "residual stream"]
draft: false
---

You write a forward hook by hand, capture the residual stream after every layer, and decode each capture with the model's own output head. The answer is assembled across layers, not looked up in one place, and you can watch it happen. The same hook, with one line changed, overwrites a layer's output instead of reading it. Observation and intervention are the same mechanism, which is why the course teaches hooks before anything else.

Then you swap to a multilingual model and ask whether a translation prompt between two non-English languages passes through English in the middle layers. Your team runs the experiment on an Indian language pair. The session ends with three alternative explanations for whatever you saw, all of them still live.

### What you will do

- Write a forward hook, register it, and remove it. A forgotten hook silently corrupts every later cell.
- Capture the residual stream at all twelve layers of GPT-2 and decode each with the final norm and output head.
- Find the layer where the correct answer first reaches rank one and stays there.
- Repeat the pivot-language experiment on a language pair of your choice and log the result, positive or negative.

### What you leave with

- Two helper functions that find the blocks and the final norm on any Hugging Face model, so nothing you wrote tonight depends on GPT-2.
- A striking observation and three reasons not to believe it yet.
- A team, and two or three concepts one of you could study for the rest of the course.

### Materials

Notebooks and slides are released to each cohort at the start of the session.
```

- [ ] **Step 3: Create `src/content/curriculum/02-make-it-say-something-else.md`**

```markdown
---
title: "Make it say something else"
order: 2
duration: "90 minutes"
milestone: "Ten to twenty contrastive pairs and one steering demo"
summary: "Change what a model says by adding one vector to its residual stream, then measure what that change cost."
tags: ["steering", "contrastive pairs", "working range"]
draft: false
---

Last week you watched a model assemble an answer. Tonight you reach in and change the answer, not by fine-tuning and not by prompting, but by adding a single direction to the residual stream at generation time. You build that direction from pairs of prompts that differ in one property and almost nothing else, and you check that the pairs agree on a direction before you trust it. A garbage vector still produces some change when you scale it up, and nothing downstream will warn you.

The second half is the part that makes this research rather than a party trick. Any intervention strong enough to change behaviour is strong enough to damage the model. You sweep the scale, measure the on-target effect and the fluency cost on the same sweep, and plot them as two panels, never as two y-axes. The result you report is a working range, not a single lucky coefficient.

### What you will do

- Write twelve contrastive pairs for a property your team cares about and compute the mean-difference direction at a middle layer.
- Check pairwise cosine across the pairs before using the direction.
- Register a hook that adds the direction at every generation step and sweep the scale.
- Measure the logit-difference effect and a fluency score across the same sweep.

### What you leave with

- A steering vector with a measured working range and a plot a reviewer would accept.
- A first draft of your team's contrastive pair set.
- The reason steering works best in the middle of the stack, and what the two failure modes at the ends look like.

### Materials

Notebooks and slides are released to each cohort at the start of the session.
```

- [ ] **Step 4: Create `src/content/curriculum/03-prove-it.md`**

```markdown
---
title: "Prove it"
order: 3
duration: "90 minutes"
milestone: "Versioned eval set, baseline number, repository"
summary: "Turn last week's number into a measurement: a versioned eval set, a baseline, and the controls that decide whether your explanation is wrong."
tags: ["evaluation", "controls", "model-written evals"]
draft: false
---

Last week you made a model behave differently and measured the change. Tonight you find out whether that measurement meant anything. An eval is not a test the model passes or fails. It is an instrument you point at a model to produce a number, and like any instrument it has a unit, a noise floor, and failure modes you are responsible for knowing.

You build a small hand-written cloze set and read the per-item output, not the headline. Then you add the controls: a random direction of the same norm, and a direction built from shuffled pairs. The gap between your real direction and those controls is your entire result. The session closes with model-written evals at volume, where the model generates candidates and a human decides what counts, and the documented biases of using a strong model as a judge.

### What you will do

- Write a ten-item cloze set with a template, a list of subject and answer pairs, and a scorer.
- Separate the items the model gets wrong because it does not know the fact from the ones it gets wrong for other reasons.
- Run the random-direction and shuffled-pair controls on the same sweep as the real direction.
- Generate candidate items at volume, filter them mechanically, then adjudicate by hand.

### What you leave with

- A versioned eval set with a baseline number and per-item rows, saved with the model name, seed, and item count.
- A repository your team will use for the rest of the course.
- A rule you will keep: if the eval changed, you cannot interpret a change in the model.

### Materials

Notebooks and slides are released to each cohort at the start of the session.
```

- [ ] **Step 5: Create `src/content/curriculum/04-where-does-it-actually-happen.md`**

```markdown
---
title: "Where does it actually happen?"
order: 4
duration: "90 minutes"
milestone: "Patching heatmap for your concept, draft started"
summary: "Activation patching: copy one site between a clean and a corrupted run and find where the output actually depends on it."
tags: ["activation patching", "causal evidence", "attribution patching"]
draft: false
---

Three weeks of watching. Tonight you get the tool that turns watching into evidence. In week one you saw English states appear mid-stack and could not say whether the model used them. Observation cannot rule that out. Patching can: run a clean prompt and a corrupted one, copy the activation at a single layer and position from clean into corrupted, and measure how much of the clean answer comes back.

The work is in designing the corrupted prompt, which has to differ from the clean one in the thing you are studying and nothing else. You sweep every layer and position, plot the recovery fraction as a signed heatmap, and learn to read the three shapes that recur. Then you learn what patching does not tell you, because it is the strongest cheap evidence in the course and it is routinely over-claimed.

### What you will do

- Design a clean and corrupted prompt pair for your concept that tokenises to the same length.
- Implement the logit-difference metric and the recovery fraction.
- Patch one site, then sweep the whole map.
- Run attribution patching as a cheap approximation and compare it to the full sweep.

### What you leave with

- A patching heatmap for your own concept and a sentence describing what it does and does not show.
- The start of your write-up: the question, the pair, and the figure.

### Materials

Notebooks and slides are released to each cohort at the start of the session.
```

- [ ] **Step 6: Create `src/content/curriculum/05-what-can-you-read-off-a-vector.md`**

```markdown
---
title: "What can you read off a vector?"
order: 5
duration: "90 minutes"
milestone: "Probe with a control-task baseline"
summary: "Train a classifier on activations, get a high number, and learn why that number on its own proves almost nothing."
tags: ["probes", "control tasks", "representation geometry"]
draft: false
---

A probe is the simplest thing it could be: the residual stream at one layer as a feature vector, and a logistic regression that predicts a label you care about. It is also the cheapest runtime classifier you will ever deploy. Tonight you train one, get an accuracy that looks convincing, and then run the experiment that should change how you read every probing paper you see afterwards: the control task, where the same probe is trained to predict labels that carry no structure.

The second half is about what the probe direction is. A probe tells you the information is decodable along a direction. Week two gave you a way to ask whether the model uses that direction. You put the two together and test whether the probe direction is causal, which is the reason probes are taught in week five rather than week two.

### What you will do

- Split before fitting, with a fixed seed, so two teams can compare.
- Train a probe at every layer and plot accuracy through the stack.
- Train the control task and plot the difference, which is the panel that says whether anything was learned.
- Project activations to two dimensions and write the caption every PCA plot needs.
- Steer along the probe direction and measure whether behaviour moves.

### What you leave with

- A probe for your concept with a control-task baseline on the same plot.
- A causal test of the probe direction, positive or negative.

### Materials

Notebooks and slides are released to each cohort at the start of the session.
```

- [ ] **Step 7: Create `src/content/curriculum/06-attack-the-figure.md`**

```markdown
---
title: "Attack the figure"
order: 6
duration: "120 minutes"
milestone: "The figure that becomes Figure 1"
summary: "Each team projects its best figure and the room takes it apart. Then you rebuild it to a spec a reviewer would accept."
tags: ["figures", "triangulation", "seeds"]
draft: false
---

Two hours, in two halves. First half, laptops closed. Each team projects its best figure and the room asks three questions, every time: what is the control, what is the confound, what would falsify this. Everything visible in a figure asserts something. The assertions you made on purpose are usually fine. The ones you made by default are where figures go wrong.

Second half, you rebuild the figure the room attacked. The house spec is broadly what a reviewer expects: an interval on every estimate, the control on the plot rather than in the text, direct labels at the line ends, a title that states the finding and carries the sample size. Then you make it harder to attack by triangulating: the same measurement across seeds, then across a second model.

### What you will do

- Present your figure and take notes on every question you could not answer.
- Rebuild it against the checklist, literally.
- Wrap your measurement in a function of the seed and make sure the seed reaches everything random in it.
- Re-run on a second model. Everything you wrote in weeks one to five is already model-agnostic.

### What you leave with

- The figure that becomes Figure 1 of your write-up.
- An interval on your main result, and a second model that either agrees or does not.

### Materials

Notebooks and slides are released to each cohort at the start of the session.
```

- [ ] **Step 8: Create `src/content/curriculum/07-make-it-survive-review.md`**

```markdown
---
title: "Make it survive review"
order: 7
duration: "90 minutes"
milestone: "Introduction and methods draft, plus a review of another team's draft"
summary: "You have a figure. Tonight you find out whether you have a paper."
tags: ["writing", "peer review", "methods"]
draft: false
---

No model tonight. The notebook works on your repository. A reviewer reads a paper looking for the load points, the sentences the conclusion rests on, and asks four questions of each: what is the number, what is the interval, what is the control, what would have falsified it. A sentence written from the impression of a plot, with no number ever extracted from it, is how over-claims get into papers without anyone being dishonest.

You learn the five-move shape most good short papers follow, generate the methods section from the artifacts you saved in week three rather than from memory, and spend half the session reviewing another team's draft. Reading someone else's draft as a reviewer is the fastest way anyone has found to learn what a claim needs.

### What you will do

- Mark the load-bearing sentences in your own draft and answer the four questions for each.
- Write the question in one sentence a non-specialist could repeat back to you.
- Generate the methods section from your saved eval JSON, model name, seed, and item counts.
- Review another team's draft and return the four questions they could not answer.

### What you leave with

- An introduction and methods draft.
- A written review of another team's work, and one of yours.

### Materials

Notebooks and slides are released to each cohort at the start of the session.
```

- [ ] **Step 9: Create `src/content/curriculum/08-why-is-your-work-cool.md`**

```markdown
---
title: "Why is your work cool?"
order: 8
duration: "120 minutes"
milestone: "Talk delivered, venue and date set for the write-up"
summary: "Each team gives the talk. The milestone is a venue and a date for the write-up, not applause."
tags: ["demo day", "talks", "submission"]
draft: false
---

Every team gives a short talk on its result. The audience is the other teams and invited guests, and the standard is the one the course has used all along: the question in one sentence, the number with its interval, the control on the plot, and what would have falsified it. A careful negative result presented well is a success, and at least one team usually has one.

The session ends with each team naming where the write-up goes next and when. A workshop deadline, a blog post with a date, or a preprint. The course continues as an asynchronous writing tail for teams that commit to a venue.

### What you will do

- Give a ten-minute talk with the figure from week six and the claims from week seven.
- Take questions from the room and record the ones you could not answer.
- Choose a venue and a date for the write-up.

### What you leave with

- A talk you have given once and can give again.
- A commitment: venue, date, and the list of what the draft still needs.

### Materials

Notebooks and slides are released to each cohort at the start of the session.
```

- [ ] **Step 10: Check the forbidden terms and build**

Run:
```bash
grep -rniE 'safl|secure ai futures|delhi|placeholder|github.com/Manan-Wadhwa/mech|nobody has published|—' src/content/curriculum/ ; echo "grep exit: $?"
mise exec node@26.7.0 -- npm run build 2>&1 | grep -E 'curriculum/|Complete!'
```
Expected: grep prints nothing and `grep exit: 1`. Build lists eight `/curriculum/0N-.../index.html` lines and `[build] Complete!`.

- [ ] **Step 11: Commit**

```bash
git add src/content/curriculum
git commit -m "feat(curriculum): eight modules replace the three placeholders"
```

---

### Task 3: Curriculum pages

**Files:**
- Modify: `src/pages/curriculum/index.astro:9-27`
- Modify: `src/pages/curriculum/[...slug].astro:13-29`

**Interfaces:**
- Consumes: `milestone` from the Task 1 schema.

- [ ] **Step 1: Replace the `<Base ...>` props and intro paragraph in `src/pages/curriculum/index.astro`**

Replace lines 9 to 27 (from `<Base` through the closing `</p>` of the intro) with:

```astro
<Base
  title="Curriculum · Redarc Labs"
  description="An eight-session interpretability curriculum. Every session is code against a live model, hooks are written by hand, and a careful negative result counts as a success."
  ogDescription="Eight sessions of hands-on interpretability, each one code against a live model."
  keywords="interpretability curriculum, mechanistic interpretability course, AI safety syllabus, activation patching, probes"
>
  <main>
    <section class="sec">
      <div class="container-site">
        <div class="grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-16">
          <div>
            <a href="/community" class="nav-a">← Community</a>
            <span class="eyebrow">Curriculum</span>
            <h2 class="h2">Curriculum</h2>
          </div>
          <div>
            <p>
              Eight sessions, each one code against a live model. There is no interpretability library in the stack: hooks are written by hand so everything runs unchanged in a work repository afterwards. The rule stated in week one and repeated weekly is that a rigorous investigation with a careful negative result is a success.
            </p>
```

- [ ] **Step 2: Show the milestone on each row in the index**

In `src/pages/curriculum/index.astro`, directly after the line `<p>{m.data.summary}</p>` (inside the `modules.map` row), add:

```astro
                    {m.data.milestone && (
                      <p style="font-family: var(--font-mono); font-size: 0.625rem; color: var(--color-ink-muted); letter-spacing: 0.04em; margin: 0.25rem 0 0 0;">Milestone · {m.data.milestone}</p>
                    )}
```

- [ ] **Step 3: Show the milestone on the module page**

In `src/pages/curriculum/[...slug].astro`, change the `<Base` title line to:

```astro
  title={`${entry.data.title} · Curriculum · Redarc Labs`}
```

and directly after `<p>{entry.data.summary}</p>` add:

```astro
        {entry.data.milestone && (
          <p style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-ink-muted); letter-spacing: 0.04em;">Milestone · {entry.data.milestone}</p>
        )}
```

- [ ] **Step 4: Build and inspect**

Run:
```bash
mise exec node@26.7.0 -- npm run build 2>&1 | grep -E 'error|Complete!'
grep -c 'Milestone ·' dist/client/curriculum/index.html
grep -o 'The course we wish existed' dist/client/curriculum/index.html; echo "old copy present: $?"
```
Expected: `[build] Complete!`, count `8`, and `old copy present: 1`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/curriculum
git commit -m "feat(curriculum): new intro copy, show session milestones"
```

---

### Task 4: Workshops content and pages

**Files:**
- Delete: `src/content/workshops/cohort-01-intro-adversarial-interp.md`, `src/content/workshops/cohort-02-deception-detection.md`
- Create: `src/content/workshops/cohort-01.md`, `src/content/workshops/cohort-02.md`
- Modify: `src/pages/workshops/index.astro`, `src/pages/workshops/[...slug].astro`

**Interfaces:**
- Consumes: `status`, `order`, optional `date` from Task 1.
- Produces: workshop ids `cohort-01` and `cohort-02`; the homepage (Task 8) links paper cards to `/workshops/cohort-01`.

- [ ] **Step 1: Delete the fabricated entries**

```bash
git rm src/content/workshops/cohort-01-intro-adversarial-interp.md src/content/workshops/cohort-02-deception-detection.md
```

- [ ] **Step 2: Create `src/content/workshops/cohort-01.md`**

```markdown
---
title: "Model internals, cohort 01"
cohort: "Cohort 01"
format: "Online"
status: completed
order: 1
summary: "The first cohort ran the eight-session curriculum online. Two team projects became NeurIPS 2026 workshop submissions."
tags: ["cohort", "online", "eight sessions"]
draft: false
---

The first cohort ran the full curriculum remotely: eight sessions, each one code against a live model, with teams formed in week one and a talk delivered in week eight. Participants wrote their own hooks, built a versioned eval set with controls, produced a patching map and a probe with a control-task baseline for a concept of their choosing, and rebuilt their main figure after the room attacked it.

### Week by week

1. Why did it say that? Teams formed, two or three candidate concepts.
2. Make it say something else. Ten to twenty contrastive pairs and one steering demo.
3. Prove it. Versioned eval set, baseline, repository.
4. Where does it actually happen? Patching heatmap, draft started.
5. What can you read off a vector? Probe with a control-task baseline.
6. Attack the figure. The figure that becomes Figure 1.
7. Make it survive review. Introduction and methods draft.
8. Why is your work cool? Talk delivered, venue and date set.

### What came out of it

Two team projects continued past week eight and are now under review at NeurIPS 2026 workshops, with the participants as authors.

- [Doubt Is a Decision: A Sparse Circuit Commits Language Models to "I Don't Know"](/#publications). Sheryl Mehta, Shagun Chadha, and Kanika Singhal, co-first authors, with Manan Wadhwa and Shivam Dubey.
- [Steered Affect Moves a Partner Agent's Activations, and the Logistic Probe That Reads It Returns a Tie-Break, Not an Estimate](/#publications). Debojeet Ghosh, Shreyansh Kumar, and Ayushman Garg, with Manan Wadhwa and Shivam Dubey, co-first authors.
```

- [ ] **Step 3: Create `src/content/workshops/cohort-02.md`**

```markdown
---
title: "Model internals, cohort 02"
cohort: "Cohort 02"
status: upcoming
order: 2
summary: "Eight sessions, ninety minutes each, code against a live model in every one. Applications are announced on the lab's LinkedIn."
tags: ["cohort", "eight sessions", "upcoming"]
draft: false
---

The second cohort runs the same eight-session curriculum. Sessions six and eight run two hours. Everything runs on a free Colab GPU, and on a laptop CPU more slowly. The stack is `transformers`, `torch`, `scikit-learn`, and `matplotlib`, with no interpretability library and nothing to register for.

### Who it is for

People who can write Python and want to do a small, real piece of interpretability research with a team, end to end, in eight weeks. No prior interpretability experience is assumed. Week one starts from a forward hook.

### What you ship by week eight

- A versioned eval set with a baseline and controls for a concept your team chose.
- A patching map and a probe with a control-task baseline for that concept.
- One figure rebuilt to a reviewer's standard, with an interval and a second model.
- An introduction and methods draft, and a ten-minute talk you have given once.

### Applications

Announced on the [Redarc Labs LinkedIn page](https://www.linkedin.com/company/redarc-labs/).
```

- [ ] **Step 4: Replace `src/pages/workshops/index.astro` entirely**

```astro
---
import Base from '../../layouts/Base.astro';
import { getCollection } from 'astro:content';
import { formatDate } from '../../lib/date';

// Upcoming first, then completed; within each group by `order`, then newest date.
const workshops = (await getCollection('workshops', ({ data }) => !data.draft)).sort((a, b) => {
  if (a.data.status !== b.data.status) return a.data.status === 'upcoming' ? -1 : 1;
  if (a.data.order !== b.data.order) return a.data.order - b.data.order;
  return (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0);
});
---
<Base
  title="Workshops · Redarc Labs"
  description="Cohorts that run the eight-session model internals curriculum: what each cohort did, and what came out of it."
  ogDescription="Cohorts running the eight-session model internals curriculum."
  keywords="interpretability workshop, AI safety cohort, mechanistic interpretability training"
>
  <main>
    <section class="sec">
      <div class="container-site">
        <div class="grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-16">
          <div>
            <a href="/community" class="nav-a">← Community</a>
            <span class="eyebrow">Workshops</span>
            <h2 class="h2">Cohorts</h2>
          </div>
          <div>
            <p>
              Each cohort runs the curriculum with a team per concept and a talk at the end. Materials go to participants at the start of each session.
            </p>

            {workshops.length === 0 ? (
              <p>No cohorts announced yet.</p>
            ) : (
              workshops.map((w, i) => (
                <a href={`/workshops/${w.id}`} class="repo-row" style={`flex-direction: column; align-items: flex-start; gap: 0.6rem; margin-bottom: ${i === workshops.length - 1 ? '0' : '0.75rem'};`}>
                  <div style="display: flex; gap: 0.75rem; align-items: baseline; flex-wrap: wrap; font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-ink-muted);">
                    <span style={w.data.status === 'upcoming' ? 'color: var(--color-red); font-weight: 700;' : ''}>{w.data.status === 'upcoming' ? 'Upcoming' : 'Completed'}</span>
                    {w.data.date && <span>{formatDate(w.data.date)}</span>}
                    {w.data.cohort && <span>{w.data.cohort}</span>}
                    {w.data.format && <span>{w.data.format}</span>}
                  </div>
                  <h3 class="h3">{w.data.title}</h3>
                  <p>{w.data.summary}</p>
                  {w.data.tags.length > 0 && (
                    <div class="flex flex-wrap gap-2">
                      {w.data.tags.map(tag => <span class="tag">{tag}</span>)}
                    </div>
                  )}
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  </main>
</Base>
```

- [ ] **Step 5: Update `src/pages/workshops/[...slug].astro` for the optional date and status**

Replace lines 13 to 23 (the `meta` constant and the `<Base` opening through its closing `>`) with:

```astro
const meta = [
  entry.data.status === 'upcoming' ? 'Upcoming' : 'Completed',
  entry.data.date ? formatDate(entry.data.date) : undefined,
  entry.data.cohort,
  entry.data.format,
  entry.data.location,
].filter(Boolean);
---
<Base
  title={`${entry.data.title} · Workshops · Redarc Labs`}
  description={entry.data.summary}
>
```

and change the eyebrow line `<span class="eyebrow">Workshop</span>` to `<span class="eyebrow">Cohort</span>`.

- [ ] **Step 6: Build and check**

Run:
```bash
mise exec node@26.7.0 -- npm run build 2>&1 | grep -E 'error|workshops/|Complete!'
grep -rniE 'example\.com|placeholder|deflection|delhi|safl' src/content/workshops/; echo "grep exit: $?"
grep -o 'Upcoming' dist/client/workshops/index.html | head -1
```
Expected: build lists `/workshops/cohort-01/` and `/workshops/cohort-02/` and completes; `grep exit: 1`; `Upcoming` printed once.

- [ ] **Step 7: Commit**

```bash
git add src/content/workshops src/pages/workshops
git commit -m "feat(workshops): real cohort 01 and upcoming cohort 02 replace fabricated entries"
```

---

### Task 5: Talks content and page

**Files:**
- Delete: `src/content/talks/adversarial-interp-neurips-socal.md`, `src/content/talks/deflection-vectors-guest-lecture.md`
- Create: `src/content/talks/you-are-not-behind.md`, `src/content/talks/intro-to-technical-ai-safety.md`
- Modify: `src/pages/talks.astro`

**Interfaces:**
- Consumes: optional `date`, optional `venue`, `order` from Task 1.

- [ ] **Step 1: Delete the fabricated talks**

```bash
git rm src/content/talks/adversarial-interp-neurips-socal.md src/content/talks/deflection-vectors-guest-lecture.md
```

- [ ] **Step 2: Create `src/content/talks/you-are-not-behind.md`**

```markdown
---
title: "You Are Not Behind"
speaker: "Manan Wadhwa"
order: 1
tags: ["students", "getting started", "AI safety careers"]
draft: false
---

How to start doing real AI research before anybody gives you permission. A talk for students who want to work on AI safety and think they arrived late. It argues from the field's own numbers that no one has a head start: the safety literature is still small enough to read in a semester, the subfield someone spent a PhD on can stop mattering in eighteen months, and the field cannot reliably label its own papers. The speaker's own timeline, rejections included, is the case study. The bottleneck turned out to be sending the application, not the college, the CGPA, or the GPU.
```

- [ ] **Step 3: Create `src/content/talks/intro-to-technical-ai-safety.md`**

```markdown
---
title: "Intro to Technical AI Safety"
order: 2
tags: ["AI safety", "overview"]
draft: false
---

An introduction to technical AI safety for a technical audience new to the field: what the open problems are, which of them can be worked on today with open models and a laptop, and where the people who do this work publish and meet.
```

- [ ] **Step 4: Replace `src/pages/talks.astro` entirely**

```astro
---
import Base from '../layouts/Base.astro';
import { getCollection, render } from 'astro:content';
import { formatDate } from '../lib/date';

// By `order`, then newest date first; undated entries keep their `order` position.
const talks = (await getCollection('talks', ({ data }) => !data.draft)).sort((a, b) => {
  if (a.data.order !== b.data.order) return a.data.order - b.data.order;
  return (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0);
});

const linkStyle =
  'font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-ink); text-decoration: none; border-bottom: 1px solid var(--color-rule-strong); padding-bottom: 1px; transition: border-color 120ms;';
---
<Base
  title="Talks · Redarc Labs"
  description="Talks from Redarc Labs on getting started in AI safety research and on what the lab studies. Slides and recordings are linked where they are public."
  ogDescription="Talks from Redarc Labs."
  keywords="AI safety talks, interpretability lectures, technical AI safety introduction"
>
  <main>
    <section class="sec">
      <div class="container-site">
        <div class="grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-16">
          <div>
            <a href="/community" class="nav-a">← Community</a>
            <span class="eyebrow">Talks</span>
            <h2 class="h2">Talks</h2>
          </div>
          <div>
            <p>
              Talks given by the lab. Slides and recordings are linked where they are public.
            </p>

            {talks.length === 0 ? (
              <p>No talks published yet.</p>
            ) : (
              talks.map(async (t, i) => {
                const { Content } = await render(t);
                const meta = [
                  t.data.date ? formatDate(t.data.date) : undefined,
                  t.data.venue,
                  t.data.location,
                ].filter(Boolean);
                return (
                <div style={`padding-block: 1.75rem; border-top: 1px solid var(--color-rule); ${i === talks.length - 1 ? 'border-bottom: 1px solid var(--color-rule);' : ''}`}>
                  {meta.length > 0 && (
                    <div style="font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-ink-muted); margin-bottom: 0.375rem;">
                      {meta.join(' · ')}
                    </div>
                  )}
                  <h3 class="h3">{t.data.title}</h3>
                  {t.data.speaker && (
                    <p style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-ink-muted); margin-bottom: 0.625rem;">{t.data.speaker}</p>
                  )}
                  <div class="prose" style="font-size: 0.8125rem; color: var(--color-ink-sec); line-height: 1.6; margin-bottom: 0.75rem;">
                    <Content />
                  </div>
                  {t.data.tags.length > 0 && (
                    <div class="flex flex-wrap gap-2">
                      {t.data.tags.map(tag => <span class="tag">{tag}</span>)}
                    </div>
                  )}
                  <div class="flex flex-wrap gap-4">
                    {t.data.slides && (
                      <a href={t.data.slides} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 link-paper" style={linkStyle}>
                        Slides <svg class="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2 12L12 2M12 2H5M12 2v7" /></svg>
                      </a>
                    )}
                    {t.data.video && (
                      <a href={t.data.video} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 link-paper" style={linkStyle}>
                        Recording <svg class="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2 12L12 2M12 2H5M12 2v7" /></svg>
                      </a>
                    )}
                  </div>
                </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  </main>
</Base>
```

Note for the implementer: Astro renders arrays of promises, so an async callback inside `.map` is supported. If the build still rejects it, hoist the rendering into the frontmatter: `const rendered = await Promise.all(talks.map(async t => ({ t, Content: (await render(t)).Content })));` and map over `rendered` in the template.

- [ ] **Step 5: Build and check**

Run:
```bash
mise exec node@26.7.0 -- npm run build 2>&1 | grep -E 'error|talks|Complete!'
grep -c 'You Are Not Behind' dist/client/talks/index.html
grep -o 'before anybody gives you permission' dist/client/talks/index.html | head -1
grep -rniE 'example\.com|placeholder|non-cooperative' src/content/talks/; echo "grep exit: $?"
```
Expected: build completes; count `1` or more; the phrase prints (proves the body rendered); `grep exit: 1`.

- [ ] **Step 6: Commit**

```bash
git add src/content/talks src/pages/talks.astro
git commit -m "feat(talks): two real talks, render body as overview, optional venue and date"
```

---

### Task 6: Research log placeholders

**Files:**
- Modify: `src/content/research-log/week-01-foundations.md`, `week-02-sparse-autoencoders.md`, `week-03-adversarial-robustness.md` (rewrite in place; keep filenames)
- Modify: `src/pages/research-log/index.astro:10-31`

**Interfaces:**
- Consumes: `researchLog` schema (unchanged). Entries with `draft: true` are excluded by the existing `!data.draft` filter, so the production list is empty until real notes arrive.

- [ ] **Step 1: Rewrite `src/content/research-log/week-01-foundations.md`**

```markdown
---
title: "Why did it say that?"
week: "Week 1"
date: 2026-06-01
summary: "Hooks written by hand, a logit lens on GPT-2, and the pivot-language experiment on an Indian language pair."
tags: ["hooks", "logit lens"]
draft: true
---

*Notes from this week are posted after the session.*
```

- [ ] **Step 2: Rewrite `src/content/research-log/week-02-sparse-autoencoders.md`**

```markdown
---
title: "Make it say something else"
week: "Week 2"
date: 2026-06-08
summary: "Contrastive pairs, a steering vector, and the sweep that finds its working range."
tags: ["steering"]
draft: true
---

*Notes from this week are posted after the session.*
```

- [ ] **Step 3: Rewrite `src/content/research-log/week-03-adversarial-robustness.md`**

```markdown
---
title: "Prove it"
week: "Week 3"
date: 2026-06-15
summary: "A versioned eval set, a baseline, and the random and shuffled controls run on the same sweep."
tags: ["evaluation", "controls"]
draft: true
---

*Notes from this week are posted after the session.*
```

- [ ] **Step 4: Replace lines 10 to 31 of `src/pages/research-log/index.astro`** (from `<Base` through the empty-state `<p>`) with:

```astro
<Base
  title="Research log · Redarc Labs"
  description="Weekly notes from the current cohort: what was tried, what worked, and what did not."
  ogDescription="Weekly notes from the current cohort."
  keywords="AI safety research log, interpretability weekly notes, research community"
>
  <main>
    <section class="sec">
      <div class="container-site">
        <div class="grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-16">
          <div>
            <a href="/community" class="nav-a">← Community</a>
            <span class="eyebrow">Research log</span>
            <h2 class="h2">Weekly notes</h2>
          </div>
          <div>
            <p>
              Notes from each session of the current cohort, newest first. Negative results go in too.
            </p>

            {entries.length === 0 ? (
              <p>Notes are posted weekly while a cohort is running.</p>
```

- [ ] **Step 5: Change the slug page title separator**

In `src/pages/research-log/[...slug].astro`, change the `<Base` title to:

```astro
  title={`${entry.data.title} · Research log · Redarc Labs`}
```

- [ ] **Step 6: Build and check**

Run:
```bash
mise exec node@26.7.0 -- npm run build 2>&1 | grep -E 'error|research-log|Complete!'
grep -o 'Notes are posted weekly' dist/client/research-log/index.html | head -1
```
Expected: build completes, no `/research-log/week-…` pages are emitted, and the empty-state sentence prints.

- [ ] **Step 7: Commit**

```bash
git add src/content/research-log src/pages/research-log
git commit -m "feat(research-log): draft placeholders matching the curriculum, honest empty state"
```

---

### Task 7: Community hub copy

**Files:**
- Modify: `src/pages/community.astro:12-64`

- [ ] **Step 1: Replace the `cards` array (lines 12 to 41)**

```ts
const cards = [
  {
    href: '/curriculum',
    eyebrow: 'Curriculum',
    title: 'Eight sessions',
    desc: 'Code against a live model every week, hooks written by hand, a talk at the end.',
    count: `${curriculum.length} module${curriculum.length === 1 ? '' : 's'}`,
  },
  {
    href: '/workshops',
    eyebrow: 'Workshops',
    title: 'Cohorts',
    desc: 'Who ran the curriculum, and what came out of it.',
    count: `${workshops.length} cohort${workshops.length === 1 ? '' : 's'}`,
  },
  {
    href: '/talks',
    eyebrow: 'Talks',
    title: 'Talks',
    desc: 'On getting started in AI safety research, and on what the lab studies.',
    count: `${talks.length} talk${talks.length === 1 ? '' : 's'}`,
  },
  {
    href: '/research-log',
    eyebrow: 'Research log',
    title: 'Weekly notes',
    desc: 'What the current cohort tried each week, including what did not work.',
    count: researchLog.length === 0 ? 'Posted during a cohort' : `${researchLog.length} ${researchLog.length === 1 ? 'entry' : 'entries'}`,
  },
];
```

- [ ] **Step 2: Replace the `<Base` props and the two intro paragraphs (lines 43 to 64)**

```astro
<Base
  title="Community · Redarc Labs"
  description="Redarc Labs teaches an eight-session interpretability curriculum and runs it with cohorts. The first cohort's projects became two NeurIPS 2026 workshop submissions."
  ogDescription="An eight-session interpretability curriculum, run with cohorts."
  keywords="interpretability curriculum, AI safety cohort, mechanistic interpretability teaching"
>
  <main>
    <section class="sec">
      <div class="container-site">
        <div class="grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-16">
          <div>
            <span class="eyebrow">Community</span>
            <h2 class="h2">Community</h2>
          </div>
          <div>
            <p>
              The lab teaches an eight-session curriculum and runs it with cohorts. Two projects from the first cohort are now under review at NeurIPS 2026 workshops, with the participants as authors.
            </p>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Build and check**

Run:
```bash
mise exec node@26.7.0 -- npm run build 2>&1 | grep -E 'error|Complete!'
grep -ciE 'no dedicated institution|the course we wish|actively non-cooperative' dist/client/community/index.html
```
Expected: `[build] Complete!` and count `0`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/community.astro
git commit -m "feat(community): hub copy under the new positioning"
```

---

### Task 8: Homepage data block

**Files:**
- Modify: `src/pages/index.astro:1-157` (the frontmatter between the `---` fences)

**Interfaces:**
- Produces, for Task 9's template: `pubs` (array of `{ year, venue, title, authors, finding, tags, href?, cohort?: boolean }`), `earlier` (array of `{ year, venue, title, authors, href, tags }`), `claims` (array of `{ n, claim, evidence, basis, direction?: boolean }`), `directions` (array of `{ id, title, body }`), `people` (unchanged shape), `collaborators` (array of strings).
- Removes: `repos`, `assumptions`, `orgs`, `pip`, `pipStyle`. Task 9 deletes the template blocks that used them; until Task 9 runs, the build will fail on the undefined names. Do Tasks 8 and 9 back to back without building in between.

- [ ] **Step 1: Replace everything between the opening `---` and the closing `---` at the top of `src/pages/index.astro`**

```ts
import Base from '../layouts/Base.astro';
import AnimatedLogo from '../components/AnimatedLogo.astro';

// Five papers under review at NeurIPS 2026 workshops. `href` is added when a
// preprint exists; a card without one renders "Preprint soon". `cohort: true`
// marks papers that came out of cohort 01.
const pubs = [
  {
    year: '2026',
    venue: 'TAE: Can We Trust AI Evaluation? · NeurIPS 2026',
    title: 'Known by Construction: Calibrating Model-State Instruments Against Models Whose State Was Installed, Hidden, or Never Present',
    authors: 'Manan Wadhwa*, Shivam Dubey*',
    finding: 'Seven instruments that claim to read a model\'s internal state were tested on models where the state was installed, hidden, or absent by construction. Every one read the prompt or the training history instead.',
    tags: ['Model organisms', 'Instrument calibration', 'Hidden objectives'],
  },
  {
    year: '2026',
    venue: 'Interpreting Agent Behavior · NeurIPS 2026',
    title: 'Steered Affect Moves a Partner Agent\'s Activations, and the Logistic Probe That Reads It Returns a Tie-Break, Not an Estimate',
    authors: 'Manan Wadhwa*, Shivam Dubey*, Debojeet Ghosh, Shreyansh Kumar, Ayushman Garg',
    finding: 'One agent\'s steered emotional state shows up in a second agent\'s activations. The standard probe used to read it is a tie-break, not a measurement, and the standard ablation control is too weak to notice.',
    tags: ['Multi-agent', 'Probe reliability', 'Steering'],
    cohort: true,
  },
  {
    year: '2026',
    venue: 'Interpretability as a Science · NeurIPS 2026',
    title: 'Distance to the Boundary Is Not Steering Resistance',
    authors: 'Manan Wadhwa*, Shivam Dubey*',
    finding: 'Fixed-dose steering audits rank aligned models as least controllable because the model\'s margin grew, not because the steering direction weakened.',
    tags: ['Steering audits', 'Post-training', 'Refusal'],
  },
  {
    year: '2026',
    venue: 'Interpretability as a Science · NeurIPS 2026',
    title: 'Dead Salmons Have a False-Positive Rate: A Calibrated Null-Model Test for Interpretability',
    authors: 'Manan Wadhwa*, Shivam Dubey*',
    finding: 'Probes, concept directions, and SAE feature selection report confident findings on networks that learned nothing. The shuffled-label control everyone runs does not catch it.',
    tags: ['Null models', 'False positives', 'SAEs'],
  },
  {
    year: '2026',
    venue: 'Interpretability as a Science · NeurIPS 2026',
    title: 'Doubt Is a Decision: A Sparse Circuit Commits Language Models to "I Don\'t Know"',
    authors: 'Sheryl Mehta*, Shagun Chadha*, Kanika Singhal*, Manan Wadhwa, Shivam Dubey',
    finding: 'The decision to hedge lives in a small set of heads and neurons. Correlation-selected "confidence neurons" fail causal tests against a random-neuron null.',
    tags: ['Circuits', 'Uncertainty', 'Causal tests'],
    cohort: true,
  },
];

const earlier = [
  {
    year: '2026',
    venue: 'GenBio Workshop · ICML 2026',
    title: 'Toxin Feature Hierarchy in ESM-2',
    authors: 'Shivam Dubey*, Manan Wadhwa*',
    href: 'https://openreview.net/pdf?id=Nb3y9BzCOi',
    tags: ['Protein LM', 'Biosecurity'],
  },
  {
    year: '2026',
    venue: 'TAIS 2026',
    title: 'Loss Landscape Response to Adversarial Perturbation Is Architecture-Dependent',
    authors: 'Shivam Dubey, Jason Hoelscher-Obermaier',
    href: 'https://tais2026.cc/proceedings/dubey-landscape-response',
    tags: ['Adversarial robustness'],
  },
  {
    year: '2025',
    venue: 'Reliable ML from Unreliable Data · NeurIPS 2025',
    title: 'Fourier Gradient Regularisation for Adversarial Robustness',
    authors: 'Shivam Dubey',
    href: 'https://neurips.cc/virtual/2025/loc/san-diego/125208',
    tags: ['Adversarial robustness'],
  },
];

// Thesis claims. Each rests on a paper above; claim 04 is a direction, not a finding.
const claims = [
  {
    n: '01',
    claim: 'Capabilities get added after release, and can be hidden.',
    evidence: 'An adapter installed a habit the checkpoint never had. A second adapter hid it behind baseline behaviour while leaving it in the weights. Seven state-reading instruments could not tell the two apart.',
    basis: 'Known by Construction',
  },
  {
    n: '02',
    claim: 'Some capabilities exist only between components, not inside any one model.',
    evidence: 'Steer one agent\'s affect and a second agent\'s activations move with the dose. Neither model has that behaviour alone.',
    basis: 'Steered Affect',
  },
  {
    n: '03',
    claim: 'The instruments meant to read model internals have an unmeasured false-positive rate.',
    evidence: 'Probes, concept directions, and SAE features report confident findings on untrained networks, and fixed-dose steering audits mis-rank models for a reason unrelated to steering.',
    basis: 'Dead Salmons; Distance to the Boundary',
  },
  {
    n: '04',
    claim: 'How a model behaves inside a harness is decided by the harness as much as by the model.',
    evidence: 'Model organisms with objectives inserted at different training stages, run inside monitored and tool-restricted environments, to see what the overseer can and cannot detect.',
    basis: 'Direction',
    direction: true,
  },
];

const directions = [
  {
    id: 'Q1',
    title: 'Behaviour inside control environments',
    body: 'Does a model with an installed habit behave differently under monitoring and restricted tools than outside them, and can the overseer tell?',
  },
  {
    id: 'Q2',
    title: 'Persistence of hidden objectives',
    body: 'Which training stage makes an inserted objective survive retraining, distillation, and prompt variation?',
  },
  {
    id: 'Q3',
    title: 'Capabilities between agents',
    body: 'Affect transfers between agents. What else does, and at what dose?',
  },
  {
    id: 'Q4',
    title: 'A calibrated instrument suite',
    body: 'Every instrument the lab has tested fails on a null it did not run. The long-term goal is a set of state-reading tools that ship with their own false-positive rate.',
  },
];

const people = [
  {
    name: 'Shivam Dubey',
    role: 'Co-Founder',
    detail: 'BS Data Science, IIT Madras, 2023 to 2027',
    socials: [
      { label: 'shivam@redarclabs.com', href: 'mailto:shivam@redarclabs.com' },
      { label: 'GitHub', href: 'https://github.com/punctualprocrastinator/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/syntaxsavant/' },
    ],
    items: [
      { label: 'Five NeurIPS 2026 workshop papers', meta: 'Co-first author · under review' },
      { label: 'Toxin Feature Hierarchy in ESM-2', meta: 'ICML 2026 GenBio Workshop' },
      { label: 'Fairness-Aware Speculative Decoding (FASD)', meta: 'MIT Technology Review cited · 77% bias reduction at 6% latency overhead' },
      { label: 'Fourier Gradient Regularisation (FGR)', meta: 'NeurIPS 2025 · 2× adversarial robustness on ResNet-18' },
      { label: 'Apart Research fellow', meta: 'Under Jason Hoelscher-Obermaier · accepted TAIS Oxford' },
      { label: 'MARS V Research Fellow', meta: 'Cambridge AI Safety Hub' },
    ],
  },
  {
    name: 'Manan Wadhwa',
    role: 'Co-Founder',
    detail: 'B.Tech Computer Science, MAIT (GGSIPU), expected 2027',
    socials: [
      { label: 'manan@redarclabs.com', href: 'mailto:manan@redarclabs.com' },
      { label: 'GitHub', href: 'https://github.com/Manan-Wadhwa/' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/manan-wadhwa' },
    ],
    items: [
      { label: 'Five NeurIPS 2026 workshop papers', meta: 'Co-first author · under review' },
      { label: 'Toxin Feature Hierarchy in ESM-2', meta: 'ICML 2026 GenBio Workshop' },
      { label: 'MARS Research Fellow', meta: 'Cambridge AI Safety Hub' },
      { label: 'Google Summer of Code 2026', meta: 'HumanAI organisation' },
      { label: 'Technical AI Safety Fellow', meta: 'AI Safety Initiative, Georgia Tech' },
      { label: 'BlueDot Impact', meta: 'Technical AI Safety and Biosecurity certifications' },
    ],
  },
];

const collaborators = [
  'Sheryl Mehta',
  'Shagun Chadha',
  'Kanika Singhal',
  'Debojeet Ghosh',
  'Shreyansh Kumar',
  'Ayushman Garg',
];
```

- [ ] **Step 2: Do not build yet.** Proceed directly to Task 9. (The template still references `assumptions`, `repos`, `orgs`, `pip`, `pipStyle` and will not compile until Task 9 removes them.)

---

### Task 9: Homepage template

**Files:**
- Modify: `src/pages/index.astro` from the `<Base` tag to the end of the file (line 158 onward in the original numbering)

**Interfaces:**
- Consumes: `pubs`, `earlier`, `claims`, `directions`, `people`, `collaborators` from Task 8.

- [ ] **Step 1: Replace the `<Base ...>` opening tag and its four props**

```astro
<Base
  title="Redarc Labs · Non-model capabilities"
  description="Redarc Labs studies non-model capabilities: what a deployed system can do that its model cannot. Adapters, attached data, harnesses, other agents, and long-running use add capabilities no model card lists and no benchmark measures."
  ogDescription="What a deployed system can do that its model cannot."
  keywords="non-model capabilities, AI control, model organisms, interpretability evaluation, AI safety"
>
```

- [ ] **Step 2: Replace the hero text (inside the hero section's right-hand `<div>`)**

Keep the `<p class="appear appear-1" ...>`, `<h1 class="appear appear-2" ...>`, and the two `<p class="appear appear-3" ...>` elements with their existing `style` attributes. Replace only their text content and the CTA anchors:

- eyebrow `<p>`: `Non-model capabilities · Nonprofit · 2026`
- `<h1>`: `What a deployed system can do that its model cannot.`
- first `<p class="appear appear-3">` (the red sub-line): `Static evals measure the checkpoint. The interesting capabilities were built on top of it.`
- second `<p class="appear appear-3">`: `A frontier lab trains and evaluates a model. What gets deployed is a system: the model plus adapters and fine-tunes, attached data, a harness or control environment, other agents, and a user who keeps interacting with it. That system has capabilities the checkpoint alone does not have. They were not trained in, they are not on the model card, and no benchmark measures them. Redarc Labs builds the cases where the answer is known and checks whether the instruments can find it.`
- CTAs:

```astro
<div class="flex flex-wrap gap-2.5 appear appear-4">
  <a href="#publications" class="btn btn-ink">Papers</a>
  <a href="/community" class="btn btn-wire">Community</a>
</div>
```

- [ ] **Step 3: Replace the About section's inner content**

Inside `<section id="about" ...>`, keep the left column (`<span class="eyebrow">Position</span>` and `<h2 class="h2">Our thesis</h2>`). Replace the right column `<div>` contents (the `<h2>`, the `<p>`, and the `assumptions.map` block) with:

```astro
<h2 class="h2" style="max-width: 36ch; margin-bottom: 0.875rem; font-size: clamp(1.1rem, 2vw, 1.5rem);">
  A capability that was built on top only shows up when you intervene.
</h2>
<p style="font-size: 0.875rem; color: var(--color-ink-sec); line-height: 1.7; max-width: 52ch; margin-bottom: 2rem;">
  Vary the dose, add a sham arm, compare against a case where the answer is already known, and commit the verdict rule before the data exists. Four claims, each resting on a paper below.
</p>
<div style="border-top: 1px solid var(--color-rule);">
  {claims.map(c => (
    <div style="padding-block: 1.25rem; border-bottom: 1px solid var(--color-rule);">
      <p style="font-size: 0.875rem; font-weight: 600; letter-spacing: -0.01em; color: var(--color-ink); margin: 0 0 0.375rem 0; line-height: 1.3;">
        <span style="font-family: var(--font-mono); font-size: 0.6rem; font-weight: 700; color: var(--color-red); letter-spacing: 0.08em; margin-right: 0.5rem; vertical-align: middle;">{c.n}</span>
        {c.claim}
      </p>
      <p style="font-size: 0.8rem; color: var(--color-ink-sec); line-height: 1.65; margin: 0 0 0.25rem 0;">{c.evidence}</p>
      <p style="font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-ink-muted); margin: 0;">
        {c.direction ? 'Direction' : `Rests on · ${c.basis}`}
      </p>
    </div>
  ))}
</div>
```

- [ ] **Step 4: Replace the Publications section's right column**

Keep the left column but change `<h2 class="h2">Published work</h2>` to `<h2 class="h2">Papers</h2>`. Replace the right column `<div>` (the whole `pubs.map` block) with:

```astro
<p style="font-size: 0.875rem; color: var(--color-ink-sec); line-height: 1.7; max-width: 52ch; margin-bottom: 1.5rem;">
  Five papers under review at NeurIPS 2026 workshops. Workshop papers are non-archival.
</p>
{pubs.map((p, i) => (
  <div style={`padding-block: 1.5rem; border-top: 1px solid var(--color-rule); ${i === pubs.length - 1 ? 'border-bottom: 1px solid var(--color-rule);' : ''}`}>
    <div style="display: flex; gap: 0.75rem; align-items: baseline; margin-bottom: 0.375rem; flex-wrap: wrap;">
      <span style="font-family: var(--font-mono); font-size: 0.6rem; font-weight: 700; color: var(--color-ink); letter-spacing: 0.06em;">{p.year}</span>
      <span style="font-family: var(--font-mono); font-size: 0.6rem; color: var(--color-ink-muted); letter-spacing: 0.04em; text-transform: uppercase;">{p.venue}</span>
      <span style="font-family: var(--font-mono); font-size: 0.6rem; color: var(--color-red); letter-spacing: 0.04em; text-transform: uppercase;">Under review</span>
    </div>
    <h3 class="h3">{p.title}</h3>
    <p style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-ink-muted); margin-bottom: 0.625rem; letter-spacing: 0.01em;">{p.authors}</p>
    <p style="font-size: 0.8125rem; color: var(--color-ink-sec); margin-bottom: 0.75rem; line-height: 1.6;">{p.finding}</p>
    <div class="flex flex-wrap gap-2" style="margin-bottom: 0.75rem;">
      {p.tags.map(t => <span class="tag">{t}</span>)}
      {p.cohort && <a href="/workshops/cohort-01" class="tag" style="text-decoration: none; color: var(--color-red); border-color: var(--color-red);">Cohort 01 project</a>}
    </div>
    {p.href ? (
      <a href={p.href} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 link-paper" style="font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-ink); text-decoration: none; border-bottom: 1px solid var(--color-rule-strong); padding-bottom: 1px; transition: border-color 120ms;">
        Read paper <svg class="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2 12L12 2M12 2H5M12 2v7" /></svg>
      </a>
    ) : (
      <span style="font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-ink-muted);">Preprint soon</span>
    )}
  </div>
))}
<p style="font-family: var(--font-mono); font-size: 0.625rem; color: var(--color-ink-muted); margin: 0.75rem 0 2rem 0;">* co-first author</p>

<p class="eyebrow" style="margin-bottom: 0.75rem;">Earlier work</p>
{earlier.map((p, i) => (
  <div style={`padding-block: 1rem; border-top: 1px solid var(--color-rule); ${i === earlier.length - 1 ? 'border-bottom: 1px solid var(--color-rule);' : ''}`}>
    <div style="display: flex; gap: 0.75rem; align-items: baseline; margin-bottom: 0.25rem; flex-wrap: wrap;">
      <span style="font-family: var(--font-mono); font-size: 0.6rem; font-weight: 700; color: var(--color-ink); letter-spacing: 0.06em;">{p.year}</span>
      <span style="font-family: var(--font-mono); font-size: 0.6rem; color: var(--color-ink-muted); letter-spacing: 0.04em; text-transform: uppercase;">{p.venue}</span>
    </div>
    <a href={p.href} target="_blank" rel="noopener noreferrer" class="h3 link-paper" style="text-decoration: none; display: block; margin-bottom: 0.25rem;">{p.title}</a>
    <p style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-ink-muted); margin-bottom: 0.5rem;">{p.authors}</p>
    <div class="flex flex-wrap gap-2">
      {p.tags.map(t => <span class="tag">{t}</span>)}
    </div>
  </div>
))}
```

- [ ] **Step 5: Replace the Research section**

Replace the whole `<section id="research" ...>…</section>` block (eyebrow "Ongoing work", heading "Repositories", the `repos.map`, and the directions list) with:

```astro
<!-- Directions -->
<section id="research" class="sec" style="background: var(--color-paper); border-bottom: 1px solid var(--color-rule);">
  <div class="container-site">
    <div class="grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-16">
      <div>
        <span class="eyebrow">Directions</span>
        <h2 class="h2">Open questions</h2>
      </div>
      <div>
        <div style="border-top: 1px solid var(--color-rule);">
          {directions.map(d => (
            <div style="display: grid; grid-template-columns: 2.5rem 1fr; gap: 0.75rem; padding-block: 1.25rem; border-bottom: 1px solid var(--color-rule);">
              <span style="font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 600; color: var(--color-red); letter-spacing: 0.04em; padding-top: 0.15rem;">{d.id}</span>
              <div>
                <p class="h3">{d.title}</p>
                <p style="font-size: 0.8125rem; color: var(--color-ink-sec); line-height: 1.65; margin: 0;">{d.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 6: Add the collaborators line to the Team section**

Directly after the closing `</div>` of the `people.map` grid (the `<div style="display: grid; grid-template-columns: repeat(auto-fit, …)">` wrapper), and before the two closing `</div>`s of the section's right column, add:

```astro
<p class="eyebrow" style="margin-top: 2.5rem; margin-bottom: 0.5rem;">Collaborators</p>
<p style="font-size: 0.8125rem; color: var(--color-ink-sec); line-height: 1.7; margin: 0;">
  {collaborators.join(' · ')}. Co-authors on the two papers that came out of the first cohort.
</p>
```

- [ ] **Step 7: Delete the Landscape section**

Delete the entire `<!-- Landscape -->` section: from the comment through its closing `</section>`, including the `<table>` and the `orgs.map` block.

- [ ] **Step 8: Replace the community pointer section's right column**

In `<!-- Community / field building -->`, change the eyebrow to `Community` and the heading to `Teaching`. Replace the `<p>` (the "no dedicated institution" sentence) with:

```astro
<p style="font-size: 0.9375rem; color: var(--color-ink-sec); line-height: 1.7; max-width: 54ch; margin-bottom: 1.5rem;">
  The lab teaches an eight-session curriculum and runs it with cohorts. Two of the papers above came out of the first cohort.
</p>
```

Keep the four quick links and the Community button as they are.

- [ ] **Step 9: Build and check**

Run:
```bash
mise exec node@26.7.0 -- npm run build 2>&1 | grep -E 'error|Error|Complete!'
H=dist/client/index.html
grep -ciE 'actively non-cooperative|intersection nobody|no dedicated institution|until now|deflection|Gray Swan|Goodfire|bipolar_defense|Getting in SHAPe' $H
grep -c 'Under review' $H
grep -c 'Preprint soon' $H
grep -o 'Cohort 01 project' $H | wc -l
grep -o 'co-first author' $H | head -1
```
Expected, in order: `[build] Complete!`; `0`; `5`; `5`; `2`; `co-first author`.

- [ ] **Step 10: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(home): rebuild around non-model capabilities and the five NeurIPS 2026 papers"
```

---

### Task 10: Layout metadata and footer

**Files:**
- Modify: `src/layouts/Base.astro:76`
- Modify: `src/components/Footer.astro:61`

- [ ] **Step 1: Replace the JSON-LD description in `src/layouts/Base.astro`**

Change line 76 from

```
      "description": "Redarc Labs builds mechanistic interpretability tools that work when AI models are actively non-cooperative.",
```

to

```
      "description": "Redarc Labs studies non-model capabilities: what a deployed system can do that its model cannot.",
```

- [ ] **Step 2: Replace the footer slogan in `src/components/Footer.astro`**

Change line 61 from `Redarc Labs · Where the safety layer holds` to `Redarc Labs · Non-model capabilities`.

- [ ] **Step 3: Build and check**

Run:
```bash
mise exec node@26.7.0 -- npm run build 2>&1 | grep -E 'error|Complete!'
grep -rciE 'safety layer holds|actively non-cooperative' dist/client/ | grep -v ':0' ; echo "leaks: $?"
```
Expected: `[build] Complete!` and `leaks: 1` (grep found nothing).

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Base.astro src/components/Footer.astro
git commit -m "feat(meta): JSON-LD and footer under the new positioning"
```

---

### Task 11: README, full verification, unslop rerun

**Files:**
- Modify: `README.md:7-24` (the project structure tree)

- [ ] **Step 1: Update the README project tree**

Replace the fenced tree under "## Project Structure" with:

```text
/
├── public/
│   ├── logo.svg
│   └── robots.txt
├── src/
│   ├── components/      AnimatedLogo, Nav, ThemeToggle, Footer
│   ├── content/         markdown collections: curriculum, workshops, talks, research-log
│   ├── content.config.ts
│   ├── layouts/Base.astro
│   ├── lib/date.ts
│   ├── pages/           index, community, curriculum/, workshops/, talks, research-log/
│   └── index.css
├── docs/superpowers/    design spec and implementation plan for the 2026-09 rebrand
└── astro.config.mjs
```

- [ ] **Step 2: Forbidden-terms sweep over `src/`**

Run:
```bash
grep -rniE 'safl|secure ai futures|delhi|example\.com|placeholder|non-cooperative|intersection nobody|no dedicated institution|safety layer holds|until now|getting in shape|deflection vector|survives adversarial|holds up under adversarial|mech_interp-notebooks' src/ ; echo "exit: $?"
```
Expected: no lines, `exit: 1`. Any hit is a defect in the task that owns that file; fix it there.

- [ ] **Step 3: Em-dash sweep over rewritten prose**

Run:
```bash
grep -rn '—' src/content/ src/pages/community.astro src/pages/talks.astro src/pages/workshops src/pages/curriculum src/pages/research-log src/pages/index.astro | grep -vE 'nav-a|← ' ; echo "exit: $?"
```
Expected: `exit: 1`. (The `←` arrow in back links is not an em-dash and is excluded.)

- [ ] **Step 4: Link check over the built site**

Run:
```bash
cd /home/manan/Projects/website
grep -rhoE 'href="https?://[^"]+"' dist/client/ | sed 's/href="//;s/"$//' | sort -u | while read -r u; do
  code=$(curl -sIL -o /dev/null -w '%{http_code}' --max-time 15 "$u")
  echo "$code $u"
done | sort
```
Expected: every line starts with `2` or `3`. LinkedIn and fonts.googleapis may return `999` or `403` to curl; those two hosts are acceptable. Any other non-2xx/3xx is a defect: fix the URL in its source file or remove the link.

- [ ] **Step 5: Unslop audit rerun**

Dispatch a subagent with this prompt, and paste its report into the PR description later:

> Read /home/manan/.claude/skills/unslop/references/core-contract.md, /home/manan/.claude/skills/unslop/references/commands/cleanup.md (report-only), and /home/manan/.claude/skills/unslop/references/taboo-phrases.md. Audit, without editing, all prose in /home/manan/Projects/website/src/content/ and the visible copy in src/pages/index.astro, community.astro, curriculum/index.astro, workshops/index.astro, talks.astro, research-log/index.astro, components/Footer.astro, and the JSON-LD description in layouts/Base.astro. Report per file with line numbers, severity, and category. Then list the site-wide count of each of these phrases: "actively non-cooperative", "survives", "holds up under", "no dedicated institution", "running log", "week by week", "from X to Y" frames, em-dashes. Finish with the number of high-severity findings.

Expected: zero high-severity findings and every listed phrase count at most 1. Fix any high-severity finding in the file that owns it and re-run the build.

- [ ] **Step 6: Manual visual check**

Run `mise exec node@26.7.0 -- npx astro preview --host 127.0.0.1 --port 4321` (or `npm run dev`) and open `http://127.0.0.1:4321/` at 375px and 1280px widths, light and dark theme. Confirm: hero reads in three lines, the claims list has four rows with the fourth labelled "Direction", five paper cards each show "Under review" and "Preprint soon", the Earlier work list has three rows, no Landscape table, the Collaborators line renders, and `/community`, `/curriculum`, `/workshops`, `/workshops/cohort-01`, `/talks`, `/research-log` all render with no placeholder text. Stop the server afterwards.

- [ ] **Step 7: Commit**

```bash
git add README.md
git commit -m "docs: README structure for the rebranded site"
```

- [ ] **Step 8: Hand back**

Report the branch name, the eleven commit hashes, the unslop rerun summary, and the still-open items from spec section 7a (paper URLs, code URLs, talk venues and dates, the speaker and overview for the second talk, collaborator affiliations). Do not merge or push; the owner decides.
