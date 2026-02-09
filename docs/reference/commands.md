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
| `-l, --lang <LANG>` | Force a language (disables auto-detect). |
| `-f, --file <PATH>` | Run a file. |
| `-c, --code <CODE>` | Run inline code. |
| `-w, --watch` | Watch file and re-run on changes. |
| `--bench <N>` | Benchmark code N times (default: 10). |
| `--timeout <SECS>` | Limit execution time (default: 60). |
| `--timing` | Show execution timing for each run. |
| `--check` | Check which toolchains are available. |
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
