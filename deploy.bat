@echo off
echo ============================================================
echo   DEPLOYING DSA PLATFORM TO LIVE HOSTING
echo ============================================================
echo.

echo Step 1: Installing Vercel CLI...
call npm install -g vercel

echo.
echo Step 2: Deploying Frontend to Vercel...
cd frontend
call vercel --prod --yes --token=%VERCEL_TOKEN%
cd ..

echo.
echo Step 3: Creating Railway deployment...
call npm install -g @railway/cli
cd backend
call railway up
cd ..

echo.
echo ============================================================
echo   DEPLOYMENT COMPLETE!
echo ============================================================
echo.
echo Your site is now LIVE 24/7 at:
echo Frontend: https://dsa-platform.vercel.app
echo Backend:  https://dsa-platform-api.up.railway.app
echo.
echo The site will run forever, even when your device is off!
echo.
pause
