# Health Routines & Resilience System

This repository is an evolving system for:

- Maintaining deep focus during cognitively demanding work
- Reducing mental fatigue through body-aware habits
- Building sustainable, low-friction daily routines

It evolves incrementally, based on actual use and experience.

---

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

## 🧪 Testing

This project uses `pytest` for unit testing the modules defined in `specs/modules.md`. The tests aim to ensure the reliability and correctness of each module's functionality.

### Running Tests

1.  **Install Dependencies**: If you haven't already, install the necessary dependencies, including `pytest`:
    ```bash
    pip install -r requirements.txt
    ```
2.  **Execute Tests**: Run the tests using the provided script from the root of the repository:
    ```bash
    ./run_tests.sh
    ```
    Alternatively, you can run `pytest` directly:
    ```bash
    pytest
    ```

### Test Structure

-   Tests are located in the `tests/` directory.
-   Each module (e.g., `triage_message`, `generate_solution`) has its own subdirectory within `tests/` (e.g., `tests/triage_message/`).
-   Test files are named `test_<module_name>.py` (e.g., `test_triage_message.py`).
-   Test functions within these files are named `test_<functionality>()`.

### Contributing New Tests

When adding new features or fixing bugs, please include corresponding tests:

1.  **Locate or Create Test File**: If you are modifying an existing module, add tests to its existing test file in `tests/<module_name>/`. If it's a new module, create a new subdirectory and test file accordingly.
2.  **Write Tests**: Follow the naming conventions described above. Ensure your tests cover:
    - Core functionality.
    - Edge cases (e.g., empty inputs, invalid inputs).
    - Expected successful outcomes.
    - Expected failure modes or error handling.
3.  **Run Tests**: Ensure all tests pass, including the ones you've added, by running `./run_tests.sh`.

Currently, the tests are placeholders as the actual module implementations are not yet available. These will be updated as the modules are developed.

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
