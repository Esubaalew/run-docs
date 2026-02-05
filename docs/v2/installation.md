# Installation

Run 2.0 features are included when you install with the `v2` feature flag.

## From crates.io

```bash
cargo install run-kit --features v2
```

## From Source

```bash
git clone https://github.com/Esubaalew/run.git
cd run
cargo install --path . --features v2
```

## Verify Installation

```bash
# Check version
run --version

# Check v2 commands
run v2 --help
```

You should see output like:

```
Run 2.0 (Experimental) - WASI Universal Runtime

USAGE:
    run v2 <COMMAND> [OPTIONS]

COMMANDS:
    dev          Start development server (clock allowed, hot reload)
    exec         Execute in production mode (strict determinism)
    install      Install a WASI component
    build        Build all components
    test         Run component tests
    deploy       Package and deploy components
    publish      Publish component to registry
    init         Initialize a new project
    ...
```

## Prerequisites

Run 2.0 builds WASI components, which may require additional toolchains depending on the source language:

| Language | Toolchain Required |
|----------|-------------------|
| Rust | `cargo-component` |
| Python | `componentize-py` |
| Go | `go` + `tinygo` |
| JavaScript/TypeScript | `jco` |

Install the Rust toolchain:

```bash
# Install cargo-component for Rust WASI components
cargo install cargo-component
```

## Toolchain Synchronization

Run 2.0 can lock toolchain versions for reproducible builds:

```bash
# Generate run.lock.toml with current toolchain versions
run v2 toolchain sync
```

This creates a `run.lock.toml` file that ensures consistent builds across machines.
