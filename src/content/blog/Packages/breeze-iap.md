---
title: "[Unity 패키지] BreezeIAP"
description: "Unity IAP를 Wrapping하여 사용자가 보다 편리하게 접근할 수 있도록 인터페이스를 제공합니다. 단, 영수증 검증 로직은 따로 구현해주셔야 합니다."
pubDate: 2026-04-16
lang: ko
tags:
  - "Unity"
  - "Package"
category: "Unity Package"
thumbnail: /images/packages/unity-package.png
---

| [🪄github 바로가기](https://github.com/achieveonepark/breeze-iap)

[Unity IAP](https://docs.unity3d.com/kr/2022.1/Manual/UnityIAP.html)를 Wrapping하여 사용자가 보다 편리하게 접근할 수 있도록 인터페이스를 제공합니다. <br/>
단, 영수증 검증 로직은 따로 구현해주셔야 합니다.

## 빠른 시작
아래 두 가지 방법 중 하나를 선택합니다.

>github URL의 # 뒷버전은 Changelog의 최신 사항을 참고해주세요.

### UPM에서 사용하기
1. UPM을 연 후 좌측 상단의 + 버튼을 누릅니다.
2. `Install package from git URL...`을 선택합니다.
3. `https://github.com/achieveonepark/BreezeIAP.git#1.0.0`를 입력 후 Install합니다.

### 직접 추가하기
1. `Unity Project/Packages/manifest.json` 파일을 실행합니다.
2. `Dependencies`에 `"com.achieve.iap": "https://github.com/achieveonepark/BreezeIAP.git#1.0.0"` 내용을 추가합니다.

---

## 설명

### API

이 패키지는 아래의 기능을 제공합니다.

    BreezeIAP.Initialize      | Unity IAP Initialize
    BreezeIAP.Purchase        | 결제 시도
    BreezeIAP.Confirm         | 결제 성공 후 완료 처리
    BreezeIAP.GetPendingList  | 결제 완료 처리가 되지 않은 상품 리스트 획득
    BreezeIAP.GetRestoreList  | Android, iOS 별 구매 복원 할 상품 리스트 획득 

### Initialize

Unity IAP의 초기화 과정을 비동기 방식으로 처리하여 완료 시점을 알 수 있도록 구현하였습니다.<br>
초기화 이전에 스토어에 등록된 ProductId를 런타임에서 획득할 수 있는지 확인 부탁드립니다.


```csharp
using Achieve.IAP;
private async void Start()
{
    // Array, List 모두 가능
    List<InitializeDto> dtoList = new List<InitializeDto>();
    // 스토어에 등록 된 Product의 Id와 상품 타입을 Dto에 등록하여 List에 추가합니다.    
    dtoList.Add(new InitializeDto
    {
        ProductId = "Consumable",
        ProductType = ProductType.Consumable
    });
    await BreezeIAP.InitializeAsync(dtoList);
}
```

### Purchase, Confirm

결제 시도부터 성공 및 실패 시점까지 사용자가 명확하게 판단할 수 있도록 인터페이스와 에러 메시지를 제공합니다.

```csharp
public async void PurchaseAsync(string productId)
{
    PurchaseResult result = await BreezeIAP.PurchaseAsync(productId);
    // 성공 시
    if(result.IsSuccess)
    {
        // 서버를 통한 영수증 검증을 진행하신다면 이 시점에 추가해주세요. 
        // PurchaseResult, Product 모두 가능
        BreezeIAP.Confirm(result);
        // 아이템 지급
        return;
    }
    Debug.Log($"[{result.Product.definition.id}] 상품 구매에 실패했습니다. 이유 : {result.ErrorMessage}");
}
```

---

## Dependencies
[In App Purchasing](https://docs.unity3d.com/Packages/com.unity.purchasing@4.12/manual/index.html) (4.12.0)

---

## ChangeLog
[link](https://github.com/achieveonepark/BreezeIAP/blob/main/CHANGELOG.md)

[def]: https://github.com/achieveonepark/BreezeIAP
