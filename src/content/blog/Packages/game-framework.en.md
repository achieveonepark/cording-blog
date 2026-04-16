---
title: "Game Framework"
description: "A collection of prebuilt systems and extension features that is designed to speed up game development in Unity."
pubDate: 2026-04-16
lang: en
tags:
  - "Unity"
  - "Package"
  - "Game Framework"
category: "Unity Package"
thumbnail: /images/thumbnails/packages-game-framework.svg
---

| [🪄Open on GitHub](https://github.com/achieveonepark/game-framework)

# Game Framework

A collection of prebuilt systems and extension features
that is designed to speed up game development in Unity.

This framework is organized around the central static class `GameFramework.Core`,
which contains a variety of managers and systems.

## UPM Installation

1. Open Unity Package Manager (`Window > Package Manager`).
2. Click the `+` icon in the upper-left corner and select `Add package from git URL...`.
3. Enter the following URL:  
   `https://github.com/achieveonepark/game-framework.git`

## Dependencies

This framework depends on several external packages to use its full feature set.

### Required
- **[UniTask](https://github.com/Cysharp/UniTask):**  
  Required for asynchronous operations across the framework.  
  It must be installed **before** installing the Game Framework package.

### Optional
The following packages can be installed optionally to enable additional features.

- **[UniTaskPubSub](https://github.com/hadashiA/UniTaskPubSub):**  
  Enables the `UIBindingManager` feature for reactive (event-based) UI.
- **[QuickSave](https://github.com/achieveonepark/quicksave):**  
  Enables data persistence for `Core.Player`.  
  To use it, you must add `USE_QUICK_SAVE` to the project's Scripting Define Symbols.

## Features & API

Most modules in the framework are provided
as nested classes inside the static class `GameFramework.Core`.

### Access Patterns
- **Static Classes**  
  Access them directly (e.g. `Core.Time.TimeScale`)
- **MonoBehaviour Singletons**  
  Access them through the `Instance` property  
  (e.g. `Core.Sound.Instance.PlayBGM()`)  
  → The corresponding GameObject must exist in the scene.

### System Modules
| Class | Access | Description |
| :--- | :--- | :--- |
| `Core.Log` | Static | Handles console log output at multiple levels. |
| `Core.Config` | Static | Manages key-value settings stored in PlayerPrefs. |
| `Core.Player` | Static | Central runtime player-data manager based on containers. |
| `Core.Time` | Static | Controls global time scale and provides the current time. |
| `Core.Scene` | Singleton | Manages scene loading and unloading. |
| `Core.Popup` | Singleton | Manages UI popup creation and lifecycle. |

### Other Features
- **Utility and extension methods**  
  Provides various extension methods for Unity and core C# types.  
  See the `Runtime/Extensions` folder.
- **UI components**  
  Includes UI helper components such as `SafeArea` and `Draggable`.

## Quick Start Examples

### `Core.Log`
Handles categorized console logs.
```csharp
Core.Log.Debug("This is a debug message.");
Core.Log.Info("This log is for important information.");
Core.Log.Warning("A problem may occur.");
```

### Core.Config

Manages simple data stored in PlayerPrefs.

```csharp
// Set an initial value if the key does not exist.
Core.Config.AddKey("BGMVolume", 0.8f);
// Set and get a value.
Core.Config.SetConfig("BGMVolume", 0.7f);
float currentVolume = (float)Core.Config.GetConfig("BGMVolume");
```

### Core.Player (Data Management)

Manages runtime data through container classes.

1. Define data and container

```csharp
// Actual data structure.
public class CharacterData : PlayerDataBase
{
    public string Name;
    public int Level;
}
// Container that holds the data.
public class CharacterDataContainer : PlayerDataContainerBase<int, CharacterData>
{
    public CharacterDataContainer()
    {
        // Important: to use GetContainer<T>,
        // DataKey must match the class name.
        DataKey = typeof(CharacterDataContainer).Name;
    }
}
```

2. Register and use the container

```csharp
// Create and register the container when the game starts.
var characterContainer = new CharacterDataContainer();
characterContainer.Add(1, new CharacterData { Id = 1, Name = "Hero", Level = 1 });
Core.Player.AddContainer(characterContainer);
// Retrieve and use the data elsewhere.
var myChars = Core.Player.GetContainer<CharacterDataContainer>();
var mainChar = myChars.GetInfo(1);
mainChar.Level++;
// Save / load all data (requires USE_QUICK_SAVE)
Core.Player.Save();
Core.Player.Load();
```

### Core.Popup (Singleton)

Requires a PopupManager GameObject
with the Core.Popup script and a popup prefab list.

```csharp
// Open a specific type of popup registered in the manager.
// Open() is called automatically.
var myPopup = Core.Popup.Instance.Open<MyAwesomePopup>();
// Pass data when opening a popup.
var data = new MyPopupData { Message = "Hello!" };
Core.Popup.Instance.Open<MyAwesomePopup>(data);
// Close the popup.
myPopup.Close();
```

### Core.Time

A wrapper class around Unity's Time and a DateTime fetched from a pinged server time.

```csharp
// Set game speed to 2x.
Core.Time.TimeScale = 2.0f;
// Get the current real time.
DateTime now = Core.Time.Now;
```
