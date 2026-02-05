# Commands Reference

All Run 2.0 commands are accessed via the `run v2` subcommand.

## Overview

```bash
run v2 <command> [options]
```

| Command | Description |
|---------|-------------|
| `init` | Initialize a new project |
| `build` | Build WASI components |
| `dev` | Start development server |
| `exec` | Execute component in production mode |
| `test` | Run component tests |
| `install` | Install dependencies |
| `publish` | Publish to registry |
| `deploy` | Deploy to edge/local/registry |
| `info` | Show project information |
| `update` | Update dependencies |
| `verify` | Verify lockfile integrity |
| `clean` | Clean build artifacts |
| `compose` | Docker Compose migration |
| `toolchain` | Manage toolchains |

---

## init

Initialize a new Run 2.0 project.

```bash
run v2 init <name>
```

**Example:**

```bash
run v2 init my-app
```

Creates:

- `run.toml` - Project configuration
- `components/` - Component source directory
- `wit/` - WIT interface definitions

---

## build

Build WASI components defined in `run.toml`.

```bash
run v2 build [options]
```

**Options:**

| Flag | Description |
|------|-------------|
| `--release` | Build with optimizations |
| `--reproducible` | Ensure reproducible builds |
| `--component <name>` | Build only specified component |

**Examples:**

```bash
# Build all components
run v2 build

# Build for production
run v2 build --release

# Build specific component
run v2 build --component api

# Reproducible build for CI
run v2 build --reproducible
```

---

## dev

Start development server with hot reload.

```bash
run v2 dev [options]
```

**Options:**

| Flag | Description |
|------|-------------|
| `--port <port>` | Server port (default: 3000) |
| `--no-hot-reload` | Disable hot reload |
| `--verbose` | Verbose output |

**Examples:**

```bash
# Start dev server
run v2 dev

# Custom port
run v2 dev --port 8080

# Verbose logging
run v2 dev --verbose
```

**Mode differences:**

| Feature | dev | exec |
|---------|-----|------|
| Clock access | Yes | No |
| Hot reload | Yes | No |
| Limits | Relaxed | Enforced |

---

## exec

Execute a component in production mode with strict determinism.

```bash
run v2 exec <target> [options]
```

**Options:**

| Flag | Description |
|------|-------------|
| `--function <name>` | Function to call |
| `--args <values>` | Arguments (JSON format) |
| `--allow-clock` | Allow clock access (breaks determinism) |
| `--allow-random` | Allow random access (breaks determinism) |
| `--json` | JSON output |

**Examples:**

```bash
# Run component's default entry point
run v2 exec my-component.wasm

# Call specific function
run v2 exec my-component --function greet --args '"Alice"'

# Multiple arguments
run v2 exec calculator --function add --args '42' '8'

# JSON output for scripting
run v2 exec api --function handler --json
```

---

## test

Run component tests.

```bash
run v2 test [options]
```

**Options:**

| Flag | Description |
|------|-------------|
| `--component <name>` | Test specific component |
| `--build` | Build before testing |
| `--json` | JSON output |

**Examples:**

```bash
# Run all tests
run v2 test

# Build and test
run v2 test --build

# Test specific component
run v2 test --component api
```

---

## install

Install dependencies from the registry.

```bash
run v2 install [package] [options]
```

**Options:**

| Flag | Description |
|------|-------------|
| `--version <ver>` | Specific version |
| `--dev` | Install as dev dependency |
| `--features <list>` | Enable features |

**Examples:**

```bash
# Install all dependencies from run.toml
run v2 install

# Install specific package
run v2 install wasi:http@0.2.0

# Install as dev dependency
run v2 install test:mock --dev
```

---

## publish

Publish component to the registry.

```bash
run v2 publish [options]
```

**Options:**

| Flag | Description |
|------|-------------|
| `--build` | Build before publishing |
| `--component <name>` | Publish specific component |
| `--registry-url <url>` | Custom registry URL |
| `--token <token>` | Authentication token |

**Authentication:**

Tokens can be provided via (in priority order):

1. `--token` flag
2. `RUN_AUTH_TOKEN` environment variable
3. `[registry] auth_token` in run.toml

**Examples:**

```bash
# Build and publish
run v2 publish --build

# With explicit token
run v2 publish --build --token $MY_TOKEN

# To custom registry
run v2 publish --registry-url https://my-registry.com
```

---

## deploy

Deploy components to various targets.

```bash
run v2 deploy [options]
```

**Options:**

| Flag | Description |
|------|-------------|
| `--target <target>` | Deploy target: `local`, `edge`, `registry` |
| `--profile <name>` | Use deploy profile from run.toml |
| `--provider <name>` | Edge provider (for edge target) |
| `--build` | Build before deploying |
| `--output <dir>` | Output directory (for local) |

**Examples:**

```bash
# Package for local deployment
run v2 deploy --target local

# Deploy to registry (same as publish)
run v2 deploy --target registry --build

# Deploy to Cloudflare Workers
run v2 deploy --target edge --provider cloudflare
```

---

## info

Show project or package information.

```bash
run v2 info [options]
```

**Options:**

| Flag | Description |
|------|-------------|
| `<package>` | Show info for specific package |
| `--components` | List components |
| `--verbose` | Detailed output |

**Examples:**

```bash
# Project info
run v2 info

# With components
run v2 info --components

# Package info from registry
run v2 info wasi:http
```

---

## update

Update dependencies to latest versions.

```bash
run v2 update [package]
```

**Examples:**

```bash
# Update all dependencies
run v2 update

# Update specific package
run v2 update wasi:http
```

---

## verify

Verify component integrity against lockfile.

```bash
run v2 verify [options]
```

**Options:**

| Flag | Description |
|------|-------------|
| `--offline` | Don't fetch missing components |

**Example:**

```bash
run v2 verify
```

---

## clean

Clean build artifacts and cache.

```bash
run v2 clean [options]
```

**Options:**

| Flag | Description |
|------|-------------|
| `--cache` | Also clean cache |

**Examples:**

```bash
# Clean build artifacts
run v2 clean

# Clean everything
run v2 clean --cache
```

---

## compose

Analyze and migrate Docker Compose files.

```bash
run v2 compose <action> <input> [output]
```

**Actions:**

| Action | Description |
|--------|-------------|
| `analyze` | Analyze compose file for WASI candidates |
| `migrate` | Generate run.toml from compose file |

**Examples:**

```bash
# Analyze Docker Compose
run v2 compose analyze docker-compose.yml

# Migrate to run.toml
run v2 compose migrate docker-compose.yml run.toml
```

---

## toolchain

Manage toolchain versions.

```bash
run v2 toolchain <action>
```

**Actions:**

| Action | Description |
|--------|-------------|
| `sync` | Sync toolchain versions to run.lock.toml |

**Example:**

```bash
run v2 toolchain sync
```
