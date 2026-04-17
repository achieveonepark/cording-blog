---
title: "[Game Programming] Game Loop Pattern"
description: "The core execution pattern of games that maintains a stable input-update-render loop."
pubDate: 2026-04-02
lang: en
tags:
  - "Design Pattern"
  - "Game Programming"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-game-programming-game-loop.svg
---

## One-line pattern summary
The core execution pattern of games that maintains a stable input-update-render loop.

## Typical Unity use cases
- When implementing a fixed-step simulation.
- When input timing and render timing should be separated.

## Parts (roles)
- Input Step
- Simulate Step
- Render Step

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
using UnityEngine;

public sealed class FixedStepLoop : MonoBehaviour
{
    private const float SimulationStep = 1f / 60f;
    private float accumulatedDeltaTime;

    private void Update()
    {
        accumulatedDeltaTime += Time.deltaTime;
        while (accumulatedDeltaTime >= SimulationStep)
        {
            Simulate(SimulationStep);
            accumulatedDeltaTime -= SimulationStep;
        }
        float interpolationAlpha = accumulatedDeltaTime / SimulationStep;
        Render(interpolationAlpha);
    }

    private void Simulate(float deltaTime) { }

    private void Render(float interpolationAlpha) { }
}
```

## Advantages
- A fixed update order improves simulation reproducibility and makes debugging safer.
- Separating fixed-step updates from interpolation helps balance physics accuracy and visual smoothness.

## Things to watch out for
- On heavy frames, the `while` loop can grow too long and lead to a spiral of death.
- If responsibilities between `Update` and `FixedUpdate` are mixed, input latency and physics errors can increase.

## Interaction diagram

This is the main loop that repeats input, simulation, and render on a frame basis.

```mermaid
flowchart LR

  start["Frame Begin"]
  input["Poll Input"]
  fixed_step["Fixed Update / Physics"]
  game_update["Gameplay Update"]
  render["Render"]
  next["Next Frame"]

  start --> input
  input --> fixed_step
  fixed_step --> game_update
  game_update --> render
  render --> next
  next -->|loop| start
```
