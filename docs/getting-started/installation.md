# Installation

Get up and running with `run-kit` in minutes. Choose the installation method that works best for your system.

## Prerequisites

Before installing `run`, ensure you have:

- A terminal or command prompt
- An internet connection (for downloading)
- Administrator/root access (for some installation methods)

!!! tip "Language Toolchains"
    `run` shells out to real language toolchains. To execute code in a specific language, you need that language's runtime or compiler installed (e.g., `python3`, `node`, `rustc`, `go`, etc.).

## Installation Methods

### Cargo (Recommended)

If you have Rust installed, this is the simplest method:

```bash
cargo install run-kit
```

This will download, compile, and install `run` from [crates.io](https://crates.io/crates/run-kit).

**Verify the installation:**

```bash
run --version
```

---

### Homebrew (macOS / Linux)

For macOS and Linux users with Homebrew:

```bash
brew tap Esubaalew/run
brew install run
```

**Verify the installation:**

```bash
run --version
```

---

### Debian / Ubuntu

Download and install the `.deb` package:

```bash
curl -LO https://github.com/Esubaalew/run/releases/latest/download/run_amd64.deb
sudo dpkg -i run_amd64.deb
```

**Verify the installation:**

```bash
run --version
```

---

### Windows (Scoop)

For Windows users with [Scoop](https://scoop.sh/):

```powershell
scoop install https://github.com/Esubaalew/run/releases/latest/download/run-scoop.json
```

**Verify the installation:**

```powershell
run --version
```

---

### Install Script (macOS / Linux)

Use the automated install script:

```bash
curl -fsSLO https://raw.githubusercontent.com/Esubaalew/run/master/scripts/install.sh
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

1. Go to the [Releases page](https://github.com/Esubaalew/run/releases)
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
git clone https://github.com/Esubaalew/run.git
cd run
cargo build --release
sudo cp target/release/run /usr/local/bin/
```

**Verify the installation:**

```bash
run --version
```

---

## Installing Language Toolchains

To execute code in a specific language, you need that language's runtime or compiler installed:

### Scripting Languages

```bash
# Python
sudo apt install python3        # Debian/Ubuntu
brew install python            # macOS

# Node.js (JavaScript)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Ruby
sudo apt install ruby          # Debian/Ubuntu
brew install ruby              # macOS
```

### Compiled Languages

```bash
# Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Go
wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz

# GCC (C/C++)
sudo apt install build-essential  # Debian/Ubuntu
xcode-select --install           # macOS
```

### Check Available Languages

After installing, check which languages are available:

```bash
run
>>> :languages
```

This will show all detected language engines and their status.

---

## Updating

### Cargo

```bash
cargo install run-kit --force
```

### Homebrew

```bash
brew upgrade run
```

### Scoop

```powershell
scoop update run
```

---

## Uninstalling

### Cargo

```bash
cargo uninstall run-kit
```

### Homebrew

```bash
brew uninstall run
```

### Scoop

```powershell
scoop uninstall run
```

### Manual

Simply remove the binary from your PATH:

```bash
sudo rm /usr/local/bin/run
```

---

## Troubleshooting

### Command not found

If you get `command not found: run` after installation:

1. **Check if the binary is installed:**
   ```bash
   which run
   ```

2. **Ensure the install directory is in your PATH:**
   ```bash
   echo $PATH
   ```

3. **Add to PATH if needed:**
   ```bash
   # For bash
   echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.bashrc
   source ~/.bashrc
   
   # For zsh
   echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

### Permission Denied

If you get permission errors:

```bash
# Make the binary executable
chmod +x /path/to/run

# Or install with sudo
sudo cp run /usr/local/bin/
```

### Language Not Found

If a language isn't detected:

1. **Verify the toolchain is installed:**
   ```bash
   python3 --version
   node --version
   rustc --version
   ```

2. **Check if it's in your PATH:**
   ```bash
   which python3
   which node
   ```

3. **Try explicitly specifying the language:**
   ```bash
   run --lang python "print('hello')"
   ```

---

## Next Steps

Now that you have `run` installed, let's get started:

[Quickstart Guide](quickstart.md){ .md-button .md-button--primary }
[First Steps](first-steps.md){ .md-button }

