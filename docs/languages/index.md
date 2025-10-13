# Supported Languages

`run` supports **25 programming languages** out of the box, covering a wide range of paradigms and use cases.

## Quick Reference

| Language | Aliases | Status | Category |
|----------|---------|--------|----------|
| [Python](python.md) | `python`, `py`, `py3`, `python3` | Stable | Scripting |
| [JavaScript](javascript.md) | `javascript`, `js`, `node`, `nodejs` | Stable | Web/Scripting |
| [TypeScript](typescript.md) | `typescript`, `ts`, `ts-node`, `deno` | Stable | Web/Typed |
| [Rust](rust.md) | `rust`, `rs` | Stable | Systems |
| [Go](go.md) | `go`, `golang` | Stable | Systems |
| [C](c.md) | `c`, `gcc`, `clang` | Stable | Systems |
| [C++](cpp.md) | `cpp`, `c++`, `g++` | Stable | Systems |
| [Java](java.md) | `java` | Stable | Enterprise |
| [C#](csharp.md) | `csharp`, `cs`, `dotnet` | Stable | Enterprise |
| [Ruby](ruby.md) | `ruby`, `rb`, `irb` | Stable | Scripting |
| [Bash](bash.md) | `bash`, `sh`, `shell`, `zsh` | Stable | Shell |
| [PHP](php.md) | `php`, `php-cli` | Stable | Web |
| [Lua](lua.md) | `lua`, `luajit` | Stable | Scripting |
| [Perl](perl.md) | `perl`, `pl` | Stable | Scripting |
| [Swift](swift.md) | `swift`, `swiftlang` | Stable | iOS/macOS |
| [Kotlin](kotlin.md) | `kotlin`, `kt`, `kts` | Stable | JVM |
| [Dart](dart.md) | `dart`, `dartlang`, `flutter` | Stable | Mobile |
| [R](r.md) | `r`, `rscript`, `cran` | Stable | Statistical |
| [Haskell](haskell.md) | `haskell`, `hs`, `ghci` | Stable | Functional |
| [Elixir](elixir.md) | `elixir`, `ex`, `exs`, `iex` | Stable | Functional |
| [Julia](julia.md) | `julia`, `jl` | Stable | Scientific |
| [Crystal](crystal.md) | `crystal`, `cr`, `crystal-lang` | Stable | Systems |
| [Zig](zig.md) | `zig`, `ziglang` | Stable | Systems |
| [Nim](nim.md) | `nim`, `nimlang` | Stable | Systems |
| Groovy | `groovy` | Beta | JVM |

## By Category

### Scripting Languages

High-level, interpreted languages for rapid development:

| Language | Best For | Example |
|----------|----------|---------|
| **Python** | Data science, automation, general scripting | `run py "print('hello')"` |
| **JavaScript** | Web development, node scripting | `run js "console.log('hello')"` |
| **Ruby** | Web apps, scripting, metaprogramming | `run rb "puts 'hello'"` |
| **Bash** | Shell scripting, system automation | `run bash "echo hello"` |
| **Lua** | Embedded scripting, game development | `run lua "print('hello')"` |
| **Perl** | Text processing, legacy systems | `run perl "print 'hello'"` |
| **PHP** | Web development, server-side scripting | `run php "echo 'hello';"` |

### Compiled Systems Languages

Low-level languages for performance-critical applications:

| Language | Best For | Example |
|----------|----------|---------|
| **Rust** | Safe systems programming, WebAssembly | `run rust "fn main() { println!(\"hello\"); }"` |
| **Go** | Backend services, cloud infrastructure | `run go "package main; func main() { println(\"hello\") }"` |
| **C** | Operating systems, embedded systems | `run c "int main() { printf(\"hello\\n\"); }"` |
| **C++** | Game engines, high-performance computing | `run cpp "int main() { std::cout << \"hello\"; }"` |
| **Zig** | Systems programming, C replacement | `run zig "pub fn main() !void { ... }"` |
| **Nim** | Systems programming with Python syntax | `run nim "echo \"hello\""` |
| **Crystal** | Performance with Ruby syntax | `run cr "puts \"hello\""` |

### Typed & Functional Languages

Languages with strong type systems and functional paradigms:

| Language | Best For | Example |
|----------|----------|---------|
| **TypeScript** | Type-safe JavaScript, large applications | `run ts "console.log('hello')"` |
| **Haskell** | Pure functional programming, mathematics | `run hs "main = putStrLn \"hello\""` |
| **Elixir** | Distributed systems, fault-tolerant apps | `run ex "IO.puts \"hello\""` |
| **Julia** | Scientific computing, numerical analysis | `run jl "println(\"hello\")"` |

### Enterprise & JVM Languages

Languages for enterprise applications:

| Language | Best For | Example |
|----------|----------|---------|
| **Java** | Enterprise applications, Android | `run java "class Main { ... }"` |
| **Kotlin** | Android development, modern JVM | `run kt "fun main() { println(\"hello\") }"` |
| **C#** | Windows applications, Unity games | `run cs "class Program { ... }"` |

### Specialized Languages

Languages for specific domains:

| Language | Best For | Example |
|----------|----------|---------|
| **R** | Statistical analysis, data visualization | `run r "print('hello')"` |
| **Dart** | Flutter mobile apps, web | `run dart "void main() { print('hello'); }"` |
| **Swift** | iOS/macOS applications | `run swift "print(\"hello\")"` |

## Checking Available Languages

See which languages are installed on your system:

```bash
$ run
>>> :languages
```

Output:
```
Available language engines:
✓ python (python, py, py3, python3)
✓ javascript (javascript, js, node, nodejs)
✓ rust (rust, rs)
✓ go (go, golang)
✗ haskell (haskell, hs, ghci) - not installed
...
```

- ✓ = Toolchain is available
- ✗ = Toolchain is not installed

## Installing Language Toolchains

To use a language, you need its runtime or compiler installed:

### Quick Install Commands

=== "Python"

    ```bash
    # Debian/Ubuntu
    sudo apt install python3
    
    # macOS
    brew install python
    
    # Windows
    winget install Python.Python.3
    ```

=== "JavaScript (Node.js)"

    ```bash
    # Debian/Ubuntu
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    # macOS
    brew install node
    
    # Windows
    winget install OpenJS.NodeJS
    ```

=== "Rust"

    ```bash
    # All platforms
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

=== "Go"

    ```bash
    # Debian/Ubuntu
    wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz
    sudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz
    
    # macOS
    brew install go
    
    # Windows
    winget install GoLang.Go
    ```

See the [Installation Guide](../getting-started/installation.md#installing-language-toolchains) for complete instructions.

## Language-Specific Examples

### Python - Data Processing

```bash
run python "
import json
data = {'users': [{'name': 'Alice'}, {'name': 'Bob'}]}
print(json.dumps(data, indent=2))
"
```

### JavaScript - Async Operations

```bash
run js "
async function fetchData() {
  return {status: 'ok', message: 'Hello'};
}
fetchData().then(console.log);
"
```

### Rust - Performance

```bash
run rust "
fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n-1) + fibonacci(n-2)
    }
}
fn main() {
    println!(\"{}\", fibonacci(10));
}
"
```

### Go - Concurrency

```bash
run go "
package main
import \"fmt\"
func main() {
    ch := make(chan string)
    go func() { ch <- \"Hello from goroutine\" }()
    fmt.Println(<-ch)
}
"
```

## Alias Reference

Every language has multiple aliases. Use whichever feels natural:

```bash
# Python
run python "..."
run py "..."
run py3 "..."

# JavaScript
run javascript "..."
run js "..."
run node "..."

# TypeScript
run typescript "..."
run ts "..."
run deno "..."

# Rust
run rust "..."
run rs "..."

# Go
run go "..."
run golang "..."
```

[View complete alias list →](../advanced/aliases.md)

## Cross-Language Comparison

### Hello World

=== "Python"
    ```bash
    run py "print('Hello, World!')"
    ```

=== "JavaScript"
    ```bash
    run js "console.log('Hello, World!')"
    ```

=== "Rust"
    ```bash
    run rust "fn main() { println!(\"Hello, World!\"); }"
    ```

=== "Go"
    ```bash
    run go "package main; import \"fmt\"; func main() { fmt.Println(\"Hello, World!\") }"
    ```

=== "Ruby"
    ```bash
    run rb "puts 'Hello, World!'"
    ```

### Lists/Arrays

=== "Python"
    ```bash
    run py "print([x**2 for x in range(5)])"
    # [0, 1, 4, 9, 16]
    ```

=== "JavaScript"
    ```bash
    run js "console.log([...Array(5).keys()].map(x => x**2))"
    # [0, 1, 4, 9, 16]
    ```

=== "Rust"
    ```bash
    run rust "fn main() { let v: Vec<_> = (0..5).map(|x| x*x).collect(); println!(\"{:?}\", v); }"
    # [0, 1, 4, 9, 16]
    ```

=== "Ruby"
    ```bash
    run rb "puts (0..4).map { |x| x**2 }"
    # [0, 1, 4, 9, 16]
    ```

## Language Features Support

| Feature | Python | JS | Rust | Go | C | C++ | Java |
|---------|--------|-----|------|-----|---|-----|------|
| REPL State |  |  |  |  |  |  |  |
| File Execution |  |  |  |  |  |  |  |
| stdin Support |  |  |  |  |  |  |  |
| Multi-line |  |  | ⚠ | ⚠ | ⚠ | ⚠ | ⚠ |
| Auto-detect |  |  |  |  |  |  |  |

 = Fully supported  
⚠ = Partial support  
 = Not supported

## Contributing New Languages

Want to add support for a new language? Check out the [Contributing Guide](../about/contributing.md).

## Next Steps

Explore language-specific guides:

[Python Guide](python.md){ .md-button }
[JavaScript Guide](javascript.md){ .md-button }
[Rust Guide](rust.md){ .md-button }
[View All Languages →](python.md){ .md-button .md-button--primary }

