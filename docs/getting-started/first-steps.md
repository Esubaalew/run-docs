# First Steps

Now that you have `run` installed, let's explore what makes it powerful and versatile.

## Understanding the Command Structure

The basic anatomy of a `run` command:

```bash
run [OPTIONS] [LANGUAGE] [CODE|FILE]
```

### Components

| Component | Description | Required |
|-----------|-------------|----------|
| `OPTIONS` | Flags like `--lang`, `--code` | Optional |
| `LANGUAGE` | Language name or alias | Optional* |
| `CODE\|FILE` | Code string or file path | Required |

*Required if the language can't be auto-detected.

---

## Auto-Detection in Action

`run` can often detect the language automatically:

### From File Extensions

```bash
# These work without specifying --lang
run script.py          # Detected as Python
run main.go            # Detected as Go
run app.js             # Detected as JavaScript
run program.rs         # Detected as Rust
run hello.rb           # Detected as Ruby
```

### From Code Patterns

Distinctive syntax is auto-detected:

```bash
# Rust - unique syntax
run "fn main() { println!(\"hello\"); }"

# Go - package declaration
run "package main; import \"fmt\"; func main() { fmt.Println(\"hello\") }"

# JavaScript - console.log
run "console.log('hello')"
```

!!! warning "Ambiguous Code"
    ```bash
    #  Ambiguous - could be Python, Ruby, Lua, etc.
    run "print('hello')"
    
    #  Explicit - always correct
    run python "print('hello')"
    ```

---

## Working with Files

### Single File Execution

```python title="fibonacci.py"
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

for i in range(10):
    print(f"fib({i}) = {fib(i)}")
```

Run it:

```bash
run fibonacci.py
```

### Scripts with Arguments

`run` passes command-line arguments to your script:

```python title="greet.py"
import sys

if len(sys.argv) > 1:
    name = sys.argv[1]
else:
    name = "World"

print(f"Hello, {name}!")
```

Run with arguments:

```bash
run greet.py Alice
# Output: Hello, Alice!

run greet.py
# Output: Hello, World!
```

---

## Environment Variables

Your scripts have access to environment variables:

```bash
export API_KEY="secret123"
run python "import os; print(f'API Key: {os.getenv(\"API_KEY\")}')"
```

Output:
```
API Key: secret123
```

---

## Working with stdin

### Reading from stdin

```python title="upper.py"
import sys
for line in sys.stdin:
    print(line.upper(), end='')
```

Use it in a pipeline:

```bash
echo "hello world" | run upper.py
# Output: HELLO WORLD

cat file.txt | run upper.py > output.txt
```

### Inline stdin handling

```bash
echo "testing stdin" | run python "
import sys
text = sys.stdin.read()
print(text.upper())
"
```

---

## Complex Data Processing

### JSON Manipulation

```bash
# Create and process JSON
run python "
import json

data = {
    'users': [
        {'name': 'Alice', 'age': 30},
        {'name': 'Bob', 'age': 25}
    ]
}

# Filter users over 26
adults = [u for u in data['users'] if u['age'] > 26]
print(json.dumps(adults, indent=2))
"
```

Output:
```json
[
  {
    "name": "Alice",
    "age": 30
  }
]
```

### Cross-Language Data Flow

```bash
# Python generates data
run python "
import json
print(json.dumps({'numbers': [1,2,3,4,5]}))
" | \
# JavaScript processes it
run js "
const data = JSON.parse(require('fs').readFileSync(0, 'utf8'));
const doubled = data.numbers.map(n => n * 2);
console.log(JSON.stringify({doubled: doubled}));
" | \
# Python presents it
run python "
import sys, json
result = json.load(sys.stdin)
print('Doubled numbers:', result['doubled'])
"
```

Output:
```
Doubled numbers: [2, 4, 6, 8, 10]
```

---

## Quick Prototyping

### Algorithm Testing

Test algorithms across languages:

=== "Python"

    ```bash
    run python "
    def binary_search(arr, target):
        left, right = 0, len(arr) - 1
        while left <= right:
            mid = (left + right) // 2
            if arr[mid] == target:
                return mid
            elif arr[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1
    
    numbers = [1, 3, 5, 7, 9, 11, 13]
    print(f'Index of 7: {binary_search(numbers, 7)}')
    print(f'Index of 6: {binary_search(numbers, 6)}')
    "
    ```

=== "Rust"

    ```bash
    run rust "
    fn binary_search(arr: &[i32], target: i32) -> Option<usize> {
        let mut left = 0;
        let mut right = arr.len() - 1;
        
        while left <= right {
            let mid = (left + right) / 2;
            match arr[mid].cmp(&target) {
                std::cmp::Ordering::Equal => return Some(mid),
                std::cmp::Ordering::Less => left = mid + 1,
                std::cmp::Ordering::Greater => right = mid - 1,
            }
        }
        None
    }
    
    fn main() {
        let numbers = vec![1, 3, 5, 7, 9, 11, 13];
        println!(\"Index of 7: {:?}\", binary_search(&numbers, 7));
        println!(\"Index of 6: {:?}\", binary_search(&numbers, 6));
    }
    "
    ```

### Data Structure Practice

```bash
run python "
from collections import defaultdict

# Build a graph
graph = defaultdict(list)
edges = [(1, 2), (1, 3), (2, 4), (3, 4)]
for u, v in edges:
    graph[u].append(v)

# BFS traversal
def bfs(start):
    visited = set()
    queue = [start]
    result = []
    
    while queue:
        node = queue.pop(0)
        if node not in visited:
            visited.add(node)
            result.append(node)
            queue.extend(graph[node])
    
    return result

print('BFS from 1:', bfs(1))
"
```

---

## Error Handling

Errors are displayed clearly:

```bash
run python "
x = 10 / 0
"
```

Output:
```
Traceback (most recent call last):
  File "<string>", line 2, in <module>
ZeroDivisionError: division by zero
```

---

## Performance Tips

### Compiled Languages

For compiled languages (C, C++, Rust, Go), `run` handles compilation:

```bash
# First run compiles (slower)
time run rust "fn main() { println!(\"hello\"); }"

# Subsequent runs use cached binary (if unchanged)
time run rust "fn main() { println!(\"hello\"); }"
```

### Script Caching

Scripts run in temporary directories, but interpreters cache bytecode:

```bash
# Python generates .pyc files automatically
run script.py  # First run
run script.py  # Faster (cached bytecode)
```

---

## Exploring the REPL

For interactive exploration, the REPL is your friend:

```bash
$ run
>>> :py
python>>> import math
python>>> math.pi
3.141592653589793
python>>> math.sqrt(16)
4.0
```

### Loading Files in REPL

```bash
$ run
>>> :py
python>>> :load my_module.py
# File contents are executed in the current session
python>>> # Now you can use functions defined in my_module.py
```

---

## Best Practices

### 1. Be Explicit When Needed

```bash
#  Good - explicit
run --lang python "print('hello')"

# ⚠ Risky - might auto-detect wrong
run "print('hello')"
```

### 2. Use Heredoc for Multiline Code

```bash
run python << 'EOF'
class Calculator:
    def add(self, a, b):
        return a + b
    
    def multiply(self, a, b):
        return a * b

calc = Calculator()
print("Sum:", calc.add(10, 5))
print("Product:", calc.multiply(10, 5))
EOF
```

### 3. Quote Properly

```bash
#  Good - quotes preserved
run python "print('it\\'s working')"

#  Good - different quote style
run python 'print("it'\''s working")'
```

### 4. Check Language Availability

Before relying on a specific language in scripts:

```bash
# Check if Python is available
if run --lang python "print('ok')" &>/dev/null; then
    echo "Python is available"
else
    echo "Python not found"
fi
```

---

## Common Patterns

### Quick REPL for Language

```bash
# Quick Python REPL
run

>>> :py
python>>> 
```

### One-Off Calculations

```bash
run python "print(hex(255))"  # 0xff
run python "print(bin(42))"   # 0b101010
```

### Format/Lint Check

```bash
# Check JSON validity
echo '{"key": "value"}' | run python "
import sys, json
try:
    json.load(sys.stdin)
    print('Valid JSON')
except:
    print('Invalid JSON')
"
```

### Code Snippets Library

Create a snippets directory:

```bash
mkdir -p ~/run-snippets
echo 'print("Hello from snippet!")' > ~/run-snippets/hello.py

# Use it
run ~/run-snippets/hello.py
```

---

## Next Steps

You're now familiar with the basics! Ready to dive deeper?

[Learn Command Syntax](../guide/command-syntax.md){ .md-button .md-button--primary }
[Explore REPL Mode](../repl/index.md){ .md-button }
[Language-Specific Guides](../languages/index.md){ .md-button }

