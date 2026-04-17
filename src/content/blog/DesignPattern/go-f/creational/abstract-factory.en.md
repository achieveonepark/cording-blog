---
title: "[Design Pattern] Abstract Factory Pattern"
description: "A pattern that creates related groups of objects without depending on concrete types."
pubDate: 2026-04-16
lang: en
tags:
  - "Design Pattern"
  - "Creational"
category: "Design Pattern"
---

# Abstract Factory

## One-line pattern summary
A pattern that creates related groups of objects without depending on concrete types.

## Typical Unity use cases
- When replacing an entire set of platform-specific services.
- When separating test product families.

## Parts (roles)
- Abstract Factory
- Concrete Factory
- Abstract Product

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
public interface IPlatformServiceFactory
{
    ILoginService CreateLoginService();
    IStoreService CreateStoreService();
}

public sealed class MobilePlatformServiceFactory : IPlatformServiceFactory
{
    public ILoginService CreateLoginService() => new MobileLoginService();
    public IStoreService CreateStoreService() => new MobileStoreService();
}

public sealed class PcPlatformServiceFactory : IPlatformServiceFactory
{
    public ILoginService CreateLoginService() => new PcLoginService();
    public IStoreService CreateStoreService() => new PcStoreService();
}
```

## Advantages
- Object creation responsibilities are well organized, which makes dependency management easier.
- Creation policies can be changed flexibly by environment or situation.

## Things to watch out for
- Avoid introducing overly abstract creation layers for simple problems.
- As creation rules increase, keeping documentation and tests in sync becomes more important.

## Interaction diagram

This shows the flow where platform-specific product families are created behind the same interface.

```mermaid
flowchart LR

  client["Game Client"]
  factory_selector["Platform Factory"]
  mobile_factory["MobileFactory"]
  pc_factory["PcFactory"]
  login["LoginService"]
  store["StoreService"]

  client -->|runtime choice| factory_selector
  factory_selector -->|mobile| mobile_factory
  factory_selector -->|pc| pc_factory
  mobile_factory --> login
  mobile_factory --> store
  pc_factory --> login
  pc_factory --> store
```
