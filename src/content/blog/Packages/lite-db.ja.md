---
title: "[Unityパッケージ] LiteDB"
description: "このパッケージは、ゲームで使用されるテーブルデータを SQLite で管理し、内部的に WHERE 句を使用した SQL クエリでデータを返します。"
pubDate: 2026-04-01
lang: ja
tags:
  - "Unity"
  - "Package"
category: "Unity Package"
thumbnail: /images/packages/unity-package.png
---

| [🪄GitHub で開く](https://github.com/achieveonepark/lite-db)

このパッケージは、ゲームで使用されるテーブルデータを SQLite で管理し、内部的に `WHERE` 句を使用した SQL クエリでデータを返します。

## インストール

以下のインストール方法のいずれかを選択してください。

> 注意: GitHub URL の `#` 以降のバージョンについては、changelog に記載された最新の変更内容を確認してください。

### Unity Package Manager (UPM) からインストール

1. Unity Package Manager を開き、左上の `+` ボタンをクリックします。
2. `Install package from git URL...` を選択します。
3. `https://github.com/achieveonepark/lite-db.git#1.0.1` を入力し、Install をクリックします。

### 手動で追加

Unity プロジェクトの `Packages` フォルダにある `manifest.json` ファイルを開きます。  
`dependencies` の下に次の行を追加します。

```json
"com.achieve.lite-db": "https://github.com/achieveonepark/lite-db.git#1.0.1"
```

## 設定
1. [DB Browser](https://sqlitebrowser.org/) をインストールします。<br>![New Database](/images/packages/lite-db-1.png)
2. 新しいデータベースを作成します。
3. Create Table をクリックして、テーブルと変数を追加します。変数の詳細は以下を参照してください。
4. 作成したテーブルにデータを追加します。

### SQLite テーブルの作成

- 型

| SQLite 型 | C# 型              |
|-------------|--------------------|
| INTEGER     | int, long          |
| REAL        | double, float      |
| TEXT        | string, enum, bool |
| BLOB        | byte[]             |

- **PK**: 主キー (Primary Key)。このパッケージでは `Id` を主キーとして使用します。
- **NN**: NOT NULL。`bool` のように NULL を許可しない値に設定します。
- **AI**: 自動増分 (Auto Increment)。整数型カラムに使用され、新しい行が追加されるたびに値が自動的に 1 ずつ増加します。<br>通常は主キーと組み合わせて使用されます。
- **U**: 符号なし (Unsigned)。数値データ型に使用され、0 以上の値を表し、負の値を持ちません。

### テーブルデータクラスの作成

> CsvImporter は Code Generator をサポートしているため、ワンクリックでテーブルデータクラスを生成することもできます。

上記の値を設定したら、Unity 側でデータを受け取って使用するクラスも作成する必要があります。

```csharp
using Achieve.Database;
using Unity.VisualScripting.Dependencies.Sqlite;
[Table("TowerData")]
public class UnitData : IDataBase
{
    // Because queries use Id, this attribute and the PK setting are both required.
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }
    public string Name { get; set; }
    public double Attack { get; set; }
    public double Defense { get; set; }
    public double HP { get; set; }
}
```

## クイックスタート

```csharp
LiteDB.Initialize($"{Application.persistentDataPath}/secure/data.db"); // Path
var data = LiteDB.Get<Quest>(1);
if (LiteDB.TryGetValue<Quest, int>("Quest", 1, out var quest))
{
    var reward = quest.reward;
}
// If they exist, load values with Id 1 to 10 into a list.
var list = LiteDB.GetList<Quest>(1, 10);
if(LiteDB.Exist<Quest>(1))
{
    // It exists!
}
```
