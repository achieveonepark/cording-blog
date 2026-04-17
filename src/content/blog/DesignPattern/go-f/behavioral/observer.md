---
title: "[디자인 패턴] Observer 패턴"
description: "발행자 상태 변화가 구독자들에게 자동 통지되도록 하는 반응형 패턴입니다."
pubDate: 2026-04-02
lang: ko
tags:
  - "Design Pattern"
  - "Behavioral"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-behavioral-observer.svg
---

## 패턴 한 줄 설명
발행자 상태 변화가 구독자들에게 자동 통지되도록 하는 반응형 패턴입니다.

## Unity에서 쓰는 대표 상황
- 체력 변화에 UI/사운드/업적을 동시에 반응시킬 때
- 느슨한 이벤트 연결이 필요할 때

## 구성 요소 (역할)
- Subject
- Observer
- Subscribe/Unsubscribe

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
using System;

public sealed class HealthModel
{
    public event Action<int, int> HealthChanged;

    public void SetHealth(int currentHealth, int maxHealth)
    {
        HealthChanged?.Invoke(currentHealth, maxHealth);
    }
}

public sealed class HealthBarPresenter
{
    public void Bind(HealthModel healthModel)
    {
        healthModel.HealthChanged += OnHealthChanged;
    }

    private void OnHealthChanged(int currentHealth, int maxHealth) { }
}
```

## 장점
- 행동 로직을 분리해 변경 영향도를 줄일 수 있습니다.
- 규칙 추가/교체가 비교적 안전합니다.

## 주의할 점
- 객체 수와 간접 호출이 늘어 흐름 파악이 어려워질 수 있습니다.
- 전환/실행 순서 버그를 테스트로 고정해야 합니다.

## 동작 다이어그램

주체 상태 변경이 구독자들에게 자동 전파되는 흐름입니다.

```mermaid
flowchart LR

  subject["HealthModel"]
  notify["Notify()"]

  subgraph observers["Observers"]
    hpbar["HealthBar"]
    sfx["DamageFX"]
    achievement["AchievementTracker"]
  end

  subject -->|health changed| notify
  notify --> hpbar
  notify --> sfx
  notify --> achievement
```
