---
title: "[Design Pattern] State Pattern"
description: "A pattern that separates behavior by state into objects and swaps behavior based on state transitions."
pubDate: 2026-04-16
lang: en
tags:
  - "Design Pattern"
  - "Behavioral"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-behavioral-state.svg
---

## One-line pattern summary
A pattern that separates behavior by state into objects and swaps behavior based on state transitions.

## Typical Unity use cases
- When player movement and combat states keep increasing.
- When `if-else` state branching becomes too large.

## Parts (roles)
- Context
- State Interface
- Concrete State

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
public interface ICharacterState
{
    void Tick(PlayerStateMachine stateMachine);
}

public sealed class IdleState : ICharacterState
{
    public void Tick(PlayerStateMachine stateMachine)
    {
        if (stateMachine.MoveInput > 0f)
        {
            stateMachine.ChangeState(new RunState());
        }
    }
}

public sealed class RunState : ICharacterState
{
    public void Tick(PlayerStateMachine stateMachine)
    {
        if (stateMachine.MoveInput <= 0f)
        {
            stateMachine.ChangeState(new IdleState());
        }
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

This shows the flow where the context delegates to the current state object and performs transitions.

```mermaid
flowchart LR

  context["PlayerContext"]
  idle["IdleState"]
  run["RunState"]
  jump["JumpState"]
  input["Input"]
  output["Animation / Logic"]

  input --> context
  context -->|delegate| idle
  idle -->|move key| run
  run -->|jump key| jump
  jump -->|landing| idle
  idle --> output
  run --> output
  jump --> output
```
