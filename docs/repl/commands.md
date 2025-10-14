# REPL Commands

Complete reference for all REPL meta-commands. These commands start with `:` and control the REPL behavior.

## Command Overview

| Command | Purpose |
|---------|---------|
| `:help` | Show help message |
| `:languages` | List available languages |
| `:lang <id>` | Switch to a language |
| `:detect on\|off` | Control auto-detection |
| `:load <path>` | Execute a file |
| `:reset` | Clear session state |
| `:exit` / `:quit` | Exit the REPL |

## `:help`

Display available commands and language shortcuts.

### Usage

```bash
>>> :help
```

### Example

```bash
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

---

## `:languages`

List all languages supported by the run tool.

### Usage

```bash
>>> :languages
```

### Example

```bash
>>> :languages
available languages: bash, c, cpp, crystal, csharp, dart, elixir, go, groovy, haskell, java, javascript, julia, kotlin, lua, nim, perl, php, python, r, ruby, rust, swift, typescript, zig
```

### Description

This command displays a comma-separated list of all programming languages that the run tool supports. Note that this shows the languages built into run, not which language runtimes or compilers are actually installed on your system. To execute code in a specific language, you still need to have that language's runtime or compiler installed

---

## `:lang <id>`

Switch to a specific programming language.

### Usage

```bash
>>> :lang <language_name>
```

### Parameters

- `<language_name>` - Language name or alias (e.g., `python`, `py`, `js`, `rust`)

### Examples

```bash
# Switch to Python
>>> :lang python
switched to python

# Use an alias
>>> :lang py
switched to python

# Switch to JavaScript
>>> :lang javascript
switched to javascript

# Use short alias
>>> :lang js
switched to javascript
```

### Language Shortcuts

Instead of `:lang <name>`, use shortcuts:

```bash
>>> :py        # Switch to Python
>>> :js        # Switch to JavaScript
>>> :rust      # Switch to Rust
>>> :go        # Switch to Go
>>> :c         # Switch to C
>>> :cpp       # Switch to C++
>>> :java      # Switch to Java
>>> :rb        # Switch to Ruby
>>> :bash      # Switch to Bash
```

### State Behavior

When switching languages:

1. Current language state is preserved
2. New language starts fresh (or resumes previous session)
3. Switching back restores the previous state

```bash
>>> :py
python>>> x = 10

>>> :js
javascript>>> let y = 20

>>> :py
# Back to Python, x still exists
python>>> x
10
```

---

## `:detect on|off`

Control automatic language detection.

### Usage

```bash
>>> :detect <on|off>
```

### Parameters

- `on` - Enable auto-detection
- `off` - Disable auto-detection

### Examples

```bash
# Enable auto-detection
>>> :detect on
auto-detect enabled

>>> print('hello')  # Auto-detects as Python
hello

# Disable auto-detection
>>> :detect off
auto-detect disabled

>>> console.log('hello')  # Stays in current language
# Error: current language doesn't recognize this syntax
```

### When to Use

**Enable auto-detection** when:
- Experimenting with different languages
- Writing snippets with distinctive syntax
- Quick testing

**Disable auto-detection** when:
- Working in a single language
- Code has ambiguous syntax
- Need predictable behavior

!!! warning "Auto-Detection Limits"
    Auto-detection works best with distinctive syntax. Ambiguous code like `print('hello')` might choose the wrong language.

---

## `:load <path>`

Execute a file in the current REPL session. The file's contents are run as if you typed them line-by-line.

### Usage

```bash
>>> :load <file_path>
```

### Parameters

- `<file_path>` - Path to file (relative or absolute)

### Examples

**Python file:**

```python title="helpers.py"
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

PI = 3.14159
```

```bash
>>> :py
python>>> :load helpers.py

python>>> add(10, 5)
15

python>>> multiply(3, 4)
12

python>>> PI
3.14159
```

**JavaScript file:**

```javascript title="utils.js"
function greet(name) {
    return `Hello, ${name}!`;
}

const VERSION = '1.0.0';
```

```bash
>>> :js
javascript>>> :load utils.js

javascript>>> greet('Alice')
'Hello, Alice!'

javascript>>> VERSION
'1.0.0'
```

### Relative vs Absolute Paths

```bash
# Relative to current directory
>>> :load ./scripts/helper.py
>>> :load ../utils.js

# Absolute path
>>> :load /home/user/scripts/helper.py
>>> :load C:\Users\user\scripts\helper.py  # Windows
```

### Loading Multiple Files

```bash
python>>> :load config.py
python>>> :load database.py
python>>> :load models.py
# All loaded in order
```

### Use Cases

1. **Load utility functions**
2. **Import configurations**
3. **Test modules in development**
4. **Load data processing scripts**

---

## `:reset`

Clear all state in the current language session. Variables, functions, and imports are discarded.

### Usage

```bash
>>> :reset
```

### Example

```bash
python>>> x = 100
python>>> y = 200
python>>> import math

python>>> x + y
300

python>>> :reset
session for 'python' reset

python>>> x
NameError: name 'x' is not defined

python>>> math.pi
NameError: name 'math' is not defined
```

### When to Use

- Start fresh without restarting REPL
- Clear accumulated state
- Fix issues from previous commands
- Memory cleanup for long sessions

### Language-Specific Behavior

Different languages handle reset differently:

**Python:**
```bash
python>>> x = 10
python>>> :reset
# Clears all variables and imports
```

**JavaScript:**
```bash
javascript>>> let x = 10
javascript>>> :reset
# Clears all variables and functions
```

**Compiled (Rust/C/C++):**
```bash
rust>>> let x = 10;
rust>>> :reset
# Clears accumulated code
```

---

## `:exit` / `:quit`

Exit the REPL and return to the shell.

### Usage

```bash
>>> :exit
# or
>>> :quit
```

### Example

```bash
>>> :exit
Goodbye!
$
```

### Alternative Methods

**Keyboard shortcuts:**
- **Unix/Linux/macOS:** `Ctrl+D`
- **Windows:** `Ctrl+Z` then `Enter`

**Using commands:**
```bash
>>> :quit
Goodbye!
```

---

## Command Aliases

Many commands have shorter aliases:

| Full Command | Aliases |
|--------------|---------|
| `:language` | `:lang` |
| `:exit` | `:quit`, `Ctrl+D` |
| `:python` | `:py` |
| `:javascript` | `:js` |
| `:typescript` | `:ts` |
| `:rust` | `:rs` (not `:rust`) |

---

## Tips & Best Practices

### 1. Use Shortcuts for Speed

```bash
# Faster
>>> :py
>>> :js
>>> :go

# Slower
>>> :lang python
>>> :lang javascript
>>> :lang go
```

### 2. Check Supported Languages

Check what languages run supports:

```bash
>>> :languages
# See all supported languages
```

### 3. Load Common Utilities

Create a personal utilities file:

```python title="~/.run_helpers.py"
import json
import sys
import os
import re

def jprint(data):
    print(json.dumps(data, indent=2))

def read_json(path):
    with open(path) as f:
        return json.load(f)
```

```bash
python>>> :load ~/.run_helpers.py
python>>> jprint({'name': 'Alice', 'age': 30})
{
  "name": "Alice",
  "age": 30
}
```

### 4. Reset on Errors

If something breaks:

```bash
python>>> # Oops, something went wrong
python>>> :reset
python>>> # Start fresh
```

### 5. Use :help as Reference

Forget a command?

```bash
>>> :help
# Quick reference
```

---

## Scripting REPL Commands

You can script REPL sessions:

```bash
# Create a script
cat << 'EOF' > repl_script.txt
:py
x = 10
y = 20
print(x + y)
:exit
EOF

# Run it
cat repl_script.txt | run
```

---

## Error Handling

### Unknown Command

```bash
>>> :unknown
Error: Unknown command: unknown
Type :help for available commands.
```

### Missing Argument

```bash
>>> :lang
Error: :lang requires a language name
Usage: :lang <language>

>>> :load
Error: :load requires a file path
Usage: :load <path>
```

### Language Not Found

```bash
>>> :lang nonexistent
Error: Language 'nonexistent' not found
Use :languages to see available languages
```

### File Not Found

```bash
>>> :load missing.py
Error: File not found: missing.py
```

---

## Next Steps

[Stateful Sessions →](sessions.md){ .md-button .md-button--primary }
[Language-Specific Behavior →](language-behavior.md){ .md-button }

