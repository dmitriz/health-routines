# Daily Health + Focus System (v0.2)

This document defines a minimal, resilient system to maintain physical and cognitive focus during work, especially while writing and coding. It evolves gradually with live feedback.

---

## ✅ Current Reminders (Cycled)

These activities run on a 30-minute cycle via terminal script with a subtle bell and text cue.

1. 🧠  **Look far away** (20-20-20 rule)  
   - Every 30 mins, look at something ≥20 feet away for ≥20 seconds  
   - Bonus: alternate near/far focus to train accommodation reflex

2. 🦵  **Leg lifts** (seated or standing)  
   - Gently lift knees or legs while seated or standing  
   - Replaces squats (squats removed due to back tension)

3. 🧘  **Neck stretch or head tilt**  
   - Gentle left/right head tilt, or slow rotation  
   - Roll shoulders if feeling stiff

💡 *These cycle in order, not randomly.*

---

## 🛠️ Scripts

### `reminder.sh`

- Bash script that beeps + prints one activity every 30 mins
- Runs in terminal or background (via `pm2`)
- Uses `tput bel` for a subtle bell; no external sound files

**Planned additions:**

- Optional logging or timestamp
- GUI notification version
- Cross-platform variants

---

## 🧾 Notes and Rationale

- ✅ Simplicity > completeness  
- ✅ Designed to **minimize decision fatigue**  
- ❌ Squats removed (v0.1 → v0.2) due to back strain  
- 🔄 Routine adapts to actual experience  
- 🧠 This is a *thinking system*, not just a checklist

---

## 🧭 Next Steps

- Create a lightweight dashboard or script to rotate reminders and log responses
- Optional: integrate with GitHub Actions, Obsidian, or local Notion backup
- Long-term: explore mobile notification fallback (e.g. Termux or Android reminder app)
