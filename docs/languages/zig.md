# Zig

General-purpose programming language and toolchain

## Overview

Zig is a general-purpose programming language designed for robustness, optimality, and maintainability. It's a modern alternative to C with better safety and ergonomics.

## Language Aliases

```bash
run zig "const std = @import(\"std\"); pub fn main() void { std.debug.print(\"Hello\\n\", .{}); }"
run ziglang "const std = @import(\"std\"); pub fn main() void { std.debug.print(\"Hello\\n\", .{}); }"
# Output: Hello (x2)
```

!!! tip "Multi-line Code: Use Heredoc"
    For multi-line code, **use heredoc** (`<< 'EOF'`) to avoid shell quoting and escaping issues.

## REPL Behavior

Zig's REPL maintains state across commands. Variables and functions persist within the same REPL session.
