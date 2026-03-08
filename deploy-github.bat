@echo off
echo ============================================================
echo   DEPLOYING YOUR DSA PLATFORM TO LIVE HOSTING
echo   Repository: https://github.com/dilleshwar-17/DSA_Website.git
echo ============================================================
echo.

echo Cloning your repository...
git clone https://github.com/dilleshwar-17/DSA_Website.git temp-deploy
cd temp-deploy

echo.
echo ============================================================
echo   DEPLOYMENT INSTRUCTIONS
echo ============================================================
echo.
echo Your GitHub repo is ready! Now deploy it:
echo.
echo STEP 1: DEPLOY FRONTEND (2 minutes)
echo   1. Go to: https://vercel.com
echo   2. Click "Add New" - "Project"
echo   3. Import: https://github.com/dilleshwar-17/DSA_Website.git
echo   4. Root Directory: "frontend"
echo   5. Click "Deploy"
echo.
echo STEP 2: DEPLOY BACKEND (2 minutes)
echo   1. Go to: https://render.com
echo   2. Click "New" - "Web Service"
echo   3. Connect: https://github.com/dilleshwar-17/DSA_Website.git
echo   4. Root Directory: "backend"
echo   5. Build: npm install
echo   6. Start: node server.js
echo   7. Click "Create Web Service"
echo.
echo STEP 3: SETUP DATABASE (1 minute)
echo   1. Go to: https://mongodb.com/cloud/atlas
echo   2. Create FREE cluster
echo   3. Get connection string
echo   4. Add to Render as MONGODB_URI
echo.
echo ============================================================
echo   YOUR SITE WILL BE LIVE 24/7 IN 5 MINUTES!
echo ============================================================
echo.
pause
