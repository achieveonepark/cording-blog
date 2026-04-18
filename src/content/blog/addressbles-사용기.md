---
title: "Addressbles 사용기"
description: "Addressables를 사용한 내역을 기록합니다."
pubDate: 2026-03-23
tags:
  - Unity
  - Addressables
  - Resource
thumbnail: /images/1775359380524.png
category: R&D
subcategory: Unity
---

# 개요

> 필자가 겪으면서 분석한 내용을 정리한 글입니다.
> 틀린 내용이 있다면 지적해주시면 매우 감사합니다!

레거시한 패키지인 [AssetBundle](https://docs.unity3d.com/6000.3/Documentation/Manual/AssetBundlesIntro.html)을 사용자가 좀 더 쉽게 사용할 수 있도록 만들어 진 것이 [Addressables](https://docs.unity3d.com/Packages/com.unity.addressables@2.9/manual/index.html)라고 한다.

AssetBundle을 프로젝트에 도입만 하여 리소스 빌드 시간만 책정해봤을 땐 확실히 Addressables보다 시간이 덜 걸리긴 하나... AssetBundle은 프리펩 하나를 로드하기 위해 필요한 리소스들도 같이 로드해줘야 하는 날 것의 로직이 디폴트였던...

그리하여 어떻게 쓸지 이리저리 헤매다 Addressables를 파보기로 결정했다.

# 돌아가는 구조?

* 기존의 리소스를 address 주입하여 Addressables 리소스로 제작
* 체크 된 Addressables 리소스들을 빌드 (설정하기의 3번으로 가면 어떤 에셋이 있는지 확인 가능)
* 빌드하면 catalog.json 파일이 나오고, 이 파일 안에 어떤 에셋들이, 어떤 버전인지 모두 기록되어 있음
* 런타임 실행하여 `Addressables.InitializeAsync`를 호출하면 위 catalog.json을 읽어서 번들의 메타데이터를 메모리에 캐싱함
* 이후 이 번들 메타데이터를 참조하여 `Addressables.LoadAssetAsync` 로 리소스를 메모리에 로드함, 이후에는 `Object.Instantiate`
* `Addressables.LoadAssetAsync`를 호출했을 때 반환되는 AsyncOperationHandle이 메모리에서 내리는 `Release` 메서드를 가지고 있어서 이는 따로 Dictonary에 캐싱해두고 사용하지 않을 때 가져와서 해제하고 Remove 하였음.
* Resources를 사용하지 않으니 메모리 할당도 훨씬 덜 한듯 하다!

# 사용 버전

* Unity 6000.3.9f1
* Addressables 2.7.2

# 설정하기

1. Addressables를 설치 후 특정 폴더를 지정하여 이 폴더 안에 모든 리소스를 addressables 리소스로 설정
2. 빌드 진행
    * 여기서 스크립트 에러가 있는 경우 진행이 되지 않았음
    * 이건 플랫폼마다 따로따로 다 빌드 해줘야 하더라.
3. `Window/Asset Management/Addressbles/Groups`에서 PlayMode를 `Use Existing Build`로 설정

# 사용하기

여기서 사실 두 가지 방법을 진행해봤다.

## Initialize 시 리소스 모두 캐싱

> `Addressables.InitializeAsync`를 호출한 후에, 폴더에 있는 모든 리소스를 LoadAssetsAsync로 호출하여 메모리에 캐싱해둔 후 필요 시 사용한다.

리소스를 메모리에 할당 및 해제를 더 신경쓰지 않아도 되어 좋았으나
'모두 캐싱' 하는 시점이 문제가 됨..

Editor에서는 딜레이가 거의 없이 캐싱되어 문제 없군! 싶었는데,
Android, iOS로 가니 15초... 길게는 20초까지도 가더라... (파일 1500개, 250MB 정도의 프로젝트 기준)

그리하여 ...

## 리소스를 사용할 때 캐싱

> 그냥 권장사항인 `LoadAssetAsync`를 호출하고 사용한다.

깔끔함. 괜히 이 방법을 쓰라고 하는게 아님.
기왕에 이렇게 쓰는거, AssetHandle도 확실하게 처리하면서 사용해야겠다.