---
title: "[디자인 패턴] Facade 패턴"
description: "복잡한 서브시스템을 단순한 상위 API로 감싸 사용성을 높이는 패턴입니다."
pubDate: 2026-03-21
lang: ko
tags:
  - "Design Pattern"
  - "Structural"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-structural-facade.svg
---

## 패턴 한 줄 설명
복잡한 서브시스템을 단순한 상위 API로 감싸 사용성을 높이는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 게임 부팅 절차를 한 메서드로 감출 때
- 모듈 내부 상세를 외부에 숨길 때

## 구성 요소 (역할)
- Facade
- Subsystem
- Client

## Unity 예시 (C#)
아래 코드는 위에서 설명한 대표 상황을 Unity 프로젝트 맥락으로 단순화한 예시입니다.

```csharp
public sealed class GameStartupFacade
{
    private readonly SaveSystem saveSystem = new();
    private readonly AudioSystem audioSystem = new();
    private readonly UiSystem uiSystem = new();

    public void StartGame()
    {
        saveSystem.Load();
        audioSystem.Initialize();
        uiSystem.OpenLobby();
    }
}
```

## 장점
- 모듈 경계를 명확히 해 결합도를 낮출 수 있습니다.
- 기존 코드 수정 없이 기능 확장/통합이 쉬워집니다.

## 주의할 점
- 래퍼/어댑터 계층이 깊어지면 디버깅이 어려워집니다.
- 책임 경계가 흐려지지 않도록 인터페이스를 작게 유지해야 합니다.

## 동작 다이어그램

복잡한 서브시스템 호출을 단일 진입점으로 단순화하는 흐름입니다.

```mermaid
flowchart LR

  client["Game Bootstrap"]
  facade["StartGameFacade"]
  assets["AssetLoader"]
  save["SaveSystem"]
  network["NetworkClient"]
  result["Ready To Play"]

  client -- "StartGame()" --> facade
  facade -->|load| assets
  facade -->|restore| save
  facade -->|connect| network
  assets --> result
  save --> result
  network --> result
```
