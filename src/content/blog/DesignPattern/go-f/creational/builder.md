---
title: "[디자인 패턴] Builder 패턴"
description: "복잡한 객체 생성 과정을 단계별로 분리해 가독성과 안전성을 높이는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Creational"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-creational-builder.svg
---

## 패턴 한 줄 설명
복잡한 객체 생성 과정을 단계별로 분리해 가독성과 안전성을 높이는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 옵션 많은 설정 객체를 만들 때
- 동일 절차로 다른 결과를 만들 때

## 구성 요소 (역할)
- Builder
- Director(선택)
- Product

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
public sealed class EnemyWaveConfig
{
    public int EnemyCount;
    public float SpawnIntervalSeconds;
    public string RewardId;
}

public sealed class EnemyWaveBuilder
{
    private readonly EnemyWaveConfig waveConfig = new();

    public EnemyWaveBuilder SetEnemyCount(int enemyCount)
    {
        waveConfig.EnemyCount = enemyCount;
        return this;
    }

    public EnemyWaveBuilder SetSpawnInterval(float spawnIntervalSeconds)
    {
        waveConfig.SpawnIntervalSeconds = spawnIntervalSeconds;
        return this;
    }

    public EnemyWaveBuilder SetReward(string rewardId)
    {
        waveConfig.RewardId = rewardId;
        return this;
    }

    public EnemyWaveConfig Build() => waveConfig;
}
```

## 장점
- 객체 생성 책임을 정리해 의존성 관리가 쉬워집니다.
- 환경별/상황별 생성 정책을 유연하게 바꿀 수 있습니다.

## 주의할 점
- 간단한 문제에 과한 생성 추상화를 넣지 않아야 합니다.
- 생성 규칙이 많아질수록 문서와 테스트 동기화가 중요합니다.

## 동작 다이어그램

복잡한 객체를 단계별로 조립하고 마지막에 결과물을 반환하는 흐름입니다.

```mermaid
flowchart TD

  director["Director"]
  step1["BuildStats()"]
  step2["BuildEquipment()"]
  step3["BuildSkills()"]
  product["CharacterData"]

  director --> step1
  step1 --> step2
  step2 --> step3
  step3 --> product
```
