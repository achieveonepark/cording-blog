---
title: "[Unityパッケージ] Game Framework"
description: "Unity でのゲーム開発を高速化するために設計された、構築済みシステムと拡張機能のコレクションです。"
pubDate: 2026-03-16
lang: ja
tags:
  - "Unity"
  - "Package"
category: "Unity Package"
thumbnail: /images/packages/unity-package.png
---

| [🪄GitHub で開く](https://github.com/achieveonepark/game-framework)

# Game Framework

Unity でのゲーム開発を高速化するために設計された、
構築済みシステムと拡張機能のコレクションです。

このフレームワークは、さまざまなマネージャーやシステムを含む
中心的な静的クラス `GameFramework.Core` を中心に構成されています。

## UPM インストール

1. Unity Package Manager (`Window > Package Manager`) を開きます。
2. 左上の `+` アイコンをクリックし、`Add package from git URL...` を選択します。
3. 次の URL を入力します:  
   `https://github.com/achieveonepark/game-framework.git`

## 依存関係

このフレームワークは、すべての機能セットを利用するためにいくつかの外部パッケージに依存します。

### 必須
- **[UniTask](https://github.com/Cysharp/UniTask):**  
  フレームワーク全体の非同期処理に必要です。  
  Game Framework パッケージをインストールする**前に**インストールする必要があります。

### 任意
以下のパッケージは、追加機能を有効にするために任意でインストールできます。

- **[UniTaskPubSub](https://github.com/hadashiA/UniTaskPubSub):**  
  リアクティブ (イベントベース) UI のための `UIBindingManager` 機能を有効にします。
- **[QuickSave](https://github.com/achieveonepark/quicksave):**  
  `Core.Player` のデータ永続化を有効にします。  
  使用するには、プロジェクトの Scripting Define Symbols に `USE_QUICK_SAVE` を追加する必要があります。

## 機能と API

フレームワーク内のほとんどのモジュールは、
静的クラス `GameFramework.Core` のネストされたクラスとして提供されます。

### アクセスパターン
- **静的クラス**  
  直接アクセスします (例: `Core.Time.TimeScale`)
- **MonoBehaviour シングルトン**  
  `Instance` プロパティ経由でアクセスします  
  (例: `Core.Sound.Instance.PlayBGM()`)  
  → 対応する GameObject がシーン内に存在する必要があります。

### システムモジュール
| クラス | アクセス | 説明 |
| :--- | :--- | :--- |
| `Core.Log` | Static | 複数レベルでのコンソールログ出力を処理します。 |
| `Core.Config` | Static | PlayerPrefs に保存されたキー・バリュー設定を管理します。 |
| `Core.Player` | Static | コンテナベースの中央集約型ランタイムプレイヤーデータマネージャー。 |
| `Core.Time` | Static | グローバルなタイムスケールを制御し、現在時刻を提供します。 |
| `Core.Scene` | Singleton | シーンのロードとアンロードを管理します。 |
| `Core.Popup` | Singleton | UI ポップアップの作成とライフサイクルを管理します。 |

### その他の機能
- **ユーティリティと拡張メソッド**  
  Unity および C# 標準型に対するさまざまな拡張メソッドを提供します。  
  `Runtime/Extensions` フォルダを参照してください。
- **UI コンポーネント**  
  `SafeArea` や `Draggable` などの UI ヘルパーコンポーネントを含みます。

## クイックスタート例

### `Core.Log`
カテゴリ別にコンソールログを処理します。
```csharp
Core.Log.Debug("This is a debug message.");
Core.Log.Info("This log is for important information.");
Core.Log.Warning("A problem may occur.");
```

### Core.Config

PlayerPrefs に保存される単純なデータを管理します。

```csharp
// Set an initial value if the key does not exist.
Core.Config.AddKey("BGMVolume", 0.8f);
// Set and get a value.
Core.Config.SetConfig("BGMVolume", 0.7f);
float currentVolume = (float)Core.Config.GetConfig("BGMVolume");
```

### Core.Player (データ管理)

コンテナクラスを通してランタイムデータを管理します。

1. データとコンテナを定義する

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

2. コンテナを登録して使用する

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

### Core.Popup (シングルトン)

Core.Popup スクリプトとポップアッププレハブのリストを持つ
PopupManager GameObject が必要です。

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

Unity の Time と、ping したサーバー時刻から取得した DateTime をラップするクラスです。

```csharp
// Set game speed to 2x.
Core.Time.TimeScale = 2.0f;
// Get the current real time.
DateTime now = Core.Time.Now;
```
