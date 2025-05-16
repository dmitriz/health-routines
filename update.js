#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Get the branch being updated
const refName = process.argv[2];
const oldRev = process.argv[3];
const newRev = process.argv[4];

console.log(`🔍 Running update hook for ${refName}...`);

// Protected branches that require pull requests
const PROTECTED_BRANCHES = ['refs/heads/main', 'refs/heads/master'];

try {
  // Check if this is a push to a protected branch
  if (PROTECTED_BRANCHES.includes(refName)) {
    // Securely obtain commit details to count parent entries using execFileSync
    const commitOutput = execFileSync('git', ['cat-file', '-p', newRev], { encoding: 'utf8' });
    const parentCount = commitOutput.split('\n').filter(line => line.startsWith('parent ')).length;
    if (parentCount < 2) {
      console.error('⛔ Error: Direct pushes to protected branches are not allowed.');
      console.error('Only merge commits (with multiple parents) are permitted.');
      console.error('Please create a feature branch and submit a pull request instead.');
      process.exit(1);
    }
    console.log(`✅ Merge commit verified with ${parentCount} parent(s), allowing update.`);
  } else {
    console.log(`✅ Push to ${refName} allowed.`);
  }
} catch (error) {
  console.error('❌ Hook error:', error.message);
  console.error('⚠️ Could not verify push type. For safety, rejecting the push.');
  console.error('Please create a pull request instead of pushing directly.');
  process.exit(1);
}

console.log('✅ Update hook completed successfully.');
