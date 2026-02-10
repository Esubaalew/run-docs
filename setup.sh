#!/bin/bash
set -e

echo "🚀 Setting up run-kit documentation..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    echo "Please install Python 3 and try again."
    exit 1
fi

# Use existing .venv or venv, or create .venv (never install without a venv)
VENV_DIR=
if [[ -d .venv ]]; then
    VENV_DIR=".venv"
elif [[ -d venv ]]; then
    VENV_DIR="venv"
else
    echo "📦 Creating virtual environment .venv..."
    python3 -m venv .venv
    VENV_DIR=".venv"
fi

# Activate virtual environment (required before any pip install)
echo "📦 Using venv: $VENV_DIR"
source "$VENV_DIR/bin/activate"

# Install dependencies inside venv only
echo "📥 Installing dependencies (in venv)..."
pip install --upgrade pip
pip install -r requirements.txt

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development server (always activate venv first):"
echo "  source $VENV_DIR/bin/activate"
echo "  mkdocs serve"
echo ""
echo "Then open http://127.0.0.1:8000 in your browser."
echo ""
