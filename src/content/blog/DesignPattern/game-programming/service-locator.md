---
title: "[게임 프로그래밍 패턴] Service Locator"
description: "공통 서비스 접근을 중앙 레지스트리로 모아 호출부 결합을 줄이는 패턴입니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Design Pattern"
  - "Game Programming"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-game-programming-service-locator.svg
---

## 패턴 한 줄 설명
공통 서비스 접근을 중앙 레지스트리로 모아 호출부 결합을 줄이는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 오디오/저장/분석 서비스를 전역에서 참조할 때
- 초기 단계에서 DI를 단순화할 때

## 구성 요소 (역할)
- Service Interface
- Locator Registry
- Bootstrap Registration

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
public interface IAudioService
{
    void PlaySfx(string clipId);
}

public static class GameServices
{
    public static IAudioService AudioService { get; private set; }

    public static void RegisterAudioService(IAudioService audioService)
    {
        AudioService = audioService;
    }
}

public sealed class DamageFeedbackSystem
{
    public void OnHit()
    {
        GameServices.AudioService?.PlaySfx("Hit");
    }
}
```

## 장점
- 공통 서비스를 한 지점에서 교체/주입할 수 있어 초기 개발 속도가 빠릅니다.
- 호출부에서 생성 책임을 제거해 사용 코드가 단순해집니다.

## 주의할 점
- 숨은 전역 의존성이 생겨 테스트 격리와 의존성 추적이 어려워집니다.
- 초기화 순서가 꼬이면 런타임 Null 참조가 발생하기 쉽습니다.

## 동작 다이어그램

클라이언트가 인터페이스 키로 서비스를 조회해 사용하는 흐름입니다.

```mermaid
flowchart LR

  client["Gameplay System"]
  locator["Service Locator"]
  registry["Service Registry"]
  service["IAudioService 구현체"]
  result["Play SFX"]

  client -- "Resolve<IAudioService>()" --> locator
  locator -->|lookup key| registry
  registry -->|return instance| service
  service -- "Play(soundId)" --> result
  result -->|done| client
```
