const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Git Hooks', () => {
  const hooksDir = path.join(__dirname, '../.git/hooks');
  const testFile = 'test-file.txt';

  beforeAll(() => {
    // Create a test file
    fs.writeFileSync(testFile, 'test content');
    execSync('git add test-file.txt');
  });

  afterAll(() => {
    // Clean up
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  describe('pre-commit hook', () => {
    it('should be executable', () => {
      const hookPath = path.join(hooksDir, 'pre-commit');
      expect(fs.existsSync(hookPath)).toBe(true);
      
      const stats = fs.statSync(hookPath);
      expect(stats.mode & 0o111).toBeTruthy();
    });

    it('should contain JavaScript code', () => {
      const hookContent = fs.readFileSync(path.join(hooksDir, 'pre-commit'), 'utf8');
      expect(hookContent).toContain('require');
      expect(hookContent).toContain('execSync');
      expect(hookContent).toContain('existsSync');
    });

    it('should require gitignore patterns', () => {
      const hookContent = fs.readFileSync(path.join(hooksDir, 'pre-commit'), 'utf8');
      expect(hookContent).toContain('node_modules/');
      expect(hookContent).toContain('.env');
      expect(hookContent).toContain('dist/');
    });
  });

  describe('update hook', () => {
    it('should be executable', () => {
      const hookPath = path.join(hooksDir, 'update');
      expect(fs.existsSync(hookPath)).toBe(true);
      
      const stats = fs.statSync(hookPath);
      expect(stats.mode & 0o111).toBeTruthy();
    });

    it('should check for main/master branches', () => {
      const hookContent = fs.readFileSync(path.join(hooksDir, 'update'), 'utf8');
      expect(hookContent).toContain('refs/heads/main');
      expect(hookContent).toContain('refs/heads/master');
    });

    it('should verify merge status', () => {
      const hookContent = fs.readFileSync(path.join(hooksDir, 'update'), 'utf8');
      expect(hookContent).toContain('git rev-parse');
    });
  });
  
  describe('pre-push hook', () => {
    it('should be executable', () => {
      const hookPath = path.join(hooksDir, 'pre-push');
      expect(fs.existsSync(hookPath)).toBe(true);
      
      const stats = fs.statSync(hookPath);
      expect(stats.mode & 0o111).toBeTruthy();
    });

    it('should run tests before push', () => {
      const hookContent = fs.readFileSync(path.join(hooksDir, 'pre-push'), 'utf8');
      expect(hookContent).toContain('npm test');
      expect(hookContent).toContain('Running tests before push');
    });

    it('should block push if tests fail', () => {
      const hookContent = fs.readFileSync(path.join(hooksDir, 'pre-push'), 'utf8');
      expect(hookContent).toContain('TEST_RESULT=$?');
      expect(hookContent).toContain('exit 1');
    });
  });
});
