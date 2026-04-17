---
title: "[Unity Package] Data Protector"
description: "- Provides functionality to compress and encrypt byte[] and string data before saving it physically, making it harder to inspect the stored data directly. - For encryption, the user must supply a 16-byte string key value. - Also provides logic to compare whether a file has changed by extracting a SHA256 hash value from byte[] or string data."
pubDate: 2026-04-16
lang: en
tags:
  - "Unity"
  - "Package"
category: "Unity Package"
thumbnail: /images/packages/unity-package.png
---

| [🪄Open on GitHub](https://github.com/achieveonepark/data-protector)

- Provides functionality to compress and encrypt `byte[]` and `string` data before saving it physically, making it harder to inspect the stored data directly.<br>
- For encryption, the user must supply a `16-byte` `string key` value.<br>
- Also provides logic to compare whether a file has changed by extracting a `SHA256` hash value from `byte[]` or `string` data.<br>

---

## Install

Choose one of the installation methods below.

> Note: For the version after `#` in the GitHub URL, check the latest changes listed in the changelog.

### Install via Unity Package Manager (UPM)

1. Open Unity Package Manager and click the `+` button in the upper-left corner.
2. Select `Install package from git URL...`.
3. Enter `https://github.com/achieveonepark/data-protector.git#1.0.0` and click Install.

### Manual Addition

Open the `manifest.json` file in your Unity project's `Packages` folder.  
Add the following line under `dependencies`.

```json
"com.achieve.infinity-value": "https://github.com/achieveonepark/data-protector.git#1.0.0"
```

## Description

### Compression, Encryption?
1. Uses the [AES-128](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) method.
2. Uses [GZipStream](https://learn.microsoft.com/ko-kr/dotnet/api/system.io.compression.gzipstream?view=net-8.0) provided by C# for compression.

### API

This package provides the following features.

    DataProtector.Encrypt        | Result value after compression and encryption
    DataProtector.Decrypt        | Result value after decryption and decompression
    HaskChecker.ComputeHash      | Extract the hash value of encrypted data
    HaskChecker.ValidateHash     | Compare two hash values

---
