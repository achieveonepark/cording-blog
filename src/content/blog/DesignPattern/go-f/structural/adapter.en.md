---
title: "Adapter"
description: "A pattern that converts an incompatible existing interface into the interface expected by the current system."
pubDate: 2026-04-16
lang: en
tags:
  - "Design Pattern"
  - "Adapter"
  - "GoF"
  - "Structural"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-structural-adapter.svg
---

## One-line pattern summary
A pattern that converts an incompatible existing interface into the interface expected by the current system.

## Typical Unity use cases
- When aligning a legacy or external SDK with the project's standard API.
- When reusing an existing implementation without modifying it.

## Parts (roles)
- Target
- Adaptee
- Adapter

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
public interface IAdsService
{
    void ShowRewardedAd(string placementId);
}

public sealed class LegacyAdsSdk
{
    public void ShowRewardVideo(string zoneId) { }
}

public sealed class LegacyAdsServiceAdapter : IAdsService
{
    private readonly LegacyAdsSdk legacyAdsSdk = new();

    public void ShowRewardedAd(string placementId)
    {
        legacyAdsSdk.ShowRewardVideo(placementId);
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

This shows the flow where an existing interface is converted into the target interface for reuse.

```mermaid
flowchart LR

  client["Game UI"]
  target["ILeaderboardService"]
  adapter["LeaderboardAdapter"]
  adaptee["Legacy SDK"]
  result["Rank Data"]

  client -->|GetTopRanks()| target
  target --> adapter
  adapter -->|Convert Call| adaptee
  adaptee -->|legacy response| adapter
  adapter -->|mapped DTO| result
  result --> client
```
