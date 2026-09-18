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
