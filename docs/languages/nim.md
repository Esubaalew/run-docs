# Nim

Efficient, expressive language with Python-like syntax

## Overview

Nim is a statically typed compiled language that combines the efficiency of C with the expressiveness of Python. It compiles to C, C++, or JavaScript.

## Language Aliases

```bash
run nim "echo \"Hello\""
run nimlang "echo \"Hello\""
# Output: Hello (x2)
```

!!! tip "Multi-line Code: Use Heredoc"
    For multi-line code, **use heredoc** (`<< 'EOF'`) to avoid shell quoting and escaping issues.

## REPL Behavior

Nim's REPL maintains state across commands. Variables, functions, and imports persist within the same REPL session.

Start the REPL with `run nim`, then type commands at the `nim>>>` prompt:

```bash
❯ run nim
run v0.6.0 — 25+ languages. Type :help for commands.
nim>>> var age: int = 25
nim>>> age
25
nim>>>
```
