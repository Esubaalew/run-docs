# Python

High-level, interpreted programming language known for simplicity and versatility

## Overview

Python is one of the most popular programming languages in the world, widely used for web development, data science, machine learning, automation, and more. With run, you can execute Python code instantly without setting up virtual environments or managing complex dependencies.

run supports both Python 2 and Python 3, automatically using the python3 interpreter available on your system. The Python engine in run provides a stateful REPL that accumulates snippets into a persistent session script, so your variables and functions survive across commands.

## Language Aliases

You can invoke Python using any of these aliases:

| Alias | Description |
| --- | --- |
| `python` | Full language name |
| `py` | Short alias |
| `py3` | Python 3 specific |
| `python3` | Python 3 explicit |

```bash
run python "print('Hello')"
run py "print('Hello')"
run py3 "print('Hello')"
run python3 "print('Hello')"
# Output: Hello (x4)
```

## Basic Usage - Inline Code

Execute Python code directly from the command line using the --code flag or as a positional argument:

### Simple Print Statement

```bash
run python "print('Hello, World!')"
# Output: Hello, World!
```

### Arithmetic Operations

```bash
run python "print(2 + 2)"
run python "print(10 * 5)"
run python "print(100 / 3)"
# Output:
# 4
# 50
# 33.333333333333336
```

### String Operations

```bash
run python "name = 'Alice'; print(f'Hello, {name}!')"
# Output: Hello, Alice!
```

### Multi-line Code

For multi-line code, **use heredoc for the best experience**:

```bash
run python << 'EOF'
for i in range(5):
    print(f'Number: {i}')
EOF
# Output:
# Number: 0
# Number: 1
# Number: 2
# Number: 3
# Number: 4
```

For short multi-statement code, use semicolons:

```bash
run python "x = [1, 2, 3]; y = [i*2 for i in x]; print(y)"
# Output: [2, 4, 6]
```

## File Execution

Execute Python scripts from files. run will automatically detect .py files or you can specify the language explicitly:

```bash
# Create a Python file
echo "print('Hello from file!')" > hello.py

# Execute with language specified
run python hello.py

# Or let run auto-detect from extension
run hello.py
# Output: Hello from file!
```

### Complex Script Example

```bash
# Create a more complex script
cat > fibonacci.py << 'EOF'
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
EOF

run python fibonacci.py
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

## Piped Input (stdin)

Pipe Python code into run from other commands or files:

```bash
# Echo to run
echo "print('From stdin')" | run python
# Output: From stdin

# Cat file to run
cat script.py | run python

# Generate and execute
echo "import sys; print(sys.version)" | run python
# Output: 3.11.0 (main, Oct 24 2022, 18:26:48) [GCC 12.2.0]
```

## REPL Mode - Interactive Python

Start an interactive Python REPL by running 'run python' without any code. The Python REPL in run is STATEFUL, meaning variables, functions, and imports persist across commands within the same session.

```bash
$ run python
run v0.5.1 — 25+ languages. Type :help for commands.
python>>> x = 10
python>>> y = 20
python>>> print(x + y)
30
python>>> def greet(name):
...     return f"Hello, {name}!"
...
python>>> greet("World")
'Hello, World!'
python>>> greet("Python")
'Hello, Python!'
```

```bash
python>>> import math
python>>> math.pi
3.141592653589793
python>>> math.sqrt(16)
4.0
python>>> from datetime import datetime
python>>> datetime.now()
datetime.datetime(2025, 2, 10, 14, 30, 45, 123456)
```

## REPL Behavior - Stateful

The Python engine maintains state across commands by accumulating code into a session script. This means:

- Variables defined in one command are available in subsequent commands
- Functions and classes persist throughout the session
- Imports remain active for the entire session
- State is maintained within a single REPL session (started with 'run python')
- Each separate 'run python "code"' command starts fresh - use REPL mode for persistent state

## Advanced Examples

Python's rich standard library and ecosystem work seamlessly with run:

### Working with Files

```bash
run python "
import os
files = os.listdir('.')
print(f'Found {len(files)} files in current directory')
for f in files[:5]:
    print(f'  - {f}')
"
# Output:
# Found 12 files in current directory
#   - README.md
#   - src
#   - Cargo.toml
#   - target
#   - .git
```

### JSON Processing

```bash
run python "
import json
data = {
    'name': 'run',
    'version': '1.0',
    'languages': 25,
    'author': 'esubaalew'
}
print(json.dumps(data, indent=2))
"
```

### List Comprehensions

```bash
run python "
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [n for n in numbers if n % 2 == 0]
squares = [n**2 for n in evens]
print(f'Even numbers: {evens}')
print(f'Their squares: {squares}')
"
# Output:
# Even numbers: [2, 4, 6, 8, 10]
# Their squares: [4, 16, 36, 64, 100]
```

### Working with Dates

```bash
run python "
from datetime import datetime, timedelta
now = datetime.now()
tomorrow = now + timedelta(days=1)
print(f'Today: {now.strftime(\"%Y-%m-%d\")}')
print(f'Tomorrow: {tomorrow.strftime(\"%Y-%m-%d\")}')
"
# Output:
# Today: 2025-02-10
# Tomorrow: 2025-02-11
```

### Regular Expressions

```bash
run python "
import re
text = 'Contact us at support@example.com or sales@example.com'
emails = re.findall(r'[\\w.-]+@[\\w.-]+', text)
print(f'Found {len(emails)} emails:')
for email in emails:
    print(f'  - {email}')
"
# Output:
# Found 2 emails:
#   - support@example.com
#   - sales@example.com
```

## Common Use Cases

- Quick calculations and data processing
- Testing Python snippets before adding to larger projects
- Learning Python interactively with immediate feedback
- Automating system tasks and file operations
- Processing JSON, CSV, and other data formats
- Prototyping algorithms and data structures
- Web scraping and API testing
- Text processing and regular expressions
- Mathematical computations and statistics

## Error Handling

run displays Python errors clearly with full tracebacks:

```bash
run python "print('missing quote)"
# Output: SyntaxError: unterminated string literal

run python "x = 10 / 0"
# Output: ZeroDivisionError: division by zero

run python "print(undefined_variable)"
# Output: NameError: name 'undefined_variable' is not defined
```

## Troubleshooting

If you encounter issues with Python in run:

- Ensure Python 3 is installed: `python3 --version`
- Check that Python is in your system PATH
- For module import errors, install required packages: `pip install package_name`
- Use quotes around code with special characters or spaces
- **For multi-line code, always use heredoc** (`<< 'EOF'`) to avoid quoting issues
- For multi-statement one-liners, use semicolons: `"stmt1; stmt2; stmt3"`
- If REPL state seems corrupted, exit and restart the session

## Limitations

- External packages must be installed separately via pip
- Virtual environments are not automatically activated
- Some interactive features (like input()) may not work in inline mode
- Large outputs may be truncated in some terminals
- GUI applications (tkinter, pygame) require a display server
