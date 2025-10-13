# Rust

Systems programming with memory safety

## Overview

Rust is a modern systems programming language that guarantees memory safety without a garbage collector. With run, you can compile and execute Rust code instantly without managing Cargo projects or build configurations.

The Rust engine in run compiles your code using rustc and executes the resulting binary. Each execution is independent, so there's no persistent state between commands (unlike Python or JavaScript).

## Language Aliases

You can invoke Rust using these aliases:

```bash
run rust "fn main() { println!(\"Hello\"); }"
run rs "fn main() { println!(\"Hello\"); }"
# Output: Hello (x2)
```

## Basic Usage - Inline Code

Execute Rust code directly. Note that Rust requires a main function:

### Hello World

```bash
run rust "fn main() { println!(\"Hello, World!\"); }"
# Output: Hello, World!
```

### Variables and Types

```bash
run rust "fn main() { let x: i32 = 42; println!(\"x = {}\", x); }"
# Output: x = 42
```

### String Formatting

```bash
run rust "fn main() { let name = \"Alice\"; println!(\"Hello, {}!\", name); }"
# Output: Hello, Alice!
```

### Arithmetic

```bash
run rust "fn main() { let result = 10 + 20 * 3; println!(\"Result: {}\", result); }"
# Output: Result: 70
```

## File Execution

Execute Rust source files:

```bash
# Create a Rust file
cat > hello.rs << 'EOF'
fn main() {
    println!("Hello from Rust file!");
}
EOF

run rust hello.rs
# Output: Hello from Rust file!
```

### Complex Example - Fibonacci

```bash
# Create a Fibonacci program
cat > fib.rs << 'EOF'
fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    for i in 0..10 {
        println!("F({}) = {}", i, fibonacci(i));
    }
}
EOF

run rust fib.rs
# Output:
# F(0) = 0
# F(1) = 1
# F(2) = 1
# F(3) = 2
# F(4) = 3
# F(5) = 5
# F(6) = 8
# F(7) = 13
# F(8) = 21
# F(9) = 34
```

## REPL Behavior

Rust's REPL maintains state across commands. Variables, functions, and imports persist within the same REPL session.

Start the REPL with `run rust`, then type commands at the `rust>>>` prompt:

```bash
❯ run rust
run universal REPL. Type :help for commands.
rust>>> let x = 42;
rust>>> println!("{}", x);
42
rust>>>
```

## REPL Mode - Interactive Rust

Start an interactive Rust REPL with 'run rust'. Rust's REPL compiles each snippet:

```bash
$ run rust
run universal REPL. Type :help for commands.
rust>>> let x = 10;
rust>>> println!("{}", x);
10
rust>>>
```

## Advanced Features

Rust's powerful features work seamlessly with run:

### Pattern Matching

```bash
run rust "
fn main() {
    let number = 7;
    match number {
        1 => println!(\"One\"),
        2..=5 => println!(\"Between 2 and 5\"),
        6 | 7 | 8 => println!(\"Six, Seven, or Eight\"),
        _ => println!(\"Something else\"),
    }
}
"
# Output: Six, Seven, or Eight
```

### Iterators and Closures

```bash
run rust "
fn main() {
    let numbers: Vec<i32> = (1..=10).collect();
    let sum: i32 = numbers.iter().sum();
    let evens: Vec<i32> = numbers.iter().filter(|&&x| x % 2 == 0).copied().collect();
    println!(\"Sum: {}\", sum);
    println!(\"Evens: {:?}\", evens);
}
"
# Output:
# Sum: 55
# Evens: [2, 4, 6, 8, 10]
```

### Structs and Methods

```bash
run rust "
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle { width: 10, height: 20 };
    println!(\"Area: {}\", rect.area());
}
"
# Output: Area: 200
```

### Error Handling with Result

```bash
run rust "
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from(\"Division by zero\"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10.0, 2.0) {
        Ok(result) => println!(\"Result: {}\", result),
        Err(e) => println!(\"Error: {}\", e),
    }
}
"
# Output: Result: 5
```

## Common Use Cases

- Learning Rust syntax and features
- Testing algorithms and data structures
- Prototyping systems-level code
- Benchmarking performance-critical code
- Exploring Rust's ownership and borrowing
- Quick compilation checks

## Compilation Errors

Rust's compiler provides detailed error messages:

```bash
run rust "fn main() { let x: i32 = \"hello\"; }"
# Output: error[E0308]: mismatched types
#         expected `i32`, found `&str`

run rust "fn main() { let s = String::from(\"hello\"); let s2 = s; println!(\"{}\", s); }"
# Output: error[E0382]: borrow of moved value: `s`
```

## Limitations

- No persistent state between REPL commands
- External crates (dependencies) are not supported
- Each execution requires compilation (slower than interpreted languages)
- Must include a main function for inline code
- No Cargo.toml or project management features
