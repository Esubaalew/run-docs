---
title: Commands Reference
description: Complete reference for all Run 2.0 CLI commands — init, build, exec, test, dev, install, publish, deploy, and more.
---

# Commands Reference

All Run 2.0 commands are accessed via `run v2 <command>`.

```bash
run v2 <command> [options]
```

Get help for any command:

```bash
run v2 <command> --help
```

---

## init

Create a new Run 2.0 project with a working starter component.

```bash
run v2 init <name>
```

**What it creates:**

```
<name>/
├── run.toml                # Project config with component + test
├── components/
│   └── hello.wat           # Starter component (increment function)
└── wit/
    └── hello.wit           # WIT interface definition
```

**Example:**

```bash
run v2 init calculator
cd calculator
wasm-tools parse components/hello.wat -o components/hello.wasm
run v2 test    # Verify everything works
```

The starter exports a `greet(s32) -> s32` function that increments its argument. It's intentionally simple — the point is to verify your entire toolchain works before writing real components.

---

## build

Compile source components to WASI 0.2 `.wasm` binaries.

```bash
run v2 build [options]
```

| Flag | Description |
|------|-------------|
| `--release` | Optimize for production |
| `--reproducible` | Deterministic builds (sets `SOURCE_DATE_EPOCH`, strips paths) |
| `--component <name>` | Build only one component |

**Examples:**

```bash
# Build all components
run v2 build

# Production build
run v2 build --release

# Build one component
run v2 build --component api

# CI/CD: reproducible build
run v2 build --reproducible --release
```

**Supported languages:** Rust, Go, Python, JavaScript, TypeScript, Zig

The build command detects the language from `run.toml`, invokes the appropriate toolchain (`cargo-component`, `tinygo`, `componentize-py`, `jco`, `zig`), and validates the output is a valid WASI 0.2 component.

!!! note "Pre-built components"
    If your component uses `path` instead of `source` in `run.toml`, it's already compiled and `build` skips it.

---

## exec

Execute a component in production mode with strict determinism guarantees.

```bash
run v2 exec <target> [options]
```

| Flag | Description |
|------|-------------|
| `--function <name>` | Function to call (required for non-CLI components) |
| `--args <value>` | Argument (repeatable, or comma-separated). Format: `type:value` |
| `--allow-clock` | Allow clock access (breaks determinism) |
| `--allow-random` | Allow random access (breaks determinism) |
| `--json` | Force JSON output |

**Argument format:**

Arguments use typed format: `s32:42`, `u64:100`, `string:hello`, `bool:true`, `f64:3.14`

**Examples:**

```bash
# Run a CLI component (has _start or wasi:cli/run)
run v2 exec my-app.wasm

# Call a specific function
run v2 exec calculator.wasm --function add --args "s32:3" --args "s32:4"
# → {"exit_code":0,"return_value":7}

# Comma-separated args
run v2 exec calculator.wasm --function add --args "s32:3,s32:4"

# JSON output for scripting
run v2 exec api.wasm --function handler --json

# Allow clock (e.g., for timestamp-dependent logic)
run v2 exec app.wasm --allow-clock
```

**Output:**

By default, `exec` returns structured JSON:

```json
{"exit_code": 0, "return_value": 43}
```

For CLI components (those exporting `_start` or `wasi:cli/run`), stdout/stderr are passed through directly.

---

## test

Run component tests defined in `run.toml` or auto-discovered from exports.

```bash
run v2 test [options]
```

| Flag | Description |
|------|-------------|
| `--component <name>` | Test specific component |
| `--build` | Build before testing |

**Defining tests in `run.toml`:**

```toml
[[test]]
component = "calculator"
function = "add"
args = ["s32:2", "s32:3"]
expected = "s32:5"

[[test]]
component = "calculator"
function = "multiply"
args = ["s32:6", "s32:7"]
expected = "s32:42"
```

**Auto-discovery:**

If no tests are defined in `run.toml`, Run automatically discovers and runs any exported functions whose names start with `test_` or `test-`.

**Example output:**

```
Running 3 tests...
  PASS add_basic (add(s32:2, s32:3) → s32:5)
  PASS multiply_basic (multiply(s32:6, s32:7) → s32:42)
  PASS test_edge_case (auto-discovered)

Results: 3 passed, 0 failed
```

---

## dev

Start a development server with hot reload and component composition.

```bash
run v2 dev [options]
```

| Flag | Description |
|------|-------------|
| `--port <port>` | Dev server port (default: 3000) |
| `--no-hot-reload` | Disable file watching |
| `--verbose` | Verbose logging |

**What it does:**

1. Loads all components defined in `run.toml`
2. Loads installed dependencies from `.run/components/`
3. Links components together (cross-component imports resolve automatically)
4. Watches for file changes and rebuilds
5. Serves a status UI on the configured port

**Example:**

```bash
run v2 dev
```

```
[dev] Starting dev session...
[dev] Loaded 3 components
[dev] Resolved 2 dependencies
[dev] Watching for changes...
[dev] Dev server: http://localhost:3000
```

**Dev vs Exec differences:**

| Feature | `dev` | `exec` |
|---------|-------|--------|
| Clock access | Allowed | Blocked (deterministic) |
| Hot reload | Yes | No |
| Resource limits | Relaxed | Enforced |
| Component linking | Automatic | Manual |

---

## install

Install components from the registry.

```bash
run v2 install [package] [options]
```

| Flag | Description |
|------|-------------|
| `--version <ver>` | Specific version |
| `--dev` | Install as dev dependency |

**Examples:**

```bash
# Install all dependencies from run.toml
run v2 install

# Install a specific package
run v2 install wasi:http@0.2.0

# Install as dev dependency
run v2 install test:mock --dev
```

Installed components are cached in `.run/components/` and are automatically available during `run v2 dev` and `run v2 exec`.

---

## publish

Publish a component to the registry.

```bash
run v2 publish [options]
```

| Flag | Description |
|------|-------------|
| `--build` | Build before publishing |
| `--component <name>` | Publish specific component |
| `--registry-url <url>` | Custom registry URL |
| `--token <token>` | Auth token (prefer `RUN_AUTH_TOKEN` env var) |

**Authentication priority:**

1. `--token` CLI flag
2. `RUN_AUTH_TOKEN` environment variable
3. `[registry] auth_token` in `run.toml`

**Example:**

```bash
export RUN_AUTH_TOKEN=your-token
run v2 publish --build
```

---

## deploy

Deploy components to edge platforms or package for distribution.

```bash
run v2 deploy [options]
```

| Flag | Description |
|------|-------------|
| `--target <target>` | `local`, `registry`, or `edge` |
| `--provider <name>` | Edge provider: `cloudflare`, `fastly`, `aws-lambda`, `vercel` |
| `--profile <name>` | Use named profile from `run.toml` |
| `--build` | Build before deploying |
| `--output <dir>` | Output directory (for local target) |

**Examples:**

```bash
# Package locally
run v2 deploy --target local

# Deploy to Cloudflare Workers
run v2 deploy --target edge --provider cloudflare --build

# Use a named profile
run v2 deploy --profile production
```

See [Deployment](deployment.md) for full configuration.

---

## info

Show project or component information.

```bash
run v2 info [target]
```

**Inspect a local `.wasm` file:**

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

**Project info (from `run.toml`):**

```bash
run v2 info
```

**Registry package info:**

```bash
run v2 info wasi:http
```

---

## update

Update dependencies to their latest versions.

```bash
run v2 update [package]
```

```bash
# Update all
run v2 update

# Update one package
run v2 update wasi:http
```

---

## verify

Verify installed component integrity against the lockfile.

```bash
run v2 verify [options]
```

| Flag | Description |
|------|-------------|
| `--offline` | Don't fetch missing components |

Checks SHA256 hashes of all cached components. Use in CI/CD to detect tampering.

```bash
run v2 verify
```

---

## clean

Remove build artifacts and optionally the component cache.

```bash
run v2 clean [options]
```

| Flag | Description |
|------|-------------|
| `--cache` | Also clean `.run/` cache |

```bash
# Clean build output
run v2 clean

# Clean everything (build + cache)
run v2 clean --cache
```

---

## compose

Analyze and migrate Docker Compose files to WASI components.

```bash
run v2 compose <action> <input> [output]
```

| Action | Description |
|--------|-------------|
| `analyze` | Analyze a compose file for WASI migration candidates |
| `migrate` | Generate a `run.toml` from a compose file |

```bash
# See what can be migrated
run v2 compose analyze docker-compose.yml

# Generate run.toml
run v2 compose migrate docker-compose.yml run.toml
```

---

## toolchain

Manage and lock toolchain versions for reproducible builds.

```bash
run v2 toolchain <action>
```

| Action | Description |
|--------|-------------|
| `sync` | Write current toolchain versions to `run.lock.toml` |

```bash
run v2 toolchain sync
```

Creates `run.lock.toml` with exact versions of `cargo-component`, `wasm-tools`, etc. Commit this file to ensure all team members and CI use identical toolchains.
