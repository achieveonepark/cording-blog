---
title: "[디자인 패턴] Prototype 패턴"
description: "새 객체를 생성자 호출 대신 기존 원형 복제로 만드는 패턴입니다."
pubDate: 2026-03-07
lang: ko
tags:
  - "Design Pattern"
  - "Creational"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-creational-prototype.svg
---

## 패턴 한 줄 설명
새 객체를 생성자 호출 대신 기존 원형 복제로 만드는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 몬스터 템플릿 복제로 런타임 인스턴스를 만들 때
- 생성 비용이 높은 객체를 빠르게 복제할 때

## 구성 요소 (역할)
- Prototype
- Clone
- Prototype Registry

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
using UnityEngine;

[CreateAssetMenu(menuName = "Game/Enemy Archetype Data")]
public sealed class EnemyArchetypeData : ScriptableObject
{
    public int baseHealth;
    public float moveSpeed;

    public EnemyRuntimeData CloneRuntimeData()
    {
        return new EnemyRuntimeData(baseHealth, moveSpeed);
    }
}

public sealed class EnemyRuntimeData
{
    public int CurrentHealth;
    public float CurrentMoveSpeed;

    public EnemyRuntimeData(int currentHealth, float currentMoveSpeed)
    {
        CurrentHealth = currentHealth;
        CurrentMoveSpeed = currentMoveSpeed;
    }
}
```

## 장점
- 객체 생성 책임을 정리해 의존성 관리가 쉬워집니다.
- 환경별/상황별 생성 정책을 유연하게 바꿀 수 있습니다.

## 주의할 점
- 간단한 문제에 과한 생성 추상화를 넣지 않아야 합니다.
- 생성 규칙이 많아질수록 문서와 테스트 동기화가 중요합니다.

## 동작 다이어그램

등록된 원형을 복제하고 런타임 값만 덧입혀 인스턴스를 만드는 흐름입니다.

```mermaid
flowchart LR

  spawner["Spawner"]
  registry["Prototype Registry"]
  prototype["Enemy Prototype"]
  clone["Clone()"]
  customize["Set Runtime Values"]
  result["Spawned Enemy"]

  spawner -->|request type| registry
  registry --> prototype
  prototype --> clone
  clone --> customize
  customize --> result
```
