---
title: "Type Object"
description: "객체 타입을 클래스가 아닌 데이터로 모델링해 확장을 데이터 추가로 처리하는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Type Object"
  - "Game Programming"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-game-programming-type-object.svg
---

## 패턴 한 줄 설명
객체 타입을 클래스가 아닌 데이터로 모델링해 확장을 데이터 추가로 처리하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 무기/몬스터 타입을 코드 수정 없이 늘릴 때
- 밸런싱 값을 기획 데이터로 관리할 때

## 구성 요소 (역할)
- Type Data: ScriptableObject/테이블
- Runtime Instance: 타입 참조 객체
- Registry: 타입 조회

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
using UnityEngine;

[CreateAssetMenu(menuName = "Game/Weapon Type Data")]
public sealed class WeaponTypeData : ScriptableObject
{
    public string weaponId;
    public int attackPower;
    public float cooldownSeconds;
}

public sealed class WeaponRuntime
{
    private readonly WeaponTypeData weaponTypeData;

    public WeaponRuntime(WeaponTypeData weaponTypeData)
    {
        this.weaponTypeData = weaponTypeData;
    }

    public int AttackPower => weaponTypeData.attackPower;
}
```

## 장점
- 타입 추가를 코드 변경 없이 데이터(ScriptableObject) 추가로 처리할 수 있습니다.
- 기획/밸런싱 작업을 코드 배포와 분리해 반복 속도를 높입니다.

## 주의할 점
- 데이터 스키마가 자주 바뀌면 마이그레이션과 호환성 관리 비용이 큽니다.
- 런타임 참조 누락 시 에디터에서는 조용하지만 실제 빌드에서 오류가 날 수 있습니다.

## 동작 다이어그램

인스턴스가 타입 데이터(ScriptableObject)를 참조해 동작을 결정하는 흐름입니다.

```mermaid
flowchart LR

  instance["Weapon Instance"]
  type_data["WeaponTypeData (SO)"]
  calculator["Damage Calculator"]
  context["Runtime Context"]
  result["Final Damage"]

  instance -->|typeId| type_data
  instance -->|durability / level| context
  type_data -->|base stats| calculator
  context -->|runtime modifiers| calculator
  calculator --> result
  result -->|apply| instance
```
