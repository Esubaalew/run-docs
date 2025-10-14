# REPL Mode

The **REPL** (Read-Eval-Print Loop) is an interactive mode where you can execute code line-by-line, experiment with ideas, and maintain state across commands.

## Starting the REPL

Simply run `run` without arguments. By default, it starts in Python mode:

```bash
$ run
run universal REPL. Type :help for commands.

>>> 
```

You're now in the REPL! Type `:help` to see available commands.

## Quick Example

```bash
$ run
run universal REPL. Type :help for commands.

>>> :py
switched to python

python>>> x = 10

python>>> y = 20

python>>> x + y
30

python>>> def greet(name):
...     return f"Hello, {name}!"

python>>> greet("World")
'Hello, World!'

python>>> :exit
Goodbye!
```

## Key Features

###  Stateful Sessions

Variables and functions persist across commands:

```bash
python>>> items = [1, 2, 3]

python>>> items.append(4)

python>>> items
[1, 2, 3, 4]
```

###  Multi-Language Support

Switch between languages instantly:

```bash
>>> :py
python>>> x = 10

>>> :js
javascript>>> let x = 20

>>> :rust
rust>>> let x = 30;
```

###  Import/Require Persists

Imports and requires stay loaded:

```bash
python>>> import math

python>>> math.pi
3.141592653589793

python>>> math.sqrt(16)
4.0
```

###  Quick Experimentation

Perfect for testing snippets:

```bash
python>>> [x**2 for x in range(10)]
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

## Basic Usage

### Switching Languages

Use the `:lang` command or shortcuts:

```bash
# Full command
>>> :lang python
switched to python

# Or use shortcuts
>>> :py
switched to python

>>> :js
switched to javascript

>>> :rust
switched to rust

>>> :go
switched to go
```

### Available Shortcuts

| Shortcut | Language |
|----------|----------|
| `:py` | Python |
| `:js` | JavaScript |
| `:ts` | TypeScript |
| `:rust` | Rust |
| `:go` | Go |
| `:c` | C |
| `:cpp` | C++ |
| `:java` | Java |
| `:rb` | Ruby |
| `:bash` | Bash |
| `:lua` | Lua |
| `:php` | PHP |

See all shortcuts with `:languages`.

### Listing Supported Languages

```bash
>>> :languages
```

This displays a list of all languages that the run tool supports. Note that this list shows the languages supported by run, not which language runtimes are actually installed on your system.

### Getting Help

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

## Working with State

### Python Example

```bash
python>>> data = {"name": "Alice", "age": 30}

python>>> data["city"] = "Paris"

python>>> data
{'name': 'Alice', 'age': 30, 'city': 'Paris'}

python>>> def process(d):
...     return {k: v for k, v in d.items() if isinstance(v, str)}

python>>> process(data)
{'name': 'Alice', 'city': 'Paris'}
```

### JavaScript Example

```bash
javascript>>> let users = []

javascript>>> users.push({name: 'Alice', age: 30})

javascript>>> users.push({name: 'Bob', age: 25})

javascript>>> users
[ { name: 'Alice', age: 30 }, { name: 'Bob', age: 25 } ]

javascript>>> users.filter(u => u.age > 26)
[ { name: 'Alice', age: 30 } ]
```

### Rust Example

```bash
rust>>> let mut count = 0;

rust>>> count += 1;

rust>>> count
1

rust>>> fn double(x: i32) -> i32 { x * 2 }

rust>>> double(count)
2
```

## Loading Files

Execute a file in your current session:

```python title="helpers.py"
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b
```

```bash
python>>> :load helpers.py

python>>> add(10, 5)
15

python>>> multiply(10, 5)
50
```

The file is executed in the current session, making its functions available.

## Resetting State

Clear the current session:

```bash
python>>> x = 100

python>>> x
100

python>>> :reset
session for 'python' reset

python>>> x
NameError: name 'x' is not defined
```

## Auto-Detection

Control automatic language detection:

```bash
>>> :detect on
auto-detect enabled

>>> print('hello')  # Auto-detects as Python
hello

>>> :detect off
auto-detect disabled

>>> console.log('hello')  # Stays in current language
```

## Multi-Line Input

Some languages support multi-line input:

### Python

```bash
python>>> def fibonacci(n):
...     if n <= 1:
...         return n
...     return fibonacci(n-1) + fibonacci(n-2)

python>>> [fibonacci(i) for i in range(10)]
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

### JavaScript

```bash
javascript>>> function factorial(n) {
...   if (n <= 1) return 1;
...   return n * factorial(n-1);
... }

javascript>>> factorial(5)
120
```

## Expressions vs Statements

### Python

Expressions automatically print their value:

```bash
python>>> 2 + 2
4

python>>> "hello".upper()
'HELLO'

python>>> [1, 2, 3]
[1, 2, 3]
```

Statements don't:

```bash
python>>> x = 10
# No output

python>>> if True:
...     print("yes")
yes
```

### JavaScript

Use the last expression as return value:

```bash
javascript>>> 2 + 2
4

javascript>>> "hello".toUpperCase()
'HELLO'

javascript>>> [1, 2, 3].map(x => x * 2)
[ 2, 4, 6 ]
```

## Practical Examples

### Data Exploration

```bash
python>>> import json
python>>> import urllib.request

python>>> url = "https://api.github.com/repos/Esubaalew/run"
python>>> response = urllib.request.urlopen(url)
python>>> data = json.loads(response.read())

python>>> data['name']
'run'

python>>> data['stargazers_count']
42
```

### Algorithm Testing

```bash
python>>> def bubble_sort(arr):
...     n = len(arr)
...     for i in range(n):
...         for j in range(0, n-i-1):
...             if arr[j] > arr[j+1]:
...                 arr[j], arr[j+1] = arr[j+1], arr[j]
...     return arr

python>>> bubble_sort([64, 34, 25, 12, 22, 11, 90])
[11, 12, 22, 25, 34, 64, 90]
```

### Quick Calculations

```bash
python>>> import statistics

python>>> data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

python>>> statistics.mean(data)
5.5

python>>> statistics.median(data)
5.5

python>>> statistics.stdev(data)
3.0276503540974917
```

### Prototyping APIs

```bash
javascript>>> class User {
...   constructor(name, email) {
...     this.name = name;
...     this.email = email;
...   }
...   greet() {
...     return `Hello, I'm ${this.name}`;
...   }
... }

javascript>>> let user = new User('Alice', 'alice@example.com')

javascript>>> user.greet()
"Hello, I'm Alice"
```

## Tips & Tricks

### 1. Use Tab Completion

Some languages support tab completion (depends on their REPL):

```bash
python>>> import ma<TAB>
# Suggests: math, mailbox, etc.
```

### 2. Check Documentation

```bash
python>>> help(str.split)
# Shows help for split method
```

### 3. Quick Debugging

```bash
python>>> def buggy_function(x):
...     print(f"Debug: x = {x}")
...     return x * 2

python>>> buggy_function(5)
Debug: x = 5
10
```

### 4. Save Snippets

Save useful snippets to files and `:load` them:

```bash
# Save to my_utils.py
python>>> :load my_utils.py
```

### 5. Switch Languages to Compare

```bash
>>> :py
python>>> sorted([3, 1, 4, 1, 5])
[1, 1, 3, 4, 5]

>>> :js
javascript>>> [3, 1, 4, 1, 5].sort((a,b) => a-b)
[ 1, 1, 3, 4, 5 ]

>>> :rust
rust>>> let mut v = vec![3,1,4,1,5]; v.sort(); v
[1, 1, 3, 4, 5]
```

## Exiting the REPL

```bash
>>> :exit
Goodbye!

# Or
>>> :quit
Goodbye!

# Or press Ctrl+D (Unix) or Ctrl+Z (Windows)
```

## Common Issues

### Issue: Changes Not Persisting

**Problem:** Variables disappear between commands.

**Solution:** Make sure you're not switching languages or resetting:

```bash
python>>> x = 10
python>>> :go  # Switch language
go>>> # x is not available here (different language)

python>>> :py  # Back to Python
python>>> x  # But x is gone (new session)
```

### Issue: Syntax Errors

**Problem:** Multi-line input isn't recognized.

**Solution:** Some languages need explicit continuation:

```bash
python>>> def func():
...     # Indentation matters
...     return 42
```

### Issue: Import Not Found

**Problem:** Module import fails.

**Solution:** Ensure the module is installed in the language's environment:

```bash
# Exit REPL and install
$ pip install requests

# Then use in REPL
$ run
>>> :py
python>>> import requests
```

## Advanced Usage

### Scripting the REPL

Pipe commands to the REPL:

```bash
echo -e ":py\nx = 10\nprint(x * 2)\n:exit" | run
```

### Combining with Shell

```bash
$ run
>>> :bash
bash>>> for i in {1..5}; do echo $i; done
1
2
3
4
5
```

### Persisting Session State

State persists within a language session until `:reset` or language change:

```bash
python>>> import sys
python>>> data = [1, 2, 3]
# This state persists

python>>> :rust
# State is saved

python>>> :py
# Back to Python, state is restored
python>>> data
[1, 2, 3]
```

## Next Steps

[REPL Commands →](commands.md){ .md-button .md-button--primary }
[Stateful Sessions →](sessions.md){ .md-button }
[Language-Specific Behavior →](language-behavior.md){ .md-button }

