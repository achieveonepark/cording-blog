---
title: "[디자인 패턴] Factory Method 패턴"
description: "생성 메서드의 실제 생성 책임을 하위 클래스가 결정하도록 위임하는 패턴입니다."
pubDate: 2026-03-29
lang: ko
tags:
  - "Design Pattern"
  - "Structural"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-structural-factory-method.svg
---

# Factory Method

## 패턴 한 줄 설명
생성 메서드의 실제 생성 책임을 하위 클래스가 결정하도록 위임하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 무기별 투사체 생성 규칙이 다를 때
- 타입별 초기화 로직을 분리할 때

## 구성 요소 (역할)
- Creator
- Concrete Creator
- Product

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
using UnityEngine;

public interface IProjectile
{
    void Fire(Vector3 startPosition, Vector3 direction);
}

public abstract class ProjectileSpawner : MonoBehaviour
{
    public void Shoot(Vector3 startPosition, Vector3 direction)
    {
        IProjectile projectile = CreateProjectile();
        projectile.Fire(startPosition, direction);
    }

    protected abstract IProjectile CreateProjectile();
}
```

## 장점
- 모듈 경계를 명확히 해 결합도를 낮출 수 있습니다.
- 기존 코드 수정 없이 기능 확장/통합이 쉬워집니다.

## 주의할 점
- 래퍼/어댑터 계층이 깊어지면 디버깅이 어려워집니다.
- 책임 경계가 흐려지지 않도록 인터페이스를 작게 유지해야 합니다.

## 동작 다이어그램

부모의 생성 절차는 유지하고 실제 생성 타입은 하위 클래스가 결정하는 흐름입니다.

```mermaid
flowchart LR

  client["Client"]
  creator["Creator.Spawn()"]
  factory_method["CreateProduct()"]
  concrete_a["BulletSpawner"]
  concrete_b["EffectSpawner"]
  product["IProduct"]

  client --> creator
  creator --> factory_method
  factory_method -->|mode A| concrete_a
  factory_method -->|mode B| concrete_b
  concrete_a --> product
  concrete_b --> product
  product --> client
```
