---
title: "[Design Pattern] Singleton Pattern"
description: "A pattern that keeps a single instance and provides a global access point."
pubDate: 2026-03-03
lang: en
tags:
  - "Design Pattern"
  - "Creational"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-creational-singleton.svg
---

## One-line pattern summary
A pattern that keeps a single instance and provides a global access point.

## Typical Unity use cases
- When a single service such as game settings or logging is required.
- When using managers that persist across scenes.

## Parts (roles)
- Singleton Instance
- Global Accessor
- Lifetime Guard

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
using UnityEngine;

public sealed class GameSettingsService : MonoBehaviour
{
    public static GameSettingsService Instance { get; private set; }

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        Instance = this;
        DontDestroyOnLoad(gameObject);
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

This shows the flow where many callers share the same instance.

```mermaid
flowchart LR

  singleton["AudioManager.Instance"]
  instance["Single Object"]

  subgraph callers["Callers"]
    ui["UISystem"]
    gameplay["GameplaySystem"]
    audio_user["CutsceneSystem"]
  end

  ui --> singleton
  gameplay --> singleton
  audio_user --> singleton
  singleton -->|create once| instance
  instance -->|shared| ui
  instance -->|shared| gameplay
  instance -->|shared| audio_user
```
