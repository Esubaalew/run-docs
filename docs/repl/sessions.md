# Stateful Sessions

The REPL maintains state across commands, making it perfect for interactive exploration.

## How Sessions Work

When you switch to a language, `run` creates a session that persists:

- Variables
- Functions
- Classes
- Imports/requires
- Global state

This state remains until you:

1. Switch to another language
2. Use `:reset`
3. Exit the REPL

## Session Examples

### Python Session

```bash
>>> :py
python>>> import math

python>>> x = 10

python>>> def double(n):
...     return n * 2

python>>> double(x)
20

python>>> math.pi * x
31.41592653589793
```

All variables and imports persist!

### JavaScript Session

```bash
>>> :js
javascript>>> let data = []

javascript>>> data.push({name: 'Alice'})

javascript>>> data.push({name: 'Bob'})

javascript>>> data
[ { name: 'Alice' }, { name: 'Bob' } ]
```

### Rust Session

```bash
>>> :rust
rust>>> let mut count = 0;

rust>>> count += 1;

rust>>> count += 1;

rust>>> count
2
```

## Session Isolation

Each language has its own session:

```bash
>>> :py
python>>> x = 10

>>> :js
javascript>>> let x = 20

>>> :py
python>>> x
10  # Python's x is preserved

>>> :js
javascript>>> x
20  # JavaScript's x is preserved
```

## Resetting Sessions

Clear all state:

```bash
python>>> x = 100
python>>> y = 200

python>>> :reset
session for 'python' reset

python>>> x
NameError: name 'x' is not defined
```

## Session Persistence

### What Persists

 Variables  
 Functions  
 Classes  
 Imports  
 Global state  

### What Doesn't Persist

 File I/O (files are closed)  
 Network connections  
 External processes  

## Advanced Usage

### Building Complex State

```bash
python>>> # Build a data structure incrementally
python>>> users = []

python>>> users.append({'name': 'Alice', 'age': 30})

python>>> users.append({'name': 'Bob', 'age': 25})

python>>> def find_user(name):
...     return next(u for u in users if u['name'] == name)

python>>> find_user('Alice')
{'name': 'Alice', 'age': 30}
```

### Loading Utilities

```bash
python>>> :load utils.py
# utils.py functions now available

python>>> :load config.py
# config.py variables now available

python>>> # Use them together
python>>> process_data(config.API_KEY)
```

## Next Steps

[Language-Specific Behavior →](language-behavior.md){ .md-button .md-button--primary }
[Commands Reference →](commands.md){ .md-button }
