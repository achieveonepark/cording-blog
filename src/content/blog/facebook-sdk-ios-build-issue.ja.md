---
title: "Facebook SDK Build Issue (iOS)"
description: "Xcode 15.3 未満の環境で Facebook SDK 17.0.1 を使用した際に発生しうる iOS ビルドおよびランタイム問題の整理。"
pubDate: 2026-03-20
lang: ja
tags:
  - iOS
  - Facebook SDK
  - Troubleshooting
category: Troubleshooting
thumbnail: /images/1775358466621.png
---

`Xcode 15.3 未満` のバージョンで `Facebook SDK 17.0.1` を導入すると、ビルド自体は通るものの crash が発生する問題がある。

その理由として、Xcode 15.3 以降で使用できる `libswiftXPC` という標準ライブラリが追加されており、Facebook SDK 17.0.1 がこのライブラリを利用しているためではないかと推測される。

Xcode 16.1 環境の Unity プロジェクトに `Facebook SDK 17.0.1` を導入し、ビルド後に実行した場合は問題なく正常に initialize された。
