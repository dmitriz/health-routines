#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Pre-push hook content
const prePushContent = `#!/bin/sh

# Simple pre-push hook that runs tests
# To disable: chmod -x .git/hooks/pre-push

echo "Running tests before push..."

# Check if package.json exists and has test script
if [ -f "package.json" ] && grep -q '"test"' package.json; then
    # Run tests
    npm test
    
    # Capture the exit code of the test command
    TEST_RESULT=$?
    
    # If tests failed, prevent the push
    if [ $TEST_RESULT -ne 0 ]; then
        echo "❌ Tests failed. Push aborted."
        exit 1
    fi
else
    echo "ℹ️ No test script found in package.json. Skipping tests."
fi

echo "✅ Pre-push checks passed. Proceeding with push..."
exit 0
`;

if (require.main === module) {
  // If this script is being executed directly (not required as a module)
  console.log('🔧 Writing pre-push hook content...');
}

// Export the content for use by other scripts
module.exports = prePushContent;
