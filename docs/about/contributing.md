# Contributing

Thank you for considering contributing to `run`! We welcome contributions of all kinds.

## Ways to Contribute

### 1. Report Bugs

Found a bug? [Open an issue](https://github.com/esubaalew/run/issues/new) with:

- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, versions, etc.)

### 2. Suggest Features

Have an idea? [Open a feature request](https://github.com/esubaalew/run/issues/new) with:

- Description of the feature
- Use cases
- Why it would be useful

### 3. Improve Documentation

Documentation can always be better:

- Fix typos
- Add examples
- Clarify explanations
- Add missing topics

### 4. Add Language Support

Want to add a new language?

1. Check the [language engine interface](https://github.com/esubaalew/run/blob/master/src/engine.rs)
2. Implement the trait for your language
3. Add tests
4. Submit a PR

### 5. Fix Bugs

Browse [open issues](https://github.com/esubaalew/run/issues) and submit fixes!

## Development Setup

### Prerequisites

- Rust (latest stable)
- Git
- Language toolchains for testing

### Clone and Build

```bash
git clone https://github.com/esubaalew/run.git
cd run
cargo build
cargo test
```

### Run Tests

```bash
cargo test
cargo test test_python
cargo test -- --nocapture
```

## Coding Guidelines

### Rust Style

- Follow [Rust API Guidelines](https://rust-lang.github.io/api-guidelines/)
- Use `cargo fmt` before committing
- Run `cargo clippy` and fix warnings
- Add tests for new features

### Commit Messages

```
feat: add support for OCaml
fix: handle edge case in language detection
docs: improve Python examples
test: add tests for Rust REPL
```

### PR Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run tests and linting
6. Submit PR with description

## Code of Conduct

- Be respectful
- Be constructive
- Be welcoming
- Be patient

## Questions?

- [GitHub Discussions](https://github.com/esubaalew/run/discussions)
- [X (Twitter)](https://x.com/esubaalew)

## License

By contributing, you agree that your contributions will be licensed under Apache 2.0.

---

Thank you for contributing! 
