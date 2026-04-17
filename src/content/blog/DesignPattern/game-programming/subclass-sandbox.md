---
title: "[게임 프로그래밍 패턴] Subclass Sandbox"
description: "부모가 안전한 확장 API를 제공하고 자식은 그 범위 내에서만 구현하도록 제한하는 패턴입니다."
pubDate: 2026-04-14
lang: ko
tags:
  - "Design Pattern"
  - "Game Programming"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-game-programming-subclass-sandbox.svg
---

## 패턴 한 줄 설명
부모가 안전한 확장 API를 제공하고 자식은 그 범위 내에서만 구현하도록 제한하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 스킬/AI를 확장하되 코어 규칙을 보호해야 할 때
- 디자이너 확장 포인트를 통제할 때

## 구성 요소 (역할)
- Base Class: 안전 API 제공
- Hook: 자식 구현 지점
- Subclass: 확장 구현

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
public abstract class SkillBase
{
    public void ExecuteSkill()
    {
        if (!CanExecute())
        {
            return;
        }
        ConsumeResource();
        PlayCastAnimation();
        ApplyEffect();
    }

    protected virtual bool CanExecute() => true;

    protected virtual void ConsumeResource() { }

    protected virtual void PlayCastAnimation() { }

    protected abstract void ApplyEffect();
}

public sealed class FireballSkill : SkillBase
{
    protected override void ApplyEffect()
    {
        // Spawn fireball projectile.
    }
}
```

## 장점
- 부모가 허용한 API만 노출해 확장 코드를 안전하게 제한할 수 있습니다.
- 공통 규칙(쿨다운, 자원 소모 등)을 베이스에서 강제하기 좋습니다.

## 주의할 점
- 베이스 클래스가 비대해지면 확장 유연성이 오히려 떨어집니다.
- 훅 메서드 계약이 불명확하면 서브클래스마다 동작 일관성이 깨집니다.

## 동작 다이어그램

부모 템플릿이 공통 규칙을 강제하고 자식이 훅만 구현하는 흐름입니다.

```mermaid
flowchart LR

  caller["SkillRunner"]
  base["SkillBase.Cast()"]
  validate["Mana / Cooldown Check"]
  hook["DoCast() Hook"]
  child["FireballSkill.DoCast"]
  common["Apply Global Rule"]
  result["Skill Executed"]

  caller --> base
  base --> validate
  validate -->|pass| hook
  hook --> child
  child --> common
  common --> result
  validate -->|fail -> cancel| result
```
