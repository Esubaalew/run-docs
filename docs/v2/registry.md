# Component Registry

The Run 2.0 registry allows you to publish, share, and install WASI components.

## Official Registry

The official registry is hosted at:

- **URL:** [https://registry.esubalew.dev](https://registry.esubalew.dev)
- **Browse:** [https://registry.esubalew.dev/browse](https://registry.esubalew.dev/browse)

## Package Naming

Packages follow the format:

```
namespace:package@version
```

Examples:

- `wasi:http@0.2.0`
- `myorg:utils@1.0.0`
- `alice:calculator@2.1.3`

## Installing Packages

### From run.toml

Add dependencies to your `run.toml`:

```toml
[dependencies]
"wasi:http" = "0.2.0"
"myorg:utils" = "1.0.0"
```

Then install:

```bash
run v2 install
```

### Direct Install

Install a specific package:

```bash
run v2 install wasi:http@0.2.0
```

Install as dev dependency:

```bash
run v2 install test:mock --dev
```

### Update Packages

Update all dependencies:

```bash
run v2 update
```

Update specific package:

```bash
run v2 update wasi:http
```

---

## Publishing Packages

### 1. Configure Authentication

Get a token from the registry administrator, then set it:

=== "Environment Variable (Recommended)"

    ```bash
    export RUN_AUTH_TOKEN=your-token-here
    ```

=== "CLI Flag"

    ```bash
    run v2 publish --token your-token-here
    ```

=== "run.toml (Not Recommended)"

    ```toml
    [registry]
    auth_token = "your-token-here"
    ```

    !!! warning
        Don't commit tokens to version control.

### 2. Configure Project

Ensure your `run.toml` has required metadata:

```toml
[project]
name = "myorg"           # This becomes the namespace
version = "1.0.0"
description = "My awesome component"
license = "MIT"
repository = "https://github.com/myorg/mypackage"

[[component]]
name = "calculator"      # Package name: myorg:calculator
source = "src/lib.rs"
language = "rust"
wit = "wit/calculator.wit"
```

### 3. Publish

Build and publish:

```bash
run v2 publish --build
```

Or publish pre-built components:

```bash
run v2 build --release
run v2 publish
```

Publish specific component:

```bash
run v2 publish --component calculator --build
```

### 4. Verify

Check your package on the registry:

```bash
# CLI
run v2 info myorg:calculator

# Web
open https://registry.esubalew.dev/browse/myorg:calculator
```

---

## Registry API

The registry provides a REST API:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/packages` | GET | List all packages |
| `/browse` | GET | Browse packages (HTML) |
| `/browse/:name` | GET | Package detail (HTML) |
| `/api/v1/packages` | POST | Publish package |
| `/api/v1/packages/:name/versions` | GET | List versions |
| `/api/v1/packages/:name/:version` | GET | Get metadata |
| `/api/v1/search?q=query` | GET | Search packages |
| `/api/v1/stats` | GET | Registry statistics |
| `/health` | GET | Health check |

### Examples

List packages:

```bash
curl https://registry.esubalew.dev/packages
```

Search:

```bash
curl "https://registry.esubalew.dev/api/v1/search?q=http"
```

Get package info:

```bash
curl https://registry.esubalew.dev/api/v1/packages/wasi:http/0.2.0
```

---

## Self-Hosted Registry

You can run your own registry server.

### Deploy to Render

1. Fork the [run repository](https://github.com/Esubaalew/run)
2. Create a new Web Service on [Render](https://render.com)
3. Connect to the `registry-server/` directory
4. Set environment variables:
   - `REGISTRY_ADMIN_TOKEN`: Admin token for publishing
   - `PORT`: Server port (Render sets this automatically)
   - `DATA_DIR`: Data directory (default: `./data`)

### Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port |
| `DATA_DIR` | Data storage directory |
| `BASE_URL` | Public URL for download links |
| `MAX_UPLOAD_MB` | Max upload size (default: 50) |
| `REGISTRY_ADMIN_TOKEN` | Admin token (can publish to any namespace) |
| `REGISTRY_TOKENS` | Namespace tokens (format: `ns1:token1,ns2:token2`) |

### Token Types

**Admin Token:**

- Set via `REGISTRY_ADMIN_TOKEN`
- Can publish to any namespace
- For registry administrators

**Namespace Tokens:**

- Set via `REGISTRY_TOKENS`
- Format: `namespace:token,namespace:token`
- Each token can only publish to its namespace

Example:

```bash
REGISTRY_TOKENS=alice:secret1,bob:secret2,acme:secret3
```

- `alice` token can publish `alice:*` packages
- `bob` token can publish `bob:*` packages
- `acme` token can publish `acme:*` packages

---

## Verify Integrity

Verify installed packages against the lockfile:

```bash
run v2 verify
```

This checks SHA256 hashes of all cached components.

---

## Custom Registry URL

Use a custom registry:

```toml title="run.toml"
[registry]
url = "https://my-registry.example.com"
```

Or via environment:

```bash
export RUN_REGISTRY_URL=https://my-registry.example.com
run v2 install mypackage
```

Or per-command:

```bash
run v2 publish --registry-url https://my-registry.example.com
```
