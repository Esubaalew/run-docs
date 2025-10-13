# Dart

Client-optimized language for fast apps

## Overview

Dart is Google's language for building mobile, desktop, and web applications. It's the language behind Flutter, Google's UI toolkit.

## Language Aliases

```bash
run dart "void main() { print('Hello'); }"
run dartlang "void main() { print('Hello'); }"
run flutter "void main() { print('Hello'); }"
# Output: Hello (x3)
```

## Important: Shell Quoting and Here-Docs

Inline --code snippets are written to a temporary .dart file and executed with dart run. However, shell quoting still matters - single quotes or unescaped characters will cause zsh to attempt globbing or parameter expansion.

Use a quoted here-doc to avoid shell interpretation problems.

### Recommended - Using here-doc

```bash
cat <<'EOF' | run dart
void main() {
  print('[Dart] hello');
}
EOF
# Output: [Dart] hello
```

### Safe inline (zsh)

```bash
run --lang dart --code $'void main() { print("[Dart] hello"); }\n'
# Output: [Dart] hello
```

### Basic Dart Example

```bash
cat <<'EOF' | run dart
void main() {
  var name = 'Flutter';
  print('Hello from $name!');
}
EOF
# Output: Hello from Flutter!
```

## REPL Behavior

Dart's REPL maintains state across commands. Variables, functions, and classes persist within the same REPL session.
