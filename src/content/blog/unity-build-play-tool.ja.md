---
title: "Unity Build Play Tool"
description: "AI で作ったビルド実行ツール！"
pubDate: 2026-03-24
lang: ja
tags:
  - Unity
  - Build
thumbnail: /images/1775359042281.png
category: R&D
subcategory: Unity
---

# 何これ？

Unity でビルドを出したあと、そのビルドを環境に合ったデバイスへ移すのは思った以上にかなり面倒だ。  
ワンクリックでビルドのインストールと実行をするために作ったツール。

Claude と Codex を混ぜて作ってみたけれど、思ったよりずっと良いものができた……すごい……

# ざっくり見る

![image](/images/1774359786310.png)
![image](/images/1774360163553.png)

* Android: 端末を接続して Refresh ボタンを押すと検出され、ビルドを選んでインストール
* iOS: Xcode プロジェクトを開く
* WebGL: localhost:port でサーバーを起動してテスト

# ダウンロード

## [Mac](https://github.com/achieveonepark/unity-build-tool/blob/main/artifacts/unity-build-tool-0.1.0-macos-arm64.dmg)

## [Windows](https://github.com/achieveonepark/unity-build-tool/blob/main/artifacts/unity-build-tool-0.1.0-windows-x64-setup.exe)
