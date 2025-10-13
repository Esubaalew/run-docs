# C

Low-level systems programming language

## Overview

C is a powerful, low-level programming language that provides direct access to memory and hardware. It's the foundation for many operating systems, embedded systems, and performance-critical applications.

With run, you can compile and execute C code using GCC or Clang without managing makefiles or build systems.

## Language Aliases

```bash
run c "#include <stdio.h>\\nint main() { printf(\"Hello\\n\"); return 0; }"
run gcc "#include <stdio.h>\\nint main() { printf(\"Hello\\n\"); return 0; }"
run clang "#include <stdio.h>\\nint main() { printf(\"Hello\\n\"); return 0; }"
# Output: Hello (x3)
```

## Basic Usage

### Hello World

```bash
run c "#include <stdio.h>
int main() {
    printf(\"Hello, World!\\n\");
    return 0;
}"
# Output: Hello, World!
```

### Simple Variables

```bash
run c "#include <stdio.h>
int main() {
    int x = 42;
    printf(\"Value: %d\\n\", x);
    return 0;
}"
# Output: Value: 42
```

## Piping Code to run

You can pipe C code to run using echo or cat. If you encounter issues with format specifiers being interpreted by your shell, use here-documents instead:

### Using echo (usually works)

```bash
echo '#include <stdio.h>
int main() { printf("Hello\\n"); return 0; }' | run c
# Output: Hello
```

### If issues occur, use here-documents

```bash
cat <<'EOF' | run c
#include <stdio.h>
int main() {
    int c = 10;
    printf("%d\\n", c);
    return 0;
}
EOF
# Output: 10
```

## REPL Mode - Interactive C

Start an interactive C REPL with 'run c'. The REPL is stateful within the session:

```bash
$ run c
run universal REPL. Type :help for commands.
c>>> #include <stdio.h>
c>>> int x = 10;
c>>> printf("%d\\n", x);
10
c>>> int square(int n) { return n * n; }
c>>> printf("%d\\n", square(5));
25
c>>>
```

## REPL Behavior - Stateful

C's REPL is STATEFUL within a single interactive session:

- Start REPL with 'run c'
- Includes, functions, and variables persist at the c>>> prompt
- Each command builds on previous definitions in that session
- Separate 'run c "code"' invocations are independent compilations

## Troubleshooting: printf Command Issues

If you use the shell's printf command to pipe C code, it may interpret format specifiers like %d and escape sequences, corrupting your code. This causes compilation errors like 'missing terminating quote'.

Solution: Use here-documents with cat <<'EOF' to preserve your C code exactly as written.

### Problem Example

```bash
printf "int c = 10;
printf(\"%d\\n\", c);
" | run c
# Error: The shell's printf interprets %d and \n,
# breaking your C string literals.
```

### Solution

```bash
cat <<'EOF' | run c
int c = 10;
printf("%d\n", c);
EOF
# Output: 10
```
