---
title: "[Design Pattern] Memento Pattern"
description: "A pattern that saves and restores internal object state as encapsulated snapshots."
pubDate: 2026-04-09
lang: en
tags:
  - "Design Pattern"
  - "Behavioral"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-behavioral-memento.svg
---

## One-line pattern summary
A pattern that saves and restores internal object state as encapsulated snapshots.

## Typical Unity use cases
- When implementing checkpoint rollback.
- When supporting Undo / Redo.

## Parts (roles)
- Originator
- Memento
- Caretaker

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
using System.Collections.Generic;
using UnityEngine;

public readonly struct PlayerStateSnapshot
{
    public readonly Vector3 Position;
    public readonly int Health;

    public PlayerStateSnapshot(Vector3 position, int health)
    {
        Position = position;
        Health = health;
    }
}

public sealed class PlayerStateHistory
{
    private readonly Stack<PlayerStateSnapshot> snapshots = new();

    public void Save(PlayerStateSnapshot snapshot) => snapshots.Push(snapshot);
    public bool TryRestore(out PlayerStateSnapshot snapshot) => snapshots.TryPop(out snapshot);
}
```

## Advantages
- State save and restore logic can be isolated without exposing internal details.
- It works well for checkpoint and history-based systems.

## Things to watch out for
- Snapshot data can grow quickly if the state is large.
- If restore timing is not clearly defined, synchronization bugs can occur.

## Interaction diagram

This shows the flow where original state is stored as a snapshot and restored when needed.

```mermaid
flowchart LR

  originator["Originator"]
  create["Create Memento"]
  caretaker["Caretaker Stack"]
  undo["Undo Request"]
  restore["Restore Memento"]
  state["Previous State"]

  originator -->|save| create
  create -->|push| caretaker
  undo -->|pop| caretaker
  caretaker --> restore
  restore --> originator
  originator --> state
```
