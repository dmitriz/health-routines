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

// Check if this is a push to a protected branch
if (PROTECTED_BRANCHES.includes(refName)) {
  try {
    // Check if this is a direct push (not a merge)
    const isMerge = execSync(`git merge-base --is-ancestor ${oldRev} ${newRev}`, { stdio: 'pipe' }).toString().trim() === '';
    
    if (!isMerge) {
      console.error('⛔ Error: Direct pushes to protected branches are not allowed.');
      console.error('Please create a feature branch and submit a pull request instead.');
      console.error('\nWorkflow:');
      console.error('1. Create a feature branch: git checkout -b feature/your-feature');
      console.error('2. Make your changes and commit them');
      console.error('3. Push to the feature branch: git push origin feature/your-feature');
      console.error('4. Create a pull request for review');
      process.exit(1);
    } else {
      // Verify that this is a merge commit
      try {
        const mergeCommit = execSync(`git cat-file -p ${newRev} | grep -q "^parent "`, { stdio: 'pipe' });
        console.log('✅ Merge commit verified, allowing update.');
      } catch (error) {
        console.error('⛔ Error: This appears to be a direct commit, not a merge.');
        console.error('Protected branches can only be updated through pull requests.');
        process.exit(1);
      }
    }
  } catch (error) {
    // Log the error for debugging
    console.error('❌ Hook error:', error.message);
    console.error('⚠️ Could not verify push type. For safety, rejecting the push.');
    console.error('Please create a pull request instead of pushing directly.');
    process.exit(1);
  }
} else {
  console.log(`✅ Push to ${refName} allowed.`);
}

console.log('✅ Update hook completed successfully.');
