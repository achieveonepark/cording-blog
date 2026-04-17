---
title: "[게임 프로그래밍 패턴] Dirty Flag"
description: "값이 바뀐 경우에만 비싼 계산을 다시 수행하도록 표시하는 지연 갱신 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Game Programming"
category: "Design Pattern"
---

## 패턴 한 줄 설명
값이 바뀐 경우에만 비싼 계산을 다시 수행하도록 표시하는 지연 갱신 패턴입니다.

## Unity에서 쓰는 대표 상황
- 스탯 합산/레이아웃 계산이 무거울 때
- 매 프레임 재계산이 불필요할 때

## 구성 요소 (역할)
- Primary Data: 원본 데이터
- Dirty Flag: 재계산 여부
- Cache: 계산 결과

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
public sealed class PlayerAttackStat
{
    private int baseAttackPower;
    private int equipmentBonusPower;
    private bool needsRecalculation = true;
    private int cachedAttackPower;

    public void SetBaseAttackPower(int value)
    {
        baseAttackPower = value;
        needsRecalculation = true;
    }

    public void SetEquipmentBonusPower(int value)
    {
        equipmentBonusPower = value;
        needsRecalculation = true;
    }

    public int GetFinalAttackPower()
    {
        if (!needsRecalculation)
        {
            return cachedAttackPower;
        }
        cachedAttackPower = baseAttackPower + equipmentBonusPower;
        needsRecalculation = false;
        return cachedAttackPower;
    }
}
```

## 장점
- 값이 바뀔 때만 계산해 프레임당 불필요한 연산을 줄입니다.
- UI/스탯/트랜스폼처럼 변경 빈도가 낮은 계산에 특히 효과적입니다.

## 주의할 점
- 플래그 갱신 누락 시 오래된 값(stale data)을 쓰는 버그가 생깁니다.
- 의존 관계가 복잡하면 어떤 변경이 플래그를 세워야 하는지 관리가 어려워집니다.

## 동작 다이어그램

값 변경 시에만 재계산해 비용을 줄이는 지연 갱신 흐름입니다.

```mermaid
flowchart LR

  change_event["Stat Changed"]
  mark_dirty["dirty = true"]
  render_request["UI / Combat Query"]
  check_dirty["dirty?"]
  recalc["Recalculate Cached Value"]
  reuse["Use Cached Value"]
  output["Final Value"]

  change_event --> mark_dirty
  mark_dirty --> render_request
  render_request --> check_dirty
  check_dirty -->|yes| recalc
  check_dirty -->|no| reuse
  recalc --> output
  reuse --> output
  recalc -->|dirty = false| reuse
```
