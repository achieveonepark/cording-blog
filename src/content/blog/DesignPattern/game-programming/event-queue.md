---
title: "Event Queue"
description: "이벤트 발행과 소비를 큐로 분리해 시스템 간 결합을 낮추는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Event Queue"
  - "Game Programming"
category: "Design Pattern"
---

## 패턴 한 줄 설명
이벤트 발행과 소비를 큐로 분리해 시스템 간 결합을 낮추는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 전투 이벤트를 UI/사운드/보상에 동시에 전달할 때
- 즉시 호출 결합을 줄이고 싶을 때

## 구성 요소 (역할)
- Publisher: 이벤트 발행
- Queue: 이벤트 저장
- Consumer: 프레임 단위 처리

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
using System.Collections.Generic;
using UnityEngine;

public readonly struct CombatEvent
{
    public readonly string EventType;
    public readonly int Value;

    public CombatEvent(string eventType, int value)
    {
        EventType = eventType;
        Value = value;
    }
}

public sealed class CombatEventQueue : MonoBehaviour
{
    private readonly Queue<CombatEvent> pendingEvents = new();

    public void Publish(CombatEvent combatEvent)
    {
        pendingEvents.Enqueue(combatEvent);
    }

    private void Update()
    {
        while (pendingEvents.Count > 0)
        {
            CombatEvent combatEvent = pendingEvents.Dequeue();
            Debug.Log($"${combatEvent.EventType}: ${combatEvent.Value}");
        }
    }
}
```

## 장점
- 생산자/소비자 타이밍을 분리해 시스템 간 직접 의존을 줄입니다.
- 이벤트 로깅, 재생, 배치 처리 같은 확장이 쉬워집니다.

## 주의할 점
- 큐가 밀리면 지연(latency)으로 반응성이 떨어질 수 있습니다.
- 이벤트 순서/중복 처리 규칙을 명확히 하지 않으면 재현 어려운 버그가 납니다.

## 동작 다이어그램

생산자와 소비자를 큐로 분리해 비동기 전달하는 흐름입니다.

```mermaid
flowchart LR

  queue["Event Queue"]

  subgraph producers["Producers"]
    combat["CombatSystem"]
    ai["AISystem"]
    loot["LootSystem"]
  end

  subgraph consumers["Consumers"]
    ui["UISystem"]
    audio["AudioSystem"]
    analytics["AnalyticsSystem"]
  end

  combat -->|enqueue| queue
  ai -->|enqueue| queue
  loot -->|enqueue| queue
  queue -->|dequeue| ui
  queue -->|dequeue| audio
  queue -->|dequeue| analytics
```
