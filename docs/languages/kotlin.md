# Kotlin

Modern JVM language with concise syntax

## Overview

Kotlin is a modern, concise language that runs on the JVM. It's the preferred language for Android development and is also used for server-side applications.

## Language Aliases

```bash
run kotlin "fun main() { println(\"Hello\") }"
run kt "fun main() { println(\"Hello\") }"
run kts "fun main() { println(\"Hello\") }"
# Output: Hello (x3)
```

!!! tip "Multi-line Code: Use Heredoc"
    For multi-line code, **use heredoc** (`<< 'EOF'`) to avoid shell quoting and escaping issues.

## REPL Behavior

Kotlin's REPL maintains state across commands. Variables, functions, and classes persist within the same REPL session.
