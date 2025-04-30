#!/bin/bash

suggestions=(
  "🧠  Look at a tree 20+ feet away for 20 seconds"
  "🦵  Do 5 slow squats (3 sec down, 2 sec up)"
  "🧘  Stretch your neck gently – left and right"
  "😌  Close your eyes and relax for 30 seconds"
  "↔️  Roll your shoulders forward and back 10 times"
)

echo -e "\n✅ Health reminder script started (WSL mode). You’ll get a reminder every 30 minutes.\n"

while true; do
  sleep 1800
  tput bel  # This may blink or silently fail in WSL
  echo -e "\n\033[1;33m==================== HEALTH REMINDER ====================\033[0m\n"
  suggestion=${suggestions[$RANDOM % ${#suggestions[@]}]}
  echo -e "$suggestion\n"
  echo -e "\033[1;33m=========================================================\033[0m\n"
done
