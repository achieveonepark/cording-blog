---
title: "[Game Programming] Data Locality Pattern"
description: "A performance-oriented pattern that places frequently accessed data in contiguous memory to improve cache efficiency."
pubDate: 2026-03-11
lang: en
tags:
  - "Design Pattern"
  - "Game Programming"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-game-programming-data-locality.svg
---

## One-line pattern summary
A performance-oriented pattern that places frequently accessed data in contiguous memory to improve cache efficiency.

## Typical Unity use cases
- When updating a large number of objects such as bullets or particles every frame.
- When CPU bottlenecks need to be reduced.

## Parts (roles)
- Hot Data: frequently accessed values
- Contiguous Storage: sequential arrays
- Loop: simple repetitive processing

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
using UnityEngine;

public struct ProjectileState
{
    public Vector3 Position;
    public Vector3 Velocity;
}

public static class ProjectileSimulation
{
    public static void Simulate(ProjectileState[] projectileStates, float deltaTime)
    {
        for (int projectileIndex = 0; projectileIndex < projectileStates.Length; projectileIndex++)
        {
            projectileStates[projectileIndex].Position += projectileStates[projectileIndex].Velocity * deltaTime;
        }
    }
}
```

## Advantages
- Sequential memory access reduces cache misses and improves throughput for large-scale calculations.
- It becomes especially powerful when combined with data-oriented systems such as Burst and Jobs.

## Things to watch out for
- If the structure is optimized too heavily for performance, readability and domain clarity can suffer.
- Mistakes in array synchronization and index management can easily cause data mismatch bugs.

## Interaction diagram

This shows the flow where contiguous memory blocks are processed sequentially to improve cache efficiency.

```mermaid
flowchart LR

  frame["Frame Start"]
  chunk_loop["for (i = 0..N)"]
  cache_hit["Cache-friendly access"]
  result["Bulk update complete"]

  subgraph soa["SoA Buffers"]
    positions["positions[]"]
    velocities["velocities[]"]
    hp["hp[]"]
  end

  frame --> chunk_loop
  chunk_loop -->|read i| positions
  chunk_loop -->|read i| velocities
  chunk_loop -->|read i| hp
  positions --> cache_hit
  velocities --> cache_hit
  hp --> cache_hit
  cache_hit --> result
```
