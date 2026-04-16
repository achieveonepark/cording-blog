---
title: "Prototype"
description: "A pattern that creates new objects by cloning an existing prototype instead of calling a constructor."
pubDate: 2026-04-16
lang: en
tags:
  - "Design Pattern"
  - "Prototype"
  - "GoF"
  - "Creational"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-creational-prototype.svg
---

## One-line pattern summary
A pattern that creates new objects by cloning an existing prototype instead of calling a constructor.

## Typical Unity use cases
- When creating runtime instances by cloning monster templates.
- When quickly duplicating objects whose creation cost is high.

## Parts (roles)
- Prototype
- Clone
- Prototype Registry

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
using UnityEngine;

[CreateAssetMenu(menuName = "Game/Enemy Archetype Data")]
public sealed class EnemyArchetypeData : ScriptableObject
{
    public int baseHealth;
    public float moveSpeed;

    public EnemyRuntimeData CloneRuntimeData()
    {
        return new EnemyRuntimeData(baseHealth, moveSpeed);
    }
}

public sealed class EnemyRuntimeData
{
    public int CurrentHealth;
    public float CurrentMoveSpeed;

    public EnemyRuntimeData(int currentHealth, float currentMoveSpeed)
    {
        CurrentHealth = currentHealth;
        CurrentMoveSpeed = currentMoveSpeed;
    }
}
```

## Advantages
- Object creation responsibilities are well organized, which makes dependency management easier.
- Creation policies can be changed flexibly by environment or situation.

## Things to watch out for
- Avoid introducing overly abstract creation layers for simple problems.
- As creation rules increase, keeping documentation and tests in sync becomes more important.

## Interaction diagram

This shows the flow where a registered prototype is cloned and then customized with runtime values.

```mermaid
flowchart LR

  spawner["Spawner"]
  registry["Prototype Registry"]
  prototype["Enemy Prototype"]
  clone["Clone()"]
  customize["Set Runtime Values"]
  result["Spawned Enemy"]

  spawner -->|request type| registry
  registry --> prototype
  prototype --> clone
  clone --> customize
  customize --> result
```
