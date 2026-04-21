---
title: "[Unityパッケージ] BreezeIAP"
description: "このパッケージは Unity IAP をラップし、ユーザーがより扱いやすいインターフェースを提供します。ただし、レシート検証ロジックは別途実装する必要があります。"
pubDate: 2026-03-02
lang: ja
tags:
  - "Unity"
  - "Package"
category: "Unity Package"
thumbnail: /images/packages/unity-package.png
---

| [🪄GitHub で開く](https://github.com/achieveonepark/breeze-iap)

このパッケージは [Unity IAP](https://docs.unity3d.com/kr/2022.1/Manual/UnityIAP.html) をラップし、ユーザーがより扱いやすいインターフェースを提供します。<br/>
ただし、レシート検証ロジックは別途実装する必要があります。

## クイックスタート
以下の 2 つの方法のいずれかを選択してください。

> GitHub URL の `#` 以降のバージョンについては、changelog の最新エントリを確認してください。

### UPM 経由で利用する
1. UPM を開き、左上の `+` ボタンをクリックします。
2. `Install package from git URL...` を選択します。
3. `https://github.com/achieveonepark/BreezeIAP.git#1.0.0` を入力してインストールします。

### 手動で追加する
1. `Unity Project/Packages/manifest.json` を開きます。
2. `dependencies` の下に次の行を追加します: `"com.achieve.iap": "https://github.com/achieveonepark/BreezeIAP.git#1.0.0"`

---

## 説明

### API

このパッケージは以下の機能を提供します。

    BreezeIAP.Initialize      | Unity IAP を初期化します
    BreezeIAP.Purchase        | 購入を試みます
    BreezeIAP.Confirm         | 購入成功後の処理を完了します
    BreezeIAP.GetPendingList  | まだ完了していない商品のリストを取得します
    BreezeIAP.GetRestoreList  | Android および iOS で復元する商品のリストを取得します

### Initialize

Unity IAP の初期化フローは非同期で実装されており、いつ完了したかを判別できます。<br>
初期化前に、ストアに登録された ProductId が実行時に取得できることを確認してください。

```csharp
using Achieve.IAP;
private async void Start()
{
    // Both Array and List are supported.
    List<InitializeDto> dtoList = new List<InitializeDto>();
    // Register the store product id and product type in a DTO and add it to the list.
    dtoList.Add(new InitializeDto
    {
        ProductId = "Consumable",
        ProductType = ProductType.Consumable
    });
    await BreezeIAP.InitializeAsync(dtoList);
}
```

### Purchase, Confirm

このパッケージは、購入の試行から成功または失敗までの各段階をユーザーが明確に判別できるよう、インターフェースとエラーメッセージを提供します。

```csharp
public async void PurchaseAsync(string productId)
{
    PurchaseResult result = await BreezeIAP.PurchaseAsync(productId);
    // On success
    if(result.IsSuccess)
    {
        // If you perform receipt validation through a server, add it here.
        // Both PurchaseResult and Product are supported.
        BreezeIAP.Confirm(result);
        // Grant the item.
        return;
    }
    Debug.Log($"[{result.Product.definition.id}] Failed to purchase the product. Reason: {result.ErrorMessage}");
}
```

---

## 依存関係
[In App Purchasing](https://docs.unity3d.com/Packages/com.unity.purchasing@4.12/manual/index.html) (4.12.0)

---

## ChangeLog
[link](https://github.com/achieveonepark/BreezeIAP/blob/main/CHANGELOG.md)

[def]: https://github.com/achieveonepark/BreezeIAP
