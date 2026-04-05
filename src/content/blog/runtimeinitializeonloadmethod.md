---
title: "RuntimeInitializeOnLoadMethod"
description: "이 메서드에 산전수전 겪은 내용을 정리한 포스팅"
pubDate: 2026-03-24
tags:
  - Unity
category: R&D
thumbnail: /images/1775359199678.png
---

# 가 뭐죠?

* Unity에서 제공히는 어트리뷰트, 앱을 실행 후 Scene이 로드 되기 전, 로드 된 후에 자동으로 호출해주는 기능
* MonoBehaviour를 상속받지 않아도, static 메서드로 선언하면 사용할 수 있음
* 반환 타입은 무조건 void형이어야 함

# 어떤 설정들이...?

## SubsystemRegistration

* 전역 static 상태를 리셋할 때
* 주로 Enter PlayMode로 도메인 리로드를 끈 상태에서 개발하는 경우에 상태값을 초기화할 때 사용
* **이전 런타임에서 쓰던 것들이 남아있을 여지가 있는 것들을 깨끗하게 만드는 단계**
* MonoBehaviour 류는 여기서 사용함에 적합하지 않음

## AfterAssembliesLoaded

* preload asset 초기화 후, 씬은 초기화 전 시점
* DI 주입, 리플렉션 기반 등록, attribute 스캔 등의 Assembly 레벨의 처리 단계
* 여기서도 MonoBehaviour 류를 사용하는 것에는 적합하지 않음

## BeforeSplashScreen

> 이 단계는 최대한 안 쓰는 것이... 그냥 잊는 것으로...
> 여기서 뭘 하면 부팅 복잡도만 올라감...

* 스플래시가 뜨기 직전, 첫 씬 로딩 전 상태에서 호출되는 시점
* 이른 시점의 네이티브 / 플랫폼 초기화
* 스플래시 이전의 Bootstrap 호출 단계
* 라곤 하지만 이 열거형은 최대한 안쓰도록

## BeforeSceneLoad

* 첫 씬이 로드됐으나, Awake는 호출하지 않은 시점
* 오브젝트들은 비활성 상태
* Awake가 돌기 전 준비되어 있어야 하는 static 서비스 생성
* 씬 진입 전 설정값 주입
* 씬 안의 컴포넌트들이 사용할 것들 준비하기 좋음
* FindObjectType ... 등등으로는 오브젝트를 찾기 어려울 수 있음

## AfterSceneLoad

* RuntimeInitializeOnLoadMethod의 기본 값
* Awake와 OnEnable이 끝난 직후에 호출되는 상태
* MonoBehaviour를 상속받는 객체를 정리 및 링크 등을 하기 좋은 단계

# 근데...

Unity Package로 제작을 즐겨하는 필자는 Package 내에서 이 메서드를 호출했는데 Editor에선 잘 동작했으나 Android, iOS 빌드 내에서는 호출이 안 됐다. 왜지?!

## 하고 찾아봤는데...

Android, iOS의 경우, IL2CPP의 Managed Striping이 이루어져서 사용하지 않는 코드는 짤린다고 하는데, 일단 각 플랫폼 별로 분기가 필요하여 `#if UNITY_ANDROID`, `#if UNITY_IOS`를 감싼 탓인지 코드가 짤린 듯 하다.

그리하여 빈 cs파일 하나 만들고,

```csharp
[assembly: AlwaysLinkAssembly]
```

이 코드를 추가해주었다.
코드를 짤리지 않게 해주는 Assembly 키워드인 것.

### AlwaysLinkAssembly는..

Unity IL2CPP의 Managed Stripping 과정에서 “이 어셈블리는 참조가 없어도 절대 제거하지 마라!” 라고 강제하는 어트리뷰트라 한다.

그리하여... 모든 것 해결!