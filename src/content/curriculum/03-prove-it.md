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
