---
title: Quickstart
description: Build and run your first WASI 0.2 component with Run in under 2 minutes.
---

# Quickstart

Build and run your first WASI component in under 2 minutes.

## Prerequisites

- Run installed with v2 support (`cargo install run-kit --features v2`)
- `wasm-tools` installed (`cargo install wasm-tools`)

## 1. Create a Project

```bash
run v2 init my-app
cd my-app
```

This creates:

```
my-app/
├── run.toml                # Project configuration
├── components/
│   ├── hello.wat           # Starter component (WebAssembly Text)
│   └── hello.wasm          # (will be compiled)
└── wit/
    └── hello.wit           # WIT interface definition
```

The generated `run.toml`:

```toml
[project]
name = "my-app"
version = "0.1.0"

[[component]]
name = "hello"
path = "components/hello.wasm"

[[test]]
component = "hello"
function = "greet"
args = ["s32:42"]
expected = "s32:43"
```

## 2. Build the Starter Component

The starter is a WAT (WebAssembly Text) file — a human-readable format that compiles to `.wasm`:

```bash
wasm-tools parse components/hello.wat -o components/hello.wasm
```

!!! tip "What's in the starter?"
    The generated `hello.wat` exports a `greet` function that takes an `s32` (signed 32-bit integer) and returns it incremented by 1. Simple, but it proves the entire pipeline works.

## 3. Run the Test

```bash
run v2 test
```

```
Running 1 tests...
  PASS greet_42 (greet(s32:42) → s32:43)

Results: 1 passed, 0 failed
```

## 4. Execute the Component

```bash
run v2 exec components/hello.wasm --function greet --args "s32:42"
```

```json
{"exit_code":0,"return_value":43}
```

Call with different arguments:

```bash
run v2 exec components/hello.wasm --function greet --args "s32:100"
```

```json
{"exit_code":0,"return_value":101}
```

## 5. Start the Dev Server

```bash
run v2 dev
```

```
[dev] Starting dev session...
[dev] 1 component ready
[dev] Watching for changes...
```

The dev server watches for file changes and rebuilds automatically. Press `Ctrl+C` to stop.

## 6. Inspect the Component

```bash
run v2 info components/hello.wasm
```

```
Component: components/hello.wasm
  Type: component
  Size: 68 bytes
  Exports:
    - greet: func(s32) -> s32
```

---

## What Just Happened?

You just:

1. **Created** a WASI 0.2 component from a WAT source file
2. **Tested** it with automated assertions
3. **Executed** it in a sandboxed Wasmtime runtime with strict determinism
4. **Inspected** its interface (exports, types)
5. **Started** a dev server with hot reload

The component runs identically on macOS, Linux, and Windows. No Docker. No VM. No platform-specific binaries.

---

## Next: Write a Real Component

The starter uses WAT for simplicity. For real applications, write components in your preferred language:

=== "Rust"

    ```bash
    cargo install cargo-component
    ```
    
    Define your component in `run.toml`:
    
    ```toml
    [[component]]
    name = "api"
    source = "src/lib.rs"
    language = "rust"
    wit = "wit/api.wit"
    ```
    
    ```bash
    run v2 build
    ```

=== "Go"

    Requires `tinygo` installed:
    
    ```toml
    [[component]]
    name = "handler"
    source = "main.go"
    language = "go"
    wit = "wit/handler.wit"
    ```
    
    ```bash
    run v2 build
    ```

=== "Python"

    ```bash
    pip install componentize-py
    ```
    
    ```toml
    [[component]]
    name = "processor"
    source = "app.py"
    language = "python"
    wit = "wit/processor.wit"
    ```
    
    ```bash
    run v2 build
    ```

=== "JavaScript/TypeScript"

    ```bash
    npm install -g @bytecodealliance/jco
    ```
    
    ```toml
    [[component]]
    name = "worker"
    source = "index.js"
    language = "javascript"
    wit = "wit/worker.wit"
    ```
    
    ```bash
    run v2 build
    ```

=== "Zig"

    ```toml
    [[component]]
    name = "compute"
    source = "main.zig"
    language = "zig"
    wit = "wit/compute.wit"
    ```
    
    ```bash
    run v2 build
    ```

---

## Next: Publish to Registry

Once your component works, share it:

```bash
# Set your auth token
export RUN_AUTH_TOKEN=your-token

# Build and publish
run v2 publish --build
```

Others can install it:

```bash
run v2 install yourname:my-app
```

---

## Next Steps

- **[Commands](commands.md)** — Full reference for all `run v2` commands
- **[Configuration](configuration.md)** — Complete `run.toml` reference
- **[Registry](registry.md)** — Publish and install components
- **[Deployment](deployment.md)** — Deploy to edge platforms
