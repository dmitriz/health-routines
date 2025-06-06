#!/bin/bash
# This script will install dependencies and run pytest.

# Exit immediately if a command exits with a non-zero status.
set -e

# Install dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
fi

# Run pytest
pytest
