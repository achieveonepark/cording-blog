---
title: "Xcode 빌드와 Jenkins. 그리고 Fastlane - 2"
description: "Docker 설치하고 개념 익히기"
pubDate: 2026-04-05
tags:
  - Docker
  - Jenkins
  - Ruby
  - wsl
category: R&D
thumbnail: /images/1775357461068.png
---

1편을 쓰면서 
`Docker로 Jenkins 구성해서 iOS 빌드 한번 해보자!`
라는 생각이 들어, claude와 codex의 도움을 받아 구현해보려고 한다.

모름지기 개념만 주구장창 읽기보단 직접 해보는 게 가장 빠른 습득법이라 생각하기에...

## [Docker](https://www.docker.com/)

어느 PC에서든 동일한 빌드 환경을 보장하기 위해 `Image` 라는 실행 가능한 패키지를 기반으로 `Container`를 생성 / 실행하는 플랫폼이라고 한다.

- 빌드에 필요한 플러그인들의 버전
- 환경 변수

등을 가지고 있으며 PC 자체의 설정들의 영향이 줄어듦으로 빌드 실패 시 추적에 용이하다고 함.

### 컨테이너화 흐름

> 단순한 WebAPI를 하나 띄운다는 전제로.

1. [ASP.NET](https://dotnet.microsoft.com/ko-kr/learn/aspnet/what-is-aspnet)앱을 만들고
2. 이 앱을 실행할 환경을 [dockerfile](https://docs.docker.com/reference/dockerfile/)로 정의하고
3. [Docker CLI](https://docs.docker.com/reference/cli/docker/)로 이미지 빌드 후
4. 컨테이너 실행

```bash
// 빌드
docker build -t myapp . 

// 실행
docker run -p 8080:8080 myapp
```


### [Jenkins](https://www.jenkins.io/)도..?

여기에, Jenkins로 빌드하는 CI/CD를 구성하려고 할 때에는 그 기능을 실행하기 위해 코드를 주구장창 쓰는 것이 아니라,

```bash
FROM jenkins/jenkins:lts
```

dockerfile에서 `완성 된 Jenkins 서버 이미지를 가져와 쓰겠다`는 선언 한줄이면 된다. 

물론 선언만 한 현재 시점에서 유니티 빌드가 슉샥 되는건 아니라, 웹 앱만 열리게 되는거다.

여튼 bash 코드나 Docker. 아무것도 모르는 나도 이렇게 환경을 구성할 수 있는 것 보면... 세상이 정말 좋아졌구나 또 한번 체감이 되네.

> 결국은 아래 항목들도 설정되어야 한다.
> - Unity Build Pipeline
> - Plugin 설치
> - Agent 연결
> - Certificate
> - xcworkspace
> - ToolChain 설치

Docker로 Jenkins 서버 띄운 후에 빌드 시도해보는 것은 다음 편에...!