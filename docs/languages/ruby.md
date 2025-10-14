# Ruby

Dynamic, object-oriented language focused on simplicity and productivity

## Overview

Ruby is an elegant, dynamic programming language with a focus on simplicity and productivity. Known for its readable syntax and powerful metaprogramming capabilities, Ruby is widely used for web development (Ruby on Rails), scripting, and automation.

With run, you can execute Ruby code instantly using the Ruby interpreter. The Ruby engine provides a stateful REPL where variables, methods, and classes persist across commands.

## Language Aliases

```bash
run ruby "puts 'Hello'"
run rb "puts 'Hello'"
run irb "puts 'Hello'"
# Output: Hello (x3)
```

## Basic Usage

### Simple Output

```bash
run ruby "puts 'Hello, World!'"
# Output: Hello, World!
```

### Variables and Interpolation

```bash
run ruby "name = 'Alice'; puts \"Hello, #{name}!\""
# Output: Hello, Alice!
```

### Arrays and Iteration

```bash
run ruby "[1, 2, 3, 4, 5].each { |n| puts n * 2 }"
# Output:
# 2
# 4
# 6
# 8
# 10
```

## Multi-line Code

!!! tip "Best Practice: Use Heredoc"
    For multi-line Ruby code, **use heredoc** to avoid quoting issues:
    
    ```bash
    # RECOMMENDED: Heredoc
    run ruby << 'EOF'
    users = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 }
    ]
    users.each do |user|
      puts "#{user[:name]}: #{user[:age]}"
    end
    EOF
    
    # OK: Single-line with semicolons
    run ruby "arr = [1,2,3]; arr.each { |n| puts n * 2 }"
    ```

## REPL Behavior

Ruby's REPL is STATEFUL - variables and methods persist across commands.
