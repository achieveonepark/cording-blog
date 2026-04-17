---
title: "[디자인 패턴] Composite 패턴"
description: "개별 객체와 복합 객체를 동일 인터페이스로 다루는 트리 구조 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Composite"
  - "GoF"
  - "Structural"
category: "Design Pattern"
---

## 패턴 한 줄 설명
개별 객체와 복합 객체를 동일 인터페이스로 다루는 트리 구조 패턴입니다.

## Unity에서 쓰는 대표 상황
- 퀘스트 목표를 트리로 구성할 때
- 노드/그룹 노드를 같은 방식으로 처리할 때

## 구성 요소 (역할)
- Component
- Leaf
- Composite

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
using System.Collections.Generic;

public interface IQuestCondition
{
    bool IsCompleted();
}

public sealed class KillMonsterCondition : IQuestCondition
{
    public bool IsCompleted() => false;
}

public sealed class AllConditionsGroup : IQuestCondition
{
    private readonly List<IQuestCondition> childConditions = new();

    public void Add(IQuestCondition childCondition)
    {
        childConditions.Add(childCondition);
    }

    public bool IsCompleted()
    {
        foreach (IQuestCondition childCondition in childConditions)
        {
            if (!childCondition.IsCompleted())
            {
                return false;
            }
        }
        return true;
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

개별 객체와 복합 객체를 동일 인터페이스로 재귀 처리하는 흐름입니다.

```mermaid
flowchart TD

  client["Client"]
  root["UIRoot (Composite)"]
  panel["Panel (Composite)"]
  button["Button (Leaf)"]
  text_label["Label (Leaf)"]
  render["Render()"]

  client -->|render()| root
  root -->|render child| panel
  panel -->|render child| button
  panel -->|render child| text_label
  button --> render
  text_label --> render
```
