# PHP

Server-side scripting language for web development

## Overview

PHP is a popular server-side scripting language designed for web development. It powers millions of websites and web applications worldwide.

## Language Aliases

```bash
run php "echo 'Hello';"
run php-cli "echo 'Hello';"
# Output: Hello (x2)
```

## Multi-line Code

!!! tip "Best Practice: Use Heredoc"
    For multi-line PHP, **use heredoc**:
    
    ```bash
    # RECOMMENDED
    run php << 'EOF'
    <?php
    $users = ['Alice', 'Bob', 'Charlie'];
    foreach ($users as $user) {
        echo "$user\n";
    }
    EOF
    
    # OK: Single-line
    run php "<?php echo implode(', ', [1,2,3]);"
    ```

## REPL Behavior

PHP's REPL is STATEFUL - variables persist across commands.
