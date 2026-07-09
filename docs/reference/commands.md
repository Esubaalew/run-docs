# Command Index

Quick, searchable list of CLI and REPL commands. For full detail and examples, see:

- [CLI Syntax](../guide/command-syntax.md)
- [REPL Commands](../repl/commands.md)

Use the site search (top bar) to jump to any command or flag.

## CLI (run)

| Command / Option | What it does |
|---|---|
| `run` | Start the REPL (interactive mode). |
| `run <lang> <code>` | Run inline code with a language (positional). |
| `run watch <file>` | Watch a file and re-run on changes with a 150ms debounce. |
| `run fmt <file>` | Format a file in place using the standard formatter for its language. |
| `run snippet <lang> <name>` | Print a built-in, curated template to stdout. |
| `run snippet <lang> --list` | List templates available for a language. |
| `run doctor` | Diagnose installed language toolchains and versions. |
| `run cache --stats` | Show persistent build cache usage. |
| `run cache --clear` | Clear all persistent build cache entries. |
| `run cache --clear-lang <LANG>` | Clear cache entries for one language namespace. |
| `run share <file> [--port N]` | Start a local syntax-highlighted file and output viewer. |
| `run alias list` | List built-in and custom language aliases. |
| `run alias add <A> <LANG>` | Add a custom alias (saved to config). |
| `run alias set <A> <LANG>` | Same as `add`. |
| `run alias remove <A>` | Remove a custom alias (`rm`, `delete` also work). |
| `-l, --lang <LANG>` | Force a language (disables auto-detect). |
| `-f, --file <PATH>` | Run a file. |
| `-c, --code <CODE>` | Run inline code. |
| `-w, --watch` | Legacy alias for file watch mode when combined with a file path. |
| `--bench <N>` | Benchmark code N times (default: 10). |
| `--timeout <SECS>` | Limit execution time (`0` = unlimited, exit code 124 on timeout). |
| `--json` | Emit stdout, stderr, exit code, duration, language, and toolchain version as JSON. |
| `--timing` | Show execution timing for each run. |
| `--check` | Compatibility alias for toolchain diagnostics; prefer `run doctor`. |
| `--versions` | Show toolchain versions (optionally per language). |
| `--install <PKG>` | Install a package for a language. |
| `--no-detect` | Disable language auto-detection. |
| `-V, --version` | Print version info and exit. |
| `-h, --help` | Show CLI help. |

## REPL (interactive)

| Command | What it does |
|---|---|
| `:help` | Show help. |
| `:languages` | List available languages. |
| `:versions [id]` | Show toolchain versions. |
| `:lang <id>` | Switch language. |
| `:detect on\|off` | Toggle auto language detection. |
| `:reset` | Clear current session state. |
| `:load <path>` | Execute a file in current language. |
| `:save <path>` | Save session history to a file. |
| `:history [n]` | Show last n entries (default: 25). |
| `:install <pkg>` | Install a package for current language. |
| `:bench [N] <code>` | Benchmark code N times (default: 10). |
| `:type` / `:which` | Show current language and session status. |
| `:reset all` | Reset every active language session and REPL side state. |
| `:exit` / `:quit` | Exit the REPL. |

### Language Shortcuts

Any language id or alias works as a shortcut, e.g. `:py`, `:js`, `:rs`, `:go`, `:cpp`, `:java`.

#### Common Aliases

| Language | Aliases |
|---|---|
| Python | `py`, `py3`, `python3` |
| JavaScript | `js`, `node`, `nodejs` |
| TypeScript | `ts`, `ts-node`, `deno` |
| Rust | `rs` |
| Go | `golang` |
| C# | `cs`, `c#`, `dotnet` |
| C++ | `cpp`, `c++` |

See the Supported Languages page for the full alias list.

## JSON Output

Use `--json` when `run` is part of a script or CI pipeline:

```bash
run --json python -c "print('hello')"
```

```json
{"language":"python","stdout":"hello\n","stderr":"","exit_code":0,"duration_ms":87,"toolchain_version":"Python 3.12.3"}
```

Standard output and standard error are captured separately and never interleaved in the JSON envelope.

## Snippet Templates

`run snippet` is offline and deterministic. It does not call an AI service; it prints a curated template baked into the binary.

```bash
run snippet python --list
run snippet python http-server > server.py
run server.py
```

## Cache Commands

Compiled languages use a toolchain-aware build cache under the platform cache directory.

```bash
run cache --stats
run cache --clear
run cache --clear-lang rust
```

## Format and Share

`run fmt` and `run share` detect language from the file extension across all 25 supported languages (including Kotlin, Swift, Dart, and Elixir). Exit code `2` when no formatter is installed for that language.

Supported formatters: `black`/`autopep8` (Python), `prettier` (JS/TS), `rustfmt`, `gofmt`, `clang-format` (C/C++), `google-java-format` (Java).

## Custom Aliases

See [Custom Aliases](../advanced/aliases.md) for `run alias add`, `run alias remove`, and config file location.
