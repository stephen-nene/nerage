#!/bin/bash

# Check if the current directory is a Git repository
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
    echo "Error: The current directory is not a Git repository."
    exit 1
fi

if [[ "$1" == "--help" || "$1" == "-h" ]]; then
    echo "Usage: git-wizard [commit-message]"
    echo "Runs a Git commit wizard in the current repository."
    exit 0
fi


# Array of styles
figletstyles=("banner" "big" "block" "bubble" "digital" "ivrit" "lean" "mini" "mnemonic" "script" "shadow" "slant" "small" "smscript" "smshadow" "smslant" "standard" "term")
cowsaystyles=("apt" "bud-frogs" "bunny" "calvin" "cheese" "cock" "cower" "daemon" "default" "dragon" "dragon-and-cow" "duck" "elephant" "elephant-in-snake" "eyes" "flaming-sheep" "fox" "ghostbusters" "gnu" "hellokitty" "kangaroo" "kiss" "koala" "kosh" "luke-koala" "mech-and-cow" "milk" "moofasa" "moose" "pony" "pony-smaller" "ren" "sheep" "skeleton" "snowman" "stegosaurus" "stimpy" "suse" "three-eyes" "turkey" "turtle" "tux" "unipony" "unipony-smaller" "vader" "vader-koala" "www")
toiletfilters=("crop" "gay" "metal" "flip" "flop" "180" "left" "right" "border")

# Function to check if a command exists
command_exists() {
    command -v "$1" &>/dev/null
}

# Function to show styled message
show_random_style() {
    local text="$1"
    if command_exists figlet; then
        figlet -f "${figletstyles[RANDOM % ${#figletstyles[@]}]}" "$text"
    elif command_exists toilet; then
        toilet -f big -F "${toiletfilters[RANDOM % ${#toiletfilters[@]}]}" "$text"
    else
        echo "$text"
    fi
}

# Main script logic

# Check for Git
if ! command_exists git; then
    echo "Error: Git is not installed. Please install Git and try again."
    exit 1
fi

# Show styled message
show_random_style "Git'er Wizard"

# Display a fortune with Cowsay or fallback to plain fortune
if command_exists fortune && command_exists cowsay; then
    fortune | cowsay -f "${cowsaystyles[RANDOM % ${#cowsaystyles[@]}]}"
elif command_exists fortune; then
    fortune
else
    echo "No fortune available, skipping..."
fi



# Commit message handling
commitMessage=""
if [ -n "$1" ]; then
    commitMessage="$1"
else
    echo "Enter your commit message:"
    read -r commitMessage
fi

if [ -z "$commitMessage" ]; then
    echo "No commit message provided. Exiting..."
    exit 1
fi

# Git operations
git add .
git commit -m "$commitMessage"

echo "Would you like to push the changes now? (y/n)"
read -r pushConfirm
if [[ "$pushConfirm" =~ ^[Yy]$ ]]; then
    git push
else
    echo "Changes committed locally. Push skipped."
fi
