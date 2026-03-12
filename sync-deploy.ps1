$ErrorActionPreference = "Stop"

# Configuration
$url1 = "https://github.com/Astraweb-co-in/Enspired_Magazine_Dev.git"
$url2 = "https://github.com/abhassj/Enspired_Magazine_Dep.git"
$commitPrefix = "Sync changes from parent repo"

Write-Host "`n>>> Starting synchronization process..." -ForegroundColor Cyan

# Step 1: Pull from DEV repo
Write-Host "`n[1/6] Pulling from DEV repo..." -ForegroundColor Yellow
git remote set-url origin $url1
git pull origin main

# Step 2: Pull from DEPLOY repo
Write-Host "`n[2/6] Pulling from DEPLOY repo..." -ForegroundColor Yellow
git remote set-url origin $url2
# Using --rebase to keep history clean if there are minor changes in dep
git pull origin main --rebase

# Step 3: Run the build command and check for errors
Write-Host "`n[3/6] Running build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[!] Build failed. Fix type errors before pushing." -ForegroundColor Red
    # Restore DEV repo URL before exiting
    git remote set-url origin $url1
    exit 1
}

# Step 4: Determine the latest commit number
Write-Host "`n[4/6] Determining sync version..." -ForegroundColor Yellow
$lastCommitMsg = git log -1 --pretty=%B
$commitNumber = 1

if ($lastCommitMsg -match "$commitPrefix\s+(\d+)") {
    $commitNumber = [int]$matches[1] + 1
}
$commitMessage = "$commitPrefix $commitNumber"

# Step 5: Commit and push to DEPLOY repo
Write-Host "`n[5/6] Committing and pushing to DEPLOY repo..." -ForegroundColor Yellow
git add .
# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    git commit -m "$commitMessage"
    git push origin main
} else {
    Write-Host "No changes detected to sync." -ForegroundColor Gray
}

# Step 6: Restore DEV repo URL
Write-Host "`n[6/6] Restoring DEV repo URL..." -ForegroundColor Yellow
git remote set-url origin $url1

Write-Host "`n[DONE] Build passed and changes synchronized successfully!" -ForegroundColor Green
Write-Host "Sync Commit: $commitMessage`n" -ForegroundColor Green
