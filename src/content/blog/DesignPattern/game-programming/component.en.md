---
title: "[Game Programming] Component Pattern"
description: "A pattern that builds entities by splitting behavior into small units and composing them instead of relying on inheritance."
pubDate: 2026-03-04
lang: en
tags:
  - "Design Pattern"
  - "Game Programming"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-game-programming-component.svg
---

## One-line pattern summary
A pattern that builds entities by splitting behavior into small units and composing them instead of relying on inheritance.

## Typical Unity use cases
- When character features need to be combined flexibly.
- When the design must allow features to be enabled and disabled at runtime.

## Parts (roles)
- Entity: component container
- Component: independent unit of behavior
- Composer: initial composition setup

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
using System.Collections.Generic;
using UnityEngine;

public interface IGameComponent
{
    void Tick(float deltaTime);
}

public sealed class MovementComponent : IGameComponent
{
    private readonly Transform targetTransform;
    private readonly float moveSpeed;

    public MovementComponent(Transform targetTransform, float moveSpeed)
    {
        this.targetTransform = targetTransform;
        this.moveSpeed = moveSpeed;
    }

    public void Tick(float deltaTime)
    {
        targetTransform.position += Vector3.forward * moveSpeed * deltaTime;
    }
}

public sealed class CharacterControllerRoot : MonoBehaviour
{
    private readonly List<IGameComponent> components = new();

    private void Awake()
    {
        components.Add(new MovementComponent(transform, 5f));
    }
}
```

## Advantages
- You can split features into modular pieces and quickly create variations of characters and objects.
- Since individual components can be tested or replaced, the regression surface stays smaller.

## Things to watch out for
- If dependencies between components grow, a new kind of coupling appears again.
- If the update loop is scattered across many components, call overhead and debugging difficulty increase.

## Interaction diagram

This shows the flow where an entity combines multiple components to produce the final state.

```mermaid
flowchart LR

  game_loop["Game Loop"]
  entity["Player Entity"]
  result["Transform / State Applied"]

  subgraph components["Components"]
    movement["Movement"]
    health["Health"]
    inventory["Inventory"]
  end

  game_loop -- "Tick()" --> entity
  entity -->|update| movement
  entity -->|update| health
  entity -->|update| inventory
  movement --> result
  health --> result
  inventory --> result
```
