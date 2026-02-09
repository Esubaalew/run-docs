# Groovy

Dynamic JVM language with concise syntax and powerful scripting capabilities

## Overview

Groovy is a powerful, optionally typed dynamic language for the Java Virtual Machine (JVM). It combines the best features of Java with scripting language flexibility, making it ideal for rapid development, testing, and automation.

With run, you can execute Groovy code instantly using the Groovy interpreter. Groovy provides seamless Java interoperability, allowing you to use any Java library while enjoying a more concise and expressive syntax.

## Language Aliases

You can invoke Groovy using any of these aliases:

```bash
run groovy "println 'Hello'"
run grv "println 'Hello'"
run groovysh "println 'Hello'"
# Output: Hello (x3)
```

!!! tip "Multi-line Code: Use Heredoc"
    For multi-line code, **use heredoc** (`<< 'EOF'`) to avoid shell quoting and escaping issues.

## Basic Usage - Inline Code

Execute Groovy code directly from the command line. Groovy's concise syntax makes it perfect for quick scripts:

### Simple Print Statement

```bash
run groovy "println 'Hello, World!'"
# Output: Hello, World!
```

### Variables and String Interpolation

```bash
run groovy "def name = 'Alice'; println \"Hello, \$name!\""
# Output: Hello, Alice!
```

### Arithmetic Operations

```bash
run groovy "println 2 + 2"
run groovy "println 10 * 5"
run groovy "println 100 / 3"
# Output:
# 4
# 50
# 33.333333
```

### Collections

```bash
run groovy "def nums = [1, 2, 3, 4, 5]; println nums.collect { it * 2 }"
# Output: [2, 4, 6, 8, 10]
```

### Closures

```bash
run groovy "def square = { x -> x * x }; println square(7)"
# Output: 49
```

## File Execution

Execute Groovy scripts from files. run will automatically detect .groovy files or you can specify the language explicitly:

```bash
echo "println 'Hello from file!'" > hello.groovy
run groovy hello.groovy
run hello.groovy
# Output: Hello from file!
```

### Script with Classes

```bash
cat > person.groovy << 'EOF'
class Person {
    String name
    int age
    
    void introduce() {
        println "Hi, I'm ${name} and I'm ${age} years old."
    }
}

def person = new Person(name: 'Alice', age: 30)
person.introduce()
EOF

run groovy person.groovy
# Output: Hi, I'm Alice and I'm 30 years old.
```

## Important: Shell Variable Expansion

When piping Groovy code via here-documents, always quote the delimiter (<<'EOF') to prevent the shell from expanding $variables before Groovy sees them.

Without quoting, shells like Bash will interpret Groovy's string interpolation syntax as shell variables, causing your code to break.

### Problem - Unquoted Delimiter

```bash
cat <<EOF | run groovy
def name = "Esubalew"
println "Hello, \$name!"
EOF
# Output: Hello, !  # Variable was erased by shell!
```

### Solution - Quoted Delimiter

```bash
cat <<'EOF' | run groovy
def name = "Esubalew"
println "Hello, \$name!"
EOF
# Output: Hello, Esubalew!
```

## REPL Mode - Interactive Groovy

Start an interactive Groovy REPL by running 'run groovy' without any code. The Groovy REPL is STATEFUL, meaning variables, functions, and classes persist across commands within the same session.

```bash
$ run groovy
run v0.6.1 — 25+ languages. Type :help for commands.
groovy>>> def x = 10
groovy>>> def y = 20
groovy>>> println x + y
30
groovy>>> def greet = { name -> "Hello, ${name}!" }
groovy>>> println greet('World')
Hello, World!
groovy>>> def nums = [1, 2, 3, 4, 5]
groovy>>> println nums.sum()
15
```

## REPL Behavior - Stateful

The Groovy engine maintains state across commands:

- Variables defined in one command are available in subsequent commands
- Functions and closures persist throughout the session
- Classes and objects remain active for the entire session
- State is maintained within a single REPL session (started with 'run groovy')
- Each separate 'run groovy "code"' command starts fresh

## Java Interoperability

Groovy runs on the JVM and provides seamless access to Java classes and libraries:

### Using Java Collections

```bash
run groovy "
import java.util.*

def list = new ArrayList()
list.add('Apple')
list.add('Banana')
list.add('Cherry')

list.each { println it }
"
# Output:
# Apple
# Banana
# Cherry
```

### Java Date and Time

```bash
run groovy "
import java.time.*

def now = LocalDateTime.now()
println \"Current time: \${now}\"

def tomorrow = now.plusDays(1)
println \"Tomorrow: \${tomorrow.toLocalDate()}\"
"
# Output:
# Current time: 2025-02-10T14:30:45.123
# Tomorrow: 2025-02-11
```

### File Operations

```bash
run groovy "
import java.io.File

def file = new File('.')
def files = file.listFiles()
println \"Found \${files.length} files\"
files.take(5).each { println \"  - \${it.name}\" }
"
# Output:
# Found 12 files
#   - README.md
#   - src
#   - Cargo.toml
#   - target
#   - .git
```

## Advanced Groovy Features

Groovy provides powerful features that make scripting and development more productive:

### List and Map Operations

```bash
run groovy "
def numbers = [1, 2, 3, 4, 5]
def doubled = numbers.collect { it * 2 }
def evens = numbers.findAll { it % 2 == 0 }

println \"Doubled: \${doubled}\"
println \"Evens: \${evens}\"

def person = [name: 'Bob', age: 25, city: 'NYC']
person.each { key, value -> println \"\${key}: \${value}\" }
"
# Output:
# Doubled: [2, 4, 6, 8, 10]
# Evens: [2, 4]
# name: Bob
# age: 25
# city: NYC
```

### Range Operations

```bash
run groovy "
def range = 1..10
println \"Range: \${range}\"
println \"Sum: \${range.sum()}\"

(1..5).each { println \"Number: \${it}\" }
"
# Output:
# Range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# Sum: 55
# Number: 1
# Number: 2
# Number: 3
# Number: 4
# Number: 5
```

### String Methods

```bash
run groovy "
def text = 'Hello, Groovy World!'
println text.toUpperCase()
println text.toLowerCase()
println text.reverse()
println text.contains('Groovy')
println text.split(',')
"
# Output:
# HELLO, GROOVY WORLD!
# hello, groovy world!
# !dlroW yvoorG ,olleH
# true
# [Hello,  Groovy World!]
```

### Regular Expressions

```bash
run groovy "
def text = 'Contact us at support@example.com or sales@example.com'
def emails = text.findAll(/[\\w.-]+@[\\w.-]+/)
println \"Found \${emails.size()} emails:\"
emails.each { println \"  - \${it}\" }
"
# Output:
# Found 2 emails:
#   - support@example.com
#   - sales@example.com
```

### Safe Navigation Operator

```bash
run groovy "
def person = [name: 'Alice', address: null]
println person?.name
println person?.address?.street  // No NullPointerException!
println person?.address?.street ?: 'No address'
"
# Output:
# Alice
# null
# No address
```

## Groovy for Testing

Groovy's concise syntax makes it excellent for writing tests and assertions:

### Simple Assertions

```bash
run groovy "
def add = { a, b -> a + b }

assert add(2, 3) == 5
assert add(10, 20) == 30
assert add(-5, 5) == 0

println 'All tests passed!'
"
# Output: All tests passed!
```

### Collection Assertions

```bash
run groovy "
def numbers = [1, 2, 3, 4, 5]

assert numbers.size() == 5
assert numbers.contains(3)
assert numbers.every { it > 0 }
assert numbers.any { it % 2 == 0 }

println 'Collection tests passed!'
"
# Output: Collection tests passed!
```

## Common Use Cases

- Rapid prototyping and scripting on the JVM
- Build automation with Gradle
- Testing and test automation
- Data processing and transformation
- Jenkins pipeline scripts
- Quick Java library testing
- System administration tasks
- DSL (Domain-Specific Language) creation
- Web development with Grails framework

## Error Handling

run displays Groovy errors clearly with stack traces:

```bash
run groovy "println 'missing quote"
# Output: SyntaxError: unexpected token

run groovy "def x = 10 / 0"
# Output: ArithmeticException: Division by zero

run groovy "println undefinedVariable"
# Output: MissingPropertyException: No such property: undefinedVariable
```

## Troubleshooting

If you encounter issues with Groovy in run:

- Ensure Groovy is installed: `groovy --version`
- Check that Groovy is in your system PATH
- For Java library imports, ensure the JARs are in the classpath
- Always quote here-document delimiters (<<'EOF') to prevent shell expansion
- Use proper Groovy syntax - semicolons are optional but can help clarity
- If REPL state seems corrupted, use :reset to clear the session

## Limitations

- External Groovy libraries (Grapes) require separate installation
- Some IDE-specific features may not be available
- Compilation time may be slower than pure Java
- Large scripts may require JVM tuning for optimal performance

