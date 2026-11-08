@echo off
cd /d "C:\Users\nguan\Desktop\Desk\landmarks"
cls
echo ===================================================
echo    LANDMARKS.WORK - GIT AUTO DEPLOY
echo ===================================================
echo.

echo 1. Git Status:
git status
echo.

echo 2. Git Add:
git add .
echo.

echo 3. Git Commit:
git commit -m "update chapter 1 and chapter 2 animation styles"
echo.

echo 4. Git Push to GitHub:
git push origin main
echo.

echo ===================================================
echo    DEPLOY FINISHED!
echo    - If push was successful, wait 1-2 mins for GitHub
echo    - Then refresh https://landmarks.work with Ctrl+F5
echo ===================================================
echo.
pause
