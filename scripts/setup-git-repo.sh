#!/bin/bash

# MuleSoft to Spring Boot Migration - Git Repository Setup
# Run this script in Git Bash from the project root directory

echo "=========================================="
echo "Git Repository Setup for MuleSoft → Spring Boot Migration"
echo "=========================================="

# Step 1: Check if Git is installed
echo ""
echo "Step 1: Verifying Git installation..."
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed or not in PATH."
    echo "   Please install Git from: https://git-scm.com/download/win"
    exit 1
fi
echo "✅ Git version: $(git --version)"

# Step 2: Initialize repository if needed
echo ""
echo "Step 2: Initializing Git repository..."
if [ ! -d .git ]; then
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Step 3: Verify embedded repository is removed
echo ""
echo "Step 3: Checking for embedded .git in integration-visualizer..."
if [ -d integration-visualizer/.git ]; then
    echo "⚠️  Embedded .git found. Removing..."
    rm -rf integration-visualizer/.git
    echo "✅ Removed embedded .git from integration-visualizer"
else
    echo "✅ No embedded .git found"
fi

# Step 4: Create .gitignore if it doesn't exist
echo ""
echo "Step 4: Creating/updating .gitignore..."
cat > .gitignore << 'EOL'
# Maven
target/
!.mvn/wrapper/maven-wrapper.jar
*.jar
*.war
*.ear
*.zip
*.tar.gz
*.rar

# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*
lerna-debug.log*
.next/
.vercel
out/

# Logs
logs/
*.log

# IDE
.idea/
.vscode/
*.swp
*.swo
*~
.DS_Store
*.iml
*.ipr
*.iws

# OS
Thumbs.db
.DS_Store

# Build artifacts
dist/
build/
coverage/

# Environment files
.env.local
.env.*.local

# Temporary files
*.tmp
*.bak
*.cache
.cache/

# Java
*.class
.classpath
.project
.settings/
bin/
EOL
echo "✅ .gitignore created/updated"

# Step 5: Stage all files
echo ""
echo "Step 5: Staging all files..."
git add .
echo "✅ Files staged"

# Step 6: Show status
echo ""
echo "Step 6: Git status:"
git status

# Step 7: Create initial commit
echo ""
echo "Step 7: Creating initial commit..."
read -p "Enter commit message (default: 'Initial commit: MuleSoft to Spring Boot migration prototype'): " commit_msg
commit_msg=${commit_msg:-"Initial commit: MuleSoft to Spring Boot migration prototype"}
git commit -m "$commit_msg"
echo "✅ Initial commit created"

# Step 8: Rename branch to main
echo ""
echo "Step 8: Renaming branch to 'main'..."
git branch -M main
echo "✅ Branch renamed to 'main'"

# Step 9: Add remote origin
echo ""
echo "Step 9: Adding remote repository..."
echo "Please create a repository on GitHub first, then provide the URL."
read -p "Enter GitHub repository URL (e.g., https://github.com/username/repo.git): " repo_url

if [ -z "$repo_url" ]; then
    echo "⚠️  No URL provided. Skipping remote setup."
    echo "   You can add it later with: git remote add origin <URL>"
else
    # Check if remote already exists
    if git remote | grep -q "^origin$"; then
        echo "⚠️  Remote 'origin' already exists. Updating URL..."
        git remote set-url origin "$repo_url"
    else
        git remote add origin "$repo_url"
    fi
    echo "✅ Remote origin added: $repo_url"
    
    # Step 10: Push to remote
    echo ""
    echo "Step 10: Pushing to remote repository..."
    read -p "Push to remote now? (y/n): " push_confirm
    if [ "$push_confirm" = "y" ] || [ "$push_confirm" = "Y" ]; then
        git push -u origin main
        echo "✅ Code pushed to remote repository"
    else
        echo "⏭️  Skipped push. You can push later with: git push -u origin main"
    fi
fi

# Step 11: Create version tag
echo ""
echo "Step 11: Creating version tag..."
read -p "Create v1.0.0 tag? (y/n): " tag_confirm
if [ "$tag_confirm" = "y" ] || [ "$tag_confirm" = "Y" ]; then
    git tag -a v1.0.0 -m "Initial prototype: MuleSoft to Spring Boot migration"
    echo "✅ Tag v1.0.0 created"
    
    if [ ! -z "$repo_url" ]; then
        read -p "Push tag to remote? (y/n): " push_tag_confirm
        if [ "$push_tag_confirm" = "y" ] || [ "$push_tag_confirm" = "Y" ]; then
            git push origin v1.0.0
            echo "✅ Tag pushed to remote"
        fi
    fi
fi

# Summary
echo ""
echo "=========================================="
echo "✅ Git Repository Setup Complete!"
echo "=========================================="
echo ""
echo "Repository Summary:"
echo "  • Branch: main"
echo "  • Remote: ${repo_url:-'(not configured)'}"
echo "  • Last commit: $(git log -1 --oneline)"
echo ""
echo "Next Steps:"
echo "  1. Verify repository on GitHub"
echo "  2. Add collaborators if needed"
echo "  3. Setup branch protection rules"
echo "  4. Configure GitHub Actions for CI/CD (optional)"
echo ""
echo "Useful Commands:"
echo "  • View status: git status"
echo "  • View log: git log --oneline --graph"
echo "  • View remote: git remote -v"
echo "  • Push changes: git push origin main"
echo ""
