---
title: "Interpreter"
description: "A pattern that interprets small domain language rules through grammar objects and computes a result."
pubDate: 2026-04-16
lang: en
tags:
  - "Design Pattern"
  - "Interpreter"
  - "GoF"
  - "Behavioral"
category: "Design Pattern"
thumbnail: /images/thumbnails/designpattern-go-f-behavioral-interpreter.svg
---

## One-line pattern summary
A pattern that interprets small domain language rules through grammar objects and computes a result.

## Typical Unity use cases
- When building a quest condition DSL.
- When dialogue branch conditions should be data-driven.

## Parts (roles)
- Expression
- Terminal
- Nonterminal
- Context

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
public interface IConditionExpression
{
    bool Evaluate(PlayerContext context);
}

public sealed class LevelAtLeastExpression : IConditionExpression
{
    private readonly int requiredLevel;

    public LevelAtLeastExpression(int requiredLevel)
    {
        this.requiredLevel = requiredLevel;
    }

    public bool Evaluate(PlayerContext context)
    {
        return context.PlayerLevel >= requiredLevel;
    }
}

public sealed class AndExpression : IConditionExpression
{
    private readonly IConditionExpression leftExpression;
    private readonly IConditionExpression rightExpression;

    public AndExpression(IConditionExpression leftExpression, IConditionExpression rightExpression)
    {
        this.leftExpression = leftExpression;
        this.rightExpression = rightExpression;
    }

    public bool Evaluate(PlayerContext context)
    {
        return leftExpression.Evaluate(context) && rightExpression.Evaluate(context);
    }
}
```

## Advantages
- Behavior is separated into smaller units, which reduces the impact of changes.
- Adding or swapping rules is relatively safe.

## Things to watch out for
- As the number of objects and indirect calls increases, the flow can become harder to follow.
- Ordering bugs should be pinned down with tests.

## Interaction diagram

This shows the flow where grammar rules are interpreted as an expression tree to compute a result.

```mermaid
flowchart LR

  input["Rule String"]
  lexer["Tokenizer"]
  parser["Parser"]
  ast["Expression Tree"]
  interpreter["Interpret(context)"]
  result["bool / score"]

  input --> lexer
  lexer --> parser
  parser --> ast
  ast -->|recursive visit| interpreter
  interpreter --> result
```
