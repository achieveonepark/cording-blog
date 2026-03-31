---
title: "Claude Code 사용기 1 - Localization 패키지 제작"
description: "클로드에게 시켜본 Localization 기능 제작"
pubDate: 2026-03-31
tags:
  - Unity
  - Localization
  - AI
category: Thinking
thumbnail: /images/1774959561563.png
---

Claude를 Max까지는 너무 비싸고, **Pro**로 사용해보고 있다.

하지만... `Opus 4.6`으로 큰 질문 한번만 하면 5시간 동안의 사용량이 바로 바닥을 쳐버린다... Max 플랜 쓰면 `Opus 4.6`을 5시간 동안 써도 다 못쓴다고 하던데... 너무 쓰고 싶지만 비싸서 패스...

사실 `Sonnet 4.6`도 4.5에 비해 엄청 잘 짜줘서 만족하며 쓰고 있다.

각설하고, 오늘은 Claude는 Localization을 어떻게 해석하고 어떻게 만들까? 가 갑자기 궁금해서 바로 플랜모드로 질문을 던져봤다. 모델은 `Opus 4.6`.

```
Localization 패키지로, 다음 핵심 기능을 포함합니다:
1. JSON 기반 locale 파일 - flat {"key": "value"} 형식으로 번역가에게 전달 용이
2. Static API - LocalizationManager.Get(key), SetLocale(code) 등 간결한 인터페이스
3. 자동 초기화 - [RuntimeInitializeOnLoadMethod]로 씬 로드 전 자동 설정
4. Components - LocalizedText, LocalizedImage, LocalizedAudio (locale 변경 시 자동 업데이트)
5. 타입 안전 키 코드 생성 - L.Menu.Start 형태로 자동완성 지원
6. UIToolkit Editor - MultiColumnListView 테이블 에디터, CSV/JSON import/export, Project Settings 통합
7. TMP 조건부 지원 - TextMeshPro 설치 시 자동 활성화
8. 외부 의존성 없음 - 자체 JSON 파서 내장
```

일단 ... Runtime 폴더와 Editor 폴더 잘 나눴지만 asmdef가 다르므로 internal로 선언하면 서로 접근할 수 없는데 막 접근해버려서 에러가 남발했었던 걸 수정해줬더니...?

## 패키지 설치

하고 나서 바로 보여지는 설정 창과 에디터 창.

![image](/images/1774959696629.png)

![image](/images/1774958771830.png)

와... 진짜 그냥 잘 만들어진 완성도 높은 패키지같다.
처음 세팅에 살짝 애먹었지만 잘 동작하는걸 확인.

좀 소름인 건 ... Text 뿐만 아니라 Audio, Image까지 전부 대응이 되어 있다... 그리고 에디터 내부에서 데이터를 만들 수 있는 툴까지...

```csharp
public static class LocalizationKeyGenerator
{
    // C# 예약 키워드 목록
    private static readonly HashSet<string> CSharpKeywords = new HashSet<string>
    {
        "abstract", "as", "base", "bool", "break", "byte", "case", "catch", "char",
        "checked", "class", "const", "continue", "decimal", "default", "delegate",
        "do", "double", "else", "enum", "event", "explicit", "extern", "false",
        "finally", "fixed", "float", "for", "foreach", "goto", "if", "implicit",
        "in", "int", "interface", "internal", "is", "lock", "long", "namespace",
        "new", "null", "object", "operator", "out", "override", "params", "private",
        "protected", "public", "readonly", "ref", "return", "sbyte", "sealed",
        "short", "sizeof", "stackalloc", "static", "string", "struct", "switch",
        "this", "throw", "true", "try", "typeof", "uint", "ulong", "unchecked",
        "unsafe", "ushort", "using", "virtual", "void", "volatile", "while"
    };

// ...

}
```

CodeGen도 있길래 Roslyn인 CodeAnalysis를 사용했으려나 했는데 문자열 조합으로 이루어져 있는 듯, 키워드가 다 쓰여있다 ㅋㅋㅋㅋ

JsonParser도 string 덩어리를 직접 만지작거리면서 파싱하는 로직으로 짜여있다.... ㅋㅋㅋㅋㅋㅋ 한 편으론 대단하기도 한...

## UI는?

![image](/images/1774958971281.png)

UIToolkit으로, USS, UXML, C# 스크립트로 잘 분리하여 짜둔 것도 확인할 수 있다. 나도 UIToolkit 공부해야 하는데... 자꾸 미루기만 하는 중......

## 그래도

편의성을 중점으로 생각해서 짜달라고 했는데, CSV / JSON 둘 다 임포트 할 수 있는 Parser, 전체적인 UX나 API 인터페이스를 보면 니즈를 충족시켜주었다.만...

왜인지 모르겠는데 만들어준 ScriptableObject들을 클릭해서 인스펙터에 정보가 뜨면 엄청난 끊김 현상이 발생한다.... Json 파일을 Parse하는 메서드를 호출하는 것이 있는지...

여튼, 개선하면 충분히 사용할 수 있음직해보인다.