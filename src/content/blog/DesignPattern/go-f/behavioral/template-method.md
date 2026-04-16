---
title: "TemplateMethod"
description: "전체 절차는 고정하고 세부 단계만 하위 클래스에서 바꾸는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "TemplateMethod"
  - "GoF"
  - "Behavioral"
category: "Design Pattern"
---

# Template Method

## 패턴 한 줄 설명
전체 절차는 고정하고 세부 단계만 하위 클래스에서 바꾸는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 스킬 실행 순서는 같고 효과만 다를 때
- 공통 전처리/후처리를 강제할 때

## 구성 요소 (역할)
- Template Method
- Primitive Operation
- Concrete Class

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
public abstract class SkillExecutionTemplate
{
    public void Execute()
    {
        if (!CanExecute())
        {
            return;
        }
        ConsumeCost();
        PlayCastAnimation();
        ApplyEffect();
    }

    protected virtual bool CanExecute() => true;

    protected virtual void ConsumeCost() { }

    protected virtual void PlayCastAnimation() { }

    protected abstract void ApplyEffect();
}

public sealed class HealSkillTemplate : SkillExecutionTemplate
{
    protected override void ApplyEffect()
    {
        // Heal target.
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

부모가 알고리즘 순서를 고정하고 일부 단계만 하위 클래스가 바꾸는 흐름입니다.

```mermaid
flowchart TD

  template["AbilityBase.Execute()"]
  step1["Validate()"]
  step2["ConsumeResource()"]
  step3["DoAction() (override)"]
  step4["AfterAction()"]
  result["Ability Done"]

  template --> step1
  step1 --> step2
  step2 --> step3
  step3 --> step4
  step4 --> result
```
