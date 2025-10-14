# Quickstart

Get started with `run` in under 5 minutes. This guide shows you the basics of executing code across multiple languages.

## Your First Command

Let's start with the simplest possible example:

```bash
run python "print('Hello, World!')"
```

Output:
```
Hello, World!
```

Congratulations!  You just ran your first Python code with `run`.

---

## Execute Different Languages

Try the same hello world in different languages:

=== "Python"

    ```bash
    run python "print('Hello from Python!')"
    ```

=== "JavaScript"

    ```bash
    run js "console.log('Hello from JavaScript!')"
    ```

=== "Rust"

    ```bash
    run rust "fn main() { println!(\"Hello from Rust!\"); }"
    ```

=== "Go"

    ```bash
    run go "package main; import \"fmt\"; func main() { fmt.Println(\"Hello from Go!\") }"
    ```

=== "Ruby"

    ```bash
    run ruby "puts 'Hello from Ruby!'"
    ```

=== "C"

    ```bash
    run c "#include <stdio.h>\nint main() { printf(\"Hello from C!\\n\"); return 0; }"
    ```

---

## Running Script Files

Create a simple Python script:

```python title="hello.py"
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
print(greet("run-kit"))
```

Run it with:

```bash
run hello.py
```

Output:
```
Hello, World!
Hello, run-kit!
```

!!! tip "Auto-Detection"
    `run` automatically detects the language from the file extension. No need to specify `--lang`!

---

## Language Aliases

`run` supports multiple aliases for each language. Use whichever feels natural:

```bash
# Python
run python "print('hello')"
run py "print('hello')"
run py3 "print('hello')"

# JavaScript
run javascript "console.log('hello')"
run js "console.log('hello')"
run node "console.log('hello')"

# TypeScript
run typescript "console.log('hello')"
run ts "console.log('hello')"
run deno "console.log('hello')"

# Rust
run rust "fn main() { println!(\"hello\"); }"
run rs "fn main() { println!(\"hello\"); }"
```

---

## Command Syntax Variations

`run` is flexible with how you provide code. These are all equivalent:

```bash
# 1. Full syntax
run --lang python --code "print('hello')"

# 2. Shorthand flags
run -l python -c "print('hello')"

# 3. Language first
run python "print('hello')"

# 4. Auto-detect (if unambiguous)
run "print('hello')"
```

!!! warning "Auto-Detection Limits"
    Auto-detection works great for distinct syntax, but ambiguous code (like `print('hello')`) might choose the wrong language. Use `--lang` when in doubt!

---

## Variables and Multiple Statements

You can write multi-line code using your shell's syntax:

=== "Bash"

    ```bash
    run python "
    x = 10
    y = 20
    print(f'Sum: {x + y}')
    print(f'Product: {x * y}')
    "
    ```

=== "Bash (Heredoc)"

    ```bash
    run python << 'EOF'
    x = 10
    y = 20
    print(f'Sum: {x + y}')
    print(f'Product: {x * y}')
    EOF
    ```

Output:
```
Sum: 30
Product: 200
```

---

## Piping Data

One of `run`'s superpowers is handling piped data:

### JSON Processing

```bash
echo '{"name": "Ada", "age": 30}' | run python "
import sys, json
data = json.load(sys.stdin)
print(f\"{data['name']} is {data['age']} years old\")
"
```

Output:
```
Ada is 30 years old
```

### Cross-Language Pipeline

Process data through multiple languages:

```bash
# Generate JSON with Python
run python "import json; print(json.dumps({'items': [1,2,3,4,5]}))" | \
# Process with JavaScript
run js "
const data = JSON.parse(require('fs').readFileSync(0, 'utf8'));
const sum = data.items.reduce((a, b) => a + b, 0);
console.log('Sum:', sum);
"
```

Output:
```
Sum: 15
```

---

## Interactive REPL

For longer sessions, use the interactive mode. By default, `run` starts in Python mode when no arguments are provided:

```bash
$ run
run universal REPL. Type :help for commands.

>>> :help
Commands:
  :help                 Show this help message
  :languages            List available languages
  :lang <id>            Switch to language <id>
  :detect on|off        Enable or disable auto language detection
  :reset                Reset the current language session
  :load <path>          Execute a file in the current language
  :exit, :quit          Leave the REPL
Any language id or alias works as a shortcut, e.g. :py, :cpp, :csharp, :php.

>>> :py
switched to python

python>>> x = 10

python>>> y = 20

python>>> x + y
30

python>>> :exit
Goodbye!
```

!!! success "Stateful Sessions"
    Variables persist across commands in the same session. Perfect for exploration!

---

## Common Use Cases

### Quick Calculations

```bash
run python "print(2**100)"
# Output: 1267650600228229401496703205376
```

### Test Regular Expressions

```bash
run python "
import re
text = 'Hello 123 World 456'
numbers = re.findall(r'\d+', text)
print(numbers)
"
# Output: ['123', '456']
```

### Format JSON

```bash
echo '{"name":"Ada","age":30}' | run python "
import sys, json
data = json.load(sys.stdin)
print(json.dumps(data, indent=2))
"
```

Output:
```json
{
  "name": "Ada",
  "age": 30
}
```

### Test Algorithm

```bash
run rust "
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();
    println!(\"Sum: {}\", sum);
}
"
```

Output:
```
Sum: 15
```

---

## Checking Available Languages

See which languages are available on your system:

```bash
$ run
>>> :languages
```

You'll see output like:
```
Available language engines:
✓ python (python, py, py3, python3)
✓ javascript (javascript, js, node, nodejs)
✓ rust (rust, rs)
✓ go (go, golang)
✗ haskell (haskell, hs, ghci) - not installed
...
```

---

## Getting Help

### Command-Line Help

```bash
$ run --help
Universal multi-language runner and REPL

Usage: run [OPTIONS] [ARGS]...

Arguments:
  [ARGS]...  Positional arguments (language, code, or file)

Options:
  -V, --version      Print version information and exit
  -l, --lang <LANG>  Explicitly choose the language to execute
  -f, --file <PATH>  Execute code from the provided file path
  -c, --code <CODE>  Execute the provided code snippet
      --no-detect    Disable heuristic language detection
  -h, --help         Print help
```

### REPL Help

```bash
$ run
>>> :help
Commands:
  :help                 Show this help message
  :languages            List available languages
  :lang <id>            Switch to language <id>
  :detect on|off        Enable or disable auto language detection
  :reset                Reset the current language session
  :load <path>          Execute a file in the current language
  :exit, :quit          Leave the REPL
Any language id or alias works as a shortcut, e.g. :py, :cpp, :csharp, :php.
```

### Version Info

```bash
$ run --version

run-kit 0.2.1
Universal multi-language runner and smart REPL
author: Esubalew Chekol <esubalewchekol6@gmail.com>
homepage: https://esubalew.et
repository: https://github.com/Esubaalew/run
license: Apache-2.0
```

---

## Next Steps

Now that you know the basics, dive deeper:

[User Guide](../guide/overview.md){ .md-button .md-button--primary }
[REPL Mode](../repl/index.md){ .md-button }
[Supported Languages](../languages/index.md){ .md-button }

