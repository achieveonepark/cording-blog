---
title: "Strategy"
description: "A pattern that encapsulates algorithms with the same goal behind an interface so they can be swapped at runtime."
pubDate: 2026-04-16
lang: en
tags:
  - "Design Pattern"
  - "Strategy"
  - "GoF"
  - "Behavioral"
category: "Design Pattern"
---

## One-line pattern summary
A pattern that encapsulates algorithms with the same goal behind an interface so they can be swapped at runtime.

## Typical Unity use cases
- When AI attack behavior should change by situation.
- When aiming or movement policies differ by character.

## Parts (roles)
- Strategy Interface
- Concrete Strategy
- Context

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
using UnityEngine;

public interface IAimStrategy
{
    Vector3 GetAimPosition(Transform shooterTransform, Transform targetTransform);
}

public sealed class DirectAimStrategy : IAimStrategy
{
    public Vector3 GetAimPosition(Transform shooterTransform, Transform targetTransform)
    {
        return targetTransform.position;
    }
}

public sealed class LeadAimStrategy : IAimStrategy
{
    public Vector3 GetAimPosition(Transform shooterTransform, Transform targetTransform)
    {
        return targetTransform.position + targetTransform.forward * 0.5f;
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

This shows the flow where a context swaps algorithms through a strategy interface.

```mermaid
flowchart LR

  context["PathContext"]
  selector["Select Strategy"]
  a_star["AStarStrategy"]
  flow_field["FlowFieldStrategy"]
  execute["FindPath()"]
  result["Path Result"]

  context --> selector
  selector -->|small map| a_star
  selector -->|large crowd| flow_field
  a_star --> execute
  flow_field --> execute
  execute --> result
  result --> context
```
