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
git commit -m "fix: remove unused import in vite.config.ts and fix build"
echo.

echo 4. Git Push to GitHub:
git push origin main
echo.

echo ===================================================
echo    DEPLOY FINISHED!
echo    - Check GitHub Actions: https://github.com/nguan08/landmarks/actions
echo    - Wait 1-2 mins for green checkmark, then Ctrl+F5 on landmarks.work
echo ===================================================
echo.
pause
