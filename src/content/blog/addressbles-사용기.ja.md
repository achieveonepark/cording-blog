---
title: "Addressables 使用記"
description: "Addressables を使った記録です。"
pubDate: 2026-03-23
lang: ja
tags:
  - Unity
  - Addressables
  - Resource
thumbnail: /images/1775359380524.png
category: R&D
subcategory: Unity
---

# 概要

> 筆者が実際に体験しながら分析した内容をまとめた記事です。  
> 間違っている点があれば、ご指摘いただけるととてもありがたいです！

レガシーなパッケージである [AssetBundle](https://docs.unity3d.com/6000.3/Documentation/Manual/AssetBundlesIntro.html) を、より扱いやすくしたものが [Addressables](https://docs.unity3d.com/Packages/com.unity.addressables@2.9/manual/index.html) だと言われている。

AssetBundle をプロジェクトに導入して、単純にリソースのビルド時間だけを見れば確かに Addressables より速かった。  
ただ、AssetBundle はプレハブを 1 つ読み込むだけでも依存リソースまで自前で一緒に読み込む必要がある、生に近いロジックが前提だった。

そのため、どう使えばいいのかあれこれ迷った末に、Addressables をしっかり調べてみることにした。

# 仕組みは？

* 既存のリソースに address を付与して Addressables リソースとして登録
* チェックした Addressables リソースをビルドする
  * 設定手順の 3 番まで行くと、どのアセットが含まれているか確認できる
* ビルドすると `catalog.json` が生成され、どのアセットがどのバージョンなのかがすべて記録される
* ランタイムで `Addressables.InitializeAsync` を呼ぶと、この `catalog.json` を読み込んでバンドルのメタデータをメモリにキャッシュする
* その後、このメタデータを参照して `Addressables.LoadAssetAsync` でリソースをメモリにロードし、続けて `Object.Instantiate` を行う
* `Addressables.LoadAssetAsync` が返す `AsyncOperationHandle` には、メモリから解放するための `Release` メソッドがあるので、別途 Dictionary にキャッシュして、不要になったら取り出して解放し Remove した
* Resources を使わない分、メモリ割り当てもかなり少なくなる印象だった

# 使用バージョン

* Unity 6000.3.9f1
* Addressables 2.7.2

# 設定

1. Addressables をインストールした後、特定のフォルダを指定して、その中のすべてのリソースを Addressables リソースとして設定
2. ビルドを実行
    * この時、スクリプトエラーがあるとビルドは進まなかった
    * これはプラットフォームごとに別々にビルドする必要があった
3. `Window/Asset Management/Addressbles/Groups` で PlayMode を `Use Existing Build` に設定

# 使い方

ここでは実際に 2 つの方法を試してみた。

## Initialize 時にすべてのリソースをキャッシュ

> `Addressables.InitializeAsync` を呼んだあと、フォルダ内のすべてのリソースを `LoadAssetsAsync` で読み込んでメモリにキャッシュし、必要な時に使う方法。

個別のリソースの確保や解放をそこまで気にしなくてよいのは楽だったが、  
「全部キャッシュする」タイミングが問題になった。

Editor ではほぼ遅延なくキャッシュされて「問題なさそう」と思えたのに、  
Android や iOS では 15 秒、長い時は 20 秒近くかかってしまった。  
（ファイル数 1500 個、250MB ほどのプロジェクト基準）

その結果……

## リソースを使う時にキャッシュ

> 推奨されている通り、必要になった時に `LoadAssetAsync` を呼んで使う方法。

シンプルで綺麗。  
やはりこの方法が推奨されているのには理由がある。

どうせこの方法で行くなら、AssetHandle もきちんと管理しながら使う必要がありそうだ。
