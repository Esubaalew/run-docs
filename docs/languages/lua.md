# Lua

Lightweight scripting language for embedded systems and games

## Overview

Lua is a lightweight, embeddable scripting language widely used in game development, embedded systems, and as a configuration language.

## Language Aliases

```bash
run lua "print('Hello')"
run luajit "print('Hello')"
# Output: Hello (x2)
```

!!! tip "Multi-line Code: Use Heredoc"
    For multi-line code, **use heredoc** (`<< 'EOF'`) to avoid shell quoting and escaping issues.

## REPL Behavior

Lua's REPL is STATEFUL - variables and functions persist across commands.
