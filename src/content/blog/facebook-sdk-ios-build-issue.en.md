---
title: "Facebook SDK Build Issue (iOS)"
description: "Summary of iOS build and runtime issues when using Facebook SDK 17.0.1 in environments below Xcode 15.3."
pubDate: 2026-03-20
tags:
  - iOS
  - Facebook SDK
  - Troubleshooting
category: Troubleshooting
---

When installing `Facebook SDK 17.0.1` on versions below `Xcode 15.3`, the build succeeds but a crash occurs at runtime.

The reason is that a standard library called `libswiftXPC` was added starting from Xcode 15.3, and it is suspected that Facebook SDK 17.0.1 depends on this library.

When `Facebook SDK 17.0.1` was installed in a Unity project using Xcode 16.1, it initialized successfully without any issues after building and running.
