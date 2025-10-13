# Language Detection

`run` can automatically detect the programming language from code patterns or file extensions.

## How It Works

Detection happens in this order:

1. **Explicit `--lang` flag** (highest priority)
2. **File extension** (for file paths)
3. **Code pattern matching** (for inline code)
4. **Default fallback** (Python)

## File Extension Detection

File extensions automatically determine the language:

```bash
run script.py    # Python
run main.go      # Go
run app.js       # JavaScript
run hello.rs     # Rust
```

No need to specify `--lang`!

## Pattern Matching

Distinctive syntax is auto-detected:

### Rust

```bash
# Unique fn main() syntax
run "fn main() { println!(\"Hello\"); }"
```

### Go

```bash
# package main declaration
run "package main; import \"fmt\"; func main() { fmt.Println(\"Hello\") }"
```

### JavaScript

```bash
# console.log
run "console.log('Hello')"

# Node.js require
run "const fs = require('fs'); console.log('Hello')"
```

### C/C++

```bash
# #include directive
run "#include <stdio.h>\nint main() { printf(\"Hello\\n\"); }"
```

## Ambiguous Cases

Some syntax looks similar across languages:

```bash
#  Could be Python, Ruby, Lua, or Perl
run "print('hello')"
```

**Solution:** Use `--lang` explicitly:

```bash
#  Explicit
run --lang python "print('hello')"
run --lang ruby "print('hello')"
run --lang lua "print('hello')"
```

## Detection Confidence

| Syntax | Confidence | Languages |
|--------|------------|-----------|
| `fn main()` | High | Rust |
| `package main` | High | Go |
| `console.log()` | High | JavaScript |
| `println!()` | High | Rust |
| `fmt.Println()` | High | Go |
| `print()` | Low | Python, Ruby, Lua, Perl |
| `puts` | Medium | Ruby, C |

## Best Practices

###  When to Use Auto-Detection

- File execution (extension available)
- Distinctive syntax
- Quick one-off commands
- Interactive exploration

###  When to Use `--lang`

- Ambiguous syntax
- Scripts and automation
- CI/CD pipelines
- When correctness is critical

## Checking Detection

Test what language is detected:

```bash
# REPL mode
$ run
>>> :detect on
>>> print('hello')  # See what's detected
```

## Next Steps

[Command Reference →](command-syntax.md){ .md-button .md-button--primary }
[REPL Mode →](../repl/index.md){ .md-button }
