---
title: "[Unityパッケージ] Infinity Value"
description: "以下のインストール方法のいずれかを選択してください。"
pubDate: 2026-03-23
lang: ja
tags:
  - "Unity"
  - "Package"
category: "Unity Package"
thumbnail: /images/packages/unity-package.png
---

| [🪄GitHub で開く](https://github.com/achieveonepark/infinity-value)

## インストール

以下のインストール方法のいずれかを選択してください。

> 注意: GitHub URL の `#` 以降のバージョンについては、changelog に記載された最新の変更内容を確認してください。

### Unity Package Manager (UPM) からインストール

1. Unity Package Manager を開き、左上の `+` ボタンをクリックします。
2. `Install package from git URL...` を選択します。
3. `https://github.com/achieveonepark/infinity-value.git#1.0.1` を入力し、Install をクリックします。

### 手動で追加

Unity プロジェクトの `Packages` フォルダにある `manifest.json` ファイルを開きます。  
`dependencies` の下に次の行を追加します。

```json
"com.achieve.infinity-value": "https://github.com/achieveonepark/infinity-value.git#1.0.1"
```

### 説明

- 百万・十億・兆といった一般的な単位の代わりに、A・B・C などのカスタム単位を使用でき、セグメント構造により非常に大きな数値の表現と処理に最適化されたパッケージです。
- 内部構造はガベージコレクション (GC) を最小限に抑えるよう設計されており、ゲームのようなパフォーマンス重視のアプリケーションに適しています。
- プロジェクトに Newtonsoft.Json がインストールされている場合、JsonConverter が自動的に登録され、追加設定なしでシリアライズが動作します。
- データは `300F 200E` や `200AE 578AD` などの形式で表現され、すべての演算はその表現上で直接行われます。<br/>`ToString()` を呼び出すと同じ形式で出力されます。
- C# のプリミティブ型からのマイグレーションをサポートし、比較演算子と算術演算子を含むすべての C# 標準演算子を提供します。

### サポートされるコンストラクタ

```csharp
- int
- long
- BigInteger
- string
- float
```

### クイックスタート

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
        // Configure unit names.
        InfinityValue.SetUnitNames(new List<string>
        {
            "A", "B", "C" ...
        });
        A = 1;                              // Can be initialized with int.
        B = "300F 200C";                    // Can be initialized with a formatted string.
        C = 3.0f;                           // float is supported.
        D = new BigInteger(30000000000000); // BigInteger is supported.
        var d = A + B;                      // Basic arithmetic: addition.
        var e = B * C;                      // Basic arithmetic: multiplication.
        var f = B / C;                      // Basic arithmetic: division.
        Debug.Log(D.ToString()); // Prints in the form "30D"
    }
}
~~~~~~~~```
