---
title: "RuntimeInitializeOnLoadMethod"
description: "このメソッドでいろいろ苦労した内容をまとめた投稿"
pubDate: 2026-03-24
lang: ja
tags:
  - Unity
thumbnail: /images/1775359199678.png
category: R&D
subcategory: Unity
---

# とは？

* Unity が提供する属性で、アプリ起動後に Scene がロードされる前やロードされた後に自動で呼び出してくれる機能
* MonoBehaviour を継承していなくても、static メソッドとして宣言すれば使用できる
* 戻り値の型は必ず void でなければならない

# どんな設定がある？

## SubsystemRegistration

* グローバルな static 状態をリセットしたい時に使う
* 主に Enter PlayMode で Domain Reload を切って開発する場合に、状態値を初期化するために使う
* **前回のランタイムで残っている可能性があるものを綺麗にする段階**
* MonoBehaviour 系をここで扱うのには向いていない

## AfterAssembliesLoaded

* preload asset の初期化後、シーン初期化前のタイミング
* DI 注入、リフレクションベースの登録、attribute スキャンなど、Assembly レベルの処理段階
* ここでも MonoBehaviour 系を扱うのには向いていない

## BeforeSplashScreen

> この段階はできるだけ使わない方がいい……もう忘れてしまうくらいでいい……
> ここで何かすると起動時の複雑さだけが増える……

* スプラッシュが表示される直前、最初のシーンがロードされる前に呼ばれるタイミング
* 早い段階でのネイティブ / プラットフォーム初期化
* スプラッシュ前の Bootstrap 呼び出し段階
* とはいえ、この enum 値はなるべく使わない方がよい

## BeforeSceneLoad

* 最初のシーンはロード済みだが、Awake はまだ呼ばれていないタイミング
* オブジェクトは非アクティブ状態
* Awake が回る前に準備されている必要がある static サービスの生成
* シーン突入前の設定値注入
* シーン内のコンポーネントが使うものを準備するのに向いている
* `FindObjectType` などでは、このタイミングではオブジェクトを見つけづらい場合がある

## AfterSceneLoad

* RuntimeInitializeOnLoadMethod のデフォルト値
* Awake と OnEnable が終わった直後に呼ばれる
* MonoBehaviour を継承したオブジェクトを整理したりリンクしたりするのに向いている段階

# でも……

Unity Package を作るのが好きな筆者は、このメソッドを Package の中から呼び出していた。  
Editor ではちゃんと動くのに、Android や iOS のビルドでは呼ばれなかった。なぜ？！

## 調べてみたら……

Android や iOS では IL2CPP の Managed Stripping によって、使われていないコードは削除されるらしい。  
各プラットフォームごとに分岐が必要で `#if UNITY_ANDROID` と `#if UNITY_IOS` で囲っていたせいか、コードごと落とされてしまったようだ。

そこで空の cs ファイルを 1 つ作って、

```csharp
[assembly: AlwaysLinkAssembly]
```

このコードを追加した。  
コードが削除されないようにしてくれる Assembly レベルのキーワードだ。

### AlwaysLinkAssembly とは

Unity IL2CPP の Managed Stripping の過程で、「このアセンブリは参照がなくても絶対に削除するな！」と強制する属性らしい。

というわけで……すべて解決！
