---
title: "[디자인 패턴] Flyweight 패턴"
description: "공유 가능한 불변 상태를 재사용해 대량 객체의 메모리 사용을 줄이는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Flyweight"
  - "GoF"
  - "Structural"
category: "Design Pattern"
---

## 패턴 한 줄 설명
공유 가능한 불변 상태를 재사용해 대량 객체의 메모리 사용을 줄이는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 같은 시각 자원을 많은 인스턴스가 공유할 때
- 타일/아이콘/투사체 데이터 중복이 많을 때

## 구성 요소 (역할)
- Flyweight
- Factory(Cache)
- Intrinsic/Extrinsic State

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
using System.Collections.Generic;
using UnityEngine;

public sealed class ProjectileVisualFlyweight
{
    public readonly Sprite Sprite;

    public ProjectileVisualFlyweight(Sprite sprite)
    {
        Sprite = sprite;
    }
}

public sealed class ProjectileVisualFlyweightFactory
{
    private readonly Dictionary<string, ProjectileVisualFlyweight> cachedVisuals = new();

    public ProjectileVisualFlyweight Get(string visualKey, Sprite sprite)
    {
        if (!cachedVisuals.TryGetValue(visualKey, out ProjectileVisualFlyweight flyweight))
        {
            flyweight = new ProjectileVisualFlyweight(sprite);
            cachedVisuals.Add(visualKey, flyweight);
        }
        return flyweight;
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

공유 가능한 내부 상태를 재사용하고 외부 상태만 컨텍스트에서 주입하는 흐름입니다.

```mermaid
flowchart LR

  spawn["Spawn Bullet"]
  factory["Flyweight Factory"]
  shared["Shared BulletType"]
  context["Bullet Context (pos/speed)"]
  render["Draw / Simulate"]

  spawn -->|get(typeId)| factory
  factory -->|reuse| shared
  spawn -->|extrinsic state| context
  shared -->|intrinsic| render
  context -->|extrinsic| render
```
