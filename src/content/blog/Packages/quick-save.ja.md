---
title: "[Unityパッケージ] QuickSave"
description: "Cysharp の MemoryPack を使用してバイナリファイルをシリアライズ・デシリアライズし、データを保存・読み込みする機能を提供します。Data Protector も併せてインストールすれば、保存データの圧縮・暗号化・復号化も可能です。(Docs)"
pubDate: 2026-04-07
lang: ja
tags:
  - "Unity"
  - "Package"
category: "Unity Package"
thumbnail: /images/packages/unity-package.png
---

| [🪄GitHub で開く](https://github.com/achieveonepark/quick-save)

Cysharp の [MemoryPack](https://github.com/cysharp/memorypack) を使用してバイナリファイルをシリアライズ・デシリアライズし、データを保存・読み込みする機能を提供します。<br>
[Data Protector](https://github.com/achieveonepark/dataprotector) も併せてインストールすれば、保存データの圧縮・暗号化・復号化も可能です。([Docs](https://achieveonepark.github.io/cording-library/Documents/DataProtector/DataProtector/))

---

## インストール

以下のインストール方法のいずれかを選択してください。

> 注意: GitHub URL の `#` 以降のバージョンについては、changelog に記載された最新の変更内容を確認してください。

### [NuGetForUnity](https://github.com/GlitchEnzo/NuGetForUnity) 経由で MemoryPack をインストール
1. NuGetForUnity の README に従って NuGetForUnity パッケージをインストールします。
2. エディタメニューで `NuGet/Manage NuGet Packages` をクリックし、`MemoryPack` をダウンロードします。<br>

### Unity Package Manager (UPM) からインストール

1. Unity Package Manager を開き、左上の `+` ボタンをクリックします。
2. `Install package from git URL...` を選択します。
3. `https://github.com/achieveonepark/quick-save.git#1.0.0` を入力し、Install をクリックします。

### 手動で追加

Unity プロジェクトの `Packages` フォルダにある `manifest.json` ファイルを開きます。  
`dependencies` の下に次の行を追加します。

```json
"com.achieve.quick-save": "https://github.com/achieveonepark/quick-save.git#1.0.0"
```

## クイックスタート

このセットアップにより、Unity 内でスムーズなバイナリシリアライズ・デシリアライズができるよう MemoryPack を準備します。

### quick-save をインストール

以下の 2 つの方法のいずれかを選択してください。

> GitHub URL の `#` 以降のバージョンについては、changelog の最新エントリを確認してください。

### UPM 経由で利用する
1. UPM を開き、左上の `+` ボタンをクリックします。
2. `Install package from git URL...` を選択します。
3. パッケージ URL を入力してインストールします。

### 手動で追加する
1. `Unity Project/Packages/manifest.json` を開きます。
2. `dependencies` の下に `"com.achieve.quick-save": "https://github.com/achieveonepark/quick-save.git#1.0.0"` を追加します。

---

## 説明

### API

このパッケージは以下の機能を提供します。

    QuickSave.Builder           | QuickSave オブジェクトを作成します。
    QuickSave.SaveData<T>       | persistentDataPath 配下に T 型のデータをバイナリファイルとして保存します。
    QuickSave.LoadData<T>       | persistentDataPath から T 型のデータを読み込みます。

### 使い方

```csharp
[MemoryPackable]
public partial class Monster
{
    public int HP;
    public long Attack;
    public long Defense;
}
```

```csharp
using Achieve.QuickSave
public class DataMng : MonoBehaviour
{
    QuickSave<Monster> data;
    void Start()
    {
        Monster monster = new Monster();
        monster.HP = 10000;
        monster.Attack = 10000;
        monster.Defense = 100000;
        data = new QuickSave<Monster>.Builder()
                                     .UseEncryption("ejrjejrtlq3mgfeq") // Available when Data Protector is added.
                                     .UseVersion(55) // Sets the data version.
                                     .Build();
        // Save the data.
        data.SaveData(monster);
        // Load the physically stored data.
        var loadMonster = data.LoadData();
    }
}
```

---

## 依存関係
[Memory Pack](https://github.com/achieveonepark/MemoryPack#1.21.1) (1.21.1)

---

## ChangeLog
[link](https://github.com/achieveonepark/QuickSave/blob/main/CHANGELOG.md)

[git]: https://github.com/achieveonepark/quick-save
