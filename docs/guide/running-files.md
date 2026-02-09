# Running Files

Learn how to execute script files with `run`.

## Basic File Execution

Simply provide the file path:

```bash
run script.py
run main.go
run app.js
run hello.rs
```

`run` automatically detects the language from the file extension.

## Auto-Detection

Supported file extensions:

| Extension | Language |
|-----------|----------|
| `.py` | Python |
| `.js` | JavaScript |
| `.ts` | TypeScript |
| `.rs` | Rust |
| `.go` | Go |
| `.c` | C |
| `.cpp`, `.cc`, `.cxx` | C++ |
| `.java` | Java |
| `.cs` | C# |
| `.rb` | Ruby |
| `.sh` | Bash |
| `.php` | PHP |
| `.lua` | Lua |
| `.pl` | Perl |
| `.swift` | Swift |
| `.kt` | Kotlin |
| `.dart` | Dart |
| `.r` | R |
| `.hs` | Haskell |
| `.ex`, `.exs` | Elixir |
| `.jl` | Julia |

## Passing Arguments

Arguments after the filename are passed to your script:

```bash
run script.py arg1 arg2 arg3
```

Your script receives them normally:

```python
# script.py
import sys
print(f"Arguments: {sys.argv[1:]}")
```

## Overriding Language Detection

Force a specific language:

```bash
# Treat .txt as Python
run --lang python script.txt

# Run extensionless file as Bash
run --lang bash my_script
```

## Working Directory

Scripts execute in the current working directory (where you run `run`), not the script’s directory:

```python
# script.py in /home/user/project/
import os
print(os.getcwd())  # /home/user
```

If you need the script’s directory as the working directory, `cd` first (or use a subshell):

```bash
cd /home/user/project
run script.py

# or
(cd /home/user/project && run script.py)
```

## Next Steps

[Piping Data →](piping-data.md){ .md-button .md-button--primary }
[Language Detection →](language-detection.md){ .md-button }
