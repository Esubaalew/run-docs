# REPL Commands

Complete reference for all REPL meta-commands. These commands start with `:` and control the REPL behavior.

## Command Overview

| Command | Purpose |
|---------|---------|
| `:help` | Show help message |
| `:languages` | List available languages |
| `:lang <id>` | Switch to a language |
| `:detect on\|off` | Control auto-detection |
| `:load <path>` | Execute a file (persists variables) |
| `:save <path>` | Save session history to file |
| `:history [n]` | Show last n history entries |
| `:install <pkg>` | Install a package for current language |
| `:bench [N] <code>` | Benchmark code N times (default 5) |
| `:type` / `:which` | Show active language and session state |
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
  :save <path>          Save session history to a file
  :history [n]          Show last n entries (default: 25)
  :install <pkg>        Install a package for the current language
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

Load and execute a file in the current REPL session. Variables, functions, and classes defined in the file **persist in the session** -- you can use them immediately after loading. For languages with session support (Python, JavaScript), the file contents are fed through the session evaluator. Tab completion for file paths is available.

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

## `:save <path>`

Save all session history (commands you've entered) to a file. Useful for capturing an interactive session as a reusable script.

### Usage

```bash
>>> :save <file_path>
```

### Parameters

- `<file_path>` - Path to save the history to (relative or absolute)

### Examples

```bash
python>>> x = 10
python>>> y = 20
python>>> print(x + y)
30

python>>> :save session.py
[saved 3 entries to session.py]
```

The saved file contains your code:

```python title="session.py"
x = 10
y = 20
print(x + y)
```

### Use Cases

1. **Capture exploratory work** as a reusable script
2. **Save debugging sessions** for later reference
3. **Export REPL experiments** to proper source files

---

## `:history [n]`

Show recent command history. Defaults to the last 25 entries.

### Usage

```bash
>>> :history        # Show last 25 entries
>>> :history 10     # Show last 10 entries
```

### Parameters

- `[n]` - Optional number of entries to show (default: 25)

### Example

```bash
python>>> x = 10
python>>> y = 20
python>>> x + y
30

python>>> :history
[   1] x = 10
[   2] y = 20
[   3] x + y
```

Multi-line entries are shown with a continuation indicator:

```bash
python>>> :history
[   1] def fib(n): (...)
[   2] fib(10)
```

---

## `:install <pkg>`

Install a package using the current language's native package manager. Delegates to `pip`, `npm`, `gem`, `cargo`, etc. based on the active language.

### Usage

```bash
>>> :install <package_name>
```

### Parameters

- `<package_name>` - The package to install

### Examples

**Python (uses pip):**

```bash
python>>> :install requests
[run] Installing 'requests' for python...
[run] Successfully installed 'requests'

python>>> import requests
python>>> requests.get('https://httpbin.org/get').status_code
200
```

**JavaScript (uses npm):**

```bash
javascript>>> :install lodash
[run] Installing 'lodash' for javascript...
[run] Successfully installed 'lodash'
```

**Ruby (uses gem):**

```bash
ruby>>> :install nokogiri
[run] Installing 'nokogiri' for ruby...
[run] Successfully installed 'nokogiri'
```

### Supported Package Managers

| Language | Package Manager | Command |
|----------|----------------|---------|
| Python | pip | `pip install <pkg>` |
| JavaScript/TypeScript | npm | `npm install <pkg>` |
| Rust | cargo | `cargo add <pkg>` |
| Go | go | `go get <pkg>` |
| Ruby | gem | `gem install <pkg>` |
| PHP | composer | `composer require <pkg>` |
| Lua | luarocks | `luarocks install <pkg>` |
| Dart | dart pub | `dart pub add <pkg>` |
| Perl | cpanm | `cpanm <pkg>` |
| Julia | Pkg | `Pkg.add("<pkg>")` |
| Haskell | cabal | `cabal install <pkg>` |
| Nim | nimble | `nimble install <pkg>` |
| R | install.packages | `install.packages("<pkg>")` |
| C# | dotnet | `dotnet add package <pkg>` |
| Crystal | shards | `shards install <pkg>` |

!!! note "Languages Without Package Managers"
    Some languages (C, C++, Bash, Zig, Java, Kotlin) don't have a standard CLI package manager and will show an appropriate message.

### CLI Alternative

You can also install packages from the command line without entering the REPL:

```bash
run --install numpy -l python
run --install lodash -l js
run --install nokogiri -l ruby
```

---

## `:bench [N] <code>`

Benchmark a code snippet by running it N times and reporting statistics.

### Usage

```bash
>>> :bench print('hello')          # Default: 5 iterations
>>> :bench 20 print('hello')       # Run 20 times
```

### Parameters

- `[N]` - Optional iteration count (default: 5, minimum: 1)
- `<code>` - Code to benchmark

### Example

```bash
python>>> :bench 10 sum(range(100000))
Benchmark: 10 iterations
  warmup: 12ms
  run 1: 10.24ms
  run 2: 9.87ms
  ...
Results (10 runs):
  min:    9.12ms
  max:    12.45ms
  avg:    10.15ms
  median: 10.02ms
  stddev: 0.89ms
```

### Output

- **warmup** — First run (not counted) to prime caches
- **min/max/avg/median** — Distribution of execution times
- **stddev** — Standard deviation across all runs

---

## `:type` / `:which`

Show the active language and whether a session is currently open.

### Usage

```bash
>>> :type
>>> :which
```

### Example

```bash
python>>> :type
Active language: python (session active)

>>> :which
Active language: python (no session)
```

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
| `:load` | `:run` |
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

