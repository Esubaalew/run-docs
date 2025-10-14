# C#

Modern, object-oriented language for .NET

## Overview

C# is a modern, type-safe language developed by Microsoft for the .NET platform. It's used for desktop applications, web services, games (Unity), and more.

## Language Aliases

```bash
run csharp "Console.WriteLine(\"Hello\");"
run cs "Console.WriteLine(\"Hello\");"
run dotnet "Console.WriteLine(\"Hello\");"
# Output: Hello (x3)
```

!!! tip "Multi-line Code: Use Heredoc"
    For multi-line code, **use heredoc** (`<< 'EOF'`) to avoid shell quoting and escaping issues.

## REPL Behavior

C#'s REPL maintains state across commands. Variables, classes, and methods persist within the same REPL session.
