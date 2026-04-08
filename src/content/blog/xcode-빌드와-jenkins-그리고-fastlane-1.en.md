---
title: "Xcode Builds, Jenkins, and Fastlane - 1"
description: "A reminder to understand the iOS build pipeline"
lang: en
pubDate: 2026-04-04
tags:
  - iOS
  - Xcode
  - Build
  - Jenkins
  - Fastlane
category: R&D
thumbnail: /images/1775347507127.png
---

## Xcode

If you're a Unity developer, you're forced to deal with this in the workplace — a terrifying tool that has you desperately Googling for answers and losing sleep for days on end... or so I used to think.

But now I've decided it's time to actually understand this thing called Xcode properly.

### Manual Builds

The typical flow is to run the output from a Unity build and then Build / Archive it. This is probably the most common setup people have encountered for iOS build testing.

* Build errors from missing provisioning profiles
* Build errors because something in pods wasn't configured
* Code errors due to SDK issues
* Features not working because of missing Compatibility settings
* Compatibility breaking after an Xcode version update
* Handling variable declarations in Build Options (less of an issue now, but still...)
* It builds fine, but then fails when you try to archive

Compiling everything I've dealt with over the years, that's about it — though there might be more I'm not remembering...

### CLI Builds

```bash
/Applications/Unity/Hub/Editor/6000.3.10f1/Unity \
  -batchmode \
  -nographics \
  -quit \
  -projectPath "$(pwd)" \
  -executeMethod BuildScript.BuildIOS \
  -logFile unity_build.log
```

I didn't even know Unity could be built by invoking command-line arguments like this. Once you build and get the output:

```bash
xcodebuild \
  -workspace "$WORKSPACE" \
  -scheme "$SCHEME" \
  -configuration Release \
  -destination "generic/platform=iOS" \
  -archivePath "$ARCHIVE_PATH" \
  clean archive
```

If you call Xcode like this too, it runs the entire process of archiving the Unity build output through command-line arguments.

You don't even need to open the GUI — I learned you can solve it this way too.

I'm starting to think I really need to get more familiar with command-line arguments...

Next up, I'm going to R&D Docker to set up Jenkins...!
