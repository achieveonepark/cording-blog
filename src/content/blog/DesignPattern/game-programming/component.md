---
title: "[게임 프로그래밍 패턴] Component"
description: "상속 대신 기능을 작은 단위로 쪼개 조합해 엔티티를 구성하는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Game Programming"
category: "Design Pattern"
---

## 패턴 한 줄 설명
상속 대신 기능을 작은 단위로 쪼개 조합해 엔티티를 구성하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 캐릭터 기능을 유연하게 조합해야 할 때
- 런타임에 기능을 켜고 끄는 설계가 필요할 때

## 구성 요소 (역할)
- Entity: 컴포넌트 컨테이너
- Component: 독립 기능 단위
- Composer: 초기 조합 설정

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
using System.Collections.Generic;
using UnityEngine;

public interface IGameComponent
{
    void Tick(float deltaTime);
}

public sealed class MovementComponent : IGameComponent
{
    private readonly Transform targetTransform;
    private readonly float moveSpeed;

    public MovementComponent(Transform targetTransform, float moveSpeed)
    {
        this.targetTransform = targetTransform;
        this.moveSpeed = moveSpeed;
    }

    public void Tick(float deltaTime)
    {
        targetTransform.position += Vector3.forward * moveSpeed * deltaTime;
    }
}

public sealed class CharacterControllerRoot : MonoBehaviour
{
    private readonly List<IGameComponent> components = new();

    private void Awake()
    {
        components.Add(new MovementComponent(transform, 5f));
    }
}
```

## 장점
- 기능을 조립식으로 나눠 캐릭터/오브젝트 변형을 빠르게 만들 수 있습니다.
- 특정 컴포넌트만 테스트/교체할 수 있어 회귀 범위를 줄입니다.

## 주의할 점
- 컴포넌트 간 의존성이 커지면 결국 또 다른 결합이 생깁니다.
- Update 루프가 컴포넌트마다 분산되면 호출 비용과 디버깅 난도가 올라갑니다.

## 동작 다이어그램

엔티티가 여러 컴포넌트를 조합해 최종 상태를 만드는 흐름입니다.

```mermaid
flowchart LR

  game_loop["Game Loop"]
  entity["Player Entity"]
  result["Transform / State 반영"]

  subgraph components["Components"]
    movement["Movement"]
    health["Health"]
    inventory["Inventory"]
  end

  game_loop -->|Tick()| entity
  entity -->|update| movement
  entity -->|update| health
  entity -->|update| inventory
  movement --> result
  health --> result
  inventory --> result
```
