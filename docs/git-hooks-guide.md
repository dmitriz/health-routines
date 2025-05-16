# Git Hook Installation Guide

This document explains how to install and configure the Git hooks for this repository.

## Automatic Installation

The Git hooks are automatically installed when you run:

```bash
npm install
```

This will ensure all hooks (pre-commit, update, and pre-push) are properly set up.

## Manual Installation

You can manually install or update the hooks with:

```bash
npm run install-hooks
```

## Verifying Installation

To verify that the hooks are installed correctly:

```bash
npm test
```

This will run the tests that check if the Git hooks are properly installed and configured.

## Hook Functionality

### Pre-commit Hook

The pre-commit hook:
- Automatically creates/updates `.gitignore` with required patterns
- Runs tests if `package.json` has a test script
- Prevents commits without proper configuration

### Update Hook

The update hook:
- Prevents direct pushes to protected branches (main/master)
- Requires pull requests for changes to protected branches
- Verifies merge status before allowing updates

### Pre-push Hook

The pre-push hook:
- Runs tests before allowing a push to any branch
- Prevents pushes if tests fail
- Ensures code quality is maintained across all branches

## Troubleshooting

If you encounter issues with the hooks:

1. Ensure Node.js is installed and available in your PATH
2. Check that the hooks are executable: `ls -la .git/hooks/`
3. Manually reinstall the hooks: `npm run install-hooks`
4. If needed, temporarily disable specific hooks:
   - Pre-commit: `chmod -x .git/hooks/pre-commit`
   - Update: `chmod -x .git/hooks/update`
   - Pre-push: `chmod -x .git/hooks/pre-push`
5. To re-enable a hook: `chmod +x .git/hooks/hook-name`

## Common Issues

### "Error: Cannot find module"

This usually indicates a missing dependency. Try running:

```bash
npm install
```

### "Permission denied" when running hooks

Fix by making the hooks executable:

```bash
chmod +x .git/hooks/*
```

### Git hooks not running at all

Ensure hooks are correctly installed and executable:

```bash
ls -la .git/hooks/
npm run install-hooks
```
