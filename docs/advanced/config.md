# Configuration File

`run` supports optional project-level configuration via `run.toml` or `.runrc` files. These set sensible defaults so you don't have to repeat flags on every invocation.

## File Locations

`run` searches for config files starting from the current directory and walking up to parent directories. The first file found is used:

1. `run.toml` (preferred)
2. `.runrc` (alternative name, same TOML format)

## Supported Options

```toml title="run.toml"
# Default language when none is specified
language = "python"

# Execution timeout in seconds (default: 60)
timeout = 30

# Always show execution timing
timing = true

# Default benchmark iterations for --bench
bench_iterations = 10
```

All fields are optional. Unset fields use their built-in defaults.

## Precedence

Command-line flags and environment variables always override config file values:

| Setting | Config File | Environment Variable | CLI Flag |
|---------|------------|---------------------|----------|
| Timeout | `timeout = 30` | `RUN_TIMEOUT_SECS=30` | `--timeout 30` |
| Timing | `timing = true` | `RUN_TIMING=1` | `--timing` |
| Language | `language = "python"` | — | `--lang python` |

Priority: **CLI flag > environment variable > config file > built-in default**.

## Examples

### Python Data Science Project

```toml title="run.toml"
language = "python"
timeout = 120
timing = true
```

### Quick Scripts

```toml title=".runrc"
language = "bash"
timeout = 10
```

### Benchmarking Project

```toml title="run.toml"
language = "rust"
bench_iterations = 50
timing = true
```

## Tips

- Place `run.toml` in your project root alongside `package.json`, `Cargo.toml`, etc.
- Add `run.toml` to version control so team members share the same defaults.
- Use `.runrc` if you prefer a hidden config file (e.g., in your home directory).
