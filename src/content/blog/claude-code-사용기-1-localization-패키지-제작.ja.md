---
title: "Claude Code 使用記 1 - Localization パッケージ制作"
description: "Claude に作らせてみた Localization 機能の記録"
pubDate: 2026-04-04
lang: ja
tags:
  - Unity
  - Localization
  - AI
category: AI
thumbnail: /images/1775347988244.png
---

Claude を Max まで使うのはさすがに高すぎるので、今は **Pro** で使ってみている。

ただ…… `Opus 4.6` に大きめの質問を 1 回するだけで、5 時間分の使用量がすぐ底をついてしまう……。  
Max プランなら `Opus 4.6` を 5 時間使っても使い切れないと聞いたけれど……本当はすごく使いたい。でも高いので見送り……。

実際のところ、`Sonnet 4.6` も 4.5 と比べるとかなり良いコードを書いてくれるので、十分満足しながら使っている。

それはさておき、今日は「Claude は Localization をどう解釈して、どう作るんだろう？」というのが急に気になって、そのままプランモードで聞いてみた。モデルは `Opus 4.6`。

```text
Localization パッケージとして、次のコア機能を含めます:
1. JSON ベースの locale ファイル - flat {"key": "value"} 形式で翻訳者に渡しやすい
2. Static API - LocalizationManager.Get(key), SetLocale(code) などの簡潔なインターフェース
3. 自動初期化 - [RuntimeInitializeOnLoadMethod] でシーンロード前に自動設定
4. Components - LocalizedText, LocalizedImage, LocalizedAudio (locale 変更時に自動更新)
5. 型安全なキーコード生成 - L.Menu.Start 形式の自動補完対応
6. UIToolkit Editor - MultiColumnListView テーブルエディタ、CSV/JSON import/export、Project Settings 統合
7. TMP 条件付き対応 - TextMeshPro インストール時に自動有効化
8. 外部依存なし - 独自 JSON パーサー内蔵
```

とりあえず Runtime フォルダと Editor フォルダはきれいに分けてくれたけれど、asmdef が違うので `internal` で宣言すると相互アクセスできないのに、普通に触っていてエラーが大量発生していた。そこを直してもらった結果……？

## パッケージをインストール

インストールしてすぐに表示された設定画面とエディタ画面。

![image](/images/1774959696629.png)

![image](/images/1774958771830.png)

うわ……本当に完成度の高い、ちゃんと作られたパッケージみたいだ。  
最初のセットアップでは少し手間取ったけれど、しっかり動くのは確認できた。

しかもすごいのが…… Text だけでなく Audio、Image まで全部対応している。  
さらに、エディタの中でデータを作れるツールまで入っている……。

```csharp
public static class LocalizationKeyGenerator
{
    // C# の予約キーワード一覧
    private static readonly HashSet<string> CSharpKeywords = new HashSet<string>
    {
        "abstract", "as", "base", "bool", "break", "byte", "case", "catch", "char",
        "checked", "class", "const", "continue", "decimal", "default", "delegate",
        "do", "double", "else", "enum", "event", "explicit", "extern", "false",
        "finally", "fixed", "float", "for", "foreach", "goto", "if", "implicit",
        "in", "int", "interface", "internal", "is", "lock", "long", "namespace",
        "new", "null", "object", "operator", "out", "override", "params", "private",
        "protected", "public", "readonly", "ref", "return", "sbyte", "sealed",
        "short", "sizeof", "stackalloc", "static", "string", "struct", "switch",
        "this", "throw", "true", "try", "typeof", "uint", "ulong", "unchecked",
        "unsafe", "ushort", "using", "virtual", "void", "volatile", "while"
    };

// ...

}
```

CodeGen まであるので Roslyn の CodeAnalysis を使っているのかと思ったら、どうやら文字列を組み立てているだけで、キーワードが全部直書きされていた。ちょっと笑ってしまった。

JsonParser も string の塊を直接いじりながらパースするロジックになっている……。  
別の意味でかなりすごい……。

## UI は？

![image](/images/1774958971281.png)

UIToolkit で、USS / UXML / C# スクリプトにしっかり分離されているのも確認できた。  
自分も UIToolkit を勉強しないといけないのに……ずっと先延ばしにしている……。

## それでも

使いやすさ重視で作ってほしいとお願いしただけあって、CSV / JSON の両方をインポートできる Parser、全体的な UX や API インターフェースを見ると、ちゃんとニーズは満たしてくれていた。  
ただ……

なぜか、生成してくれた ScriptableObject をクリックしてインスペクタに情報が表示されると、ものすごいカクつきが発生する。  
Json ファイルを Parse するメソッドでも走っているのか……？

とはいえ、少し改善すれば十分実用にできそうな感じではある。
