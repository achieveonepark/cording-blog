---
title: "[디자인 패턴] Visitor 패턴"
description: "객체 구조를 건드리지 않고 연산을 Visitor로 분리해 확장하는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Visitor"
  - "GoF"
  - "Behavioral"
category: "Design Pattern"
---

## 패턴 한 줄 설명
객체 구조를 건드리지 않고 연산을 Visitor로 분리해 확장하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 여러 유닛 타입에 통계/보상 연산을 추가할 때
- 구조는 고정, 연산은 자주 늘어날 때

## 구성 요소 (역할)
- Visitor
- Element
- Accept

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
public interface IUnitVisitor
{
    void Visit(PlayerUnit playerUnit);
    void Visit(EnemyUnit enemyUnit);
}

public interface IVisitableUnit
{
    void Accept(IUnitVisitor visitor);
}

public sealed class DamagePreviewVisitor : IUnitVisitor
{
    public int TotalPreviewDamage { get; private set; }

    public void Visit(PlayerUnit playerUnit) => TotalPreviewDamage += 5;
    public void Visit(EnemyUnit enemyUnit) => TotalPreviewDamage += 10;
}
```

## 장점
- 행동 로직을 분리해 변경 영향도를 줄일 수 있습니다.
- 규칙 추가/교체가 비교적 안전합니다.

## 주의할 점
- 객체 수와 간접 호출이 늘어 흐름 파악이 어려워질 수 있습니다.
- 전환/실행 순서 버그를 테스트로 고정해야 합니다.

## 동작 다이어그램

객체 구조를 순회하며 방문자에 연산을 위임하는 흐름입니다.

```mermaid
flowchart LR

  client["Client"]
  structure["Object Structure"]
  visit["Visitor"]

  subgraph nodes["Elements"]
    enemy["Enemy"]
    npc["NPC"]
    item["Item"]
  end

  client -->|iterate| structure
  structure -->|accept(visitor)| enemy
  structure -->|accept(visitor)| npc
  structure -->|accept(visitor)| item
  enemy -->|visitEnemy| visit
  npc -->|visitNpc| visit
  item -->|visitItem| visit
```
