---
title: "Facebook SDK Build Issue (iOS)"
description: "Xcode 15.3 미만 환경에서 Facebook SDK 17.0.1 사용 시 발생할 수 있는 iOS 빌드 및 런타임 이슈 정리."
pubDate: 2024-11-16
updatedDate: 2024-11-16
tags:
  - iOS
  - Facebook SDK
  - Troubleshooting
---

`Xcode 15.3 미만` 버전에서 `Facebook SDK 17.0.1`을 설치했을 때 빌드는 동작하지만 crash 이슈가 발생합니다.

그 이유는 15.3 버전 이상에서 사용할 수 있는 `libswiftXPC`라는 표준 라이브러리가 추가되었고, Facebook SDK 17.0.1 버전에서 해당 라이브러리를 사용하는 이유인 것으로 추측됩니다.

Xcode 16.1 버전에서 Unity 프로젝트에 `Facebook SDK 17.0.1`을 설치한 뒤 빌드 후 런타임 실행했을 때에는 문제 없이 정상적으로 initialize 되었습니다.

Updated on: `2024-11-16`
