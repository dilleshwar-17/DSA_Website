# Netlify Deployment Guide

## Step 1: Setup MongoDB Atlas (Database)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy connection string (looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/`)
5. Replace `<password>` with your database password

## Step 2: Deploy Backend to Render

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Name: `dsa-platform-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add Environment Variable:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string
   - Key: `JWT_SECRET`
   - Value: Any random string (e.g., `your-secret-key-here`)
6. Click "Create Web Service"
7. Copy your backend URL (e.g., `https://dsa-platform-backend.onrender.com`)

## Step 3: Deploy Frontend to Netlify

### Option A: Netlify CLI (Recommended)
```bash
cd frontend
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Option B: Netlify Dashboard
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add Environment Variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: Your Render backend URL
6. Click "Deploy site"

## Step 4: Update Backend CORS

After deployment, update backend to allow your Netlify domain in CORS settings.

## Quick Deploy Commands

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Deploy frontend to Netlify
cd frontend
netlify deploy --prod
```

Your app will be live at: `https://datanauts-dsa.netlify.app/`
