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
