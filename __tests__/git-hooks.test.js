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

  describe('update hook', () => {
    it('should verify protected branch names (main/master) are checked', () => {
      const hookContent = fs.readFileSync(path.join(hooksDir, 'update'), 'utf8');
      expect(hookContent).toContain('main');
      expect(hookContent).toContain('master');
    });

    it('should verify merge status to prevent direct pushes to protected branches', () => {
      const hookContent = fs.readFileSync(path.join(hooksDir, 'update'), 'utf8');
      expect(hookContent).toContain('git rev-parse');
    });
  });

  describe('pre-push hook', () => {
    it('should run tests before push to ensure code quality', () => {
      const hookContent = fs.readFileSync(path.join(hooksDir, 'pre-push'), 'utf8');
      expect(hookContent).toContain('npm test');
      expect(hookContent).toContain('Running tests before push');
    });

    it('should block push if tests fail to maintain code quality', () => {
      const hookContent = fs.readFileSync(path.join(hooksDir, 'pre-push'), 'utf8');
      expect(hookContent).toContain('TEST_RESULT=$?');
      expect(hookContent).toContain('exit 1');
    });
  });
});
