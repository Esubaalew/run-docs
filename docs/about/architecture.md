# Architecture

Understanding how `run` works under the hood.

## High-Level Overview

```
┌──────────────┐
│   CLI Input  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Parser    │  Parse args & code
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Detector   │  Detect language
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Engine     │  Select engine
│   Selector   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Language    │  Execute code
│  Engine      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Output     │  Return result
└──────────────┘
```

## Components

### CLI Interface

Handles command-line argument parsing using `clap`.

### Language Detector

Analyzes code patterns or file extensions to determine the language.

### Engine Selector

Chooses the appropriate language engine based on detection.

### Language Engines

Each language has its own engine implementing:

```rust
trait LanguageEngine {
    fn execute(&self, code: &str) -> Result<Output>;
    fn detect(&self, code: &str) -> bool;
    fn is_available(&self) -> bool;
}
```

### REPL Manager

Maintains session state for interactive mode.

## Execution Flow

1. Parse CLI arguments
2. Detect language (if not explicit)
3. Check if language toolchain is available
4. Create temporary workspace (if needed)
5. Execute code through language engine
6. Capture and format output
7. Clean up temporary files

## More Details

For complete implementation details, see the [source code](https://github.com/Esubaalew/run).

## Next Steps

[Why Rust? →](why-rust.md){ .md-button .md-button--primary }
[Contributing →](contributing.md){ .md-button }
