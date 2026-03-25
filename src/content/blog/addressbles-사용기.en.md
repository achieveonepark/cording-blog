---
title: "Addressables Experience"
description: "A record of my experience using Addressables in Unity."
lang: en
pubDate: 2026-03-23
tags:
  - Unity
  - Addressables
  - Resource
category: R&D
---

# Overview

> This post summarizes what I analyzed through my own experience.
> If anything is incorrect, I'd really appreciate a correction!

[Addressables](https://docs.unity3d.com/Packages/com.unity.addressables@2.9/manual/index.html) was created to make the legacy [AssetBundle](https://docs.unity3d.com/6000.3/Documentation/Manual/AssetBundlesIntro.html) package easier for developers to use.

When I only introduced AssetBundles into the project and measured the resource build time, it was certainly faster than Addressables... but AssetBundle required loading all dependencies alongside a single prefab by default, which meant writing all that raw logic yourself.

So after wandering around trying to figure out how to handle things, I decided to dig into Addressables.

# How It Works

- Inject an address into existing resources to register them as Addressables assets
- Build the checked Addressables resources (you can see what assets exist via step 3 in the Setup section)
- After building, a `catalog.json` file is generated, which records all assets and their versions
- At runtime, calling `Addressables.InitializeAsync` reads the `catalog.json` and caches bundle metadata in memory
- Then, referencing that metadata, `Addressables.LoadAssetAsync` loads the resource into memory, followed by `Object.Instantiate`
- The `AsyncOperationHandle` returned by `Addressables.LoadAssetAsync` has a `Release` method to unload from memory — I cached these in a Dictionary and called Release + Remove when the asset was no longer needed
- Not using Resources seems to result in significantly less memory allocation!

# Versions Used

* Unity 6000.3.9f1
* Addressables 2.7.2

# Setup

1. After installing Addressables, designate a specific folder and mark all resources inside as Addressables assets
2. Run the build
    - If there are script errors, the build won't proceed
    - Each platform needs to be built separately
3. In `Window/Asset Management/Addressables/Groups`, set PlayMode to `Use Existing Build`

# Usage

I actually tried two approaches here.
<br/>

## Cache All Resources on Initialize

> After calling `Addressables.InitializeAsync`, load all resources in the folder via `LoadAssetsAsync` and cache them in memory upfront.

Not having to worry about allocating and releasing individual resources was nice, but the timing of "cache everything" became a problem.

In the Editor, caching was nearly instant — no issues at all. But on Android and iOS, it took 15 seconds... sometimes up to 20 seconds. (Based on a project with ~1,500 files and ~250 MB.)

So...

## Cache Resources On Demand

> Just call the recommended `LoadAssetAsync` when you need a resource.

Clean and simple. There's a reason this is the recommended approach.
Since we're doing it this way, make sure to handle the AssetHandle properly when you're done with it.
