#!/usr/bin/env node

const { execSync } = require('child_process');
const { existsSync, readFileSync, writeFileSync, mkdirSync } = require('fs');
const path = require('path');

// Required patterns for .gitignore
const REQUIRED_PATTERNS = [
  '# Dependencies',
  'node_modules/',
  'package-lock.json',
  'yarn.lock',
  '\n# Environment',
  '.env',
  '.env.*',
  '!.env.example',
  '\n# Build output',
  'dist/',
  'build/',
  '\n# Logs',
  'logs',
  '*.log',
  'npm-debug.log*',
  'yarn-debug.log*',
  'yarn-error.log*',
  '\n# Editor directories and files',
  '.idea',
  '.vscode',
  '*.suo',
  '*.ntvs*',
  '*.njsproj',
  '*.sln',
  '*.sw?',
  '\n# System Files',
  '.DS_Store',
  'Thumbs.db'
].join('\n');

/**
 * Ensure .gitignore exists with required patterns
 */
function ensureGitignore() {
  const gitignorePath = '.gitignore';
  let currentContent = '';
  
  if (existsSync(gitignorePath)) {
    currentContent = readFileSync(gitignorePath, 'utf8');
  }
  
  // Check if all required patterns are present
  const missingPatterns = REQUIRED_PATTERNS
    .split('\n')
    .filter(pattern => 
      pattern && 
      !pattern.startsWith('#') && 
      !currentContent.includes(pattern)
    );
  
  if (missingPatterns.length > 0) {
    console.log('🔍 Updating .gitignore with missing patterns...');
    const updatedContent = currentContent + 
      (currentContent.endsWith('\n') ? '' : '\n') + 
      '# Added by git hooks\n' +
      missingPatterns.join('\n') + '\n';
    
    writeFileSync(gitignorePath, updatedContent);
    execSync(`git add ${gitignorePath}`);
    console.log('✅ .gitignore updated successfully');
  }
}

console.log('🔍 Running pre-commit checks...');

try {
  // Ensure we're in the repository root
  const gitRoot = execSync('git rev-parse --show-toplevel', { stdio: 'pipe' })
    .toString()
    .trim();
  const currentDir = process.cwd();
  
  if (gitRoot !== currentDir) {
    console.warn(
      `⚠️ Warning: Not running from repository root. Current: ${currentDir}, Root: ${gitRoot}`
    );
    process.chdir(gitRoot);
    console.log(`✅ Changed directory to repository root: ${gitRoot}`);
  }

  // Ensure .gitignore exists and has required patterns
  ensureGitignore();

  // Run tests if package.json exists and has test script
  if (existsSync('package.json')) {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    
    if (pkg.scripts?.test) {
      console.log('🚀 Running tests...');
      execSync('npm test', { stdio: 'inherit' });
      console.log('✅ All tests passed!');
    } else {
      console.log('ℹ️ No test script found in package.json');
    }
  }
} catch (error) {
  console.error('❌ Error during pre-commit:', error.message);
  process.exit(1);
}
