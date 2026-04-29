# Cleanup script for Prestige Advisory website

# Remove test and temporary files
Remove-Item -Path "test-logo.html" -ErrorAction SilentlyContinue
Remove-Item -Path "team-section.html" -ErrorAction SilentlyContinue
Remove-Item -Path "images\txt.txt" -ErrorAction SilentlyContinue

# Clean dist directory
if (Test-Path "dist") {
    Remove-Item -Path "dist\*" -Recurse -Force
}

# Create fresh dist directory structure
New-Item -ItemType Directory -Force -Path "dist"
New-Item -ItemType Directory -Force -Path "dist\css"
New-Item -ItemType Directory -Force -Path "dist\js"
New-Item -ItemType Directory -Force -Path "dist\images"

# Copy necessary files to dist
Copy-Item -Path "index.html" -Destination "dist\"
Copy-Item -Path "css\*" -Destination "dist\css\" -Recurse
Copy-Item -Path "js\*" -Destination "dist\js\" -Recurse
Copy-Item -Path "images\*" -Destination "dist\images\" -Recurse

# Remove any .DS_Store files (common on macOS)
Get-ChildItem -Path . -Include ".DS_Store" -Recurse -Force | Remove-Item -Force

Write-Host "Project cleaned and ready for upload!" -ForegroundColor Green
