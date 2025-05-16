#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths for source and destination
const rootDir = process.cwd();
const gitDir = path.join(rootDir, '.git');
const hooksDir = path.join(gitDir, 'hooks');

// Check if .git directory exists
if (!fs.existsSync(gitDir)) {
  console.error('❌ Error: This is not a git repository or .git directory not found.');
  console.error('Run this script from the root of your git repository.');
  process.exit(1);
}

// Create hooks directory if it doesn't exist
if (!fs.existsSync(hooksDir)) {
  console.log('📁 Creating hooks directory...');
  fs.mkdirSync(hooksDir, { recursive: true });
}

// Function to install a hook
function installHook(sourceFile, hookName) {
  try {
    const sourcePath = path.join(rootDir, sourceFile);
    const hookPath = path.join(hooksDir, hookName);
    
    if (!fs.existsSync(sourcePath)) {
      console.error(`❌ Error: Source file ${sourceFile} not found.`);
      return false;
    }
    
    // Read the source file
    const sourceContent = fs.readFileSync(sourcePath, 'utf8');
    
    // Write to hook file
    fs.writeFileSync(hookPath, sourceContent);
    
    // Make the hook executable
    fs.chmodSync(hookPath, '755');
    
    console.log(`✅ Successfully installed ${hookName} hook.`);
    return true;
  } catch (error) {
    console.error(`❌ Error installing ${hookName} hook:`, error.message);
    return false;
  }
}

// Install pre-push hook from embedded content
function installPrePushHook() {
  const hookPath = path.join(hooksDir, 'pre-push');
  let prePushContent;
  
  try {
    // Check if hook already exists
    if (fs.existsSync(hookPath)) {
      console.log('⚠️ Pre-push hook already exists. Backing up to pre-push.bak');
      fs.copyFileSync(hookPath, `${hookPath}.bak`);
    }
    
    // Try to load from file if exists
    const prePushPath = path.join(rootDir, 'pre-push.sh');
    if (fs.existsSync(prePushPath)) {
      prePushContent = fs.readFileSync(prePushPath, 'utf8');
    } else {
      // Fallback to embedded content
      prePushContent = `#!/bin/sh

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
    }

    // Write the pre-push hook
    fs.writeFileSync(hookPath, prePushContent);
    
    // Make it executable
    fs.chmodSync(hookPath, '755');
    
    console.log('✅ Successfully installed pre-push hook.');
    return true;
  } catch (error) {
    console.error('❌ Error installing pre-push hook:', error.message);
    return false;
  }
}

// Install hooks
console.log('🔧 Installing Git hooks...');
const preCommitInstalled = installHook('pre-commit.js', 'pre-commit');
const updateInstalled = installHook('update.js', 'update');
const prePushInstalled = installPrePushHook();

if (preCommitInstalled && updateInstalled && prePushInstalled) {
  console.log('✅ All hooks installed successfully!');
} else {
  console.log('⚠️ Some hooks failed to install. Please check the error messages above.');
}
