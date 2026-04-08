---
title: "Claude Code Notes 2 - Building a Unity Framework"
description: "I got curious about what kind of Unity Framework Claude Code would come up with."
lang: en
pubDate: 2026-04-05
tags:
  - Unity
  - AI
  - Framework
category: AI
thumbnail: /images/1775359650805.png
---

While working on [Claude Code Notes 1 - Building a Localization Package](https://blog.somiri.dev/posts/claude-code-%EC%82%AC%EC%9A%A9%EA%B8%B0-1-localization-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%A0%9C%EC%9E%91/), I started wanting to build my own Unity Framework using Claude.

## Game Framework

### Before

After shipping a few games, I had built a [Game Framework](https://github.com/achieveonepark/game-framework) based on the things I kept needing repeatedly, and I'd been continuously updating it.

I was tweaking it as usual, when I suddenly got curious about how Claude Code would structure and write the code — so this became that experiment.

### Building with Claude Code

I asked it to set up the basic structure like this:

* Data management via DI-style `VContainer`
* Data tables with `Google Sheets integration`, loaded at runtime using `MemoryPack`
* `Addressables` made as easy to use as possible
* Include the Localization from Notes 1
* GUI built with `UIToolkit`, actively leveraging `SettingsProvider`
* Documentation implemented with `Gitbook`

And here's what came out.

## [Check out AchEngine](https://www.somiri.dev/AchEngine/guide/)

I tried out all the various features, and aside from a tiny bit of fumbling at the start, everything was solid enough to actually use. The documentation it wrote is also impressively good...

And having it generate the docs and lay everything out like that makes it look really legit. I'm planning to keep wrestling with my brain + Claude Code to make this even better than the original Game Framework.

🐣 The fact that it builds UIToolkit stuff so well... I love it...
