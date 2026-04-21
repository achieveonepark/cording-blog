---
title: "Claude Code 使用記 2 - Unity Framework 制作"
description: "Claude Code が考える Unity Framework が気になった。"
pubDate: 2026-04-05
lang: ja
tags:
  - Unity
  - AI
  - Framework
category: AI
thumbnail: /images/1775359650805.png
---

[Claude Code 使用記 1 - Localization パッケージ制作](/posts/claude-code-사용기-1-localization-패키지-제작ja/) を進めているうちに、Claude を使って自分用の Unity Framework も作ってみたくなった。

## Game Framework

### 以前は

ゲームを何本かリリースする中で、繰り返し必要になるものをベースに [Game Framework](https://github.com/achieveonepark/game-framework) を 1 つ作って使い続け、今もずっと手を入れていた。

いつものように修正していた時、ふと Claude Code はどんなふうにコードを書き、構成するのか気になって、試してみることにしたプロジェクトがこれだ。

### Claude Code で作る

基本の骨組みとしては、こんな感じでお願いした。

* データ管理は DI 形式の `VContainer` で
* データテーブルは `Google Sheet 連携` を行い、ランタイムでは `MemoryPack を使って` 読み込むように
* `Addressables` はできるだけ使いやすく
* 使用記 1 の Localization も含める
* `UIToolkit` で GUI を実装し、`SettingsProvider` を積極的に活用
* ドキュメントは `Gitbook` で構築

そうして出てきた成果物がこちら。

## [AchEngine を見る](https://www.somiri.dev/AchEngine/guide/)

いろいろな機能をひと通り触ってみたけれど、最初に少しだけ迷ったくらいで、十分実用に耐えるレベルまで確認できた。  
しかもドキュメントもかなり上手く書いてくれる……

ドキュメントまで一緒に作って、ああして並べてくれると、すごくちゃんとして見える。  
これからは自分の頭と Claude Code をフル活用して、既存の Game Framework よりもっと良いものにしていくつもりだ。

🐣 UIToolkit をこんなに上手く作ってくれるの、本当にありがたい……
