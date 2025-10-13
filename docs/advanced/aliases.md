# Language Aliases

Every language in `run` has multiple aliases for convenience. Use whichever feels most natural to you.

## Complete Alias Reference

### Python

| Alias | Description |
|-------|-------------|
| `python` | Full name |
| `py` | Short form |
| `py3` | Version specific |
| `python3` | Full version name |

```bash
run python "print('hello')"
run py "print('hello')"
run py3 "print('hello')"
run python3 "print('hello')"
```

---

### JavaScript

| Alias | Description |
|-------|-------------|
| `javascript` | Full name |
| `js` | Short form |
| `node` | Runtime name |
| `nodejs` | Full runtime name |

```bash
run javascript "console.log('hello')"
run js "console.log('hello')"
run node "console.log('hello')"
run nodejs "console.log('hello')"
```

---

### TypeScript

| Alias | Description |
|-------|-------------|
| `typescript` | Full name |
| `ts` | Short form |
| `ts-node` | Runtime name |
| `deno` | Alternative runtime |

```bash
run typescript "console.log('hello')"
run ts "console.log('hello')"
run ts-node "console.log('hello')"
run deno "console.log('hello')"
```

---

### Rust

| Alias | Description |
|-------|-------------|
| `rust` | Full name |
| `rs` | Short form |

```bash
run rust "fn main() { println!(\"hello\"); }"
run rs "fn main() { println!(\"hello\"); }"
```

---

### Go

| Alias | Description |
|-------|-------------|
| `go` | Standard name |
| `golang` | Full name |

```bash
run go "package main; func main() { println(\"hello\") }"
run golang "package main; func main() { println(\"hello\") }"
```

---

### C

| Alias | Description |
|-------|-------------|
| `c` | Language name |
| `gcc` | Compiler name |
| `clang` | Alternative compiler |

```bash
run c "int main() { printf(\"hello\\n\"); }"
run gcc "int main() { printf(\"hello\\n\"); }"
run clang "int main() { printf(\"hello\\n\"); }"
```

---

### C++

| Alias | Description |
|-------|-------------|
| `cpp` | Short form |
| `c++` | Symbol form |
| `g++` | Compiler name |
| `cxx` | Alternative |

```bash
run cpp "int main() { std::cout << \"hello\"; }"
run c++ "int main() { std::cout << \"hello\"; }"
run g++ "int main() { std::cout << \"hello\"; }"
run cxx "int main() { std::cout << \"hello\"; }"
```

---

### Java

| Alias | Description |
|-------|-------------|
| `java` | Language name |

```bash
run java "class Main { public static void main(String[] args) { System.out.println(\"hello\"); } }"
```

---

### C#

| Alias | Description |
|-------|-------------|
| `csharp` | Full name |
| `cs` | Short form |
| `dotnet` | Runtime name |

```bash
run csharp "class Program { static void Main() { System.Console.WriteLine(\"hello\"); } }"
run cs "class Program { static void Main() { System.Console.WriteLine(\"hello\"); } }"
run dotnet "class Program { static void Main() { System.Console.WriteLine(\"hello\"); } }"
```

---

### Ruby

| Alias | Description |
|-------|-------------|
| `ruby` | Full name |
| `rb` | Short form |
| `irb` | REPL name |

```bash
run ruby "puts 'hello'"
run rb "puts 'hello'"
run irb "puts 'hello'"
```

---

### Bash

| Alias | Description |
|-------|-------------|
| `bash` | Full name |
| `sh` | Shell |
| `shell` | Generic shell |
| `zsh` | Alternative shell |

```bash
run bash "echo hello"
run sh "echo hello"
run shell "echo hello"
run zsh "echo hello"
```

---

### PHP

| Alias | Description |
|-------|-------------|
| `php` | Language name |
| `php-cli` | CLI version |

```bash
run php "echo 'hello';"
run php-cli "echo 'hello';"
```

---

### Lua

| Alias | Description |
|-------|-------------|
| `lua` | Language name |
| `luajit` | JIT compiler |

```bash
run lua "print('hello')"
run luajit "print('hello')"
```

---

### Perl

| Alias | Description |
|-------|-------------|
| `perl` | Language name |
| `pl` | Short form |

```bash
run perl "print 'hello'"
run pl "print 'hello'"
```

---

### Swift

| Alias | Description |
|-------|-------------|
| `swift` | Language name |
| `swiftlang` | Full name |

```bash
run swift "print(\"hello\")"
run swiftlang "print(\"hello\")"
```

---

### Kotlin

| Alias | Description |
|-------|-------------|
| `kotlin` | Full name |
| `kt` | Short form |
| `kts` | Kotlin script |

```bash
run kotlin "fun main() { println(\"hello\") }"
run kt "fun main() { println(\"hello\") }"
run kts "println(\"hello\")"
```

---

### Dart

| Alias | Description |
|-------|-------------|
| `dart` | Language name |
| `dartlang` | Full name |
| `flutter` | Framework name |

```bash
run dart "void main() { print('hello'); }"
run dartlang "void main() { print('hello'); }"
run flutter "void main() { print('hello'); }"
```

---

### R

| Alias | Description |
|-------|-------------|
| `r` | Language name |
| `rscript` | Script runner |
| `cran` | Repository name |

```bash
run r "print('hello')"
run rscript "print('hello')"
run cran "print('hello')"
```

---

### Haskell

| Alias | Description |
|-------|-------------|
| `haskell` | Full name |
| `hs` | Short form |
| `ghci` | REPL name |

```bash
run haskell "main = putStrLn \"hello\""
run hs "main = putStrLn \"hello\""
run ghci "putStrLn \"hello\""
```

---

### Elixir

| Alias | Description |
|-------|-------------|
| `elixir` | Full name |
| `ex` | Short form |
| `exs` | Script extension |
| `iex` | REPL name |

```bash
run elixir "IO.puts \"hello\""
run ex "IO.puts \"hello\""
run exs "IO.puts \"hello\""
run iex "IO.puts \"hello\""
```

---

### Julia

| Alias | Description |
|-------|-------------|
| `julia` | Language name |
| `jl` | Short form |

```bash
run julia "println(\"hello\")"
run jl "println(\"hello\")"
```

---

### Crystal

| Alias | Description |
|-------|-------------|
| `crystal` | Language name |
| `cr` | Short form |
| `crystal-lang` | Full name |

```bash
run crystal "puts \"hello\""
run cr "puts \"hello\""
run crystal-lang "puts \"hello\""
```

---

### Zig

| Alias | Description |
|-------|-------------|
| `zig` | Language name |
| `ziglang` | Full name |

```bash
run zig "pub fn main() !void { ... }"
run ziglang "pub fn main() !void { ... }"
```

---

### Nim

| Alias | Description |
|-------|-------------|
| `nim` | Language name |
| `nimlang` | Full name |

```bash
run nim "echo \"hello\""
run nimlang "echo \"hello\""
```

---

## Usage Tips

### 1. Use Short Forms for Speed

```bash
#  Faster to type
run py "..."
run js "..."
run rs "..."

#  Also valid
run python "..."
run javascript "..."
run rust "..."
```

### 2. Be Consistent in Scripts

```bash
#!/bin/bash
# Pick one alias and stick with it
run py script1.py
run py script2.py
run py script3.py
```

### 3. Use Runtime Names When Relevant

```bash
# Emphasize Node.js runtime
run node server.js

# Emphasize Deno runtime
run deno app.ts
```

### 4. Match Your Team's Conventions

```bash
# If your team says "py"
run py "..."

# If your team says "python"
run python "..."
```

## Alias Detection

Check which aliases are available:

```bash
$ run
>>> :languages
Available language engines:
✓ python (python, py, py3, python3)
✓ javascript (javascript, js, node, nodejs)
✓ rust (rust, rs)
...
```

## Custom Aliases (Shell)

You can create your own aliases in your shell:

```bash
# Add to ~/.bashrc or ~/.zshrc
alias pyrun='run python'
alias jsrun='run javascript'
alias rsrun='run rust'

# Use them
pyrun "print('hello')"
jsrun "console.log('hello')"
rsrun "fn main() { println!(\"hello\"); }"
```

## Next Steps

[Environment Variables](environment.md){ .md-button .md-button--primary }

