#!/bin/bash

# Cycled health reminder script
suggestions=(
  "🧠  Look far away for 20 seconds (20-20-20)"
  "🦵  Seated or standing leg lifts"
  "🧘  Gentle neck rolls or head tilt"
)

index=0

echo -e "\n✅ Health reminder script started (cycled mode). First tip in 30 minutes.\n"
# Gracefully handle script termination
trap 'printf "\n🛑 Health reminder script exiting.\n"; exit 0' SIGINT SIGTERM

while true; do
    # … rest of your loop …
while true; do
  sleep 1800
  tput bel
  echo -e "\n==================== HEALTH REMINDER ====================\n"
  echo -e "${suggestions[$index]}\n"
  echo -e "=========================================================\n"
  index=$(( (index + 1) % ${#suggestions[@]} ))
done
