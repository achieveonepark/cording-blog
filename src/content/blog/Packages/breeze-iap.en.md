---
title: "[Unity Package] BreezeIAP"
description: "This package wraps Unity IAP and provides an interface that is easier for users to work with. However, receipt validation logic must still be implemented separately."
pubDate: 2026-04-16
lang: en
tags:
  - "Unity"
  - "Package"
category: "Unity Package"
thumbnail: /images/packages/unity-package.png
---

| [🪄Open on GitHub](https://github.com/achieveonepark/breeze-iap)

This package wraps [Unity IAP](https://docs.unity3d.com/kr/2022.1/Manual/UnityIAP.html) and provides an interface that is easier for users to work with. <br/>
However, receipt validation logic must still be implemented separately.

## Quick Start
Choose one of the two methods below.

> For the version after `#` in the GitHub URL, check the latest entry in the changelog.

### Use via UPM
1. Open UPM and click the `+` button in the upper-left corner.
2. Select `Install package from git URL...`.
3. Enter `https://github.com/achieveonepark/BreezeIAP.git#1.0.0` and install it.

### Add manually
1. Open `Unity Project/Packages/manifest.json`.
2. Add the following under `dependencies`: `"com.achieve.iap": "https://github.com/achieveonepark/BreezeIAP.git#1.0.0"`

---

## Description

### API

This package provides the following features.

    BreezeIAP.Initialize      | Initialize Unity IAP
    BreezeIAP.Purchase        | Attempt a purchase
    BreezeIAP.Confirm         | Complete processing after a successful purchase
    BreezeIAP.GetPendingList  | Get the list of products that have not been completed yet
    BreezeIAP.GetRestoreList  | Get the list of products to restore on Android and iOS

### Initialize

The initialization flow of Unity IAP is implemented asynchronously so you can determine when it has completed.<br>
Before initialization, make sure the ProductIds registered in the store can be obtained at runtime.

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

The package provides an interface and error messages so the user can clearly determine each stage from purchase attempt to success or failure.

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

## Dependencies
[In App Purchasing](https://docs.unity3d.com/Packages/com.unity.purchasing@4.12/manual/index.html) (4.12.0)

---

## ChangeLog
[link](https://github.com/achieveonepark/BreezeIAP/blob/main/CHANGELOG.md)

[def]: https://github.com/achieveonepark/BreezeIAP
