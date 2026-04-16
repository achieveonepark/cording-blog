---
title: "Builder"
description: "A pattern that separates complex object creation into steps to improve readability and safety."
pubDate: 2026-04-16
lang: en
tags:
  - "Design Pattern"
  - "Builder"
  - "GoF"
  - "Creational"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-creational-builder.svg
---

## One-line pattern summary
A pattern that separates complex object creation into steps to improve readability and safety.

## Typical Unity use cases
- When creating configuration objects with many options.
- When the same process produces different results.

## Parts (roles)
- Builder
- Director (optional)
- Product

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
public sealed class EnemyWaveConfig
{
    public int EnemyCount;
    public float SpawnIntervalSeconds;
    public string RewardId;
}

public sealed class EnemyWaveBuilder
{
    private readonly EnemyWaveConfig waveConfig = new();

    public EnemyWaveBuilder SetEnemyCount(int enemyCount)
    {
        waveConfig.EnemyCount = enemyCount;
        return this;
    }

    public EnemyWaveBuilder SetSpawnInterval(float spawnIntervalSeconds)
    {
        waveConfig.SpawnIntervalSeconds = spawnIntervalSeconds;
        return this;
    }

    public EnemyWaveBuilder SetReward(string rewardId)
    {
        waveConfig.RewardId = rewardId;
        return this;
    }

    public EnemyWaveConfig Build() => waveConfig;
}
```

## Advantages
- Object creation responsibilities are well organized, which makes dependency management easier.
- Creation policies can be changed flexibly by environment or situation.

## Things to watch out for
- Avoid introducing overly abstract creation layers for simple problems.
- As creation rules increase, keeping documentation and tests in sync becomes more important.

## Interaction diagram

This shows the flow where a complex object is assembled step by step and returned at the end.

```mermaid
flowchart TD

  director["Director"]
  step1["BuildStats()"]
  step2["BuildEquipment()"]
  step3["BuildSkills()"]
  product["CharacterData"]

  director --> step1
  step1 --> step2
  step2 --> step3
  step3 --> product
```
