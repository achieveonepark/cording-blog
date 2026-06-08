---
title: "Xcode 빌드와 Jenkins. 그리고 Fastlane - 3"
description: "Docker로 띄워진 Jenkins에서 Unity Local build 하기!"
pubDate: 2026-06-08
tags: []
category: R&D
subcategory: CI/CD
thumbnail: /images/1780894840144.png
---

지난 번에 Docker로 설정하는 것까지 완료했고, 이번엔 빌드하여 떠 있는 젠킨스 서버에 접속하여 Agent를 붙인 뒤 빌드를 돌려본다!

# 1. 젠킨스 서버 접속하기

![image](/images/1780894840144.png)
들어가보면, 제일 먼저 이렇게 아저씨가 평온한 표정으로 모든걸 다 해주겠다는 듯 반겨준다.

Claude에게 내 아이디 비번 뭐냐고 물어서 정보를 획득하고 들어가 줌.

# 2. 빌드 돌릴 Agent 붙이기

![image](/images/1780895053832.png)
드디어... Jenkins Job까지 보이는 화면까지 왔다!
하지만 여기서 가장 먼저 빌드 돌릴 머신으로 Agent를 붙여야 한다. `빌드 실행 상태`에 들어가서, 가이드 되어 있는 명령어에 secret-key를 CLI로 입력하여 빌드 준비 상태에 들어간다.

```
Preflight complete.
6월 08, 2026 2:06:49 오후 org.jenkinsci.remoting.engine.WorkDirManager initializeWorkDir
정보: Using /Users/Shared/Jenkins/macbook-agent/remoting as a remoting work directory
6월 08, 2026 2:06:49 오후 org.jenkinsci.remoting.engine.WorkDirManager setupLogging
정보: Both error and output logs will be printed to /Users/Shared/Jenkins/macbook-agent/remoting
6월 08, 2026 2:06:49 오후 hudson.remoting.Launcher createEngine
정보: Setting up agent: macbook-agent
6월 08, 2026 2:06:49 오후 hudson.remoting.Engine startEngine
정보: Using Remoting version: 3355.v388858a_47b_33
6월 08, 2026 2:06:49 오후 org.jenkinsci.remoting.engine.WorkDirManager initializeWorkDir
정보: Using /Users/Shared/Jenkins/macbook-agent/remoting as a remoting work directory
6월 08, 2026 2:06:49 오후 hudson.remoting.Launcher$CuiListener status
정보: WebSocket connection open
6월 08, 2026 2:06:49 오후 hudson.remoting.Launcher$CuiListener status
정보: Connected
```

대강.. 연결이 되었다는 뜻이겠지?

# 3. 빌드하기

![image](/images/1780895510383.png)
드디어 이 화면을 보게 되다니...!!!
게임 개발할 때 이 화면에 대고 기도 많이 했었는데......

여튼, 이런 식으로 정말 러프하게이지만 Unity CLI로 빌드 돌리는 과정을 모두 수행해보았다!

# 마무리...
필요에 의한 것이라기 보다는 이게 어떻게 돌아가는지 알기 위한 R&D였는데, 정말 유의미했다.

앱 빌드 뿐만 아니라 Addressables Remote 빌드를 진행할 때에도 자연스럽게 Unity가 지원하는 batchmode로 여러 명령줄 인자를 넘겨서 빌드하는 과정을 생각할 수 있었다.

더불어 이것 뿐만 아니라, 라이브러라니 플러그인의 CLI로 더 쉽게 양질의 퀄리티의 기능을 사용할 수 있어서, 이를 활용해서 이것저것 만들어봐야겠다는 생각이 들었다.

#굳!