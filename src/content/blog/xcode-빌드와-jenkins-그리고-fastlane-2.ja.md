---
title: "Xcode ビルドと Jenkins。そして Fastlane - 2"
description: "Docker をインストールして概念を学ぶ"
pubDate: 2026-04-05
lang: ja
tags:
  - Docker
  - Jenkins
  - Ruby
  - wsl
thumbnail: /images/1775357461068.png
category: R&D
subcategory: CI/CD
---

1 編を書いているうちに、  
`Docker で Jenkins を構成して iOS ビルドを一度やってみよう！`
という考えが浮かび、Claude と Codex の力を借りて試してみることにした。

やっぱり概念だけをずっと読むより、直接やってみるのが一番早い習得法だと思うので……

## [Docker](https://www.docker.com/)

どの PC でも同じビルド環境を保証するために、`Image` という実行可能パッケージをもとに `Container` を生成 / 実行するプラットフォームだという。

- ビルドに必要なプラグインのバージョン
- 環境変数

などをまとめて持てるので、PC 固有の設定の影響が減り、ビルド失敗時の追跡もしやすくなるらしい。

### コンテナ化の流れ

> 単純な WebAPI を 1 つ立ち上げる前提で。

1. [ASP.NET](https://dotnet.microsoft.com/ko-kr/learn/aspnet/what-is-aspnet) アプリを作る
2. このアプリを動かす環境を [Dockerfile](https://docs.docker.com/reference/dockerfile/) で定義する
3. [Docker CLI](https://docs.docker.com/reference/cli/docker/) でイメージをビルドする
4. コンテナを実行する

```bash
// Build
docker build -t myapp . 

// Run
docker run -p 8080:8080 myapp
```


### [Jenkins](https://www.jenkins.io/) も……？

ここに Jenkins でビルドする CI/CD を構成したい場合も、その機能を実行するためのコードを延々と書くのではなく、

```bash
FROM jenkins/jenkins:lts
```

Dockerfile で `完成済みの Jenkins サーバーイメージを取得して使う` と 1 行宣言するだけで済む。

もちろん、この宣言だけで今すぐ Unity ビルドが一瞬で動くわけではなく、この時点では Web アプリが開くだけだ。

それでも、bash も Docker もよく分からない自分でも、こうして環境を組めるのを見ると……本当に時代がすごく良くなったなとまた実感する。

> 結局、下の項目も設定する必要がある。
> - Unity Build Pipeline
> - Plugin インストール
> - Agent 接続
> - Certificate
> - xcworkspace
> - ToolChain インストール

Docker で Jenkins サーバーを立ち上げた後に実際にビルドしてみる話は、次回に……！
