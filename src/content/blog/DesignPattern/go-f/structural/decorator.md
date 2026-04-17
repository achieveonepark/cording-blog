---
title: "[디자인 패턴] Decorator 패턴"
description: "객체를 감싸는 래퍼를 통해 런타임에 기능을 동적으로 덧붙이는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Structural"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-structural-decorator.svg
---

## 패턴 한 줄 설명
객체를 감싸는 래퍼를 통해 런타임에 기능을 동적으로 덧붙이는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 무기에 속성 부여를 조합식으로 적용할 때
- 기존 코드를 건드리지 않고 기능 확장할 때

## 구성 요소 (역할)
- Component
- Decorator Base
- Concrete Decorator

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
public interface IWeaponDamageCalculator
{
    int CalculateDamage();
}

public sealed class BaseWeaponDamageCalculator : IWeaponDamageCalculator
{
    public int CalculateDamage() => 10;
}

public abstract class WeaponDamageDecorator : IWeaponDamageCalculator
{
    protected readonly IWeaponDamageCalculator innerCalculator;

    protected WeaponDamageDecorator(IWeaponDamageCalculator innerCalculator)
    {
        this.innerCalculator = innerCalculator;
    }

    public abstract int CalculateDamage();
}

public sealed class FireDamageDecorator : WeaponDamageDecorator
{
    public FireDamageDecorator(IWeaponDamageCalculator innerCalculator) : base(innerCalculator) { }

    public override int CalculateDamage() => innerCalculator.CalculateDamage() + 5;
}
```

## 장점
- 모듈 경계를 명확히 해 결합도를 낮출 수 있습니다.
- 기존 코드 수정 없이 기능 확장/통합이 쉬워집니다.

## 주의할 점
- 래퍼/어댑터 계층이 깊어지면 디버깅이 어려워집니다.
- 책임 경계가 흐려지지 않도록 인터페이스를 작게 유지해야 합니다.

## 동작 다이어그램

기능을 래퍼로 감싸 동적으로 책임을 추가하는 체인 흐름입니다.

```mermaid
flowchart LR

  client["Client"]
  base["Base Damage"]
  critical["CriticalDecorator"]
  elemental["ElementDecorator"]
  result["Final Damage"]

  client -->|calculate| elemental
  elemental -->|delegate| critical
  critical -->|delegate| base
  base -->|base value| critical
  critical -->|+ crit| elemental
  elemental -->|+ element| result
```
