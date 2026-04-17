---
title: "[Game Programming] Subclass Sandbox Pattern"
description: "A pattern where the parent provides a safe extension API and children are restricted to implementing only within that boundary."
pubDate: 2026-04-16
lang: en
tags:
  - "Design Pattern"
  - "Subclass Sandbox"
  - "Game Programming"
category: "Design Pattern"
---

## One-line pattern summary
A pattern where the parent provides a safe extension API and children are restricted to implementing only within that boundary.

## Typical Unity use cases
- When extending skills or AI while protecting core rules.
- When you want to control designer-facing extension points.

## Parts (roles)
- Base Class: provides a safe API
- Hook: child implementation point
- Subclass: extension implementation

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
public abstract class SkillBase
{
    public void ExecuteSkill()
    {
        if (!CanExecute())
        {
            return;
        }
        ConsumeResource();
        PlayCastAnimation();
        ApplyEffect();
    }

    protected virtual bool CanExecute() => true;

    protected virtual void ConsumeResource() { }

    protected virtual void PlayCastAnimation() { }

    protected abstract void ApplyEffect();
}

public sealed class FireballSkill : SkillBase
{
    protected override void ApplyEffect()
    {
        // Spawn fireball projectile.
    }
}
```

## Advantages
- Only the API allowed by the parent is exposed, so extension code can be safely constrained.
- It is useful when common rules such as cooldowns or resource costs must be enforced in the base class.

## Things to watch out for
- If the base class grows too large, extension flexibility can actually decrease.
- If hook contracts are unclear, behavior consistency can break between subclasses.

## Interaction diagram

This shows the flow where the parent template enforces common rules and the child implements only the hook.

```mermaid
flowchart LR

  caller["SkillRunner"]
  base["SkillBase.Cast()"]
  validate["Mana / Cooldown Check"]
  hook["DoCast() Hook"]
  child["FireballSkill.DoCast"]
  common["Apply Global Rule"]
  result["Skill Executed"]

  caller --> base
  base --> validate
  validate -->|pass| hook
  hook --> child
  child --> common
  common --> result
  validate -->|fail -> cancel| result
```
