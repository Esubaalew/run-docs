# Language-Specific REPL Behavior

Different languages have different REPL behaviors. This guide explains how each language handles sessions.

## Python

### Session State

Python accumulates code in a temporary module:

```bash
python>>> x = 10
python>>> def greet(name): return f"Hello, {name}"
python>>> import math
```

All persist across commands.

### Expression Evaluation

Expressions automatically print their `repr()`:

```bash
python>>> 2 + 2
4

python>>> [1, 2, 3]
[1, 2, 3]

python>>> "hello".upper()
'HELLO'
```

Statements don't print:

```bash
python>>> x = 10
# No output

python>>> if True: print("yes")
yes
```

### Multi-line Input

Use `...` for continuation:

```bash
python>>> def factorial(n):
...     if n <= 1:
...         return 1
...     return n * factorial(n-1)

python>>> factorial(5)
120
```

## JavaScript

### Session State

Variables and functions persist:

```bash
javascript>>> let count = 0

javascript>>> function increment() { count++; return count; }

javascript>>> increment()
1

javascript>>> increment()
2
```

### Expression Evaluation

Last expression is returned:

```bash
javascript>>> 2 + 2
4

javascript>>> [1, 2, 3].map(x => x * 2)
[ 2, 4, 6 ]
```

## Rust

### Session State

Rust compiles snippets incrementally:

```bash
rust>>> let mut x = 10;

rust>>> x += 5;

rust>>> x
15
```

### Main Function

Rust automatically wraps code in `main()`:

```bash
rust>>> println!("Hello");
# Wrapped: fn main() { println!("Hello"); }
```

### Compilation

Each snippet is compiled, so errors are caught:

```bash
rust>>> let x: i32 = "hello";
error[E0308]: mismatched types
```

## Go

### Session State

Go maintains state across commands:

```bash
go>>> x := 10

go>>> y := 20

go>>> x + y
30
```

### Package Main

Automatically includes `package main`:

```bash
go>>> import "fmt"

go>>> fmt.Println("Hello")
Hello
```

## Bash

### Session State

Variables and functions persist:

```bash
bash>>> NAME="Alice"

bash>>> greeting() { echo "Hello, $1"; }

bash>>> greeting $NAME
Hello, Alice
```

### Script Rewrites

Session script is rewritten on each evaluation.

## C/C++

### Session State

Code snippets are accumulated:

```bash
c>>> #include <stdio.h>

c>>> int x = 10;

c>>> printf("%d\n", x);
10
```

### Compilation

Compiled on each command:

```bash
c>>> int y = "hello";
error: incompatible types
```

## Compiled vs Interpreted

### Interpreted Languages

- **Python, JavaScript, Ruby, Bash, etc.**
- Instant evaluation
- No compilation step
- Session maintained in memory

### Compiled Languages

- **Rust, Go, C, C++, etc.**
- Compilation on each command
- Temporary binaries created
- Session reconstructed from history

## Tips by Language

### Python

```bash
# Use help()
python>>> help(str.split)

# Check type
python>>> type([1, 2, 3])
<class 'list'>

# List attributes
python>>> dir({})
```

### JavaScript

```bash
# Check prototype
javascript>>> Object.getPrototypeOf([])

# Type checking
javascript>>> typeof 42
'number'
```

### Rust

```bash
# Type annotation
rust>>> let x: i32 = 10;

# Explicit mut
rust>>> let mut count = 0;
```

## Next Steps

[Back to REPL Index →](index.md){ .md-button .md-button--primary }
