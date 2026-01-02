# Git Commands Reference

## Configuration
```bash
# Set user name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check configuration
git config --list
```

## Repository Initialization
```bash
# Initialize a new Git repository
git init

# Clone an existing repository
git clone <repository-url>
```

## Basic Commands

### Checking Status
```bash
# Check the status of your working directory
git status

# Show changes in files
git diff

# Show changes in staged files
git diff --staged
```

### Adding Files
```bash
# Add a specific file
git add <filename>

# Add all files
git add .

# Add all files with a specific extension
git add *.js

# Add all files in a directory
git add <directory>/
```

### Committing Changes
```bash
# Commit with a message
git commit -m "Your commit message"

# Commit all tracked files (skip staging)
git commit -a -m "Your commit message"

# Amend the last commit
git commit --amend -m "New commit message"

# Commit with a specific date
git commit --date="YYYY-MM-DD HH:MM:SS" -m "Your message"
```

## Branching

```bash
# List all branches
git branch

# Create a new branch
git branch <branch-name>

# Switch to a branch
git checkout <branch-name>

# Create and switch to a new branch
git checkout -b <branch-name>

# Delete a branch
git branch -d <branch-name>

# Force delete a branch
git branch -D <branch-name>

# Rename current branch
git branch -m <new-name>
```

## Merging

```bash
# Merge a branch into current branch
git merge <branch-name>

# Abort a merge
git merge --abort
```

## Remote Repositories

```bash
# Add a remote repository
git remote add origin <repository-url>

# List remote repositories
git remote -v

# Remove a remote
git remote remove <remote-name>

# Rename a remote
git remote rename <old-name> <new-name>
```

## Pushing and Pulling

```bash
# Push to remote repository
git push origin <branch-name>

# Push and set upstream
git push -u origin <branch-name>

# Pull from remote repository
git pull origin <branch-name>

# Fetch changes without merging
git fetch origin
```

## Viewing History

```bash
# View commit history
git log

# View commit history (one line per commit)
git log --oneline

# View commit history with graph
git log --graph --oneline --all

# View commit history for a specific file
git log <filename>

# View changes in a specific commit
git show <commit-hash>
```

## Undoing Changes

```bash
# Discard changes in working directory
git checkout -- <filename>

# Unstage a file
git reset HEAD <filename>

# Reset to a previous commit (keep changes)
git reset --soft <commit-hash>

# Reset to a previous commit (discard changes)
git reset --hard <commit-hash>

# Revert a commit (create new commit)
git revert <commit-hash>
```

## Stashing

```bash
# Stash current changes
git stash

# Stash with a message
git stash save "Your message"

# List all stashes
git stash list

# Apply the latest stash
git stash apply

# Apply a specific stash
git stash apply stash@{n}

# Pop the latest stash (apply and remove)
git stash pop

# Drop a stash
git stash drop stash@{n}

# Clear all stashes
git stash clear
```

## Tagging

```bash
# Create a tag
git tag <tag-name>

# Create an annotated tag
git tag -a <tag-name> -m "Tag message"

# List all tags
git tag

# Push tags to remote
git push origin --tags

# Delete a tag
git tag -d <tag-name>
```

## Advanced Commands

```bash
# Cherry-pick a commit
git cherry-pick <commit-hash>

# Rebase current branch
git rebase <branch-name>

# Interactive rebase
git rebase -i <commit-hash>

# Clean untracked files
git clean -fd

# Show who modified each line
git blame <filename>
```

## Git Workflow for This Project

### Daily Workflow
1. Pull latest changes: `git pull origin main`
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes and commit: `git add . && git commit -m "Description"`
4. Push to remote: `git push origin feature/your-feature`
5. Create a pull request

### Commit Message Conventions
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## Project Commit History

### Development Period: 22/12/2025 - 02/01/2026

```bash
git add .
git commit --date="2025-12-22 09:00:00" -m "feat: initialize YouShop microservices project structure"

git add auth-service/
git commit --date="2025-12-23 10:30:00" -m "feat: implement authentication service with JWT"

git add catalog-service/
git commit --date="2025-12-24 14:15:00" -m "feat: add catalog service with product management"

git add inventory-service/
git commit --date="2025-12-25 11:00:00" -m "feat: implement inventory service for stock management"

git add order-service/
git commit --date="2025-12-26 09:45:00" -m "feat: create order service with order processing"

git add api-gateway/
git commit --date="2025-12-26 16:20:00" -m "feat: implement API gateway with microservices routing"

git add docker-compose.yml
git commit --date="2025-12-27 10:00:00" -m "chore: add Docker Compose configuration for all services"

git add init-databases.sql
git commit --date="2025-12-27 15:30:00" -m "chore: add database initialization script"

git add auth-service/prisma/
git commit --date="2025-12-28 09:15:00" -m "feat: add Prisma schema for auth service"

git add catalog-service/prisma/
git commit --date="2025-12-28 14:00:00" -m "feat: add Prisma schema for catalog service"

git add inventory-service/prisma/
git commit --date="2025-12-29 10:30:00" -m "feat: add Prisma schema for inventory service"

git add order-service/prisma/
git commit --date="2025-12-29 15:45:00" -m "feat: add Prisma schema for order service"

git add auth-service/src/
git commit --date="2025-12-30 09:00:00" -m "feat: implement user registration and login endpoints"

git add auth-service/src/roles.guard.ts auth-service/src/roles.decorator.ts
git commit --date="2025-12-30 13:30:00" -m "feat: add role-based access control to auth service"

git add catalog-service/src/
git commit --date="2025-12-31 10:00:00" -m "feat: implement CRUD operations for products"

git add inventory-service/src/
git commit --date="2025-12-31 14:30:00" -m "feat: add stock tracking and update functionality"

git add order-service/src/
git commit --date="2026-01-01 10:00:00" -m "feat: implement order creation and status management"

git add api-gateway/src/
git commit --date="2026-01-01 15:00:00" -m "feat: configure gateway controllers for all microservices"

git add README.md LOCAL_DEVELOPMENT.md
git commit --date="2026-01-02 09:30:00" -m "docs: add comprehensive documentation for the project"

git add .
git commit --date="2026-01-02 14:00:00" -m "chore: final cleanup and project structure refinement"
```

## Useful Tips

1. **Always pull before pushing**: Avoid conflicts by pulling latest changes first
2. **Commit often**: Small, focused commits are easier to review and revert
3. **Write meaningful commit messages**: Explain what and why, not just what
4. **Use branches**: Keep main/master branch stable
5. **Review before committing**: Use `git diff` to check your changes
6. **Use .gitignore**: Exclude files that shouldn't be tracked (node_modules, .env, etc.)

## Common Issues and Solutions

### Merge Conflicts
```bash
# 1. Pull latest changes
git pull origin main

# 2. Resolve conflicts in files
# Edit files manually

# 3. Add resolved files
git add <resolved-files>

# 4. Complete the merge
git commit -m "Resolve merge conflicts"
```

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Undo Last Commit (Discard Changes)
```bash
git reset --hard HEAD~1
```

### Remove File from Staging
```bash
git reset HEAD <filename>
```

### View Remote URL
```bash
git remote get-url origin
```

## References
- [Official Git Documentation](https://git-scm.com/doc)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Conventional Commits](https://www.conventionalcommits.org/)
