---
title: "Xcode Builds, Jenkins, and Fastlane - 2"
description: "Installing Docker and learning the basics"
lang: en
pubDate: 2026-04-05
tags:
  - Docker
  - Jenkins
  - Ruby
  - wsl
thumbnail: /images/1775357461068.png
category: R&D
subcategory: CI/CD
---

While writing Part 1, I thought:
`Let's set up Jenkins with Docker and try an iOS build!`
So I decided to implement it with help from Claude and Codex.

I've always believed that hands-on experience beats endlessly reading about concepts...

## [Docker](https://www.docker.com/)

Docker is a platform that creates and runs `Containers` based on executable packages called `Images`, ensuring a consistent build environment on any PC.

- Versions of plugins needed for the build
- Environment variables

It holds all of these, and since it reduces the impact of PC-specific settings, it makes it easier to track down build failures.

### Containerization Flow

> Assuming we're spinning up a simple WebAPI.

1. Create an [ASP.NET](https://dotnet.microsoft.com/ko-kr/learn/aspnet/what-is-aspnet) app
2. Define the environment to run this app in a [Dockerfile](https://docs.docker.com/reference/dockerfile/)
3. Build the image with [Docker CLI](https://docs.docker.com/reference/cli/docker/)
4. Run the container

```bash
// Build
docker build -t myapp . 

// Run
docker run -p 8080:8080 myapp
```


### [Jenkins](https://www.jenkins.io/) too..?

On top of this, when you want to set up a CI/CD pipeline that builds with Jenkins, instead of writing tons of code to make it work,

```bash
FROM jenkins/jenkins:lts
```

a single line in the Dockerfile declaring `I'll pull and use a ready-made Jenkins server image` is all you need.

Of course, at this point with just the declaration, Unity builds don't magically work — only the web app opens up.

Anyway, seeing that even someone like me who knows nothing about bash or Docker can set up an environment like this... the world has really gotten amazing.

> In the end, the following still need to be configured:
> - Unity Build Pipeline
> - Plugin installation
> - Agent connection
> - Certificate
> - xcworkspace
> - ToolChain installation

Attempting a build after spinning up the Jenkins server with Docker is coming in the next part...!
