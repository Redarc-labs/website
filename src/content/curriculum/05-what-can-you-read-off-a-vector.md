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
