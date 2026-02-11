# REPL Commands

Complete reference for all REPL meta-commands. These commands start with `:` and work the same in every language (`run`, `run python`, `run go`, etc.).

!!! tip "Piping into run"
    When piping input into `run` (e.g. in scripts or CI), use **`run -i`** or **`run --interactive`** so run starts the REPL instead of executing stdin as a script. Example: `echo ':help\n:exit' | run -i`.

## Shell escape

### `:! CMD`

Run a shell command with **inherited** stdin, stdout, and stderr. Output goes directly to your terminal.

```bash
python>>> :! echo hello
hello
python>>> :! ls -la
```

### `:!! CMD`

Run a shell command and **capture** stdout and stderr, then print them.

```bash
python>>> :!! echo captured
captured
python>>> :!! pwd
/Users/you/project
```

---

## Command Overview

| Command | Purpose |
|---------|---------|
| `:help` | Show all REPL commands |
| `:help :cmd` | Help for one command (e.g. `:help load`) |
| `:commands` | List all `:cmd` with one-line description (machine-friendly) |
| `:quickref` | One-screen cheat sheet (all commands + shortcuts) |
| `:languages` | List available languages |
| `:versions [id]` | Show toolchain versions |
| `:lang <id>` | Switch to a language |
| `:detect on\|off` | Control auto-detection |
| `:cd [path]` | Change directory; `:cd -` = previous, `:cd -b <name>` = bookmark |
| `:dhist [n]` | Directory history (default 10) |
| `:bookmark <name> [path]` | Save bookmark; `-l` list, `-d <name>` delete |
| `:env [VAR[=val]]` | List env, get VAR, or set VAR=val |
| `:load <path\|url>` | Load and execute a file or http(s) URL (persists variables) |
| `:edit [path]` | Open $EDITOR; on save, execute in current session (no path = temp file) |
| `:run <path\|url\|macro>` | Load file/URL or run macro by name |
| `:logstart [path]` | Start logging input to file (default: run_log.txt) |
| `:logstop` | Stop logging |
| `:logstate` | Show whether logging and path |
| `:macro <NAME> <range>...` | Save history range as macro; `:macro run NAME` to run |
| `:time <code>` | Run code once and print elapsed time |
| `:who` | List names tracked in current session |
| `:whos [pattern]` | Like `:who` with optional name filter |
| `:xmode plain\|context\|verbose` | Exception display: first line, first 5 lines, or full stderr |
| `:config KEY [VALUE]` | Get/set REPL config (e.g. detect, xmode); persists in `~/.run_repl_config` |
| `:paste` | Enter paste mode; on `:end` or Ctrl-D, execute buffer (strip `>>>` / `...`, dedent) |
| `:end` | End paste mode and execute the collected lines (only in paste mode) |
| `:precision [N]` | Show or set float display precision (0–32) for last result; persists in config |
| `:save <path>` | Save session history to file |
| `:history [n\|range]` | Show history; `-g PATTERN`, `-f FILE`, `4-6` or `4-` or `-6` |
| `:install <pkg>` | Install a package for current language |
| `:bench [N] <code>` | Benchmark code N times (default 10) |
| `:last` | Print last execution stdout |
| `:? <expr>` | Introspection: show doc/source for name (Python session) |
| `:debug [code]` | Run last snippet or code under debugger (Python: pdb) |
| `:type` / `:which` | Show active language and session state |
| `:reset` | Clear session state |
| `:exit` / `:quit` | Exit the REPL |

---

## `:help`

Display available commands and language shortcuts.

- **`:help`** — Show full help.
- **`:help :cmd`** — Show help for one command (e.g. `:help load`, `:help :edit`).
- **`:commands`** — List each `:cmd` with a one-line description (no formatting; for scripts).
- **`:quickref`** — One-screen cheat sheet (all commands + language shortcuts).

### Usage

```bash
>>> :help
>>> :help load
>>> :commands
>>> :quickref
```

### Example

```bash
>>> :help
Commands:
  :help                 Show this help message
  :languages            List available languages
  :versions [id]        Show toolchain versions
  :lang <id>            Switch to language <id>
  :detect on|off        Enable or disable auto language detection
  :reset                Reset the current language session
  :load <path>          Execute a file in the current language
  :save <path>          Save session history to a file
  :history [n]          Show last n entries (default: 25)
  :install <pkg>        Install a package for the current language
  :bench [N] <code>     Benchmark code N times (default: 10)
  :type                 Show current language and session status
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

---

## `:versions [id]`

Show toolchain versions for all languages, or a single language.

### Usage

```bash
>>> :versions
>>> :versions python
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

## Directory and bookmarks

### `:cd [path]`

Change the current working directory. Without arguments, print the current directory.

- **`:cd -`** — Go back to the previous directory (from the directory stack).
- **`:cd -b <name>`** — Go to the directory saved as bookmark `name` (see `:bookmark`).

```bash
python>>> :cd /tmp
/tmp
python>>> :cd -
/home/you/project
```

### `:dhist [n]`

Print the last `n` directories in the directory history (default 10). The stack is updated when you use `:cd <path>` or `:cd -b <name>`.

### `:bookmark <name> [path]`

Save a bookmark. With only `name`, use the current directory. With `path`, use that absolute path. Bookmarks are stored in `~/.run_bookmarks` and persist across sessions.

- **`:bookmark -l`** — List all bookmarks.
- **`:bookmark -d <name>`** — Delete the bookmark `name`.

```bash
python>>> :bookmark proj /home/you/project
[bookmark 'proj' -> /home/you/project]
python>>> :cd -b proj
/home/you/project
```

---

## `:env [VAR[=val]]`

List, get, or set environment variables. No arguments: list all. One argument `VAR`: print value. One argument `VAR=val` or two arguments `VAR` `val`: set.

```bash
python>>> :env
HOME=/home/you
PATH=/usr/bin:...
python>>> :env RUN_TEST 1
python>>> :env RUN_TEST
1
```

---

## `:edit [path]`

Open `$EDITOR` (or vi/notepad); on save and exit, execute the file in the current session. No path = create and edit a temp file, then execute it.

---

## Logging

| Command | Purpose |
|---------|---------|
| `:logstart [path]` | Start logging REPL input to file (default: run_log.txt in cwd). Append mode. |
| `:logstop` | Stop logging. |
| `:logstate` | Show whether logging is on and the path. |

---

## `:xmode plain | context | verbose`

Control how much stderr (e.g. exception tracebacks) is shown after a failed run.

| Mode | What is shown |
|------|----------------|
| **plain** | First line of stderr only (compact). |
| **context** | First 5 lines of stderr. |
| **verbose** | Full stderr (default). |

With no argument, **`:xmode`** prints the current mode.

### Usage

```bash
>>> :xmode
exception display: verbose (plain | context | verbose)

>>> :xmode plain
>>> :xmode context
>>> :xmode verbose
```

---

## `:config KEY [VALUE]`

Get or set REPL configuration. Settings are stored in `~/.run_repl_config` and apply across restarts.

| Form | Effect |
|------|--------|
| **`:config`** | List all config keys and current values (e.g. detect, xmode). |
| **`:config KEY`** | Print the value of KEY. |
| **`:config KEY VALUE`** | Set KEY to VALUE and save to disk. |

Supported keys:

| Key | Values | Meaning |
|-----|--------|---------|
| **detect** | `on`, `off` | Auto language detection (same as `:detect on\|off`). |
| **xmode** | `plain`, `context`, `verbose` | Exception display mode (same as `:xmode`). |
| **precision** | `0`–`32` | Float display precision for last result (same as `:precision N`). |
| **numbered_prompts** | `on`, `off` | Show `[n]` counter in prompt (e.g. `python [3]>>>`). |

### Usage

```bash
>>> :config
detect  on
xmode   verbose

>>> :config detect
on

>>> :config xmode plain
[xmode = plain]

>>> :config detect off
[detect = off]
```

---

## `:paste` and `:end`

Paste multi-line code (e.g. from a doc or website) without the REPL treating each line as a separate command. Leading `>>>` and `...` prompts are stripped, and the block is dedented before execution.

| Command | Effect |
|---------|--------|
| **`:paste`** | Enter paste mode. Subsequent lines are collected into a buffer (not executed). |
| **`:end`** | Exit paste mode and execute the buffer as one snippet. (Only valid in paste mode.) |

You can also press **Ctrl-D** (EOF) to execute the buffer and then exit the REPL.

### Usage

```bash
>>> :paste
[paste mode — type :end or Ctrl-D to execute]
>>> 1+1
>>> 2+2
>>> :end
2
4
[paste done]
```

Pasted lines can include `>>>` or `...` at the start; they are removed before execution.

---

## `:precision [N]`

Control float display precision when the REPL shows a "last result" (e.g. formatted output). Only affects run’s formatted display, not raw stdout from the language.

| Form | Effect |
|------|--------|
| **`:precision`** | Show current precision (or "default"). |
| **`:precision N`** | Set precision to N decimal places (0–32). Saved to `~/.run_repl_config`. |

You can also set it via **`:config precision N`**.

### Usage

```bash
>>> :precision
precision: (default)

>>> :precision 4
[precision = 4]

>>> :precision
precision: 4
```

---

## `:macro` and `:time`

### `:macro <NAME> <range>...`

Save a history range as a named macro. Ranges use the same syntax as `:history` (e.g. `4-7`, `-2`, `4-`, `-6`). Run the macro with **`:macro run NAME`** or **`:run NAME`** (if the name is not a file path).

### `:time <code>`

Run the given code once and print the elapsed time.

### `:who` / `:whos [pattern]`

- **`:who`** — List names tracked in the current session (variables/functions from executed code).
- **`:whos [pattern]`** — Like `:who` with an optional substring filter on names.

---

## `:load <path>`

Load and execute a file or **http(s) URL** in the current REPL session. URLs are fetched to a temp file, then loaded like a local file. Variables, functions, and classes defined in the file **persist in the session** — you can use them immediately after loading. For languages with session support (Python, JavaScript), the file contents are fed through the session evaluator. Tab completion for file paths is available.

**`:run <name>`** — Same as `:load` for a path or URL. If `name` is a macro you defined with `:macro`, it runs that macro instead.

### Usage

```bash
>>> :load <file_path>
>>> :load https://example.com/script.py
>>> :run mymacro
```

### Parameters

- `<file_path>` — Path to file (relative or absolute) or http(s) URL

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

## `:history [n|range]`

Show recent command history. Defaults to the last 25 entries. Supports ranges and options:

- **`n`** — Last n entries (default 25).
- **`4-6`** — Range (entries 4 to 6). **`4-`** — From 4 to end. **`-6`** — Last 6.
- **`-g PATTERN`** — Grep history for lines matching PATTERN.
- **`-f FILE`** — Append selected history to FILE (ranges optional; default last 25).

### Usage

```bash
>>> :history           # Show last 25 entries
>>> :history 10        # Show last 10 entries
>>> :history 4-6       # Show entries 4–6
>>> :history -g print  # Grep for "print"
>>> :history -f out.py # Append last 25 to out.py
```

### Parameters

- `[n]` — Optional number of entries (default: 25), or range (`4-6`, `4-`, `-6`), or `-g PATTERN`, or `-f FILE`

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

Install a package using the current language's native package manager. Delegates to `python -m pip`, `npm`, `gem`, `cargo`, etc. based on the active language. For Python, this uses whichever `python` is on your PATH, so virtual environments are respected (activate your venv first).

### Usage

```bash
>>> :install <package_name>
```

### Parameters

- `<package_name>` - The package to install

### Examples

**Python (uses pip via `python -m pip`):**

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
| Python | pip | `python -m pip install <pkg>` |
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

### Custom Package Managers

You can override the install command per language with an environment variable:

```bash
# Use uv instead of pip
export RUN_INSTALL_COMMAND_PYTHON="uv pip install {package}"

# Use pnpm instead of npm
export RUN_INSTALL_COMMAND_JAVASCRIPT="pnpm add {package}"
```

`{package}` will be replaced with the package name. If you omit it, the package name is appended automatically.

!!! tip "If Install Fails"
    If you see `Package manager not found`, install that tool (e.g., `npm`, `uv`, `pnpm`) or set `RUN_INSTALL_COMMAND_<LANG>` to a command that exists on your PATH.

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
>>> :bench print('hello')          # Default: 10 iterations
>>> :bench 20 print('hello')       # Run 20 times
```

### Parameters

- `[N]` - Optional iteration count (default: 10, minimum: 1)
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

## `:last`

Print the stdout from the last code execution. Useful after running a snippet to re-examine its output without re-executing.

### Usage

```bash
>>> :last
```

### Example

```bash
python>>> :last
(no last output)

python>>> 1 + 1
2

python>>> :last
2
```

---

## Numbered Prompts

Enable numbered prompts to show an `[n]` counter in the prompt, similar to IPython's `In[n]` style. The counter increments with each executed snippet.

### Usage

```bash
>>> :config numbered_prompts on
>>> :config numbered_prompts off
```

### Example

```bash
>>> :config numbered_prompts on
[numbered_prompts = on]

python [1]>>> 1 + 1
2
python [2]>>> x = 42
python [3]>>> x
42
```

The setting persists across restarts via `~/.run_repl_config`.

---

## `_` (Underscore — Last Expression Result)

In languages that support it (currently **Python**), the special variable `_` is set to the result of the last expression. This mirrors Python's interactive interpreter behavior.

### Example

```bash
python>>> 2 + 3
5
python>>> _ * 10
50
```

!!! note "Language Support"
    `_` is set automatically by Python's session evaluator. Other languages do not currently support this feature.

---

## `:? EXPR` — Introspection

Show documentation or source for a name. In **Python sessions**, this runs `help(expr)`. For other languages, introspection prints "not available".

### Usage

```bash
>>> :? <name>
```

### Parameters

- `<name>` — A valid identifier (letters, digits, dots, underscores). E.g. `print`, `os.path`, `str.split`.

### Example

```bash
python>>> :? print
Help on built-in function print in module builtins:

print(*args, sep=' ', end='\n', file=None, flush=False)
    Prints the values to a stream, or to sys.stdout by default.
    ...

javascript>>> :? console
[run] introspection not available for javascript
```

---

## `:debug [CODE]` — Debugger

Run the last snippet (or the provided CODE) under the language's debugger. Currently supported for **Python** (uses `pdb`). Other languages print "Debug not available".

### Usage

```bash
>>> :debug            # Debug last snippet
>>> :debug <code>     # Debug specific code
```

### Example

```bash
python>>> def buggy():
...         x = 1 / 0
python>>> :debug buggy()
> /tmp/run_debug.py(1)<module>()
-> buggy()
(Pdb)
```

```bash
javascript>>> :debug 1+1
[run] Debug not available for javascript
```

!!! tip "Debugger Support Matrix"
    | Language | Debugger | Status |
    |----------|----------|--------|
    | Python | pdb | ✅ Supported |
    | Others | — | ❌ Not available |

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

## Piping Code (Not REPL)

When stdin is piped, `run` executes it as a single script (not an interactive REPL).
REPL commands like `:py` and `:exit` only work in interactive sessions.

```bash
echo -e "x = 10\ny = 20\nprint(x + y)" | run --lang python -
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
