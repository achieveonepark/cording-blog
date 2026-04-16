---
title: "Iterator"
description: "컬렉션 내부 구조를 숨기고 순회 방법만 외부에 노출하는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Iterator"
  - "GoF"
  - "Behavioral"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-behavioral-iterator.svg
---

## 패턴 한 줄 설명
컬렉션 내부 구조를 숨기고 순회 방법만 외부에 노출하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 인벤토리/퀘스트 목록을 일관된 방식으로 순회할 때
- 컬렉션 구현 변경 영향을 줄일 때

## 구성 요소 (역할)
- Aggregate
- Iterator
- Client

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
using System.Collections;
using System.Collections.Generic;

public sealed class InventoryCollection : IEnumerable<InventoryItem>
{
    private readonly List<InventoryItem> items = new();

    public void Add(InventoryItem item)
    {
        items.Add(item);
    }

    public IEnumerator<InventoryItem> GetEnumerator()
    {
        foreach (InventoryItem item in items)
        {
            yield return item;
        }
    }

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}
```

## 장점
- 행동 로직을 분리해 변경 영향도를 줄일 수 있습니다.
- 규칙 추가/교체가 비교적 안전합니다.

## 주의할 점
- 객체 수와 간접 호출이 늘어 흐름 파악이 어려워질 수 있습니다.
- 전환/실행 순서 버그를 테스트로 고정해야 합니다.

## 동작 다이어그램

집합 내부 표현을 노출하지 않고 순차 접근하는 흐름입니다.

```mermaid
flowchart LR

  client["Client"]
  aggregate["Inventory"]
  iterator["InventoryIterator"]
  check["HasNext?"]
  next["Next()"]
  value["Current Item"]

  client -->|CreateIterator()| aggregate
  aggregate --> iterator
  client --> check
  check -->|true| next
  next --> value
  value --> client
  next -->|loop| check
  check -->|false| client
```
