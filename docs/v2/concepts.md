---
title: Key Concepts
description: Understanding WASI 0.2, the Component Model, WIT interfaces, and how Run 2.0 uses them.
---

# Key Concepts

Before diving deep into Run 2.0, it helps to understand the technology behind it. This page explains the core concepts in plain language.

---

## What is WebAssembly (Wasm)?

WebAssembly is a binary instruction format — a portable compilation target for code written in any language. Think of it like Java's JVM bytecode, but:

- **Faster**: Near-native execution speed
- **Smaller**: Binaries are typically KB to low MB
- **Sandboxed**: Code can only do what you explicitly allow
- **Universal**: Runs on any OS, any architecture

Originally designed for browsers, WebAssembly now runs server-side via runtimes like [Wasmtime](https://wasmtime.dev/) (which Run uses under the hood).

---

## What is WASI?

**WASI** (WebAssembly System Interface) gives WebAssembly modules access to system resources — files, network, clocks, random numbers — through a capability-based security model.

Instead of giving a program access to everything (like a normal binary), WASI lets you grant specific permissions:

| Capability | What it allows |
|-----------|----------------|
| Filesystem | Read/write specific directories |
| Network | Connect to specific hosts |
| Clock | Read system time |
| Random | Generate random numbers |
| Environment | Read environment variables |
| Stdout/Stderr | Write output |

**Why this matters:** A WASI component **cannot** do anything you didn't explicitly allow. No secret network calls, no reading arbitrary files, no surprises.

---

## What is WASI 0.2 / The Component Model?

WASI 0.2 introduces the **Component Model** — the key innovation that makes Run 2.0 possible.

**Without the Component Model** (WASI 0.1 / "Preview 1"):

- A `.wasm` module is a black box with `_start()` and raw memory
- Modules can't call each other
- No type safety across module boundaries
- Essentially: "run this binary, get stdout"

**With the Component Model** (WASI 0.2 / "Preview 2"):

- A `.wasm` component has **typed exports and imports**
- Components compose: Component A can import functions from Component B
- Types are preserved: `func(name: string) -> string` is enforced, not convention
- **Any language** can produce or consume components — Rust calling Python, Go calling JavaScript

This is the breakthrough that enables Run 2.0's cross-language composition.

---

## What is WIT?

**WIT** (WebAssembly Interface Types) is the contract language for WASI 0.2 components. It defines what a component exports and imports.

**Example:**

```wit
package example:calculator;

interface math {
    add: func(a: s32, b: s32) -> s32;
    multiply: func(a: s32, b: s32) -> s32;
}

world calculator {
    export math;
}
```

This says: "This component exports a `math` interface with `add` and `multiply` functions."

Any language can implement this interface. Any component can import it. The runtime (Wasmtime) enforces the types at link time.

### WIT Types

| WIT Type | Description | Example |
|----------|-------------|---------|
| `bool` | Boolean | `true`, `false` |
| `s8`, `s16`, `s32`, `s64` | Signed integers | `s32:42` |
| `u8`, `u16`, `u32`, `u64` | Unsigned integers | `u64:100` |
| `f32`, `f64` | Floating point | `f64:3.14` |
| `string` | UTF-8 string | `string:hello` |
| `list<T>` | Ordered list | `list<u8>` |
| `option<T>` | Nullable value | `option<string>` |
| `result<T, E>` | Success or error | `result<string, string>` |
| `tuple<T...>` | Fixed-length tuple | `tuple<s32, string>` |
| `record` | Named fields (like a struct) | See below |
| `variant` | Tagged union (like an enum) | See below |

---

## How Components Compose

This is the killer feature of Run 2.0.

**Scenario:** You have a math library written in Rust and an application written in Go. In the traditional world, you'd need CGo bindings, shared libraries, or microservices.

With Run 2.0:

1. **Math component** (Rust) exports `add(s32, s32) -> s32`
2. **App component** (Go) imports `add` and calls it directly
3. **Run links them at runtime** — no network overhead, no serialization, direct function calls

```
┌─────────────────┐     WIT Interface     ┌─────────────────┐
│  App (Go)       │ ──── import add ────→ │  Math (Rust)    │
│                 │                        │                 │
│  func main() {  │                        │  fn add(a, b) { │
│    result = add( │                       │    a + b        │
│      3, 4       │                        │  }              │
│    )            │                        │                 │
│  }              │                        │                 │
└─────────────────┘                        └─────────────────┘
```

Both components are `.wasm` files. The composition happens inside the Wasmtime runtime, orchestrated by Run. No Docker containers, no HTTP calls, no gRPC.

---

## How Run 2.0 Fits Together

```
┌──────────────────────────────────────────────────────────┐
│                       run v2 CLI                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  run.toml          ← Project configuration               │
│  run.lock.toml     ← Toolchain lock (reproducibility)   │
│                                                          │
│  ┌────────┐  ┌────────┐  ┌────────┐                     │
│  │ build  │  │  exec  │  │  dev   │                     │
│  │        │  │        │  │        │                     │
│  │ Rust → │  │ Strict │  │ Hot    │                     │
│  │ Go   → │  │ Determ │  │ Reload │                     │
│  │ Py   → │→ │ -inism │  │ + Link │                     │
│  │ JS   → │  │        │  │        │                     │
│  │ TS   → │  │ No     │  │ Clock  │                     │
│  │ Zig  → │  │ clock  │  │ allowed│                     │
│  └───┬────┘  └───┬────┘  └───┬────┘                     │
│      │           │           │                           │
│      ▼           ▼           ▼                           │
│  ┌──────────────────────────────────┐                    │
│  │        Wasmtime Runtime          │                    │
│  │   (WASI 0.2 Component Model)    │                    │
│  └──────────────────────────────────┘                    │
│                                                          │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Registry │  │  .run/cache  │  │  Edge Deploy │       │
│  │ publish/ │  │  components/ │  │  CF Workers  │       │
│  │ install  │  │  lockfiles   │  │  Lambda      │       │
│  └──────────┘  └──────────────┘  └──────────────┘       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Determinism

Run 2.0 enforces **deterministic execution** by default in `exec` mode:

- **No clock access** — `clock_time_get` returns an error
- **No random** — `random_get` returns an error
- **Memory limits** — Components can't allocate unlimited memory
- **Execution time limits** — Components can't run forever
- **No network** — Unless explicitly allowed

This means: given the same input, a component **always** produces the same output. This is critical for:

- **Reproducible builds** — CI produces the same result as local
- **Auditable execution** — You can verify what a component did
- **Caching** — Same input = same output = cacheable

In `dev` mode, some restrictions are relaxed (clock access, longer timeouts) for convenience.

---

## The Registry

The [component registry](registry.md) is like npm/crates.io but for WASI components:

- **Publish** your components for others to use
- **Install** components as dependencies
- **Version** with semver
- **Authenticate** with namespace-scoped tokens

Registry URL: [registry.esubalew.dev](https://registry.esubalew.dev)

---

## Glossary

| Term | Definition |
|------|-----------|
| **Component** | A `.wasm` binary following the WASI 0.2 Component Model spec |
| **Module** | An older `.wasm` binary (WASI 0.1 / core WebAssembly) |
| **WIT** | WebAssembly Interface Types — the contract language |
| **World** | A WIT concept defining a component's full interface (imports + exports) |
| **Interface** | A named group of functions in WIT |
| **Wasmtime** | The WebAssembly runtime used by Run |
| **WAT** | WebAssembly Text format — human-readable `.wasm` source |
| **Composition** | Linking components so one can call another's exports |
| **Capability** | A permission granted to a component (filesystem, network, etc.) |
| **Determinism** | Same input always produces same output (no side effects) |
