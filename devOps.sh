#!/bin/bash

# Array of styles
figletstyles=("banner" "big" "block" "bubble" "digital" "ivrit" "lean" "mini" "mnemonic" "script" "shadow" "slant" "small" "smscript" "smshadow" "smslant" "standard" "term")
cowsaystyles=("apt" "bud-frogs" "bunny" "calvin" "cheese" "cock" "cower" "daemon" "default" "dragon" "dragon-and-cow" "duck" "elephant" "elephant-in-snake" "eyes" "flaming-sheep" "fox" "ghostbusters" "gnu" "hellokitty" "kangaroo" "kiss" "koala" "kosh" "luke-koala" "mech-and-cow" "milk" "moofasa" "moose" "pony" "pony-smaller" "ren" "sheep" "skeleton" "snowman" "stegosaurus" "stimpy" "suse" "three-eyes" "turkey" "turtle" "tux" "unipony" "unipony-smaller" "vader" "vader-koala" "www")
toiletfilters=("crop" "gay" "metal" "flip" "flop" "180" "left" "right" "border")

# Randomly select styles
random_figlet_style=${figletstyles[$RANDOM % ${#figletstyles[@]}]}
random_cowsay_style=${cowsaystyles[$RANDOM % ${#cowsaystyles[@]}]}
random_toilet_filter=${toiletfilters[$RANDOM % ${#toiletfilters[@]}]}

# Display Git'er Wizard message with a random style
if ((RANDOM % 2 == 0)); then
    figlet -f "$random_figlet_style" "Git'er Wizard"
else
    toilet -f big -F "$random_toilet_filter" "Git'er Wizard"
fi

# Display a fortune inside a message with a random animal using Cowsay
fortune | cowsay -f "$random_cowsay_style"

if [ "$#" -eq 0 ]; then
    toilet -F gay "arg error!"

    # Ask for a commit message using Toilet with random formatting options or use provided argument
    echo "Enter your commit message:"
    read -r commitMessage
    [ -z "$commitMessage" ] && commitMessage="$1"

else

    # Ask the user for a commit message
    select option in "Use provided argument" "Set a new message" "Exit"; do
        case $option in
        "Use provided argument")
            commitMessage="$1"
            break
            ;;
        "Set a new message")
            echo "Enter your commit message:"
            read -r commitMessage
            break
            ;;
        "Exit")
            toilet -f gay "No commit message provided. Exiting..."
            exit 1
            ;;
        *) echo "Invalid option. Please select again." ;;
        esac
    done
fi

# Commit changes and push to Git if a commit message is provided
if [ -z "$commitMessage" ]; then
    echo "No commit message provided. Exiting..."
else
    git add .
    git commit -m "$commitMessage"
    git push
fi
