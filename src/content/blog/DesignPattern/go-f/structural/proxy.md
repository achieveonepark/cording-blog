---
title: "[디자인 패턴] Proxy 패턴"
description: "실제 객체 접근 앞에 대리 객체를 두어 제어/지연 로딩/캐싱을 담당시키는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Structural"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-structural-proxy.svg
---

## 패턴 한 줄 설명
실제 객체 접근 앞에 대리 객체를 두어 제어/지연 로딩/캐싱을 담당시키는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 무거운 리소스를 지연 로딩할 때
- 원격 호출 앞단에 캐시/권한 검사를 둘 때

## 구성 요소 (역할)
- Subject
- Real Subject
- Proxy

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

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

## 장점
- 모듈 경계를 명확히 해 결합도를 낮출 수 있습니다.
- 기존 코드 수정 없이 기능 확장/통합이 쉬워집니다.

## 주의할 점
- 래퍼/어댑터 계층이 깊어지면 디버깅이 어려워집니다.
- 책임 경계가 흐려지지 않도록 인터페이스를 작게 유지해야 합니다.

## 동작 다이어그램

대리 객체가 접근 제어/지연 로딩/캐싱을 담당하는 흐름입니다.

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
