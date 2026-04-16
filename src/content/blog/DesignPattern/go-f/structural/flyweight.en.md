---
title: "Flyweight"
description: "A pattern that reduces memory usage for large numbers of objects by reusing shareable immutable state."
pubDate: 2026-04-16
lang: en
tags:
  - "Design Pattern"
  - "Flyweight"
  - "GoF"
  - "Structural"
category: "Design Pattern"
---

## One-line pattern summary
A pattern that reduces memory usage for large numbers of objects by reusing shareable immutable state.

## Typical Unity use cases
- When many instances share the same visual resources.
- When tile, icon, or projectile data contains lots of duplication.

## Parts (roles)
- Flyweight
- Factory (Cache)
- Intrinsic / Extrinsic State

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
using System.Collections.Generic;
using UnityEngine;

public sealed class ProjectileVisualFlyweight
{
    public readonly Sprite Sprite;

    public ProjectileVisualFlyweight(Sprite sprite)
    {
        Sprite = sprite;
    }
}

public sealed class ProjectileVisualFlyweightFactory
{
    private readonly Dictionary<string, ProjectileVisualFlyweight> cachedVisuals = new();

    public ProjectileVisualFlyweight Get(string visualKey, Sprite sprite)
    {
        if (!cachedVisuals.TryGetValue(visualKey, out ProjectileVisualFlyweight flyweight))
        {
            flyweight = new ProjectileVisualFlyweight(sprite);
            cachedVisuals.Add(visualKey, flyweight);
        }
        return flyweight;
    }
}
```

## Advantages
- It clarifies module boundaries and reduces coupling.
- Features can be extended or integrated without modifying existing code.

## Things to watch out for
- If wrapper layers become too deep, debugging gets harder.
- Interfaces should stay small so responsibility boundaries do not blur.

## Interaction diagram

This shows the flow where shareable intrinsic state is reused while extrinsic state is injected from context.

```mermaid
flowchart LR

  spawn["Spawn Bullet"]
  factory["Flyweight Factory"]
  shared["Shared BulletType"]
  context["Bullet Context (pos/speed)"]
  render["Draw / Simulate"]

  spawn -->|get(typeId)| factory
  factory -->|reuse| shared
  spawn -->|extrinsic state| context
  shared -->|intrinsic| render
  context -->|extrinsic| render
```
