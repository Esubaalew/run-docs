# Overview - Universal Multi-Language Runner

run is a universal multi-language runner and smart REPL (Read-Eval-Print Loop) written in Rust. It provides a unified interface for executing code across 25 programming languages without the hassle of managing multiple compilers, interpreters, or build tools.

## What is run?

Whether you're a beginner learning your first programming language or an experienced polyglot developer, run streamlines your workflow by providing consistent commands and behavior across all supported languages.

## Who is this for?

- **Beginners**: Learn programming without worrying about complex setup procedures. Just install run and start coding in any language.
- **Students**: Quickly test code snippets and experiment with different programming paradigms across multiple languages.
- **Developers**: Prototype ideas rapidly, test algorithms, and switch between languages seamlessly without context switching.
- **DevOps Engineers**: Write and test automation scripts in various languages from a single tool.
- **Educators**: Teach programming concepts across multiple languages with a consistent interface.

## Why was run created?

Traditional development workflows require installing and configuring separate tools for each programming language. This creates several problems:

- **Time-consuming setup**: Installing compilers, interpreters, package managers, and configuring environments for each language.
- **Inconsistent interfaces**: Each language has different commands and flags for compilation and execution.
- **Cognitive overhead**: Remembering different commands and workflows for each language.
- **Barrier to entry**: Beginners struggle with setup before writing their first line of code.

run solves these problems by providing a single, unified interface that handles all the complexity behind the scenes. You focus on writing code, and run takes care of the rest.

## Why Rust?

run is built with Rust for several compelling reasons:

- **Performance**: Rust's zero-cost abstractions and efficient memory management ensure run starts instantly and executes with minimal overhead.
- **Reliability**: Rust's strong type system and ownership model prevent common bugs like null pointer dereferences and data races, making run stable and crash-resistant.
- **Cross-platform**: Rust compiles to native code for Windows, macOS, and Linux, providing consistent behavior across all platforms.
- **Memory safety**: No garbage collector means predictable performance without unexpected pauses.
- **Modern tooling**: Cargo (Rust's package manager) makes building and distributing run straightforward.
- **Future-proof**: Rust's growing ecosystem and industry adoption ensure long-term maintainability.

## How it works

`run` shells out to real toolchains under the hood. Each `LanguageEngine` implements a small trait that knows how to:

1. Detect whether the toolchain is available (e.g. `python3`, `go`, `rustc`).
2. Prepare a temporary workspace (compilation for compiled languages, transient scripts for interpreters).
3. Execute snippets, files, or stdin streams and surface stdout/stderr consistently.
4. Manage session state for the interactive REPL (persistent modules, stateful scripts, or regenerated translation units).

This architecture keeps the core lightweight while making it easy to add new runtimes or swap implementations.

## Supported Languages

run supports 25+ languages across multiple categories:

| Category | Languages & aliases |
| --- | --- |
| **Scripting & shells** | Bash (`bash`), Python (`py`, `python`), Ruby (`rb`, `ruby`), PHP (`php`), Perl (`perl`), Groovy (`groovy`, `grv`), Lua (`lua`), R (`r`), Elixir (`ex`, `elixir`) |
| **Web & typed scripting** | JavaScript (`js`, `node`), TypeScript (`ts`, `deno`), Dart (`dart`), Kotlin (`kt`, `kotlin`) |
| **Systems & compiled** | C (`c`), C++ (`cpp`, `cxx`), Rust (`rs`, `rust`), Go (`go`), Swift (`swift`), Zig (`zig`), Nim (`nim`), Haskell (`hs`, `haskell`), Crystal (`cr`, `crystal`), C# (`cs`, `csharp`), Java (`java`), Julia (`jl`, `julia`) |

## Key Features

- **25+ Programming Languages**: Execute code in Python, JavaScript, Rust, Go, C, C++, and 19 more languages
- **Unified Command Interface**: One consistent command for all languages
- **Flexible Command Syntax**: `--lang` flag is optional, with automatic language detection
- **Inline Code Execution**: Run code snippets directly from the command line
- **File-based Execution**: Execute script files with automatic language detection
- **Piped Input Support**: Process stdin data in any language
- **Interactive REPL Mode**: Stateful sessions with persistent variables and functions
- **Language Switching**: Switch between languages on the fly in REPL mode
- **Variable Persistence**: Variables and functions persist per language session
- **Main Function Auto-wrapping**: Compiled languages work with or without main functions
- **Cross-platform Support**: Works on Windows, macOS, and Linux
- **Zero Configuration**: No setup files or configuration needed
- **Fast Startup**: Written in Rust for instant execution
- **Minimal Memory Footprint**: Efficient resource usage

## Next Steps

Explore the documentation to learn more about using run:

- **[Installation](../getting-started/installation.md)**: Get run installed on your system
- **[Quickstart](../getting-started/quickstart.md)**: Start using run in minutes
- **[Command Syntax](command-syntax.md)**: Learn all the ways to invoke run
- **[Language Detection](language-detection.md)**: Understand how run detects languages
- **[REPL Mode](../repl/index.md)**: Master the interactive REPL
- **[Supported Languages](../languages/index.md)**: Browse language-specific guides
