---
title: "ChainOfResponsibility"
description: "요청을 여러 처리자 체인에 통과시키며 각 처리자가 순차적으로 책임을 수행하는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "ChainOfResponsibility"
  - "GoF"
  - "Behavioral"
category: "Design Pattern"
---

# Chain of Responsibility

## 패턴 한 줄 설명
요청을 여러 처리자 체인에 통과시키며 각 처리자가 순차적으로 책임을 수행하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 데미지 계산에 보호막/버프/저항을 순차 적용할 때
- 입력 필터를 단계별 처리할 때

## 구성 요소 (역할)
- Handler
- Concrete Handler
- Next Handler

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
public abstract class DamageModifierHandler
{
    private DamageModifierHandler nextHandler;

    public DamageModifierHandler SetNext(DamageModifierHandler nextHandler)
    {
        this.nextHandler = nextHandler;
        return nextHandler;
    }

    public int Handle(int incomingDamage)
    {
        int updatedDamage = ModifyDamage(incomingDamage);
        return nextHandler == null ? updatedDamage : nextHandler.Handle(updatedDamage);
    }

    protected abstract int ModifyDamage(int incomingDamage);
}

public sealed class ShieldDamageHandler : DamageModifierHandler
{
    protected override int ModifyDamage(int incomingDamage)
    {
        return System.Math.Max(0, incomingDamage - 20);
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

요청을 체인으로 넘기며 처리 가능 핸들러가 책임지는 흐름입니다.

```mermaid
flowchart LR

  request["Cast Skill Request"]
  auth["AuthHandler"]
  cooldown["CooldownHandler"]
  cost["CostHandler"]
  execute["ExecuteHandler"]
  reject["Rejected"]
  complete["Executed"]

  request --> auth
  auth -->|fail| reject
  auth -->|pass| cooldown
  cooldown -->|fail| reject
  cooldown -->|pass| cost
  cost -->|fail| reject
  cost -->|pass| execute
  execute --> complete
```
