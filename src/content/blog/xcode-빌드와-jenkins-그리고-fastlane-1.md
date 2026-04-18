---
title: "Xcode 빌드와 Jenkins. 그리고 Fastlane - 1"
description: "iOS 빌드 체계를 이해하기 위한 리마인드"
pubDate: 2026-04-04
tags:
  - iOS
  - Xcode
  - Build
  - Jenkins
  - Fastlane
thumbnail: /images/1775347507127.png
category: R&D
subcategory: CI/CD
---

## Xcode

유니티 개발자라면 현업에서 강제로 접하게 되고 구글에게 열심히 해답을 찾으며 사흘밤낮을 헤매게 하는 무서운 툴... 이라고 생각하며 살았지만

이제는 이 Xcode라는 녀석을 제대로 이해를 좀 해야겠다는 생각이 들었다.

### 손 빌드

일반적인 경우는 Unity 빌드 후 나온 결과물을 실행하여 Build / Archive 하는 형태. iOS 빌드 테스트하는 환경으로 가장 많이 접해봤을 듯.

* provisioning profile 미설정으로 겪는 빌드 에러
* pods의 무언가가 설정이 안되어 빌드 에러
* SDK 문제로 인해 코드 에러
* Compatibility 미설정으로 기능 미동작
* Xcode 버전 업데이트로 인한 호환성 깨짐
* Build Option에 변수 선언 대응 (지금은 좀 덜하지만...)
* build 시도 시에는 잘 됐는데 archive하려니 안됨

몇 년간 겪은걸 취합하자면 이 정도인데, 생각 안나는 게 더 있을지도 모르겠다...

### CLI 빌드

```bash
/Applications/Unity/Hub/Editor/6000.3.10f1/Unity \
  -batchmode \
  -nographics \
  -quit \
  -projectPath "$(pwd)" \
  -executeMethod BuildScript.BuildIOS \
  -logFile unity_build.log
```

유니티는... 이렇게 명령줄인자를 호출하면 빌드가 된다는 것도 처음 알았다. 이렇게 빌드하고 나온 결과물을

```bash
xcodebuild \
  -workspace "$WORKSPACE" \
  -scheme "$SCHEME" \
  -configuration Release \
  -destination "generic/platform=iOS" \
  -archivePath "$ARCHIVE_PATH" \
  clean archive
```

xcode도 이런 식으로 호출하게 되면, 유니티 빌드를 최종적으로 archive 하는 과정까지 모두 동작시켜주는 명령줄인자다.

GUI를 꼭 켜지 않아도, 이러한 방법으로도 해결할 수 있다는 것을 알게 되었다.

명령줄인자랑 많이 친해져야겠다는 생각이... 드는군...

다음 편은 Jenkins 구성을 위해 필요한 Docker를 R&D 해보려고 한다...!