# C++

Object-oriented extension of C with modern features

## Overview

C++ extends C with object-oriented programming, templates, and modern features. It's used for game development, high-performance applications, and systems programming.

## Language Aliases

```bash
run cpp "#include <iostream>\\nint main() { std::cout << \"Hello\" << std::endl; return 0; }"
run c++ "#include <iostream>\\nint main() { std::cout << \"Hello\" << std::endl; return 0; }"
run g++ "#include <iostream>\\nint main() { std::cout << \"Hello\" << std::endl; return 0; }"
# Output: Hello (x3)
```

## Basic Usage

### Hello World

```bash
run cpp "#include <iostream>
int main() {
    std::cout << \"Hello, World!\" << std::endl;
    return 0;
}"
# Output: Hello, World!
```

### Using Variables

```bash
run cpp "#include <iostream>
int main() {
    int x = 42;
    std::cout << \"Value: \" << x << std::endl;
    return 0;
}"
# Output: Value: 42
```

## Important: Include Required Headers

Remember to include the standard headers your snippet depends on. std::cout and other standard library features require #include <iostream>.

When in doubt, wrap your snippet in a minimal main() function for portability and proper compilation.

### Problem - Missing Headers

```cpp
int square(int x) { return x * x; }
std::cout << square(7) << std::endl;
// error: use of undeclared identifier 'std'
```

### Solution - Include Headers and Use main()

```bash
cat <<'EOF' | run cpp
#include <iostream>
int square(int x) { return x * x; }
int main() {
    std::cout << square(7) << std::endl;
    return 0;
}
EOF
# Output: 49
```

## Piping Code to run

C++ works well with both echo and cat for piping code. Use whichever is more convenient:

### Using echo

```bash
echo '#include <iostream>
int main() { std::cout << "Hello" << std::endl; return 0; }' | run cpp
# Output: Hello
```

### Using here-documents

```bash
cat <<'EOF' | run cpp
#include <iostream>
int main() {
    std::cout << "Hello " << 42 << std::endl;
    return 0;
}
EOF
# Output: Hello 42
```

## Step-by-step in REPL Mode

For step-by-step execution with persistent state, enter REPL mode once, then type commands interactively:

```bash
$ run cpp
run universal REPL. Type :help for commands.
cpp>>> #include <iostream>
cpp>>> int square(int x) { return x * x; }
cpp>>> std::cout << square(7) << std::endl;
49
cpp>>>
```

## REPL Behavior - Stateful

C++'s REPL is STATEFUL within a single interactive session:

- Start REPL with 'run cpp'
- Includes, functions, and variables persist at the cpp>>> prompt
- Each command builds on previous definitions in that session
- Separate 'run cpp "code"' invocations are independent compilations

## Common Issues & Solutions

Here are solutions to common problems when working with C++ in run:

### Issue: Missing Headers

```cpp
int square(int x){ return x*x; }
std::cout << square(7) << std::endl;
// error: use of undeclared identifier 'std'
```

### Solution: Add Required Includes

```cpp
#include <iostream>
int square(int x) { return x * x; }
std::cout << square(7) << std::endl;
// Output: 49
```

### Full Program with main()

```bash
cat <<'EOF' | run cpp
#include <iostream>
int square(int x) { return x * x; }
int main() {
    std::cout << square(7) << std::endl;
    return 0;
}
EOF
# Output: 49
```
