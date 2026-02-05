# Deployment

Run 2.0 supports multiple deployment targets for your WASI components.

## Deployment Targets

| Target | Description | Use Case |
|--------|-------------|----------|
| `local` | Package for local/self-hosted | VMs, containers, local servers |
| `registry` | Publish to component registry | Sharing, distribution |
| `edge` | Deploy to edge platforms | Serverless, CDN |

---

## Local Deployment

Package components for local deployment:

```bash
run v2 deploy --target local
```

This creates a deployment bundle:

```
dist/deploy/
├── deploy.json       # Manifest with checksums
├── run.toml          # Configuration
├── api.wasm          # Component binaries
└── worker.wasm
```

### Custom Output

```bash
run v2 deploy --target local --output ./release
```

### Deploy Profile

Configure in `run.toml`:

```toml
[deploy.local]
target_type = "local"

[deploy.local.options]
output_dir = "dist/release"
```

Use:

```bash
run v2 deploy --profile local
```

---

## Registry Deployment

Publish to the component registry:

```bash
# Same as `run v2 publish`
run v2 deploy --target registry --build
```

See [Registry](registry.md) for details.

---

## Edge Deployment

Deploy to serverless edge platforms.

### Supported Providers

| Provider | Status | Config Key |
|----------|--------|------------|
| Cloudflare Workers | Supported | `cloudflare` |
| AWS Lambda | Planned | `aws-lambda` |
| Vercel | Planned | `vercel` |
| Fastly Compute | Planned | `fastly` |

### Cloudflare Workers

1. Set up credentials:

```bash
export CLOUDFLARE_API_TOKEN=your-token
export CLOUDFLARE_ACCOUNT_ID=your-account-id
```

2. Configure `run.toml`:

```toml
[deploy.edge]
target_type = "edge"
provider = "cloudflare"

[deploy.edge.options]
workers_dev = true
# Or specify a zone:
# zone_id = "your-zone-id"
# route = "example.com/*"
```

3. Deploy:

```bash
run v2 build --release
run v2 deploy --target edge --provider cloudflare
```

### Deploy Profiles

Define multiple deployment configurations:

```toml
[deploy.staging]
target_type = "edge"
provider = "cloudflare"

[deploy.staging.options]
workers_dev = true
name_suffix = "-staging"

[deploy.production]
target_type = "edge"
provider = "cloudflare"

[deploy.production.options]
zone_id = "abc123"
route = "api.example.com/*"
```

Deploy to staging:

```bash
run v2 deploy --profile staging
```

Deploy to production:

```bash
run v2 deploy --profile production
```

---

## CI/CD Integration

### GitHub Actions

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Rust
        uses: dtolnay/rust-toolchain@stable
      
      - name: Install Run
        run: cargo install run-kit --features v2
      
      - name: Build
        run: run v2 build --release --reproducible
      
      - name: Deploy to Registry
        env:
          RUN_AUTH_TOKEN: ${{ secrets.REGISTRY_TOKEN }}
        run: run v2 publish
      
      - name: Deploy to Edge
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CF_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CF_ACCOUNT }}
        run: run v2 deploy --target edge --provider cloudflare
```

### Reproducible Builds

For consistent CI/CD builds:

1. Lock toolchains:

```bash
run v2 toolchain sync
git add run.lock.toml
git commit -m "Lock toolchain versions"
```

2. Build with reproducibility:

```bash
run v2 build --reproducible
```

3. Verify:

```bash
run v2 verify
```

---

## Build Before Deploy

Always build before deploying:

```bash
# Explicit build
run v2 build --release
run v2 deploy --target edge

# Or use --build flag
run v2 deploy --target edge --build
```

---

## Component Selection

Deploy specific components:

```bash
# Deploy only the API component
run v2 deploy --target edge --component api
```

---

## Deployment Manifest

The `deploy.json` manifest includes:

```json
{
  "project": "my-app",
  "version": "1.0.0",
  "target": "local",
  "created_at": 1704067200,
  "components": [
    {
      "name": "api",
      "path": "api.wasm",
      "sha256": "abc123...",
      "size": 524288,
      "language": "rust"
    }
  ]
}
```

Use this for:

- Deployment verification
- Rollback tracking
- Audit logging
