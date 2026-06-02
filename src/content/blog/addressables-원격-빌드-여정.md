---
title: "Addressables 원격 빌드 여정"
description: "Addressables의 사용은 너무나도 어렵습니다"
pubDate: 2026-06-02
tags:
  - Unity
  - Addressables
  - Resource
category: R&D
subcategory: Unity
---

다행히 이전에 Unity CLI Build를 batchmode로 돌려보는 경험을 해봐서, 이 상황에 대한 파이프라인 짜는데에 어려움이 없었다.

이 포스트는 거진 기록용. 하지만 난항을 겪는 분들에게 도움이 됐으면 좋겠다.

<br>

## Editor에서의 설정

* 원격으로 다운로드 받고 버저닝하여 사용할 리소스가 묶인 번들들을 Local -> Remote로 변경한다.
* Profile에 `Remote.BuildPath`와 `Remote.LoadPath`를 사용 할 CDN 및 Storage의 주소로 입력한다.
    * BuildPath는 리소스 빌드 후 나올 로컬 경로, LoadPath가 CDN 및 Storage 주소
* `addressable_content_state.bin` 파일이 정말 중요한 파일이니, 이 파일도 같이 Storage에 업로드해야 한다.
    * 빌드에 대한 히스토리를 모두 알고 있는 파일, 업데이트 시 일부만 받는 것에 대하여 판단할 수 있음
    * AddressableAssetSettings를 잘못 건드리면, 얘가 빌드가 안됨. 지우고 새로 해야 함.

    ```csharp
    Addressables.ResourceManager.InternalIdTransformFunc
    ```
    * 만약 버전별로 관리하고 싶다면, LoadPath는 그대로 두고 위 녀석으로 경로를 변경하여 로드하도록 해야 함

<br>

# Unity Batchmode

projectPath와 targetPlatform, executeMethod를 받아서 Addressables 빌드를 돌린다.

executeMethod는 단순히 유니티의 Addressables 빌드를 돌리는 메서드를 호출해주는 Wrapper 메서드.

<br>

## Resource 파일 올리기

사실 손으로 올려도 상관은 없다. 하지만 그 과정은 매우 귀찮기 때문에...

ASP.NET으로 dotnet run 명령줄을 실행하여 Storage에 업로드 하는 기능을 추가했고, 그 기능을 통해 Storage에 업로드가 되는 것까지 확인했다.
이렇게 해서 파이프라인 구축은 끝. CLI로 모든게 처리가 완료됐으며 ... 이를 실행해 줄 젠킨스 빌드 파이프라인을 공부하러 가본다...
ASP.NET으로 dotnet run 명령줄을 실행하여 Storage에 업로드 하는 기능을 추가했고, 그 기능을 통해 Storage에 업로드가 되는 것까지 확인했다.