---
title: Installation
description: Install run-kit for macOS, Linux, Windows, and Docker. Get the universal REPL and WASI runtime running in minutes.
---

# Installation

Get up and running with `run-kit` in minutes. Choose the installation method that works best for your system.

## Prerequisites

Before installing `run`, ensure you have:

- A terminal or command prompt
- An internet connection (for downloading)
- Administrator/root access (for some installation methods)

!!! tip "Language Toolchains"
    `run` shells out to real language toolchains. To execute code in a specific language, you need that language's runtime or compiler installed (e.g., `python3`, `node`, `rustc`, `go`, etc.).

## Installing language toolchains

`run` does not install language runtimes for you. Install the runtime or compiler for each language you want to use (e.g. Python, Node.js, Go). See the [Supported Languages](../languages/index.md#installing-language-toolchains) page for quick install commands per language and platform.

## Installation Methods

### Cargo (Recommended)

If you have Rust installed, this is the simplest method:

=== "Standard"

    ```bash
    cargo install run-kit
    ```

=== "With Run 2.0"

    ```bash
    cargo install run-kit --features v2
    ```
    
    This includes WASI component support. See [Run 2.0 docs](../v2/index.md) for details.

This will download, compile, and install `run` from [crates.io](https://crates.io/crates/run-kit).

**Verify the installation:**

```bash
run --version

# If installed with v2
run v2 --help
```

---

### Homebrew (macOS)

```bash
brew install run-kit
```

!!! note "Formula name"
    Homebrew already has a `run` formula for a different project, so this tool is published as `run-kit`. It still installs the `run` binary.

**Verify the installation:**

```bash
run --version
```

---

### Debian / Ubuntu (APT)

```bash
sudo install -d /usr/share/keyrings
sudo curl -fsSL https://run-apt.github.io/run-apt/run-archive-keyring.gpg \
  -o /usr/share/keyrings/run-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/run-archive-keyring.gpg] https://run-apt.github.io/run-apt stable main" \
  | sudo tee /etc/apt/sources.list.d/run.list

sudo apt update
sudo apt install run
```

**Verify the installation:**

```bash
run --version
```

---

### Windows (Winget)

```powershell
winget install Esubaalew.Run
```

!!! note "If Winget can't find it yet"
    The Winget PR is in review. Until it lands, use the Scoop method below.

**Verify the installation:**

```powershell
run --version
```

---

### Windows (Scoop)

For Windows users with [Scoop](https://scoop.sh/):

```powershell
scoop install https://github.com/esubaalew/run/releases/latest/download/run-scoop.json
```

**Verify the installation:**

```powershell
run --version
```

---

### Install Script (macOS / Linux)

Use the automated install script:

```bash
curl -fsSLO https://raw.githubusercontent.com/esubaalew/run/master/scripts/install.sh
chmod +x install.sh
./install.sh --add-path
```

**Verify the installation:**

```bash
run --version
```

---

### Manual Download

Download pre-built binaries directly from GitHub:

1. Go to the [Releases page](https://github.com/esubaalew/run/releases)
2. Download the appropriate archive for your system:
   - `run-*-x86_64-apple-darwin.tar.gz` for macOS
   - `run-*-x86_64-unknown-linux-gnu.tar.gz` for Linux
   - `run-*-x86_64-pc-windows-msvc.zip` for Windows
3. Extract the archive
4. Move the `run` binary to a directory in your `PATH`

**Example for Linux/macOS:**

```bash
tar -xzf run-*-x86_64-unknown-linux-gnu.tar.gz
sudo mv run /usr/local/bin/
```

**Verify the installation:**

```bash
run --version
```

---

### Build from Source

For the latest development version or to contribute:

```bash
git clone https://github.com/esubaalew/run.git
cd run
cargo build --release
sudo cp target/release/run /usr/local/bin/
```
