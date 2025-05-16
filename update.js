#!/usr/bin/env node

const { execSync } = require('child_process');

// Get the branch being updated
const refName = process.argv[2];
const oldRev = process.argv[3];
const newRev = process.argv[4];

// Check if this is a direct push to main/master
if (refName === 'refs/heads/main' || refName === 'refs/heads/master') {
  try {
    // Check if this is a direct push (not a merge)
    const isMerge = execSync(`git rev-parse --verify -q ${oldRev}^0`, { stdio: 'pipe' }).length > 0;
    
    if (isMerge) {
      console.error('⛔ Error: Direct pushes to main/master are not allowed.');
      console.error('Please create a feature branch and submit a pull request instead.');
      process.exit(1);
    }
  } catch (error) {
    // If we can't verify, allow it to proceed
    console.log('ℹ️ Could not verify push type, allowing to proceed');
  }
}
