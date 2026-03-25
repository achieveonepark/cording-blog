---
title: "RuntimeInitializeOnLoadMethod"
description: "A post summarizing my hard-earned experience with this attribute."
lang: en
pubDate: 2026-03-24
tags:
  - Unity
category: R&D
---

# What Is It?

- An attribute provided by Unity that automatically invokes a method before or after a Scene is loaded when the app starts
- You don't need to inherit from MonoBehaviour — it works with a `static` method
- The return type must always be `void`

# What Settings Are There?

## SubsystemRegistration

- Used to reset global static state
- Mainly used to reset state values when developing with Domain Reload disabled via Enter PlayMode
- **The stage for cleaning up anything that might have leftover values from the previous runtime**
- Not suitable for MonoBehaviour-based types

## AfterAssembliesLoaded

- After preload asset initialization, but before scene initialization
- The Assembly-level processing stage for DI injection, reflection-based registration, attribute scanning, etc.
- Also not suitable for MonoBehaviour-based types

## BeforeSplashScreen

> Try not to use this stage at all — just forget it exists.
> Doing anything here only increases boot complexity.

- Called just before the splash screen appears, before the first scene is loaded
- Early native/platform initialization
- Bootstrap calls before the splash screen
- That said, avoid this enum value as much as possible

## BeforeSceneLoad

- The first scene has been loaded, but Awake has not yet been called
- Objects are in an inactive state
- Good for creating static services that need to be ready before Awake runs
- Injecting configuration values before entering a scene
- Great for preparing anything that components in the scene will use
- Finding objects via `FindObjectType`, etc. may be difficult at this point

## AfterSceneLoad

- The default value for `RuntimeInitializeOnLoadMethod`
- Called immediately after Awake and OnEnable have finished
- A good stage for organizing and linking MonoBehaviour-derived objects

# But...

I like building Unity Packages, and I was calling this method from inside a Package. It worked fine in the Editor, but it wasn't being called in Android and iOS builds. Why?!

## After Looking Into It...

On Android and iOS, IL2CPP's Managed Stripping removes unused code. My code was wrapped in `#if UNITY_ANDROID` and `#if UNITY_IOS` conditionals, which apparently caused it to be stripped.

So I created an empty `.cs` file and added:

```csharp
[assembly: AlwaysLinkAssembly]
```

This is an Assembly-level keyword that prevents the code from being stripped.

### What Is AlwaysLinkAssembly?

It's an attribute that forces Unity's IL2CPP Managed Stripping process to never remove the assembly — even if there are no direct references to it.

And with that... everything was resolved!
