# Quickstart

Build and run your first WASI component in under 5 minutes.

## 1. Create a Project

```bash
run v2 init hello-wasi
cd hello-wasi
```

This creates:

```
hello-wasi/
├── run.toml        # Project configuration
├── components/     # Component source code
└── wit/            # WIT interface definitions
```

## 2. Add a Component

Create a simple Rust component. First, create the WIT interface:

```wit title="wit/greeter.wit"
package example:greeter;

interface greet {
    greet: func(name: string) -> string;
}

world greeter {
    export greet;
}
```

Create the Rust implementation:

```bash
mkdir -p components/greeter/src
```

```toml title="components/greeter/Cargo.toml"
[package]
name = "greeter"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wit-bindgen = "0.36"
```

```rust title="components/greeter/src/lib.rs"
wit_bindgen::generate!({
    world: "greeter",
    path: "../../wit/greeter.wit",
});

struct Component;

impl Guest for Component {
    fn greet(name: String) -> String {
        format!("Hello, {}!", name)
    }
}

export!(Component);
```

Update `run.toml`:

```toml title="run.toml"
[project]
name = "hello-wasi"
version = "0.1.0"

[[component]]
name = "greeter"
source = "components/greeter/src/lib.rs"
language = "rust"
wit = "wit/greeter.wit"
```

## 3. Build

```bash
run v2 build
```

This compiles your component to WebAssembly:

```
Building 1 components...
[greeter] built: target/wasm/greeter.wasm

Build complete
```

## 4. Run

Execute the component:

```bash
run v2 exec greeter --function greet --args '"World"'
```

Output:

```
[exec] mode=production clock=false random=false
[exec] running: target/wasm/greeter.wasm
Hello, World!
[exec] completed (exit=0)
```

## 5. Development Mode

Start the dev server with hot reload:

```bash
run v2 dev
```

The dev server:

- Watches for file changes
- Rebuilds automatically
- Provides unified logging
- Allows clock access (for debugging)

## Next Steps

- [Commands](commands.md) - Learn all available commands
- [Configuration](configuration.md) - Customize your project
- [Registry](registry.md) - Publish and share components
- [Deployment](deployment.md) - Deploy to production
