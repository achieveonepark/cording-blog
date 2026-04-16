---
title: "TemplateMethod"
description: "A pattern where the overall procedure is fixed, while only the detailed steps are changed in subclasses."
pubDate: 2026-04-16
lang: en
tags:
  - "Design Pattern"
  - "TemplateMethod"
  - "GoF"
  - "Behavioral"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-behavioral-template-method.svg
---

# Template Method

## One-line pattern summary
A pattern where the overall procedure is fixed, while only the detailed steps are changed in subclasses.

## Typical Unity use cases
- When the skill execution order is the same but the effect differs.
- When common pre-processing and post-processing must be enforced.

## Parts (roles)
- Template Method
- Primitive Operation
- Concrete Class

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
public abstract class SkillExecutionTemplate
{
    public void Execute()
    {
        if (!CanExecute())
        {
            return;
        }
        ConsumeCost();
        PlayCastAnimation();
        ApplyEffect();
    }

    protected virtual bool CanExecute() => true;

    protected virtual void ConsumeCost() { }

    protected virtual void PlayCastAnimation() { }

    protected abstract void ApplyEffect();
}

public sealed class HealSkillTemplate : SkillExecutionTemplate
{
    protected override void ApplyEffect()
    {
        // Heal target.
    }
}
```

## Advantages
- Behavior is separated into smaller units, which reduces the impact of changes.
- Adding or swapping rules is relatively safe.

## Things to watch out for
- As the number of objects and indirect calls increases, the flow can become harder to follow.
- Ordering bugs should be pinned down with tests.

## Interaction diagram

This shows the flow where the parent fixes the algorithm order and the subclass changes only some steps.

```mermaid
flowchart TD

  template["AbilityBase.Execute()"]
  step1["Validate()"]
  step2["ConsumeResource()"]
  step3["DoAction() (override)"]
  step4["AfterAction()"]
  result["Ability Done"]

  template --> step1
  step1 --> step2
  step2 --> step3
  step3 --> step4
  step4 --> result
```
