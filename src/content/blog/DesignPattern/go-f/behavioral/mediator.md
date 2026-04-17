---
title: "[디자인 패턴] Mediator 패턴"
description: "여러 객체의 상호작용을 중재 객체로 모아 객체 간 직접 의존을 줄이는 패턴입니다."
pubDate: 2026-04-08
lang: ko
tags:
  - "Design Pattern"
  - "Behavioral"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-behavioral-mediator.svg
---

## 패턴 한 줄 설명
여러 객체의 상호작용을 중재 객체로 모아 객체 간 직접 의존을 줄이는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 인벤토리/장비/상점 UI 연동을 중앙 제어할 때
- 서로 참조가 복잡해질 때

## 구성 요소 (역할)
- Mediator
- Concrete Mediator
- Colleague

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
public interface IUiMediator
{
    void Notify(object sender, string eventId);
}

public sealed class LobbyUiMediator : IUiMediator
{
    public InventoryPanel InventoryPanel { get; set; }
    public EquipmentPanel EquipmentPanel { get; set; }

    public void Notify(object sender, string eventId)
    {
        if (sender == InventoryPanel && eventId == "ItemSelected")
        {
            EquipmentPanel.PreviewSelectedItem();
        }
    }
}
```

## 장점
- 행동 로직을 분리해 변경 영향도를 줄일 수 있습니다.
- 규칙 추가/교체가 비교적 안전합니다.

## 주의할 점
- 객체 수와 간접 호출이 늘어 흐름 파악이 어려워질 수 있습니다.
- 전환/실행 순서 버그를 테스트로 고정해야 합니다.

## 동작 다이어그램

컴포넌트 간 직접 통신 대신 중재자가 라우팅하는 흐름입니다.

```mermaid
flowchart LR

  mediator["GameMediator"]

  subgraph components["Components"]
    ui["UI"]
    audio["Audio"]
    quest["Quest"]
  end

  ui -->|event| mediator
  audio -->|event| mediator
  quest -->|event| mediator
  mediator -->|notify| ui
  mediator -->|notify| audio
  mediator -->|notify| quest
```
