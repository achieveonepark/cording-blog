---
title: "[Game Programming] Service Locator Pattern"
description: "A pattern that gathers access to shared services into a central registry to reduce coupling at the call site."
pubDate: 2026-04-16
lang: en
tags:
  - "Design Pattern"
  - "Game Programming"
category: "Design Pattern"
---

## One-line pattern summary
A pattern that gathers access to shared services into a central registry to reduce coupling at the call site.

## Typical Unity use cases
- When referencing audio, save, or analytics services globally.
- When you want to simplify DI in the early stage of development.

## Parts (roles)
- Service Interface
- Locator Registry
- Bootstrap Registration

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
public interface IAudioService
{
    void PlaySfx(string clipId);
}

public static class GameServices
{
    public static IAudioService AudioService { get; private set; }

    public static void RegisterAudioService(IAudioService audioService)
    {
        AudioService = audioService;
    }
}

public sealed class DamageFeedbackSystem
{
    public void OnHit()
    {
        GameServices.AudioService?.PlaySfx("Hit");
    }
}
```

## Advantages
- Shared services can be replaced or injected from one place, which speeds up early development.
- Since callers no longer own creation responsibilities, usage code becomes simpler.

## Things to watch out for
- Hidden global dependencies make test isolation and dependency tracking harder.
- If initialization order is wrong, runtime null-reference errors can easily occur.

## Interaction diagram

This shows the flow where the client looks up a service by interface key and uses it.

```mermaid
flowchart LR

  client["Gameplay System"]
  locator["Service Locator"]
  registry["Service Registry"]
  service["IAudioService Implementation"]
  result["Play SFX"]

  client -->|Resolve<IAudioService>()| locator
  locator -->|lookup key| registry
  registry -->|return instance| service
  service -->|Play(soundId)| result
  result -->|done| client
```
