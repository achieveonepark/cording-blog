---
title: "[디자인 패턴] Interpreter 패턴"
description: "작은 도메인 언어 규칙을 문법 객체로 해석해 결과를 계산하는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Interpreter"
  - "GoF"
  - "Behavioral"
category: "Design Pattern"
---

## 패턴 한 줄 설명
작은 도메인 언어 규칙을 문법 객체로 해석해 결과를 계산하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 퀘스트 조건 DSL을 만들 때
- 대화 분기 조건을 데이터화할 때

## 구성 요소 (역할)
- Expression
- Terminal
- Nonterminal
- Context

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
public interface IConditionExpression
{
    bool Evaluate(PlayerContext context);
}

public sealed class LevelAtLeastExpression : IConditionExpression
{
    private readonly int requiredLevel;

    public LevelAtLeastExpression(int requiredLevel)
    {
        this.requiredLevel = requiredLevel;
    }

    public bool Evaluate(PlayerContext context)
    {
        return context.PlayerLevel >= requiredLevel;
    }
}

public sealed class AndExpression : IConditionExpression
{
    private readonly IConditionExpression leftExpression;
    private readonly IConditionExpression rightExpression;

    public AndExpression(IConditionExpression leftExpression, IConditionExpression rightExpression)
    {
        this.leftExpression = leftExpression;
        this.rightExpression = rightExpression;
    }

    public bool Evaluate(PlayerContext context)
    {
        return leftExpression.Evaluate(context) && rightExpression.Evaluate(context);
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

문법 규칙을 표현식 트리로 해석해 결과를 계산하는 흐름입니다.

```mermaid
flowchart LR

  input["Rule String"]
  lexer["Tokenizer"]
  parser["Parser"]
  ast["Expression Tree"]
  interpreter["Interpret(context)"]
  result["bool / score"]

  input --> lexer
  lexer --> parser
  parser --> ast
  ast -->|recursive visit| interpreter
  interpreter --> result
```
