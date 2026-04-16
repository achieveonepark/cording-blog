---
title: "Object Pool"
description: "자주 생성/파괴되는 객체를 재사용해 할당 비용과 GC 스파이크를 줄이는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Object Pool"
  - "Game Programming"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-game-programming-object-pool.svg
---

## 패턴 한 줄 설명
자주 생성/파괴되는 객체를 재사용해 할당 비용과 GC 스파이크를 줄이는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 총알/이펙트를 많이 만들고 지울 때
- 모바일에서 GC 튐을 줄여야 할 때

## 구성 요소 (역할)
- Pool: 재사용 저장소
- Get: 대여
- Release: 반납

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
using UnityEngine;
using UnityEngine.Pool;

public sealed class ProjectilePoolController : MonoBehaviour
{
    [SerializeField] private GameObject projectilePrefab;
    private ObjectPool<GameObject> projectilePool;

    private void Awake()
    {
        projectilePool = new ObjectPool<GameObject>(
            createFunc: () => Instantiate(projectilePrefab),
            actionOnGet: projectile => projectile.SetActive(true),
            actionOnRelease: projectile => projectile.SetActive(false),
            actionOnDestroy: projectile => Destroy(projectile),
            collectionCheck: false,
            defaultCapacity: 32,
            maxSize: 256
        );
    }

    public GameObject SpawnProjectile(Vector3 spawnPosition)
    {
        GameObject projectile = projectilePool.Get();
        projectile.transform.position = spawnPosition;
        return projectile;
    }
}
```

## 장점
- Instantiate/Destroy 빈도를 낮춰 GC 스파이크와 히치(hitch)를 줄입니다.
- 최대 개체 수를 통제해 성능 예산을 예측하기 쉬워집니다.

## 주의할 점
- 반환 누락 시 풀 고갈로 스폰 실패나 메모리 점유 증가가 발생합니다.
- 재사용 객체 상태 초기화를 빼먹으면 이전 프레임 데이터가 섞이는 버그가 납니다.

## 동작 다이어그램

객체를 재사용해 할당/해제를 줄이는 풀 관리 흐름입니다.

```mermaid
flowchart LR

  spawn_request["Spawn Request"]
  check_pool["Idle Object Exists?"]
  checkout["Get From Pool"]
  create_new["Instantiate"]
  active_use["Active Object"]
  release["Release()"]
  reset["Reset State"]
  pool_store["Return To Pool"]

  spawn_request --> check_pool
  check_pool -->|yes| checkout
  check_pool -->|no| create_new
  checkout --> active_use
  create_new --> active_use
  active_use --> release
  release --> reset
  reset --> pool_store
  pool_store --> check_pool
```
