---
title: "Infinity Value"
description: "Choose one of the installation methods below."
pubDate: 2026-04-16
lang: en
tags:
  - "Unity"
  - "Package"
  - "Infinity Value"
category: "Unity Package"
thumbnail: /images/thumbnails/packages-infinity-value.svg
---

| [🪄Open on GitHub](https://github.com/achieveonepark/infinity-value)

## Install

Choose one of the installation methods below.

> Note: For the version after `#` in the GitHub URL, check the latest changes listed in the changelog.

### Install via Unity Package Manager (UPM)

1. Open Unity Package Manager and click the `+` button in the upper-left corner.
2. Select `Install package from git URL...`.
3. Enter `https://github.com/achieveonepark/infinity-value.git#1.0.1` and click Install.

### Manual Addition

Open the `manifest.json` file in your Unity project's `Packages` folder.  
Add the following line under `dependencies`.

```json
"com.achieve.infinity-value": "https://github.com/achieveonepark/infinity-value.git#1.0.1"
```

### Description

- Instead of common units such as million, billion, and trillion, this package lets you use custom units like A, B, and C, and it is optimized for representing and processing very large numbers with a segmented structure.
- Its internal structure is designed to minimize garbage collection (GC), making it suitable for performance-sensitive applications such as games.
- If Newtonsoft.Json is installed in the project, a JsonConverter is registered automatically so serialization works without extra configuration.
- Data is expressed in formats such as `300F 200E` or `200AE 578AD`, and all operations are performed directly on that representation. <br/>Calling `ToString()` prints the same format.
- It supports migration from primitive C# types and provides all standard C# operators including comparison and arithmetic operators.

### Supported constructors

```csharp
- int
- long
- BigInteger
- string
- float
```

### Quick Start

```csharp
using Achieve.InfinityValue;
using System.Numerics;
public class A
{
    public InfinityValue A;
    public InfinityValue B;
    public InfinityValue C;
    public InfinityValue D;
    public A()
    {
        // Configure unit names.
        InfinityValue.SetUnitNames(new List<string>
        {
            "A", "B", "C" ...
        });
        A = 1;                              // Can be initialized with int.
        B = "300F 200C";                    // Can be initialized with a formatted string.
        C = 3.0f;                           // float is supported.
        D = new BigInteger(30000000000000); // BigInteger is supported.
        var d = A + B;                      // Basic arithmetic: addition.
        var e = B * C;                      // Basic arithmetic: multiplication.
        var f = B / C;                      // Basic arithmetic: division.
        Debug.Log(D.ToString()); // Prints in the form "30D"
    }
}
~~~~~~~~```
