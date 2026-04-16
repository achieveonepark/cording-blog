---
title: "QuickSave"
description: "Provides functionality to save and load data by serializing and deserializing binary files using Cysharp's MemoryPack. If you also install Data Protector, you can compress, encrypt, and decrypt the saved data as well. (Docs)"
pubDate: 2026-04-16
lang: en
tags:
  - "Unity"
  - "Package"
  - "QuickSave"
category: "Unity Package"
thumbnail: /images/thumbnails/packages-quick-save.svg
---

| [🪄Open on GitHub](https://github.com/achieveonepark/quick-save)

Provides functionality to save and load data by serializing and deserializing binary files using Cysharp's [MemoryPack](https://github.com/cysharp/memorypack).<br>
If you also install [Data Protector](https://github.com/achieveonepark/dataprotector), you can compress, encrypt, and decrypt the saved data as well. ([Docs](https://achieveonepark.github.io/cording-library/Documents/DataProtector/DataProtector/))

---

## Install

Choose one of the installation methods below.

> Note: For the version after `#` in the GitHub URL, check the latest changes listed in the changelog.

### Install MemoryPack via [NuGetForUnity](https://github.com/GlitchEnzo/NuGetForUnity)
1. Install the NuGetForUnity package by following its README.
2. In the editor menu, click `NuGet/Manage NuGet Packages` and download `MemoryPack`.<br>

### Install via Unity Package Manager (UPM)

1. Open Unity Package Manager and click the `+` button in the upper-left corner.
2. Select `Install package from git URL...`.
3. Enter `https://github.com/achieveonepark/quick-save.git#1.0.0` and click Install.

### Manual Addition

Open the `manifest.json` file in your Unity project's `Packages` folder.  
Add the following line under `dependencies`.

```json
"com.achieve.quick-save": "https://github.com/achieveonepark/quick-save.git#1.0.0"
```

## Quick Start

This setup prepares MemoryPack for smooth binary serialization and deserialization inside Unity.

### Install quick-save

Choose one of the two methods below.

> For the version after `#` in the GitHub URL, check the latest entry in the changelog.

### Use via UPM
1. Open UPM and click the `+` button in the upper-left corner.
2. Select `Install package from git URL...`.
3. Enter the package URL and install it.

### Add manually
1. Open `Unity Project/Packages/manifest.json`.
2. Add `"com.achieve.quick-save": "https://github.com/achieveonepark/quick-save.git#1.0.0"` under `dependencies`.

---

## Description

### API

This package provides the following features.

    QuickSave.Builder           | Creates a QuickSave object.
    QuickSave.SaveData<T>       | Saves data of type T as a binary file under persistentDataPath.
    QuickSave.LoadData<T>       | Loads data of type T from persistentDataPath.

### How to use

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

## Dependencies
[Memory Pack](https://github.com/achieveonepark/MemoryPack#1.21.1) (1.21.1)

---

## ChangeLog
[link](https://github.com/achieveonepark/QuickSave/blob/main/CHANGELOG.md)

[git]: https://github.com/achieveonepark/quick-save
