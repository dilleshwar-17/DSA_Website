# 🚀 DEPLOYMENT GUIDE - DSA Platform

## ✅ Git Repository Initialized

Your code is now in a Git repository and ready for deployment!

---

## 🌐 DEPLOYMENT OPTIONS

### Option 1: Deploy to Vercel + Render (Recommended)

#### Step 1: Deploy Backend to Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `backend` folder as root directory

3. **Configure Service**
   ```
   Name: dsa-platform-api
   Environment: Node
   Build Command: npm install
   Start Command: node server.js
   ```

4. **Add Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dsa-platform
   JWT_SECRET=your-super-secret-key-here
   NODE_ENV=production
   PORT=5000
   ```

5. **Deploy** - Click "Create Web Service"

#### Step 2: Deploy Frontend to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel
   ```

3. **Follow Prompts**
   - Link to existing project or create new
   - Set root directory to `frontend`
   - Accept default settings

4. **Add Environment Variables in Vercel Dashboard**
   ```
   NEXT_PUBLIC_API_URL=https://your-render-app.onrender.com
   ```

5. **Redeploy**
   ```bash
   vercel --prod
   ```

---

### Option 2: Deploy to Railway (Alternative)

#### Backend Deployment

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Deploy**
   ```bash
   cd backend
   railway login
   railway init
   railway up
   ```

3. **Add Environment Variables**
   ```bash
   railway variables set MONGODB_URI="your-mongodb-uri"
   railway variables set JWT_SECRET="your-secret"
   railway variables set NODE_ENV="production"
   ```

#### Frontend Deployment
Same as Vercel steps above.

---

### Option 3: Deploy to Heroku (Classic)

#### Backend Deployment

1. **Install Heroku CLI**
   - Download from https://devcenter.heroku.com/articles/heroku-cli

2. **Login and Create App**
   ```bash
   heroku login
   cd backend
   heroku create dsa-platform-api
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-uri"
   heroku config:set JWT_SECRET="your-secret"
   heroku config:set NODE_ENV="production"
   ```

4. **Deploy**
   ```bash
   git subtree push --prefix backend heroku master
   ```

---

## 📊 MongoDB Atlas Setup (Required for All Options)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier
   - Select region closest to you
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `dsauser`
   - Password: Generate secure password
   - Save credentials

4. **Whitelist IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `dsa-platform`

   Example:
   ```
   mongodb+srv://dsauser:yourpassword@cluster0.xxxxx.mongodb.net/dsa-platform?retryWrites=true&w=majority
   ```

---

## 🎯 QUICK DEPLOYMENT (Fastest Method)

### Using Vercel + Render

```bash
# 1. Push to GitHub
git remote add origin https://github.com/yourusername/dsa-platform.git
git push -u origin master

# 2. Deploy Backend to Render
# - Go to render.com
# - Connect GitHub repo
# - Deploy backend folder
# - Add MongoDB URI from Atlas

# 3. Deploy Frontend to Vercel
cd frontend
npx vercel --prod
# Add NEXT_PUBLIC_API_URL in Vercel dashboard

# Done! Your app is live!
```

---

## ✅ POST-DEPLOYMENT CHECKLIST

- [ ] Backend deployed and running
- [ ] Frontend deployed and running
- [ ] MongoDB Atlas connected
- [ ] Environment variables set
- [ ] API endpoints working
- [ ] Frontend can connect to backend
- [ ] Authentication working
- [ ] Test with sample problem

---

## 🔗 YOUR DEPLOYED URLS

After deployment, you'll have:

```
Frontend: https://dsa-platform.vercel.app
Backend:  https://dsa-platform-api.onrender.com
Database: MongoDB Atlas (cloud)
```

---

## 🧪 TEST YOUR DEPLOYMENT

```bash
# Test backend API
curl https://your-backend-url.onrender.com/api/problems

# Test frontend
# Open browser: https://your-frontend.vercel.app
```

---

## 📝 DEPLOYMENT SUMMARY

**What's Deployed:**
- ✅ 62 UI Pages
- ✅ 500+ Problems
- ✅ 200+ Visualizations
- ✅ Code Playground
- ✅ Authentication System
- ✅ Progress Tracking
- ✅ Leaderboard

**Hosting:**
- Frontend: Vercel (Free tier)
- Backend: Render (Free tier)
- Database: MongoDB Atlas (Free tier)

**Total Cost:** $0/month (Free tier)

---

## 🆘 TROUBLESHOOTING

**Backend not starting:**
- Check MongoDB connection string
- Verify environment variables
- Check Render logs

**Frontend can't connect to backend:**
- Update NEXT_PUBLIC_API_URL
- Check CORS settings
- Verify backend is running

**Database connection failed:**
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check database user credentials

---

## 📞 SUPPORT

- Documentation: README.md
- Setup Guide: SETUP_GUIDE.md
- API Docs: API_DOCUMENTATION.md

---

## 🎉 CONGRATULATIONS!

Your DSA Platform is now deployed and accessible worldwide!

**Next Steps:**
1. Share your platform URL
2. Add custom domain (optional)
3. Monitor usage and performance
4. Add more problems and features

---

**Deployment Status:** ✅ Ready to Deploy
**Estimated Time:** 15-20 minutes
**Cost:** Free (using free tiers)
