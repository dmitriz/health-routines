#!/bin/bash

    # Handles script termination by printing a farewell message and exiting cleanly.
    #
    # Outputs:
    #
    # * Prints a goodbye message to STDOUT when the script is interrupted or terminated.
    #
    # Returns:
    #
    # * Exits the script with status 0.
    #
    # Example:
    #
    # ```bash
    # trap cleanup INT TERM
    # ```
    cleanup() {
        echo -e "\n👋 Exiting health reminder script. Stay healthy!"
        exit 0 # Exit successfully
    }

    # Trap INT (Ctrl+C) and TERM (kill) signals
    trap cleanup INT TERM

    # Define default suggestions
    suggestions=(
      "🧠  Look at a tree 20+ feet away for 20 seconds"
      "🦵  Do 5 slow squats (3 sec down, 2 sec up)"
      "🧘  Stretch your neck gently – left and right"
      "😌  Close your eyes and relax for 30 seconds"
      "↔️  Roll your shoulders forward and back 10 times"
    )

    # Allow suggestions to be loaded from a file if SUGGESTIONS_FILE env var is set
    if [[ -n "$SUGGESTIONS_FILE" && -f "$SUGGESTIONS_FILE" ]]; then
        suggestions=()
        while IFS= read -r line; do
            [[ -z "$line" || "$line" =~ ^# ]] && continue
            suggestions+=("$line")
        done < "$SUGGESTIONS_FILE"
    fi

    # Check if suggestions array is empty
    if [ ${#suggestions[@]} -eq 0 ]; then
        echo "Error: No health suggestions found. Please check SUGGESTIONS_FILE or the default list." >&2
        exit 1
    fi

    # Default interval is 30 minutes (1800 seconds)
    REMINDER_INTERVAL=${REMINDER_INTERVAL:-1800}

    # Check if interval is a positive integer
    if ! [[ "$REMINDER_INTERVAL" =~ ^[0-9]+$ ]] || [ "$REMINDER_INTERVAL" -le 0 ]; then
        echo "Error: Invalid REMINDER_INTERVAL '$REMINDER_INTERVAL'. Must be a positive integer." >&2
        exit 1
    fi

    echo -e "
✅ Health reminder script started. You’ll get a reminder every $((REMINDER_INTERVAL / 60)) minutes.
"

    # Main loop to provide periodic reminders
    while true; do
      sleep "$REMINDER_INTERVAL"
      tput bel  # Attempt terminal bell first
      echo -e "
\033[1;33m==================== HEALTH REMINDER ====================\033[0m
"
      suggestion=${suggestions[$RANDOM % ${#suggestions[@]}]}
      echo -e "$suggestion
"
      echo -e "\033[1;33m=========================================================\033[0m
"
    done
