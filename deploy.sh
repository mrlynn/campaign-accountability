#!/bin/bash
# Prompt for commit message
echo "Enter your commit message:"
read commit_message

# Add all changes
git add .

# Commit with the provided message
git commit -m "$commit_message"

# Push to main branch
git push origin main

echo "Deployment complete!"