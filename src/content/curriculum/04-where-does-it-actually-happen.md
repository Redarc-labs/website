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
