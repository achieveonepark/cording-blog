---
title: "[Unityパッケージ] Data Protector"
description: "- byte[] および string データを物理的に保存する前に圧縮・暗号化し、保存データを直接検査しにくくする機能を提供します。- 暗号化には、ユーザーが 16 バイトの string キー値を指定する必要があります。- また、byte[] や string データから SHA256 ハッシュ値を抽出して、ファイルが変更されたかどうかを比較するロジックも提供します。"
pubDate: 2026-03-09
lang: ja
tags:
  - "Unity"
  - "Package"
category: "Unity Package"
thumbnail: /images/packages/unity-package.png
---

| [🪄GitHub で開く](https://github.com/achieveonepark/data-protector)

- `byte[]` および `string` データを物理的に保存する前に圧縮・暗号化し、保存データを直接検査しにくくする機能を提供します。<br>
- 暗号化には、ユーザーが `16 バイト` の `string キー` 値を指定する必要があります。<br>
- また、`byte[]` や `string` データから `SHA256` ハッシュ値を抽出して、ファイルが変更されたかどうかを比較するロジックも提供します。<br>

---

## インストール

以下のインストール方法のいずれかを選択してください。

> 注意: GitHub URL の `#` 以降のバージョンについては、changelog に記載された最新の変更内容を確認してください。

### Unity Package Manager (UPM) からインストール

1. Unity Package Manager を開き、左上の `+` ボタンをクリックします。
2. `Install package from git URL...` を選択します。
3. `https://github.com/achieveonepark/data-protector.git#1.0.0` を入力し、Install をクリックします。

### 手動で追加

Unity プロジェクトの `Packages` フォルダにある `manifest.json` ファイルを開きます。  
`dependencies` の下に次の行を追加します。

```json
"com.achieve.infinity-value": "https://github.com/achieveonepark/data-protector.git#1.0.0"
```

## 説明

### 圧縮・暗号化について
1. [AES-128](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) 方式を使用します。
2. 圧縮には C# が提供する [GZipStream](https://learn.microsoft.com/ko-kr/dotnet/api/system.io.compression.gzipstream?view=net-8.0) を使用します。

### API

このパッケージは以下の機能を提供します。

    DataProtector.Encrypt        | 圧縮および暗号化後の結果値
    DataProtector.Decrypt        | 復号化および解凍後の結果値
    HaskChecker.ComputeHash      | 暗号化データのハッシュ値を抽出
    HaskChecker.ValidateHash     | 2 つのハッシュ値を比較

---
