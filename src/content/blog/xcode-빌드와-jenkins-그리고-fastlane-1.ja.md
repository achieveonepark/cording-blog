---
title: "Xcode ビルドと Jenkins。そして Fastlane - 1"
description: "iOS ビルドの仕組みを理解するためのリマインド"
pubDate: 2026-04-04
lang: ja
tags:
  - iOS
  - Xcode
  - Build
  - Jenkins
  - Fastlane
thumbnail: /images/1775347507127.png
category: R&D
subcategory: CI/CD
---

## Xcode

Unity 開発者なら仕事の中で半ば強制的に触ることになり、Google に答えを求めながら何日も迷子にさせる恐ろしいツール……そんなふうに思って生きてきた。

でも、そろそろこの Xcode という存在をちゃんと理解しないといけないな、という気持ちになった。

### 手動ビルド

一般的には Unity ビルド後に出力された成果物を開いて Build / Archive する形。  
iOS ビルドのテスト環境として一番よく見てきた流れだと思う。

* provisioning profile 未設定によるビルドエラー
* pods 側の何かが設定されておらずビルドエラー
* SDK 問題によるコードエラー
* Compatibility 未設定による機能未動作
* Xcode バージョン更新による互換性崩れ
* Build Option での変数宣言対応（今は少し減ったけど……）
* build は通るのに archive しようとすると失敗する

ここ数年で経験したものを並べるとだいたいこんな感じだけど、まだ思い出せていないものもありそうだ……

### CLI ビルド

```bash
/Applications/Unity/Hub/Editor/6000.3.10f1/Unity \
  -batchmode \
  -nographics \
  -quit \
  -projectPath "$(pwd)" \
  -executeMethod BuildScript.BuildIOS \
  -logFile unity_build.log
```

Unity がこんなふうにコマンドライン引数でビルドできることを、実は今回初めて知った。  
こうしてビルドした成果物に対して、

```bash
xcodebuild \
  -workspace "$WORKSPACE" \
  -scheme "$SCHEME" \
  -configuration Release \
  -destination "generic/platform=iOS" \
  -archivePath "$ARCHIVE_PATH" \
  clean archive
```

Xcode もこのように呼び出せば、Unity ビルドを最終的に archive するところまで全部コマンドライン引数で処理してくれる。

GUI を必ず開かなくても、こういう方法でも解決できるということが分かった。

コマンドライン引数ともっと仲良くならないといけない気がしてきた……

次回は Jenkins 構成に必要な Docker を R&D してみようと思う……！
