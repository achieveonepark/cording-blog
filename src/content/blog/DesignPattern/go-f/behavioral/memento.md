---
title: "[디자인 패턴] Memento 패턴"
description: "객체 내부 상태를 캡슐화한 스냅샷으로 저장/복원하는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Memento"
  - "GoF"
  - "Behavioral"
category: "Design Pattern"
---

## 패턴 한 줄 설명
객체 내부 상태를 캡슐화한 스냅샷으로 저장/복원하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 체크포인트 복귀를 구현할 때
- Undo/Redo를 지원할 때

## 구성 요소 (역할)
- Originator
- Memento
- Caretaker

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
using System.Collections.Generic;
using UnityEngine;

public readonly struct PlayerStateSnapshot
{
    public readonly Vector3 Position;
    public readonly int Health;

    public PlayerStateSnapshot(Vector3 position, int health)
    {
        Position = position;
        Health = health;
    }
}

public sealed class PlayerStateHistory
{
    private readonly Stack<PlayerStateSnapshot> snapshots = new();

    public void Save(PlayerStateSnapshot snapshot) => snapshots.Push(snapshot);
    public bool TryRestore(out PlayerStateSnapshot snapshot) => snapshots.TryPop(out snapshot);
}
```

## 장점
- 행동 로직을 분리해 변경 영향도를 줄일 수 있습니다.
- 규칙 추가/교체가 비교적 안전합니다.

## 주의할 점
- 객체 수와 간접 호출이 늘어 흐름 파악이 어려워질 수 있습니다.
- 전환/실행 순서 버그를 테스트로 고정해야 합니다.

## 동작 다이어그램

원본 상태를 스냅샷으로 저장하고 필요 시 복원하는 흐름입니다.

```mermaid
flowchart LR

  originator["Originator"]
  create["Create Memento"]
  caretaker["Caretaker Stack"]
  undo["Undo Request"]
  restore["Restore Memento"]
  state["Previous State"]

  originator -->|save| create
  create -->|push| caretaker
  undo -->|pop| caretaker
  caretaker --> restore
  restore --> originator
  originator --> state
```
