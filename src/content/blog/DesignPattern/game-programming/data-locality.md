---
title: "[게임 프로그래밍 패턴] Data Locality"
description: "자주 접근하는 데이터를 연속 메모리에 배치해 캐시 효율을 높이는 성능 중심 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Data Locality"
  - "Game Programming"
category: "Design Pattern"
---

## 패턴 한 줄 설명
자주 접근하는 데이터를 연속 메모리에 배치해 캐시 효율을 높이는 성능 중심 패턴입니다.

## Unity에서 쓰는 대표 상황
- 총알/파티클처럼 대량 객체를 매 프레임 갱신할 때
- CPU 병목을 줄여야 할 때

## 구성 요소 (역할)
- Hot Data: 자주 접근하는 값
- Contiguous Storage: 연속 배열
- Loop: 단순 반복 처리

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
using UnityEngine;

public struct ProjectileState
{
    public Vector3 Position;
    public Vector3 Velocity;
}

public static class ProjectileSimulation
{
    public static void Simulate(ProjectileState[] projectileStates, float deltaTime)
    {
        for (int projectileIndex = 0; projectileIndex < projectileStates.Length; projectileIndex++)
        {
            projectileStates[projectileIndex].Position += projectileStates[projectileIndex].Velocity * deltaTime;
        }
    }
}
```

## 장점
- 연속 메모리 접근으로 캐시 미스를 줄여 대량 연산 성능을 높입니다.
- Burst/Jobs 같은 데이터 지향 처리와 결합할 때 효과가 큽니다.

## 주의할 점
- 구조를 성능 중심으로 바꾸면 코드 가독성과 도메인 표현력이 떨어질 수 있습니다.
- 배열 동기화와 인덱스 관리 실수 시 데이터 불일치 버그가 발생하기 쉽습니다.

## 동작 다이어그램

연속 메모리 블록을 순차 처리해 캐시 효율을 높이는 흐름입니다.

```mermaid
flowchart LR

  frame["Frame Start"]
  chunk_loop["for (i = 0..N)"]
  cache_hit["Cache-friendly access"]
  result["대량 업데이트 완료"]

  subgraph soa["SoA Buffers"]
    positions["positions[]"]
    velocities["velocities[]"]
    hp["hp[]"]
  end

  frame --> chunk_loop
  chunk_loop -->|read i| positions
  chunk_loop -->|read i| velocities
  chunk_loop -->|read i| hp
  positions --> cache_hit
  velocities --> cache_hit
  hp --> cache_hit
  cache_hit --> result
```
