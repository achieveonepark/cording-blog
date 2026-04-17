---
title: "[디자인 패턴] Singleton 패턴"
description: "인스턴스를 하나만 유지하고 전역 접근점을 제공하는 패턴입니다."
pubDate: 2026-03-03
lang: ko
tags:
  - "Design Pattern"
  - "Creational"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-creational-singleton.svg
---

## 패턴 한 줄 설명
인스턴스를 하나만 유지하고 전역 접근점을 제공하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 게임 설정/로그 같은 단일 서비스가 필요할 때
- 씬 간 유지되는 매니저를 둘 때

## 구성 요소 (역할)
- Singleton Instance
- Global Accessor
- Lifetime Guard

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
using UnityEngine;

public sealed class GameSettingsService : MonoBehaviour
{
    public static GameSettingsService Instance { get; private set; }

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        Instance = this;
        DontDestroyOnLoad(gameObject);
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

여러 호출자가 동일 인스턴스를 공유하는 단일 접근 흐름입니다.

```mermaid
flowchart LR

  singleton["AudioManager.Instance"]
  instance["Single Object"]

  subgraph callers["Callers"]
    ui["UISystem"]
    gameplay["GameplaySystem"]
    audio_user["CutsceneSystem"]
  end

  ui --> singleton
  gameplay --> singleton
  audio_user --> singleton
  singleton -->|create once| instance
  instance -->|shared| ui
  instance -->|shared| gameplay
  instance -->|shared| audio_user
```
