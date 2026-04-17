---
title: "[Design Pattern] Chain Of Responsibility Pattern"
description: "A pattern that passes a request through a chain of handlers, where each handler performs its responsibility in sequence."
pubDate: 2026-04-13
lang: en
tags:
  - "Design Pattern"
  - "Behavioral"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-behavioral-chain-of-responsibility.svg
---

# Chain of Responsibility

## One-line pattern summary
A pattern that passes a request through a chain of handlers, where each handler performs its responsibility in sequence.

## Typical Unity use cases
- When shields, buffs, and resistances must be applied sequentially in damage calculation.
- When input filters need to process in stages.

## Parts (roles)
- Handler
- Concrete Handler
- Next Handler

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
public abstract class DamageModifierHandler
{
    private DamageModifierHandler nextHandler;

    public DamageModifierHandler SetNext(DamageModifierHandler nextHandler)
    {
        this.nextHandler = nextHandler;
        return nextHandler;
    }

    public int Handle(int incomingDamage)
    {
        int updatedDamage = ModifyDamage(incomingDamage);
        return nextHandler == null ? updatedDamage : nextHandler.Handle(updatedDamage);
    }

    protected abstract int ModifyDamage(int incomingDamage);
}

public sealed class ShieldDamageHandler : DamageModifierHandler
{
    protected override int ModifyDamage(int incomingDamage)
    {
        return System.Math.Max(0, incomingDamage - 20);
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

This shows the flow where a request moves through a chain and each handler takes responsibility if possible.

```mermaid
flowchart LR

  request["Cast Skill Request"]
  auth["AuthHandler"]
  cooldown["CooldownHandler"]
  cost["CostHandler"]
  execute["ExecuteHandler"]
  reject["Rejected"]
  complete["Executed"]

  request --> auth
  auth -->|fail| reject
  auth -->|pass| cooldown
  cooldown -->|fail| reject
  cooldown -->|pass| cost
  cost -->|fail| reject
  cost -->|pass| execute
  execute --> complete
```
