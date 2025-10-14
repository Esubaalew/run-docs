# Haskell

Pure functional programming language with strong static typing

## Overview

Haskell is a purely functional programming language with strong static typing and lazy evaluation. It's used in academia, finance, and for building robust, maintainable systems.

## Language Aliases

```bash
run haskell "main = putStrLn \"Hello\""
run hs "main = putStrLn \"Hello\""
run ghci "main = putStrLn \"Hello\""
# Output: Hello (x3)
```

!!! tip "Multi-line Code: Use Heredoc"
    For multi-line code, **use heredoc** (`<< 'EOF'`) to avoid shell quoting and escaping issues.

## REPL Behavior

Haskell's REPL (GHCi) is STATEFUL - definitions persist across commands.
