---
title: "LiteDB"
description: "This package manages table data used in games with SQLite and returns data internally through SQL queries using the WHERE clause."
pubDate: 2026-04-16
lang: en
tags:
  - "Unity"
  - "Package"
  - "LiteDB"
category: "Unity Package"
---

| [🪄Open on GitHub](https://github.com/achieveonepark/lite-db)

This package manages table data used in games with SQLite and returns data internally through SQL queries using the `WHERE` clause.

## Install

Choose one of the installation methods below.

> Note: For the version after `#` in the GitHub URL, check the latest changes listed in the changelog.

### Install via Unity Package Manager (UPM)

1. Open Unity Package Manager and click the `+` button in the upper-left corner.
2. Select `Install package from git URL...`.
3. Enter `https://github.com/achieveonepark/lite-db.git#1.0.1` and click Install.

### Manual Addition

Open the `manifest.json` file in your Unity project's `Packages` folder.  
Add the following line under `dependencies`.

```json
"com.achieve.lite-db": "https://github.com/achieveonepark/lite-db.git#1.0.1"
```

## Setting
1. Install [DB Browser](https://sqlitebrowser.org/).<br>![New Database](/images/packages/lite-db-1.png)
2. Create a new database.
3. Click Create Table and add tables and variables. See below for more details on variables.
4. Add data to the table you created.

### Create SQLite Table

- Type

| SQLite Type | C# Type            |
|-------------|--------------------|
| INTEGER     | int, long          |
| REAL        | double, float      |
| TEXT        | string, enum, bool |
| BLOB        | byte[]             |

- **PK**: Primary Key. This package uses `Id` as the primary key.
- **NN**: Not Null. Set this for values that should not allow NULL, such as `bool`.
- **AI**: Auto Increment. Used on integer columns so the value automatically increases by 1 whenever a new row is added.<br>Usually used together with the primary key.
- **U**: Unsigned. Used for numeric data types and indicates values greater than or equal to 0 with no negatives.

### Create Table Data Class

> CsvImporter supports a Code Generator, so you can also generate table data classes with one click.

Once the values above are set, you also need to create the class in Unity that will receive and use the data.

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

## Quick Start

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
