---
title: "[Design Pattern] Proxy Pattern"
description: "A pattern that places a surrogate object in front of the real object to handle control, lazy loading, or caching."
pubDate: 2026-03-27
lang: en
tags:
  - "Design Pattern"
  - "Structural"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-structural-proxy.svg
---

## One-line pattern summary
A pattern that places a surrogate object in front of the real object to handle control, lazy loading, or caching.

## Typical Unity use cases
- When lazily loading heavy resources.
- When cache or permission checks are needed before remote calls.

## Parts (roles)
- Subject
- Real Subject
- Proxy

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
using System.Collections.Generic;

public interface IRemoteInventoryService
{
    IReadOnlyList<string> GetItemIds();
}

public sealed class CachingInventoryProxy : IRemoteInventoryService
{
    private readonly IRemoteInventoryService remoteService;
    private IReadOnlyList<string> cachedItemIds;

    public CachingInventoryProxy(IRemoteInventoryService remoteService)
    {
        this.remoteService = remoteService;
    }

    public IReadOnlyList<string> GetItemIds()
    {
        cachedItemIds ??= remoteService.GetItemIds();
        return cachedItemIds;
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

This shows the flow where a proxy handles access control, lazy loading, and caching.

```mermaid
flowchart LR

  client["Client"]
  proxy["TextureProxy"]
  check_cache["Loaded?"]
  real["RealTexture"]
  result["Texture Data"]

  client -- "Draw()" --> proxy
  proxy --> check_cache
  check_cache -->|no| real
  real -->|load once| proxy
  check_cache -->|yes| proxy
  proxy -->|forward/cached| result
  result --> client
```
