# Command Syntax

`run` offers flexible command syntax to match your workflow. This guide covers all the ways you can invoke `run` and when to use each form.

## Basic Syntax

The general command structure:

```bash
run [OPTIONS] [ARGS]...
```

Where `[ARGS]...` can be positional arguments like language, code, or file.

## Command Variations

All these commands are equivalent:

=== "Full Syntax"

    ```bash
    run --lang python --code "print('hello')"
    ```
    
    Most explicit. Best for scripts and automation.

=== "Shorthand Flags"

    ```bash
    run -l python -c "print('hello')"
    ```
    
    Shorter flags for quick typing.

=== "Language First"

    ```bash
    run python "print('hello')"
    ```
    
    Natural and concise. Most commonly used.

=== "Auto-Detect"

    ```bash
    run "print('hello')"
    ```
    
    Shortest, but risky with ambiguous syntax.

## Flags Reference

Full help output:

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

### Language Specification (`-l, --lang`)

Specify the programming language to use:

```bash
# Long form
run --lang python "print('hello')"

# Short form
run -l python "print('hello')"

# Positional (no flag needed)
run python "print('hello')"
```

**Aliases:** All language aliases work:

```bash
run --lang python "..."
run --lang py "..."
run --lang py3 "..."
run --lang python3 "..."
```

### Code Input (`-c, --code`)

Provide code as a command-line string:

```bash
# Long form
run --code "print('hello')"

# Short form
run -c "print('hello')"

# Implicit (no flag needed)
run python "print('hello')"
```

### File Input (`-f, --file`)

Execute a file:

```bash
# Direct file path
run script.py
run main.go
run app.js

# Explicit with --file flag
run --file script.py

# With -f shorthand
run -f script.py

# With language override
run --lang python script.py
run python script.py
```

### Disable Detection (`--no-detect`)

Disable automatic language detection:

```bash
# Force explicit language specification
run --no-detect --lang python "print('hello')"
```

### Help & Version

```bash
# Show help
run --help
run -h

# Show version (detailed)
run --version
run -V
```

## When to Use `--lang`

###  Always Use `--lang` When:

#### 1. Syntax is Ambiguous

```bash
#  Could be Python, Ruby, Lua, or Perl
run "print('hello')"

#  Explicit and correct
run --lang python "print('hello')"
```

#### 2. Writing Scripts

```bash
#!/bin/bash
#  Deterministic behavior
run --lang python "
import sys
print(f'Running on {sys.platform}')
"
```

#### 3. Automation & CI/CD

```yaml
# .github/workflows/test.yml
- name: Run test
  run: run --lang python test_script.py
```

###  Auto-Detection Works When:

#### 1. Syntax is Distinctive

```bash
#  Unique to Rust
run "fn main() { println!(\"hello\"); }"

#  Unique to Go
run "package main; import \"fmt\"; func main() { fmt.Println(\"hello\") }"

#  Unique to JavaScript
run "console.log('hello')"
```

#### 2. File Extensions are Clear

```bash
#  .py extension
run script.py

#  .rs extension
run program.rs

#  .go extension
run main.go
```

## Quoting Rules

### Single vs Double Quotes

Your shell interprets quotes before `run` sees them:

```bash
# Use double quotes for variables
name="World"
run python "print(f'Hello, $name')"

# Use single quotes to prevent interpolation
run python 'print("Hello, World!")'
```

### Escaping Quotes

When your code contains quotes:

```bash
# Escape inner quotes
run python "print('it\\'s working')"

# Mix quote styles
run python 'print("it'\''s working")'

# Use heredoc for complex code
run python << 'EOF'
print("it's working")
print('with "quotes"')
EOF
```

## Multi-Line Code

### Heredoc (Recommended)

```bash
run python << 'EOF'
def greet(name):
    return f"Hello, {name}!"

for name in ['Alice', 'Bob', 'Charlie']:
    print(greet(name))
EOF
```

!!! tip "Why 'EOF' with quotes?"
    Quotes prevent shell variable expansion in the heredoc.

### Newline in String

```bash
# Bash allows literal newlines in quotes
run python "
x = 10
y = 20
print(f'Sum: {x + y}')
"
```

### Escaped Newlines

```bash
run python "x = 10\ny = 20\nprint(x + y)"
```

## Piping Code

### From stdin

```bash
# Pipe code to run
echo "print('hello')" | run python

# Read from file
cat script.py | run python
```

### Piping Data

```bash
# Pipe data that your code reads
echo '{"name":"Ada"}' | run python "
import sys, json
data = json.load(sys.stdin)
print(data['name'])
"
```

## File Execution

### Basic File Execution

```bash
run script.py
run main.go
run app.js
```

### With Language Override

Force a specific language despite extension:

```bash
# Treat .txt as Python
run --lang python script.txt

# Treat extensionless file as Bash
run --lang bash my_script
```

### With Arguments

Pass arguments to your script:

```bash
# Arguments after filename
run script.py arg1 arg2 arg3
```

Your script receives them as usual:

```python title="script.py"
import sys
print(f"Received: {sys.argv[1:]}")
```

## Combining Techniques

### Script with stdin

```bash
echo "data" | run script.py arg1 arg2
```

### Pipeline with Multiple Languages

```bash
run python "print('hello')" | run ruby "puts STDIN.read.upcase"
```

### Environment Variables

```bash
API_KEY=secret run python "
import os
print(f'Key: {os.getenv(\"API_KEY\")}')
"
```

## Advanced Patterns

### Conditional Execution

```bash
# Run if command succeeds
test -f data.json && run python process.py

# Chain commands
run python generate.py && run rust process.rs
```

### Loops

```bash
# Process multiple files
for file in *.py; do
    run "$file"
done

# Run same code with different data
for i in {1..5}; do
    echo "$i" | run python "
import sys
n = int(sys.stdin.read())
print(f'{n} squared = {n*n}')
"
done
```

### Functions in Shell

```bash
# Create a shell function
run_python() {
    run --lang python "$@"
}

# Use it
run_python "print('hello')"
run_python script.py
```

## Error Handling

### Exit Codes

`run` preserves the exit code of your script:

```bash
run python "import sys; sys.exit(42)"
echo $?  # 42

# Use in conditionals
if run python "import sys; sys.exit(1)"; then
    echo "Success"
else
    echo "Failed"
fi
```

### Capturing Output

```bash
# Capture stdout
output=$(run python "print('hello')")
echo "Got: $output"

# Capture stderr
errors=$(run python "import sys; print('error', file=sys.stderr)" 2>&1)

# Redirect to file
run python script.py > output.txt 2> errors.txt
```

## Performance Considerations

### Compiled Languages

First run compiles, subsequent runs are faster:

```bash
# First time (compile + run)
time run rust "fn main() { println!(\"hello\"); }"

# Subsequent (cached, if code unchanged)
time run rust "fn main() { println!(\"hello\"); }"
```

### Script Languages

Interpreters cache bytecode automatically:

```bash
# Python generates .pyc
run script.py  # Compiles to bytecode
run script.py  # Uses cached .pyc
```

## Common Mistakes

###  Forgetting to Quote

```bash
#  Shell interprets this wrong
run python print('hello')

#  Proper quoting
run python "print('hello')"
```

###  Wrong Quote Nesting

```bash
#  Breaks on inner quotes
run python "print("hello")"

#  Escape or mix quotes
run python "print(\"hello\")"
run python 'print("hello")'
```

###  Shell Variable Expansion

```bash
#  $x expands in shell, not Python
run python "x = 5; print($x)"

#  Escape or use single quotes
run python 'x = 5; print(x)'
```

###  Ambiguous Auto-Detection

```bash
#  Might detect as Python, Ruby, or Lua
run "print('hello')"

#  Explicit language
run python "print('hello')"
```

## Best Practices

1. **Be explicit in scripts** - Use `--lang` for deterministic behavior
2. **Use heredoc for multiline** - Cleaner than escaping newlines
3. **Quote defensively** - Always quote code strings
4. **Test auto-detection** - Verify it chooses the right language
5. **Check exit codes** - Don't ignore errors

## Examples

### Quick One-Liners

```bash
# Math
run python "print(2**100)"

# Date formatting
run ruby "puts Time.now.strftime('%Y-%m-%d')"

# JSON pretty-print
echo '{"a":1}' | run python "import sys,json; print(json.dumps(json.load(sys.stdin), indent=2))"
```

### Scripts

```bash
# Process data
cat data.csv | run python "
import sys, csv
reader = csv.reader(sys.stdin)
for row in reader:
    print(','.join(row[:3]))
"

# Generate config
run ruby << 'EOF'
require 'yaml'
config = {
  'server' => {'host' => 'localhost', 'port' => 8080},
  'database' => {'url' => 'postgresql://localhost'}
}
puts config.to_yaml
EOF
```

## Next Steps

[Running Files →](running-files.md){ .md-button .md-button--primary }
[Piping Data →](piping-data.md){ .md-button }
[Language Detection →](language-detection.md){ .md-button }

