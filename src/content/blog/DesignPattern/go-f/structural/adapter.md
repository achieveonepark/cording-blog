---
title: "[디자인 패턴] Adapter 패턴"
description: "호환되지 않는 기존 인터페이스를 현재 시스템 인터페이스로 변환하는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Structural"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-structural-adapter.svg
---

## 패턴 한 줄 설명
호환되지 않는 기존 인터페이스를 현재 시스템 인터페이스로 변환하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 레거시/외부 SDK를 프로젝트 표준 API에 맞출 때
- 기존 구현을 수정 없이 재사용할 때

## 구성 요소 (역할)
- Target
- Adaptee
- Adapter

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

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

## 장점
- 모듈 경계를 명확히 해 결합도를 낮출 수 있습니다.
- 기존 코드 수정 없이 기능 확장/통합이 쉬워집니다.

## 주의할 점
- 래퍼/어댑터 계층이 깊어지면 디버깅이 어려워집니다.
- 책임 경계가 흐려지지 않도록 인터페이스를 작게 유지해야 합니다.

## 동작 다이어그램

기존 인터페이스를 목표 인터페이스로 변환해 재사용하는 흐름입니다.

```mermaid
flowchart LR

  client["Game UI"]
  target["ILeaderboardService"]
  adapter["LeaderboardAdapter"]
  adaptee["Legacy SDK"]
  result["Rank Data"]

  client -- "GetTopRanks()" --> target
  target --> adapter
  adapter -->|Convert Call| adaptee
  adaptee -->|legacy response| adapter
  adapter -->|mapped DTO| result
  result --> client
```
