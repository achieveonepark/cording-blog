---
title: "[게임 프로그래밍 패턴] Game Loop"
description: "입력-업데이트-렌더의 반복 흐름을 안정적으로 유지하는 게임의 핵심 실행 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Game Programming"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-game-programming-game-loop.svg
---

## 패턴 한 줄 설명
입력-업데이트-렌더의 반복 흐름을 안정적으로 유지하는 게임의 핵심 실행 패턴입니다.

## Unity에서 쓰는 대표 상황
- 고정 스텝 시뮬레이션을 구현할 때
- 입력과 렌더 타이밍을 분리하고 싶을 때

## 구성 요소 (역할)
- Input Step
- Simulate Step
- Render Step

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
using UnityEngine;

public sealed class FixedStepLoop : MonoBehaviour
{
    private const float SimulationStep = 1f / 60f;
    private float accumulatedDeltaTime;

    private void Update()
    {
        accumulatedDeltaTime += Time.deltaTime;
        while (accumulatedDeltaTime >= SimulationStep)
        {
            Simulate(SimulationStep);
            accumulatedDeltaTime -= SimulationStep;
        }
        float interpolationAlpha = accumulatedDeltaTime / SimulationStep;
        Render(interpolationAlpha);
    }

    private void Simulate(float deltaTime) { }

    private void Render(float interpolationAlpha) { }
}
```

## 장점
- 업데이트 순서를 고정해 시뮬레이션 재현성과 디버깅 안정성을 높입니다.
- 고정 스텝과 보간을 분리해 물리 정확도와 화면 부드러움을 함께 챙길 수 있습니다.

## 주의할 점
- 무거운 프레임에서 while 루프가 길어져 spiral of death가 발생할 수 있습니다.
- Update/FixedUpdate 책임이 섞이면 입력 지연과 물리 오차가 커집니다.

## 동작 다이어그램

입력-시뮬레이션-렌더를 프레임 단위로 반복하는 메인 루프입니다.

```mermaid
flowchart LR

  start["Frame Begin"]
  input["Poll Input"]
  fixed_step["Fixed Update / Physics"]
  game_update["Gameplay Update"]
  render["Render"]
  next["Next Frame"]

  start --> input
  input --> fixed_step
  fixed_step --> game_update
  game_update --> render
  render --> next
  next -->|loop| start
```
