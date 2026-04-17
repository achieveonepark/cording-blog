---
title: "[Unity 패키지] Infinity Value"
description: "다음 설치 방법 중 하나를 선택하세요."
pubDate: 2026-04-16
lang: ko
tags:
  - "Unity"
  - "Package"
category: "Unity Package"
thumbnail: /images/packages/unity-package.png
---

| [🪄github 바로가기](https://github.com/achieveonepark/infinity-value)

## Install

다음 설치 방법 중 하나를 선택하세요.

> 참고: GitHub URL의 `#` 뒤에 있는 버전은 Changelog에 기재된 최신 변경 사항을 기준으로 확인하세요.

### Install via Unity Package Manager (UPM)

1. Unity Package Manager를 열고 좌측 상단의 `+` 버튼을 클릭합니다.
2. `Install package from git URL...`을 선택합니다.
3. `https://github.com/achieveonepark/infinity-value.git#1.0.1` 을 입력한 뒤 Install을 클릭합니다.

### Manual Addition

Unity 프로젝트의 `Packages` 폴더에 있는 `manifest.json` 파일을 엽니다.  
`dependencies` 항목 아래에 다음 라인을 추가합니다.

```json
"com.achieve.infinity-value": "https://github.com/achieveonepark/infinity-value.git#1.0.1"
```

### Description

- 이 패키지는 million, billion, trillion과 같은 일반적인 단위 대신 A, B, C 등의 커스텀 단위를 사용할 수 있도록 해주며, 매우 큰 수를 세그먼트 단위 구조로 표현하고 처리하는 데 최적화되어 있습니다.
- 내부 구조 최적화를 통해 가비지 컬렉션(GC) 발생을 최소화하도록 설계되어, 게임과 같은 성능에 민감한 애플리케이션에 적합합니다.
- 프로젝트에 Newtonsoft.Json 패키지가 설치되어 있다면, JsonConverter가 자동으로 등록되어 별도의 설정 없이 직렬화를 처리할 수 있습니다.
- 데이터는 "300F 200E" 또는 "200AE 578AD" 와 같은 단위 포맷으로 표현되며, 모든 연산은 이 표현 구조를 기반으로 직접 수행됩니다. <br/>ToString()을 호출하면 해당 형식 그대로 출력됩니다.
- 기본 C# 원시 타입으로부터의 마이그레이션을 지원하며, 비교 연산자 및 산술 연산자를 포함한 모든 표준 C# 연산자를 사용할 수 있습니다.

### 지원하는 ctor

```csharp
- int
- long
- BigInteger
- string
- float
```

### Quick Start

```csharp
using Achieve.InfinityValue;
using System.Numerics;
public class A
{
    public InfinityValue A;
    public InfinityValue B;
    public InfinityValue C;
    public InfinityValue D;
    public A()
    {
        // 단위 이름 설정
        InfinityValue.SetUnitNames(new List<string>
        {
            "A", "B", "C" ...
        });
        A = 1;                              // int로 초기화 가능
        B = "300F 200C";                    // 포맷된 문자열로 초기화 가능
        C = 3.0f;                           // float 지원
        D = new BigInteger(30000000000000); // BigInteger 처리 가능
        var d = A + B;                      // 기본 산술 연산: 덧셈
        var e = B * C;                      // 기본 산술 연산: 곱셈
        var f = B / C;                      // 기본 산술 연산: 나눗셈
        Debug.Log(D.ToString()); // "30D" 형식으로 출력
    }
}
~~~~~~~~```
