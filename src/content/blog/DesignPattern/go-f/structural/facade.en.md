---
title: "Facade"
description: "A pattern that wraps a complex subsystem with a simple top-level API to improve usability."
pubDate: 2026-04-16
lang: en
tags:
  - "Design Pattern"
  - "Facade"
  - "GoF"
  - "Structural"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-structural-facade.svg
---

## One-line pattern summary
A pattern that wraps a complex subsystem with a simple top-level API to improve usability.

## Typical Unity use cases
- When hiding a game boot sequence behind one method.
- When internal module details should be hidden from the outside.

## Parts (roles)
- Facade
- Subsystem
- Client

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
public sealed class GameStartupFacade
{
    private readonly SaveSystem saveSystem = new();
    private readonly AudioSystem audioSystem = new();
    private readonly UiSystem uiSystem = new();

    public void StartGame()
    {
        saveSystem.Load();
        audioSystem.Initialize();
        uiSystem.OpenLobby();
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

This shows the flow where complex subsystem calls are simplified into a single entry point.

```mermaid
flowchart LR

  client["Game Bootstrap"]
  facade["StartGameFacade"]
  assets["AssetLoader"]
  save["SaveSystem"]
  network["NetworkClient"]
  result["Ready To Play"]

  client -->|StartGame()| facade
  facade -->|load| assets
  facade -->|restore| save
  facade -->|connect| network
  assets --> result
  save --> result
  network --> result
```
