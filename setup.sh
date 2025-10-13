#!/bin/bash

echo "🚀 Setting up run-kit documentation..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    echo "Please install Python 3 and try again."
    exit 1
fi

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development server:"
echo "  source venv/bin/activate"
echo "  mkdocs serve"
echo ""
echo "Then open http://127.0.0.1:8000 in your browser."
echo ""
