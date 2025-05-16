# Health Routines & Resilience System

This repository is an evolving system for:

- Maintaining deep focus during cognitively demanding work
- Reducing mental fatigue through body-aware habits
- Building sustainable, low-friction daily routines

It evolves incrementally, based on actual use and experience.

---

## Git Hooks

This repository includes Git hooks to maintain code quality:

### Pre-commit Hook
- **Location**: `.git/hooks/pre-commit`
- **Purpose**: Runs tests before allowing a commit
- **To disable**: `chmod -x .git/hooks/pre-commit`
- **To enable**: `chmod +x .git/hooks/pre-commit`

### Pre-push Hook
- **Location**: `.git/hooks/pre-push`
- **Purpose**: Runs tests before allowing a push
- **To disable**: `chmod -x .git/hooks/pre-push`
- **To enable**: `chmod +x .git/hooks/pre-push`

### Verifying Hooks
To verify the hooks are working:

1. Make a small change to a test file
2. Try to commit:
   ```bash
   git add .
   git commit -m "Test commit"
   ```
3. The pre-commit hook should run tests automatically if a test script is defined in package.json
4. If tests pass, commit succeeds. If they fail, commit is blocked

## ✅ Core Components

### 1. `/log/` – Reflections, Notes, Daily Progress
Use this folder to track:
- Daily logs (`YYYY-MM-DD-log.md`)
- Thinking snapshots
- Decisions or events worth remembering

➡ <a href="https://github.com/dmitriz/health-routines/new/main/log?filename=YYYY-MM-DD-log.md" onclick="this.href=this.href.replace('YYYY-MM-DD', new Date().toISOString().slice(0,10))">Create new log</a> (auto-dated)

---

### 2. 📥 Inbox (GitHub Issues)
Capture ideas, tasks, or notes quickly via issues.

➡ [Open new inbox item](https://github.com/dmitriz/health-routines/issues/new)

You can later triage, promote to files, or group related issues.

---

### 3. **Routine Plan**
Live routine logic and scripts: reminders, eye care, movement, break cycles.

- [Routine Plan (Issue)](https://github.com/dmitriz/health-routines/issues/5)
- [Planned script path](scripts/health_reminder_cycle.sh) *(coming soon)*

Includes:
- Current movement reminders
- Bash script logic
- Version notes (v0.2)
- Next step ideas

---

## 🔜 Scripts & Automation (Planned)

Scripts in development include:
- 🔜 `health_reminder_cycle.sh` – terminal reminder script
- 🔜 GitHub Action to auto-create daily log
- 🔜 Log summarizer or triage script

---

## 🧠 Principles

- Low friction: no setup, no bloat
- Modular: routines grow piece by piece
- Honest: discard what doesn't work
- Lightweight: text-based, portable, easy to maintain

---

## 🔄 Getting Started

You can begin by:
- Opening an [inbox issue](https://github.com/dmitriz/health-routines/issues/new)
- Creating a [daily log](https://github.com/dmitriz/health-routines/new/main/log?filename=<YYYY-MM-DD>-log.md) (manually update date in filename)
- Running the health reminder script (coming soon)

No formal structure needed. This is your system.
