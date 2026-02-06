# Configuration

Run 2.0 projects are configured via `run.toml`.

## Basic Structure

```toml
[project]
name = "my-app"
version = "1.0.0"
description = "My WASI application"
authors = ["Your Name <you@example.com>"]
license = "MIT"
repository = "https://github.com/you/my-app"

[[component]]
name = "api"
source = "src/api/lib.rs"
language = "rust"
wit = "wit/api.wit"

[[component]]
name = "worker"
source = "src/worker/lib.rs"
language = "rust"
wit = "wit/worker.wit"

[dependencies]
"wasi:http" = "0.2.0"

[dev_dependencies]
"test:mock" = "1.0.0"

[build]
output_dir = "target/wasm"
opt_level = "release"

[registry]
url = "https://registry.esubalew.dev"

[dev]
watch = ["src/**/*.rs", "wit/**/*.wit"]
hot_reload = true
```

---

## Sections

### [project]

Project metadata.

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Project name (required) |
| `version` | string | Semantic version (required) |
| `description` | string | Short description |
| `authors` | array | Author list |
| `license` | string | SPDX license identifier |
| `repository` | string | Repository URL |

```toml
[project]
name = "my-app"
version = "1.0.0"
description = "A fast WASI microservice"
authors = ["Alice <alice@example.com>"]
license = "Apache-2.0"
repository = "https://github.com/alice/my-app"
```

---

### [[component]]

Define components (can have multiple).

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Component name (required) |
| `source` | string | Source file path |
| `path` | string | Pre-built WASM path |
| `language` | string | Source language |
| `wit` | string | WIT interface file |
| `capabilities` | array | Required capabilities |
| `enabled` | bool | Enable/disable component |

**Source-based component:**

```toml
[[component]]
name = "api"
source = "src/api/lib.rs"
language = "rust"
wit = "wit/api.wit"
capabilities = ["http-client", "clock"]
```

**Pre-built component:**

```toml
[[component]]
name = "legacy"
path = "vendor/legacy.wasm"
```

**Supported languages:**

- `rust` — via `cargo-component`
- `python` — via `componentize-py`
- `go` — via TinyGo + `wasm-tools`
- `javascript` — via `jco`
- `typescript` — via `jco`
- `zig` — via Zig + `wasm-tools`

---

### [dependencies]

Runtime dependencies from the registry.

```toml
[dependencies]
"wasi:http" = "0.2.0"
"wasi:logging" = "0.1.0"
"myorg:utils" = { version = "1.0.0", features = ["json"] }
```

**Dependency formats:**

```toml
# Simple version
"package:name" = "1.0.0"

# With features
"package:name" = { version = "1.0.0", features = ["feature1"] }

# From git
"package:name" = { git = "https://github.com/org/repo" }

# Local path
"package:name" = { path = "../local-package" }
```

---

### [dev_dependencies]

Development-only dependencies.

```toml
[dev_dependencies]
"test:mock" = "1.0.0"
"debug:trace" = "0.5.0"
```

---

### [build]

Build configuration.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `output_dir` | string | `"target/wasm"` | Output directory |
| `opt_level` | string | `"debug"` | Optimization: `debug`, `release` |
| `reproducible` | bool | `false` | Reproducible builds |

```toml
[build]
output_dir = "dist"
opt_level = "release"
reproducible = true
```

---

### [registry]

Registry configuration.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `url` | string | `"https://registry.esubalew.dev"` | Registry URL |
| `auth_token` | string | - | Authentication token |
| `mirrors` | array | `[]` | Fallback mirrors |

```toml
[registry]
url = "https://registry.esubalew.dev"
mirrors = ["https://mirror.example.com"]
# auth_token = "..." # Use RUN_AUTH_TOKEN env var instead
```

!!! warning "Security"
    Don't commit `auth_token` to version control. Use the `RUN_AUTH_TOKEN` environment variable instead.

---

### [dev]

Development server configuration.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `watch` | array | `[]` | Glob patterns to watch |
| `hot_reload` | bool | `true` | Enable hot reload |
| `port` | number | `3000` | Server port |
| `log_level` | string | `"info"` | Log level |

```toml
[dev]
watch = ["src/**/*.rs", "wit/**/*.wit"]
hot_reload = true
port = 8080
log_level = "debug"
```

---

### [deploy.<profile>]

Named deployment profiles.

```toml
[deploy.production]
target_type = "edge"
provider = "cloudflare"

[deploy.production.options]
account_id = "abc123"
zone_id = "xyz789"

[deploy.staging]
target_type = "registry"

[deploy.staging.options]
registry_url = "https://staging-registry.example.com"
```

Use with:

```bash
run v2 deploy --profile production
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RUN_AUTH_TOKEN` | Registry authentication token |
| `RUN_REGISTRY_URL` | Override default registry URL |

---

## Lockfiles

### run.lock.toml

Toolchain lockfile for reproducible builds.

```toml
[toolchains]
cargo-component = "0.20.0"
wasm-tools = "1.219.1"
componentize-py = "0.15.0"

[checksums]
cargo-component = "sha256:abc123..."
```

Generated with:

```bash
run v2 toolchain sync
```

### .run/cache/

Component cache directory. Contains downloaded dependencies.

---

## Example: Full Configuration

```toml
[project]
name = "microservice-demo"
version = "1.0.0"
description = "Demo microservice with Run 2.0"
authors = ["Demo Author <demo@example.com>"]
license = "MIT"

[[component]]
name = "api"
source = "services/api/src/lib.rs"
language = "rust"
wit = "wit/api.wit"
capabilities = ["http-server", "clock"]

[[component]]
name = "auth"
source = "services/auth/src/lib.rs"
language = "rust"
wit = "wit/auth.wit"

[[component]]
name = "worker"
source = "services/worker/src/lib.rs"
language = "rust"
wit = "wit/worker.wit"
capabilities = ["http-client"]

[dependencies]
"wasi:http" = "0.2.0"
"wasi:logging" = "0.1.0"

[dev_dependencies]
"test:mock-http" = "1.0.0"

[build]
output_dir = "target/wasm"
opt_level = "release"
reproducible = true

[registry]
url = "https://registry.esubalew.dev"

[dev]
watch = ["services/**/*.rs", "wit/**/*.wit"]
hot_reload = true
port = 3000
log_level = "info"

[deploy.edge]
target_type = "edge"
provider = "cloudflare"

[deploy.edge.options]
workers_dev = true
```
