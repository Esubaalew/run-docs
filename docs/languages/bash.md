# Bash

Unix shell and command language for automation

## Overview

Bash (Bourne Again Shell) is the default shell on most Unix-like systems. It's used for scripting, automation, and system administration tasks.

## Language Aliases

```bash
run bash "echo 'Hello'"
run sh "echo 'Hello'"
run shell "echo 'Hello'"
run zsh "echo 'Hello'"
# Output: Hello (x4)
```

## Multi-line Code

!!! tip "Best Practice: Use Heredoc for Multi-line Scripts"
    For multi-line bash scripts, **heredoc is essential**:
    
    ```bash
    # RECOMMENDED
    run bash << 'EOF'
    for i in {1..5}; do
      echo "Number: $i"
    done
    EOF
    
    # OK: Single-line with semicolons
    run bash "for i in 1 2 3; do echo \$i; done"
    ```

## REPL Behavior

Bash's REPL is STATEFUL - variables and functions persist across commands.
