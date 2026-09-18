# Redarc Labs site rebrand: non-model capabilities

Date: 2026-09-18
Status: draft for review
Repo: redarclabs.com (Astro + Tailwind v4, static, Cloudflare Pages)

## 1. Why

The site currently sells "adversarial interpretability: tools that work when
models are actively non-cooperative." The lab's five NeurIPS 2026 workshop
papers are not about attacking models. They are about capabilities that get
added to a model after release, and whether the instruments that claim to read
model internals can be trusted. The site and the work no longer describe the
same lab.

The rebrand renames the territory, rebuilds the homepage around the five
papers, and makes the community pages look finished without inventing anything.

## 2. Positioning

### 2.1 Field term

**Non-model capabilities.** Plain-language companion: *what a deployed system
can do that its model cannot.*

Definition (used verbatim on the homepage, referenced elsewhere):

> A frontier lab trains and evaluates a model. What gets deployed is a system:
> the model plus adapters and fine-tunes, attached data, a harness or control
> environment, other agents, and a user who keeps interacting with it. That
> system has capabilities the checkpoint alone does not have. They were not
> trained in, they are not on the model card, and no benchmark measures them.

### 2.2 Method stance

Static evals measure the checkpoint once. A capability that was built on top
only shows up when you intervene, vary the dose, and compare against a case
where the answer is already known. The lab's method is: build the case where
the answer is known by construction, add sham and decoy arms, calibrate every
instrument against a null, and pre-commit the verdict rule.

Site phrasing: "Static evals can't see what was built on top." Never "we hate
evals" on the site.

### 2.3 Identity

Research lab first. Tool-building is a stated direction, not a claim.

### 2.4 Words that leave the site entirely

- "actively non-cooperative", "non-cooperative models"
- "adversarial interpretability" as the lab's identity (allowed only when
  naming earlier work)
- "the intersection nobody occupies", "no dedicated institution", "until now"
- "survives adversarial pressure", "holds up under adversarial pressure"
- "Where the safety layer holds"
- every uncited statistic (>98% sandbagging, >70% backdoor survival, 77% bias
  reduction, 2x robustness) unless a source link sits next to it

## 3. Homepage (`src/pages/index.astro`)

Section order, eyebrow labels in brackets:

1. Hero
2. [Thesis] Four claims
3. [Publications] Five papers, then Earlier work
4. [Code] Released artifacts
5. [Directions] Four open questions
6. [Team] Founders and collaborators
7. [Community] Short pointer to the community hub

Removed: "Repositories" (three old repos), "Landscape" (six-org table), the
four "assumptions that break" block, D1 to D4.

### 3.1 Hero

- Eyebrow: `Non-model capabilities`
- Headline (plain language): *What a deployed system can do that its model
  cannot.*
- Sub-line: Adapters, attached data, harnesses and control environments, other
  agents, and long-running use add capabilities no model card lists and no
  benchmark measures. Redarc Labs builds the cases where the answer is known
  and checks whether the instruments can find it.
- CTAs: Papers (anchor), Community (link). Keep the AnimatedLogo.

### 3.2 Thesis: four claims

Each claim is one sentence, followed by one sentence of evidence and the paper
it rests on. No numbers in the claim. Numbers may appear in the evidence line
only if they are in the paper.

| # | Claim | Rests on |
|---|-------|----------|
| 01 | Capabilities get added after release, and can be hidden. | Known by Construction |
| 02 | Some capabilities exist only between components, not inside any one model. | Steered Affect |
| 03 | The instruments meant to read model internals have an unmeasured false-positive rate. | Dead Salmons; Distance to the Boundary |
| 04 | How a model behaves inside a harness is decided by the harness as much as by the model. | Stated as a direction (MARS model-organism work), not a finding |

Claim 04 is labelled "direction" in the UI so the site does not assert a
result that has not been published.

### 3.3 Publications

Data shape stays as the existing `pubs` array with two additions: `status`
and `finding`.

Block heading: **Papers**. Line under it: *Five papers under review at
NeurIPS 2026 workshops. Workshop papers are non-archival.*

Order and content:

| # | Title | Workshop | Authors | Finding (one sentence, plain) |
|---|-------|----------|---------|-------------------------------|
| 1 | Known by Construction: Calibrating Model-State Instruments Against Models Whose State Was Installed, Hidden, or Never Present | TAE: Can We Trust AI Evaluation? | Manan Wadhwa*, Shivam Dubey* | Seven instruments that claim to read a model's internal state were tested on models where the state was installed, hidden, or absent by construction. Every one read the prompt or the training history instead. |
| 2 | Steered Affect Moves a Partner Agent's Activations, and the Logistic Probe That Reads It Returns a Tie-Break, Not an Estimate | Interpreting Agent Behavior | Manan Wadhwa*, Shivam Dubey*, Debojeet Ghosh, Shreyansh Kumar, Ayushman Garg | One agent's steered emotional state shows up in a second agent's activations. The standard probe used to read it is a tie-break, not a measurement, and the standard ablation control is too weak to notice. |
| 3 | Distance to the Boundary Is Not Steering Resistance | Interpretability as a Science | Manan Wadhwa*, Shivam Dubey* | Fixed-dose steering audits rank aligned models as least controllable because the model's margin grew, not because the steering direction weakened. |
| 4 | Dead Salmons Have a False-Positive Rate: A Calibrated Null-Model Test for Interpretability | Interpretability as a Science | Manan Wadhwa*, Shivam Dubey* | Probes, concept directions, and SAE feature selection report confident findings on networks that learned nothing. The shuffled-label control everyone runs does not catch it. |
| 5 | Doubt Is a Decision: A Sparse Circuit Commits Language Models to "I Don't Know" | Interpretability as a Science | Sheryl Mehta*, Shagun Chadha*, Kanika Singhal*, Manan Wadhwa, Shivam Dubey | The decision to hedge lives in a small set of heads and neurons. Correlation-selected "confidence neurons" fail causal tests against a random-neuron null. |

`*` = co-first author. Rendered as a footnote under the list.

Papers 2 and 5 carry an extra tag, `Cohort 01 project`, linking to
`/workshops`. Both came out of the first online cohort, and that is the
strongest evidence the community pages have.

Links: `href` is required for each paper. Until arXiv or OpenReview links
exist, the card renders without a link and with a "preprint soon" label. No
placeholder URLs.

**Earlier work** (smaller list, same component, no finding line):

- Toxin Feature Hierarchy in ESM-2. GenBio Workshop, ICML 2026. Shivam
  Dubey*, Manan Wadhwa*. (Published title confirmed by owner.)
- Loss Landscape Response to Adversarial Perturbation Is
  Architecture-Dependent. TAIS 2026. Shivam Dubey, Jason Hoelscher-Obermaier.
- Fourier Gradient Regularisation for Adversarial Robustness. Reliable ML
  from Unreliable Data, NeurIPS 2025. Shivam Dubey.

### 3.4 Code

Heading: **Code and releases**. Only artifacts with a live public URL are
listed. Candidates, pending URLs from the owner:

- Known by Construction: rows, scorers, organism recipes, amendment log.
- BlueDot organism build: 44 adapters and the reproduction script.
- Dead Salmons: null-model pool and the empirical-quantile test.

If no URL is available at build time the section is omitted, not filled with
the three old repos.

### 3.5 Directions

Heading: **Open questions**. Four items, each a question and two sentences of
why. No results, no numbers.

1. Behaviour inside control environments. Does a model with an installed
   habit behave differently under monitoring and restricted tools than
   outside them, and can the overseer tell?
2. Persistence of hidden objectives. Which training stage makes an inserted
   objective survive retraining, distillation, and prompt variation? (MARS
   work.)
3. Capabilities between agents. Affect transfers between agents. What else
   does, and at what dose?
4. A calibrated instrument suite. Every instrument the lab has tested fails
   on a null it did not run. The long-term goal is a set of state-reading
   tools that ship with their false-positive rate.

### 3.6 Team

**Founders.** Two cards, existing component.

Manan Wadhwa, Co-Founder. Detail: B.Tech Computer Science, MAIT (GGSIPU),
expected 2027. Items:
- Five NeurIPS 2026 workshop papers (co-first), under review
- Toxin Circuits in ESM-2, ICML 2026 GenBio Workshop
- MARS Research Fellow, Cambridge AI Safety Hub
- Google Summer of Code 2026, HumanAI
- Technical AI Safety Fellow, AI Safety Initiative, Georgia Tech
- BlueDot Impact Technical AI Safety and Biosecurity certifications

Removed from Manan's card: "Getting in SHAPe, ACL ARR 2026" (owner: drop).

Shivam Dubey, Co-Founder. Keep all existing items as they are (owner
confirmed). Replace the single ICML title line with the same "Five NeurIPS
2026 workshop papers (co-first), under review" count line used on Manan's
card. Founder cards never list individual paper titles; the papers block does
that.

**Collaborators.** One line under the founders, names only, no cards:
Sheryl Mehta, Shagun Chadha, Kanika Singhal, Debojeet Ghosh, Shreyansh Kumar,
Ayushman Garg. Affiliations added only if the owner supplies them.

### 3.7 Community pointer

Two sentences and a link to `/community`. No triads, no "building the field".

## 4. Community pages

### 4.1 Curriculum (`src/content/curriculum/`)

Replace the three placeholder modules with eight, mirroring the bootcamp in
`Manan-Wadhwa/mech_interp-notebooks` (origin/main). One markdown file per
session. Frontmatter: `order`, `title`, `summary`, `duration` ("90 minutes";
sessions 6 and 8 "120 minutes"), `milestone`.

| # | Title | Milestone |
|---|-------|-----------|
| 1 | Why did it say that? | Teams formed, two or three concepts chosen |
| 2 | Make it say something else | Ten to twenty prompt pairs, one steering demo |
| 3 | Prove it | Versioned eval set, baseline, repo |
| 4 | Where does it actually happen? | Patching heatmap, draft started |
| 5 | What can you read off a vector? | Probe with a control-task baseline |
| 6 | Attack the figure | The figure that becomes Figure 1 |
| 7 | Make it survive review | Intro and methods draft |
| 8 | Why is your work cool? | Talk delivered, venue and date set |

Body per module: two-paragraph description, "What you will do" list, "What
you leave with" list. Written from the notebook markdown cells. The course
rules that appear on the index page: no interpretability library, hooks
written by hand, a careful negative result counts as a success.

Constraints:
- No link to the GitHub repo (its README and deck theme name the partner).
- No mention of the partner organisation, the city, dates, or "v2".
- No "Placeholder reading" lines. Readings section is replaced by "Materials
  are released to each cohort at the start of the session."
- The session-1 notebook's line "Nobody has published this" is not carried
  onto the site.

Curriculum index copy: one paragraph, no from/to frame, no "the course we wish
existed".

### 4.2 Workshops (`src/content/workshops/`)

Delete `cohort-01-intro-adversarial-interp.md` and
`cohort-02-deception-detection.md` (both fabricated).

Replace with two entries.

**Cohort 01 (past, online).** Frontmatter: `cohort: "01"`, `format: Online`,
`status: completed`, no dates. Summary: the first cohort ran the eight-session
curriculum online. Body: what participants did each week (from the milestone
column in 4.1), and the outcome: two participant teams' projects became
NeurIPS 2026 workshop submissions, Doubt Is a Decision and Steered Affect,
with the participants as authors. Link each to the paper card on the
homepage. Names of the six participant-authors appear here, since they are
already public as paper authors. No other participant names.

**Cohort 02 (upcoming).** `status: upcoming`, no date, no venue, no format,
no materials link. Summary: eight sessions, ninety minutes each, code against
a live model in every session. Body: who it is for, what a participant ships
by week 8. Applications line: "Announced on the lab's LinkedIn." No contact
address (owner: cohort 1 was remote, none exists).

Owner mentioned LinkedIn posts from cohort 1's first weeks. They could not be
read during spec writing (login wall, browser extension disconnected). If the
owner pastes their text, cohort 01's body can quote what was already public;
otherwise the body stays as described above.

### 4.3 Talks (`src/content/talks/`)

Delete both existing entries (example.com links, scaffolded venues).
Replace with the two real talks. Neither publishes its slides on the site
(owner: the decks are AI-heavy and should not be posted). Each entry has a
title, a two-sentence overview in the body, and `speaker` where known. The
`slides` and `video` fields are simply omitted. Venue and date are shown only
if the owner supplies them; the schema makes both optional and the card
renders without them.

1. **You Are Not Behind: how to start doing real AI research before anybody
   gives you permission.** Speaker: Manan Wadhwa. Overview (written from the
   deck): a talk for students who want to work on AI safety and think they
   arrived late. It argues from the field's own numbers that nobody has a
   head start, that the safety side is small enough to read in a semester,
   and that the bottleneck is sending the application, not the CGPA or the
   college. Told through the speaker's own timeline, rejections included.
2. **Intro to Technical AI Safety.** Speaker: owner to confirm. Overview:
   an introduction to the technical AI safety landscape for a general
   technical audience. Owner supplies two sentences, or the deck, so the
   overview is not invented.

The Talks page and nav entry stay.

### 4.4 Research log (`src/content/research-log/`)

Keep the three week entries as placeholders per the owner's request, but:
- retitle to match the eight-session structure (Week 1: Why did it say that?
  etc.)
- summaries rewritten to describe the session's plan, not fabricated
  outcomes
- body reduced to a single italic line: "Notes from this week are posted
  after the session."
- `draft: true` in frontmatter so they build locally but are excluded from
  the production listing until real notes arrive. The index page shows
  "Notes are posted weekly during a cohort" when the filtered list is empty.

### 4.5 Community hub (`src/pages/community.astro`)

Three cards (Curriculum, Workshops, Research log), four if Talks survives.
Intro paragraph: two sentences. The line "Adversarial interpretability has no
dedicated institution" is deleted everywhere.

## 5. Site-wide

- `Base.astro` JSON-LD description and default meta description rewritten to
  the non-model-capabilities definition, one sentence.
- Keywords meta replaced: "non-model capabilities, AI control, model
  organisms, interpretability evaluation, AI safety".
- Footer slogan: "Redarc Labs" only, or "Redarc Labs · Non-model
  capabilities". No undefined abstractions.
- Every page title follows "Page name · Redarc Labs".
- Nav unchanged: Home, Community (Curriculum, Workshops, Research log, Talks
  if kept).

### 5.1 Copy rules (acceptance criteria for every rewritten line)

- Each site-wide claim appears once. The definition of non-model capabilities
  appears in full only on the homepage hero and the JSON-LD; other pages
  reference it in a clause.
- No em-dash used as a list colon in summaries. No bold-label + dash
  listicles.
- No "from X to Y" journey frames.
- No absolutes ("only", "never", "nobody", "no prior paper") unless a link
  sits beside them.
- Unslop `crisp` preset. The research-log week-2 summary is the voice
  reference.

## 6. Verification

Before the work is called done:

1. `mise exec node@26.7.0 -- npm run build` passes (deps installed with
   `npm install --ignore-scripts`; sharp does not compile on Node 26 and is
   not needed). `astro check` is not used: it needs extra dev dependencies.
2. `grep -rniE 'safl|secure ai futures|delhi|example\.com|placeholder|non-cooperative|intersection nobody|safety layer holds|until now|getting in shape' src/` returns nothing.
3. Every `href` in `src/content` and `src/pages` returns 2xx or 3xx to a
   `curl -sI` check, or is a mailto/anchor.
4. Unslop audit rerun on `src/content` and `src/pages`; zero high-severity
   findings, and the catchphrase counts from the 2026-09-18 audit are all at
   most 1.
5. Manual read of the homepage in light and dark theme at 375px and 1280px.

## 7. Resolved with the owner (2026-09-18)

- Doubt Is a Decision: Sheryl Mehta, Shagun Chadha, Kanika Singhal all
  co-first. Both five-author papers came out of cohort 01.
- ICML title: "Toxin Feature Hierarchy in ESM-2".
- Cohort 01 was online. Cohort 02 has no public date, venue, or contact.
- Two real talks, slides not to be published.
- "Getting in SHAPe" dropped. Shivam's items all kept. Founder cards show
  paper counts, not titles.
- arXiv links arrive later; cards render "preprint soon" until then.

## 7a. Still open (non-blocking; the build ships without them)

1. arXiv or OpenReview URLs for the five papers.
2. Public URLs for released code. Section omitted until at least one exists.
3. Venue, date, and (for talk 2) speaker and a two-sentence overview.
4. Affiliations for the six collaborators, if they should be shown.
5. Keep any of the three old repos anywhere? Default: no.
6. Text of the cohort 01 LinkedIn posts, if the owner wants them quoted.

## 8. Out of scope

- Visual redesign. Layout, components, palette, and typography stay.
- A new domain or logo.
- Any content about the bootcamp partner, city, or schedule.
- Building the tools named in Directions.
