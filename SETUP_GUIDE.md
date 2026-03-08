# DSA Platform - Complete Setup & Deployment Guide

## Quick Start

### Prerequisites
- Node.js v16+ 
- MongoDB v4.4+
- npm or yarn
- Git

## Local Development Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd dsa-platform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dsa-platform
JWT_SECRET=your-super-secret-jwt-key-change-in-production
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
NODE_ENV=development
```

Start MongoDB:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

Seed database with problems:
```bash
node scripts/seed-problems.js
```

Start backend:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

Start frontend:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## Production Deployment

### Backend Deployment (Heroku)

1. Install Heroku CLI
```bash
npm install -g heroku
```

2. Login to Heroku
```bash
heroku login
```

3. Create Heroku app
```bash
cd backend
heroku create dsa-platform-api
```

4. Set environment variables
```bash
heroku config:set MONGODB_URI=<your-mongodb-atlas-uri>
heroku config:set JWT_SECRET=<your-secret>
heroku config:set GOOGLE_CLIENT_ID=<your-client-id>
heroku config:set GOOGLE_CLIENT_SECRET=<your-client-secret>
heroku config:set NODE_ENV=production
```

5. Deploy
```bash
git push heroku main
```

### Frontend Deployment (Vercel)

1. Install Vercel CLI
```bash
npm install -g vercel
```

2. Deploy
```bash
cd frontend
vercel
```

3. Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_API_URL`: Your backend URL
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Google OAuth client ID

### Database Setup (MongoDB Atlas)

1. Create account at mongodb.com/cloud/atlas
2. Create new cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string
6. Update MONGODB_URI in backend

## Google OAuth Setup

1. Go to Google Cloud Console
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback` (development)
   - `https://your-domain.com/auth/google/callback` (production)
6. Copy Client ID and Client Secret
7. Update environment variables

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

## Performance Optimization

### Frontend
- Enable Next.js Image Optimization
- Implement code splitting
- Use dynamic imports for heavy components
- Enable Gzip compression
- Implement service workers for PWA

### Backend
- Enable MongoDB indexing
- Implement Redis caching
- Use connection pooling
- Enable compression middleware
- Implement rate limiting

## Monitoring & Analytics

### Recommended Tools
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics, Mixpanel
- **Performance**: New Relic, DataDog
- **Uptime**: Pingdom, UptimeRobot
- **Logs**: Loggly, Papertrail

## Security Best Practices

1. **Environment Variables**
   - Never commit .env files
   - Use different secrets for dev/prod
   - Rotate secrets regularly

2. **Authentication**
   - Use HTTPS in production
   - Implement rate limiting
   - Add CSRF protection
   - Enable 2FA for admin accounts

3. **Database**
   - Use parameterized queries
   - Enable MongoDB authentication
   - Regular backups
   - Encrypt sensitive data

4. **API**
   - Implement API rate limiting
   - Validate all inputs
   - Sanitize user data
   - Use CORS properly

## Scaling Strategy

### Horizontal Scaling
- Use load balancer (AWS ELB, Nginx)
- Deploy multiple backend instances
- Use Redis for session management
- Implement CDN for static assets

### Database Scaling
- MongoDB sharding
- Read replicas
- Implement caching layer
- Optimize queries with indexes

### Caching Strategy
- Redis for session data
- CDN for static assets
- Browser caching headers
- API response caching

## Backup & Recovery

### Database Backups
```bash
# Backup
mongodump --uri="mongodb://localhost:27017/dsa-platform" --out=/backup

# Restore
mongorestore --uri="mongodb://localhost:27017/dsa-platform" /backup
```

### Automated Backups
- Set up daily MongoDB Atlas backups
- Store backups in S3
- Test restore procedures monthly

## Troubleshooting

### Common Issues

**MongoDB Connection Failed**
```bash
# Check MongoDB status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod
```

**Port Already in Use**
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>
```

**Build Errors**
```bash
# Clear cache
rm -rf node_modules
rm package-lock.json
npm install
```

## Development Workflow

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request
```

### Code Quality
```bash
# Run linter
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

## API Documentation

API documentation available at:
- Development: `http://localhost:5000/api-docs`
- Production: `https://api.your-domain.com/api-docs`

## Support & Resources

- Documentation: `/docs`
- GitHub Issues: `<repository-url>/issues`
- Discord Community: `<discord-link>`
- Email Support: support@dsaplatform.com

## License

MIT License - see LICENSE file for details

## Contributors

See CONTRIBUTORS.md for list of contributors

---

For more information, visit our documentation at https://docs.dsaplatform.com
