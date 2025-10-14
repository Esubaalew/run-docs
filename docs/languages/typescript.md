# TypeScript

Typed superset of JavaScript for large-scale applications

## Overview

TypeScript adds static typing to JavaScript, making it easier to build and maintain large applications. With run, you can execute TypeScript code using Deno.

## Language Aliases

```bash
run typescript "console.log('Hello')"
run ts "console.log('Hello')"
run ts-node "console.log('Hello')"
run deno "console.log('Hello')"
# Output: Hello (x4)
```

## Important: Deno Module Specifiers

run uses Deno for TypeScript execution. Deno requires explicit module specifiers and does not accept bare Node builtin names like 'fs'.

Use the node: prefix for Node builtins (for example `import fs from 'node:fs'`). Also prefer a quoted here-doc for multi-line snippets to avoid shell interpolation/globbing issues.

### Correct - Using node: prefix (here-doc recommended)

```bash
cat <<'EOF' | run typescript
import fs from "node:fs";
console.log('[TypeScript] hello');
EOF
# Output: [TypeScript] hello
```

### Safe inline (zsh)

```bash
run --lang typescript --code $'import fs from "node:fs";\nconsole.log("[TypeScript] hello");\n'
# Output: [TypeScript] hello
```

### Basic TypeScript Example

```bash
cat <<'EOF' | run typescript
const greet = (name: string): string => {
  return `Hello, ${name}!`;
};
console.log(greet('World'));
EOF
# Output: Hello, World!
```

## Multi-line Code

!!! tip "Best Practice: Use Heredoc"
    For multi-line TypeScript, **use heredoc** to avoid shell quoting issues:
    
    ```bash
    # RECOMMENDED
    run typescript << 'EOF'
    interface User {
      name: string;
      age: number;
    }
    const users: User[] = [{name: 'Alice', age: 30}];
    console.log(users);
    EOF
    
    # OK: Single-line
    run ts "const x: number[] = [1,2,3]; console.log(x.map(n => n*2));"
    ```

## REPL Behavior

TypeScript's REPL is STATEFUL when using ts-node.
