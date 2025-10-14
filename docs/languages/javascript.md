# JavaScript

Dynamic, high-level programming language for web and server-side development

## Overview

JavaScript is the language of the web, powering interactive websites and modern web applications. With run, you can execute JavaScript code using Node.js without setting up npm projects or managing package.json files.

The JavaScript engine in run uses Node.js as the runtime, providing access to all Node.js built-in modules and APIs. The REPL mode is stateful, meaning variables and functions persist across commands within the same session.

## Language Aliases

You can invoke JavaScript using any of these aliases:

```bash
run javascript "console.log('Hello')"
run js "console.log('Hello')"
run node "console.log('Hello')"
run nodejs "console.log('Hello')"
# Output: Hello (x4)
```

## Basic Usage - Inline Code

Execute JavaScript code directly from the command line:

### Simple Console Log

```bash
run js "console.log('Hello, World!')"
# Output: Hello, World!
```

### Arithmetic and Variables

```bash
run js "const x = 10; const y = 20; console.log(x + y)"
# Output: 30
```

### Template Literals

```bash
run js "const name = 'Alice'; console.log(\`Hello, \${name}!\`)"
# Output: Hello, Alice!
```

### Arrow Functions

```bash
run js "const square = x => x * x; console.log(square(5))"
# Output: 25
```

### Array Methods

```bash
run js "const nums = [1,2,3,4,5]; console.log(nums.map(x => x * 2))"
# Output: [ 2, 4, 6, 8, 10 ]
```

## Multi-line Code

!!! tip "Best Practice: Use Heredoc"
    For multi-line JavaScript code, **always use heredoc** to avoid shell quoting issues:
    
    ```bash
    # RECOMMENDED: Heredoc
    run js << 'EOF'
    const users = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 }
    ];
    users.forEach(u => console.log(`${u.name}: ${u.age}`));
    EOF
    
    # OK: Single-line with semicolons
    run js "const x = [1,2,3]; x.forEach(n => console.log(n * 2));"
    
    # AVOID: Multi-line strings (quote/escaping issues)
    run js "
    const users = [{name: 'Alice'}];
    console.log(users);
    "
    ```

## File Execution

Execute JavaScript files with Node.js:

```bash
# Create a JavaScript file
echo "console.log('Hello from file!')" > hello.js

# Execute with language specified
run js hello.js

# Or let run auto-detect from extension
run hello.js
# Output: Hello from file!
```

### Module Example

```bash
# Create a module file
cat > math.js << 'EOF'
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

for (let i = 0; i <= 10; i++) {
  console.log(`${i}! = ${factorial(i)}`);
}
EOF

run js math.js
# Output:
# 0! = 1
# 1! = 1
# 2! = 2
# 3! = 6
# 4! = 24
# 5! = 120
# 6! = 720
# 7! = 5040
# 8! = 40320
# 9! = 362880
# 10! = 3628800
```

## REPL Mode - Interactive JavaScript

Start an interactive JavaScript REPL with 'run js'. The REPL is stateful within the session - variables and functions persist across commands at the js>>> prompt:

```bash
$ run js
run universal REPL. Type :help for commands.
js>>> let x = 10
undefined
js>>> let y = 20
undefined
js>>> x + y
30
js>>> const greet = name => `Hello, ${name}!`
undefined
js>>> greet('World')
'Hello, World!'
js>>> const numbers = [1, 2, 3, 4, 5]
undefined
js>>> numbers.reduce((a, b) => a + b, 0)
15
```

## REPL Behavior - Stateful

JavaScript's REPL is STATEFUL within a single session:

- Start REPL once with 'run js'
- Variables and functions persist at the js>>> prompt
- Each separate 'run js "code"' command is independent

## Node.js Built-in Modules

Access all Node.js built-in modules without installation:

### File System Operations

```bash
run js "
const fs = require('fs');
const files = fs.readdirSync('.');
console.log(\`Found \${files.length} files\`);
files.slice(0, 5).forEach(f => console.log(\`  - \${f}\`));
"
# Output:
# Found 12 files
#   - README.md
#   - src
#   - Cargo.toml
#   - target
#   - .git
```

### Path Operations

```bash
run js "
const path = require('path');
const file = '/home/user/documents/file.txt';
console.log('Directory:', path.dirname(file));
console.log('Filename:', path.basename(file));
console.log('Extension:', path.extname(file));
"
# Output:
# Directory: /home/user/documents
# Filename: file.txt
# Extension: .txt
```

### OS Information

```bash
run js "
const os = require('os');
console.log('Platform:', os.platform());
console.log('CPU Cores:', os.cpus().length);
console.log('Total Memory:', Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB');
"
# Output:
# Platform: linux
# CPU Cores: 8
# Total Memory: 16 GB
```

## Modern JavaScript Features

Use ES6+ features including async/await, destructuring, and more:

### Async/Await

```bash
run js "
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  console.log('Starting...');
  await delay(1000);
  console.log('Done after 1 second!');
})();
"
# Output:
# Starting...
# Done after 1 second!
```

### Destructuring

```bash
run js "
const person = { name: 'Alice', age: 30, city: 'NYC' };
const { name, age } = person;
console.log(\`\${name} is \${age} years old\`);
"
# Output: Alice is 30 years old
```

### Spread Operator

```bash
run js "
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined);
"
# Output: [ 1, 2, 3, 4, 5, 6 ]
```

## Common Use Cases

- Quick JavaScript prototyping and testing
- Node.js script development
- JSON data processing and manipulation
- File system operations and automation
- Testing algorithms and data structures
- Learning modern JavaScript features
- API testing and HTTP requests
- String manipulation and parsing

## Limitations

- External npm packages must be installed separately
- No automatic package.json or node_modules management
- Browser-specific APIs (DOM, window) are not available
- Some async operations may require explicit handling
