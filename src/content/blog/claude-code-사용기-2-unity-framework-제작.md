---
title: "Claude Code 사용기 2 - Unity Framework 제작"
description: "Claude Code가 생각하는 Unity Framework가 궁금해졌다."
pubDate: 2026-04-05
tags:
  - Unity
  - AI
  - Framework
category: AI
thumbnail: /images/1775359650805.png
---

[Claude Code 사용기 1 - Localization 패키지 제작](https://blog.somiri.dev/posts/claude-code-%EC%82%AC%EC%9A%A9%EA%B8%B0-1-localization-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%A0%9C%EC%9E%91/)을 진행하다가, claude를 이용한 내 Unity Framework를 만들어보고 싶어졌다.

## Game Framework

### 이전에는

게임 몇 번 출시해보면서 반복적으로 필요한 내용을 기반하여 [Game Framework](https://github.com/achieveonepark/game-framework)를 하나 만들어서 사용하며 계속 수정중에 있었다.

여느 때와 다름없이 수정하다가, 문득 claude code는 또 어떤 식으로 코드를 짜고 구성할지 궁금해져서 시도해보는 프로젝트다.

### Claude Code로 만들기

기본적인 골조는 아래와 같이 잡아달라고 했다.

- 데이터 관리는 DI 형식인 `VContainer`로
- 데이터 테이블은 `Google Sheet 연동`, 런타임에선 `MemoryPack을 이용`하여 로드하도록
- `Addressables`는 최대한 사용하기 쉽게
- 사용기 1의 Localization까지 포함
- `UIToolkit`으로 GUI 구현, `SettingsProvider`를 적극 활용하도록
- 문서는 `Gitbook`으로 구현

요청하여 나온 결과물.

## [AchEngine 바로가기](https://os.somiri.dev/AchEngine/guide/)

이런 저런 기능들 모두 사용해봤는데, 처음에 쬐끔만 헤맸다 뿐 다 사용할 만할 정도로 검증이 되었다. 또한 문서도 엄청 잘써준다...

또 문서까지 만들어서 저렇게 나열하니 되게 있어보인다. 내 머리 + Claude code랑 열심히 싸매가면서 기존 Game Framework보다 더 맛깔나게 만들어 볼 예정이다.

🐣 UIToolkit 엄청 잘 만들어 주는거, 너무 좋다...