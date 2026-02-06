---
title: Installation
description: Install Run with WASI 0.2 component support on macOS, Linux, or Windows.
---

# Installation

Run 2.0 features are included when you install Run with the `v2` feature flag.

## Install Run

### From crates.io (recommended)

```bash
cargo install run-kit --features v2
```

### From source

```bash
git clone https://github.com/esubaalew/run.git
cd run
cargo install --path . --features v2
```

### Verify

```bash
run --version
run v2 --help
```

You should see:

```
Run 2.0 (Experimental) - WASI Universal Runtime

COMMANDS:
    init         Initialize a new project
    build        Build all components
    dev          Start development server
    exec         Execute in production mode
    test         Run component tests
    install      Install a WASI component
    publish      Publish component to registry
    deploy       Package and deploy components
    info         Show project/component information
    update       Update dependencies
    verify       Verify lockfile integrity
    clean        Clean build artifacts
    compose      Docker Compose migration
    toolchain    Manage toolchains
```

---

## Required: wasm-tools

`wasm-tools` is the standard WebAssembly toolchain for parsing, validating, and composing components:

```bash
cargo install wasm-tools
```

Verify:

```bash
wasm-tools --version
```

---

## Language-Specific Toolchains

You only need these if you're writing components in that language. **You do NOT need any of these to get started** — the quickstart uses WAT which only requires `wasm-tools`.

| Language | Toolchain | Install |
|----------|-----------|---------|
| Rust | `cargo-component` | `cargo install cargo-component` |
| Python | `componentize-py` | `pip install componentize-py` |
| Go | TinyGo | [tinygo.org/getting-started](https://tinygo.org/getting-started/) |
| JavaScript | `jco` | `npm install -g @bytecodealliance/jco` |
| TypeScript | `jco` | `npm install -g @bytecodealliance/jco` |
| Zig | Zig + wasm-tools | [ziglang.org/download](https://ziglang.org/download/) |

---

## Toolchain Locking

For reproducible builds across machines (CI/CD, team collaboration), lock your toolchain versions:

```bash
run v2 toolchain sync
```

This creates `run.lock.toml` with exact versions:

```toml
[toolchains]
cargo-component = "0.20.0"
wasm-tools = "1.219.1"
```

Commit this file to version control.

---

## Updating

```bash
# Update Run itself
cargo install run-kit --features v2 --force

# Or from source
cd run
git pull
cargo install --path . --features v2 --force
```
