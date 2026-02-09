# Go

Simple, reliable, and efficient language by Google

## Overview

Go (Golang) is a statically typed, compiled language created by Google. Known for its simplicity, fast compilation, and excellent concurrency support, Go is widely used for backend services, cloud infrastructure, and DevOps tools.

With run, you can compile and execute Go code instantly without setting up Go modules or managing go.mod files. The Go engine compiles your code using the Go compiler and executes the resulting binary.

## Language Aliases

You can invoke Go using these aliases:

```bash
run go "package main; import \"fmt\"; func main() { fmt.Println(\"Hello\") }"
run golang "package main; import \"fmt\"; func main() { fmt.Println(\"Hello\") }"
# Output: Hello (x2)
```

## Basic Usage - Inline Code

Execute Go code directly. Go requires package main and a main function:

### Hello World

```bash
run go "package main; import \"fmt\"; func main() { fmt.Println(\"Hello, World!\") }"
# Output: Hello, World!
```

### Variables and Types

```bash
run go "package main; import \"fmt\"; func main() { x := 42; fmt.Printf(\"x = %d\\n\", x) }"
# Output: x = 42
```

### String Formatting

```bash
run go "package main; import \"fmt\"; func main() { name := \"Alice\"; fmt.Printf(\"Hello, %s!\\n\", name) }"
# Output: Hello, Alice!
```

## Multi-line Code

!!! tip "Best Practice: Use Heredoc for Multi-line Code"
    For multi-line Go code, **use heredoc** to avoid shell quoting and escaping issues:
    
    ```bash
    # RECOMMENDED: Heredoc
    run go << 'EOF'
    package main
    import "fmt"
    
    func main() {
        nums := []int{1, 2, 3, 4, 5}
        sum := 0
        for _, n := range nums {
            sum += n
        }
        fmt.Printf("Sum: %d\n", sum)
    }
    EOF
    
    # OK: Single-line with semicolons
    run go 'package main; import "fmt"; func main() { fmt.Println("Quick test") }'
    
    # AVOID: Multi-line strings (escaping hell)
    ```

## File Execution

Execute Go source files:

```bash
cat > hello.go << 'EOF'
package main

import "fmt"

func main() {
    fmt.Println("Hello from Go file!")
}
EOF

run go hello.go
# Output: Hello from Go file!
```

### Fibonacci Example

```bash
cat > fib.go << 'EOF'
package main

import "fmt"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    for i := 0; i < 10; i++ {
        fmt.Printf("F(%d) = %d\n", i, fibonacci(i))
    }
}
EOF

run go fib.go
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

## REPL Behavior

Go's REPL maintains state across commands. Variables, functions, and imports persist within the same REPL session.

Start the REPL with `run go`, then type commands at the `go>>>` prompt:

```bash
❯ run go
run v0.6.1 — 25+ languages. Type :help for commands.
go>>> x := 42
go>>> fmt.Println(x)
42
go>>>
```

## REPL Mode - Interactive Go

Start an interactive Go REPL with 'run go'. Note that Go's REPL behavior may vary:

```bash
$ run go
run v0.6.1 — 25+ languages. Type :help for commands.
go>>> import "fmt"
go>>> x := 10
go>>> fmt.Println(x)
10
go>>>
```

## Advanced Features

Go's powerful features including goroutines and channels:

### Slices and Maps

```bash
run go "
package main
import \"fmt\"

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    sum := 0
    for _, n := range numbers {
        sum += n
    }
    fmt.Printf(\"Sum: %d\\n\", sum)

    ages := map[string]int{\"Alice\": 30, \"Bob\": 25}
    fmt.Printf(\"Ages: %v\\n\", ages)
}
"
# Output:
# Sum: 15
# Ages: map[Alice:30 Bob:25]
```

### Structs and Methods

```bash
run go "
package main
import \"fmt\"

type Rectangle struct {
    Width, Height int
}

func (r Rectangle) Area() int {
    return r.Width * r.Height
}

func main() {
    rect := Rectangle{Width: 10, Height: 20}
    fmt.Printf(\"Area: %d\\n\", rect.Area())
}
"
# Output: Area: 200
```

### Error Handling

```bash
run go "
package main
import (\"fmt\"; \"errors\")

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New(\"division by zero\")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println(\"Error:\", err)
    } else {
        fmt.Printf(\"Result: %.2f\\n\", result)
    }
}
"
# Output: Result: 5.00
```

## Common Use Cases

- Learning Go syntax and idioms
- Testing concurrent algorithms
- Prototyping backend services
- Quick compilation and execution
- Exploring Go's standard library

## Limitations

- No persistent state between REPL commands
- External packages require go.mod setup
- Each execution requires compilation
- Must include package main and main function
- Goroutines may not work as expected in inline mode
