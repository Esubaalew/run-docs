# run-kit Documentation

Beautiful documentation for [run-kit](https://github.com/Esubaalew/run) built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

##  Quick Start

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Local Development

```bash
# Serve locally with live reload
mkdocs serve

# Open http://127.0.0.1:8000
```

### Build

```bash
# Build static site
mkdocs build

# Output in site/ directory
```

### Deploy

```bash
# Deploy to GitHub Pages
mkdocs gh-deploy
```

##  Project Structure

```
docs/
├── index.md                 # Homepage
├── getting-started/         # Getting started guides
│   ├── installation.md
│   ├── quickstart.md
│   └── first-steps.md
├── guide/                   # User guide
│   ├── overview.md
│   ├── command-syntax.md
│   ├── running-files.md
│   ├── piping-data.md
│   └── language-detection.md
├── repl/                    # REPL documentation
│   ├── index.md
│   ├── commands.md
│   ├── sessions.md
│   └── language-behavior.md
├── languages/               # Language-specific docs
│   ├── index.md
│   ├── python.md
│   ├── javascript.md
│   ├── rust.md
│   └── ...
├── advanced/                # Advanced topics
│   ├── aliases.md
│   ├── environment.md
│   ├── performance.md
│   └── troubleshooting.md
├── about/                   # About section
│   ├── why-rust.md
│   ├── architecture.md
│   ├── contributing.md
│   └── license.md
├── stylesheets/             # Custom CSS
│   └── extra.css
└── javascripts/             # Custom JS
    └── extra.js
```

##  Features

- **Material Design** - Clean, modern UI
- **Dark Mode** - Automatic dark/light theme
- **Search** - Full-text search built-in
- **Code Highlighting** - Syntax highlighting for all languages
- **Tabs** - Organize content with tabs
- **Admonitions** - Call-out boxes for tips, warnings, etc.
- **Navigation** - Smart navigation with sections
- **Mobile Responsive** - Works great on all devices
- **Fast** - Optimized for performance

## 🛠 Customization

### Theme Colors

Edit `mkdocs.yml`:

```yaml
theme:
  palette:
    primary: indigo
    accent: indigo
```

### Custom CSS

Edit `docs/stylesheets/extra.css`

### Custom JavaScript

Edit `docs/javascripts/extra.js`

##  Writing Documentation

### Markdown Basics

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
`inline code`

[Link text](url)

- List item 1
- List item 2
```

### Code Blocks

````markdown
```bash
run python "print('hello')"
```

```python
def hello():
    print("Hello, World!")
```
````

### Admonitions

```markdown
!!! note
    This is a note.

!!! tip
    This is a tip.

!!! warning
    This is a warning.

!!! danger
    This is danger.
```

### Tabs

```markdown
=== "Python"
    ```python
    print("Hello")
    ```

=== "JavaScript"
    ```javascript
    console.log("Hello")
    ```
```

### Buttons

```markdown
[Get Started](getting-started/installation.md){ .md-button .md-button--primary }
[Learn More](guide/overview.md){ .md-button }
```

##  Configuration

Main configuration is in `mkdocs.yml`:

- Site metadata
- Theme settings
- Navigation structure
- Plugins
- Extensions
- Extra files

##  Resources

- [MkDocs Documentation](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Python Markdown Extensions](https://python-markdown.github.io/extensions/)

##  Contributing

Contributions welcome! To add or improve documentation:

1. Fork the repository
2. Create a new branch (`git checkout -b docs/improve-python-guide`)
3. Make your changes
4. Test locally (`mkdocs serve`)
5. Commit your changes (`git commit -am 'Improve Python guide'`)
6. Push to the branch (`git push origin docs/improve-python-guide`)
7. Create a Pull Request

##  License

Apache 2.0 - See [LICENSE](../LICENSE) for details.

## 🙏 Acknowledgments

- Built with [MkDocs](https://www.mkdocs.org/)
- Theme by [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- Inspired by [FastAPI](https://fastapi.tiangolo.com/) and [Typer](https://typer.tiangolo.com/) documentation

---

Built with  for the run-kit community

