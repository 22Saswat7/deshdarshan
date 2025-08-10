@echo off
echo.
echo ========================================
echo   DeshDarshan GitHub Push Helper
echo ========================================
echo.

echo Please follow these steps:
echo.
echo 1. Create a new repository on GitHub:
echo    - Go to: https://github.com/new
echo    - Name: deshdarshan
echo    - Set as Public
echo    - Don't initialize with README
echo.

set /p username="Enter your GitHub username: "
echo.

echo 2. Adding GitHub remote...
git remote add origin https://github.com/%username%/deshdarshan.git

echo.
echo 3. Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo   Repository pushed to GitHub!
echo ========================================
echo.
echo Next steps:
echo 1. Go to vercel.com and sign in with GitHub
echo 2. Import your deshdarshan repository
echo 3. Deploy frontend (set root directory to 'frontend')
echo 4. Deploy backend (set root directory to 'backend')
echo 5. Add environment variables as shown in DEPLOYMENT_GUIDE.md
echo.
echo Your repository URL: https://github.com/%username%/deshdarshan
echo.
pause
