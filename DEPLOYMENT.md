# Complete Deployment & Setup Guide - Blue City Parivar

This comprehensive guide covers all setup, configuration, and deployment procedures for both frontend and backend.

**Last Updated:** December 28, 2025

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Development Setup](#development-setup)
4. [Environment Configuration](#environment-configuration)
5. [Running the Application](#running-the-application)
6. [Testing Guide](#testing-guide)
7. [Frontend Deployment (GitHub Pages)](#frontend-deployment-github-pages)
8. [Backend Deployment (Production)](#backend-deployment-production)
9. [Database Setup](#database-setup)
10. [External Services Configuration](#external-services-configuration)
11. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Monorepo Structure:**
```
bluecity/
├── frontend/          # React + Vite + TypeScript
├── backend/           # Node.js + Express + TypeScript
├── .github/workflows/ # GitHub Actions for auto-deployment
└── DEPLOYMENT.md      # This file
```

**Architecture:**
- **Frontend:** Static site deployed to GitHub Pages
- **Backend:** Node.js API (needs separate hosting - not included in GitHub Pages)
- **Database:** MongoDB Atlas (cloud)
- **Storage:** Cloudinary (images)

---

## Prerequisites

### Required Software

- **Node.js:** v18 or higher
- **npm:** v9 or higher (comes with Node.js)
- **Git:** Latest version
- **MongoDB:** Local installation OR MongoDB Atlas account

### Verify Installation

```bash
node --version  # Should show v18+
npm --version   # Should show v9+
git --version   # Should show latest
```

---

## Development Setup

### 1. Clone Repository

```bash
git clone git@github-personal:chaimat/bluecity-jodhpur.git
cd bluecity-jodhpur
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 3. Create Environment Files

**Backend** (`backend/.env`):
```bash
cd backend
cp env.example .env
# Edit .env with your credentials (see Environment Configuration section)
```

**Frontend** (`frontend/.env`):
```bash
cd frontend
cp env.template .env
# Edit .env with your configuration
```

---

## Environment Configuration

### Backend Environment Variables

Create `backend/.env` with the following:

```env
# ===============================================
# 🌐 Server Configuration
# ===============================================
PORT=5002
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173

# ===============================================
# 🗄️ Database (MongoDB)
# ===============================================
MONGODB_URI=mongodb://localhost:27017/bluecity
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/bluecity

# ===============================================
# 🔐 Authentication
# ===============================================
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# ===============================================
# 🔑 Google OAuth 2.0
# ===============================================
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5002/api/v1/auth/google/callback

# ===============================================
# 💳 Razorpay (Payment Gateway)
# ===============================================
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
MEMBERSHIP_FEE=700000    # ₹7,000 in paise
MATRIMONY_FEE=40000      # ₹400 in paise

# ===============================================
# ☁️ Cloudinary (Image Storage)
# ===============================================
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# ===============================================
# 📧 Mailgun (Email Service)
# ===============================================
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_domain.com  # or sandbox123abc.mailgun.org
MAILGUN_FROM_EMAIL=noreply@your_domain.com

# ⚠️ SANDBOX LIMITATIONS:
# - Sandbox domains can only send to authorized recipients
# - Add recipients in: Mailgun Dashboard → Authorized Recipients
# - For production, use a custom verified domain

# ===============================================
# 🔒 Security & Rate Limiting
# ===============================================
AUTH_RATE_LIMIT_WINDOW=15  # minutes
AUTH_RATE_LIMIT_MAX=10     # requests
OTP_RATE_LIMIT_WINDOW=15   # minutes
OTP_RATE_LIMIT_MAX=3       # requests
PAYMENT_RATE_LIMIT_WINDOW=1  # minute
PAYMENT_RATE_LIMIT_MAX=3     # requests

# ===============================================
# 📨 OTP Settings
# ===============================================
OTP_EXPIRY_MINUTES=10
OTP_LENGTH=6
```

### Frontend Environment Variables

Create `frontend/.env`:

```env
# Backend API URL
VITE_API_URL=http://localhost:5002/api/v1

# Razorpay Public Key
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Google Analytics (optional)
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## Running the Application

### Development Mode

**Start Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5002
```

**Start Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

**Access the Application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5002/api/v1
- API Health Check: http://localhost:5002/api/v1/health

### Production Build

**Backend:**
```bash
cd backend
npm run build  # Compiles TypeScript to dist/
npm start      # Runs compiled code
```

**Frontend:**
```bash
cd frontend
npm run build  # Creates production build in dist/
npm run preview # Preview production build
```

---

## Testing Guide

### Backend Testing

**Run Quick Test:**
```bash
cd backend
./quick-test.sh
```

**Manual Testing:**
```bash
# 1. Test health endpoint
curl http://localhost:5002/api/v1/health

# 2. Test registration
curl -X POST http://localhost:5002/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123",
    "name": "Test User",
    "phone": "1234567890"
  }'

# 3. Test OTP verification
curl -X POST http://localhost:5002/api/v1/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "otp": "123456"
  }'
```

### Frontend Testing

**Run Development Server:**
```bash
cd frontend
npm run dev
```

**Test Key Flows:**
1. ✅ User registration with OTP
2. ✅ Google OAuth login
3. ✅ Membership payment
4. ✅ Matrimony profile creation
5. ✅ Image upload
6. ✅ Admin panel access

---

## Frontend Deployment (GitHub Pages)

### Overview

This monorepo contains both frontend and backend code, but **only the frontend** is deployed to GitHub Pages.

### Automatic Deployment Setup ✅

The frontend automatically deploys to GitHub Pages when you push changes to the `main` branch.

### One-Time Setup in GitHub

1. **Go to your repository settings:**
   ```
   https://github.com/chaimat/bluecity-jodhpur/settings/pages
   ```

2. **Configure GitHub Pages:**
   - Under "Build and deployment"
   - **Source**: Select **"GitHub Actions"** (NOT "Deploy from a branch")
   - Save the settings

3. **That's it!** The workflow is already configured in `.github/workflows/deploy.yml`

### How It Works

- The GitHub Action only triggers when files in the `frontend/` directory change
- It builds the frontend using `npm run build` in the frontend directory
- Deploys only the `frontend/dist` folder to GitHub Pages
- Backend code remains in the repo but is **never deployed** to GitHub Pages

### Your Site URL

After the first successful deployment, your site will be available at:
```
https://chaimat.github.io/bluecity-jodhpur/
```

### Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
cd frontend
npm install -g gh-pages  # One-time install
npm run deploy           # Deploys to gh-pages branch
```

### Pushing to GitHub

```bash
# From the root of the project
git add .
git commit -m "Your commit message"
git push origin main

# The GitHub Action will automatically deploy your frontend
```

### Monitoring Deployments

- View deployment status: https://github.com/chaimat/bluecity-jodhpur/actions
- Each push triggers the "Deploy Frontend to GitHub Pages" workflow
- You'll see a green checkmark when deployment succeeds

### Important Notes

- ✅ Backend code is safely stored in the repo but NOT deployed
- ✅ Only `frontend/` changes trigger deployment
- ✅ The `base: '/bluecity-jodhpur/'` in `vite.config.ts` ensures assets load correctly
- ✅ `.gitignore` files prevent `node_modules` and logs from being committed

---

## Backend Deployment (Production)

### Recommended Hosting Options

1. **DigitalOcean Droplet** (Recommended)
2. **AWS EC2**
3. **Heroku**
4. **Railway.app**
5. **Render.com**

### Deployment Steps (DigitalOcean Example)

**1. Create Droplet:**
- Ubuntu 22.04 LTS
- Minimum 2GB RAM
- Enable backups

**2. SSH into Server:**
```bash
ssh root@your_server_ip
```

**3. Install Dependencies:**
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2 (Process Manager)
npm install -g pm2

# Install Git
apt install -y git
```

**4. Clone and Setup:**
```bash
# Clone repository
git clone git@github-personal:chaimat/bluecity-jodhpur.git
cd bluecity-jodhpur/backend

# Install dependencies
npm install

# Create production .env
nano .env
# Paste production environment variables

# Build TypeScript
npm run build
```

**5. Start with PM2:**
```bash
pm2 start dist/server.js --name bluecity-backend
pm2 save
pm2 startup  # Follow instructions to enable auto-start
```

**6. Setup Nginx (Reverse Proxy):**
```bash
apt install -y nginx

nano /etc/nginx/sites-available/bluecity
```

Add configuration:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/bluecity /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

**7. Setup SSL (Let's Encrypt):**
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d api.yourdomain.com
```

---

## Database Setup

### Local MongoDB

**Install MongoDB:**
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu
apt install -y mongodb
systemctl start mongodb
systemctl enable mongodb
```

**Verify Installation:**
```bash
mongosh
use bluecity
db.users.find()
exit
```

### MongoDB Atlas (Cloud)

1. **Create Account:** https://www.mongodb.com/cloud/atlas
2. **Create Cluster:** Free tier M0
3. **Create Database User:** Username + Password
4. **Whitelist IP:** Add 0.0.0.0/0 for development (restrict in production)
5. **Get Connection String:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/bluecity
   ```
6. **Update backend/.env:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bluecity
   ```

### Create First Admin

Connect to MongoDB and run:
```javascript
use bluecity

db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { isAdmin: true } }
)
```

---

## External Services Configuration

### 1. Google OAuth Setup

1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI:
   - Development: `http://localhost:5002/api/v1/auth/google/callback`
   - Production: `https://api.yourdomain.com/api/v1/auth/google/callback`
6. Copy Client ID and Client Secret to `.env`

### 2. Razorpay Setup

1. Sign up at https://razorpay.com/
2. Go to Settings → API Keys
3. Generate Test Keys (for development)
4. Generate Live Keys (for production)
5. Copy Key ID and Key Secret to `.env`
6. Enable required payment methods in dashboard

### 3. Cloudinary Setup

1. Sign up at https://cloudinary.com/
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret
4. Add to `.env`
5. Create folders: `bluecity/matrimony`, `bluecity/gallery`, `bluecity/profiles`

### 4. Mailgun Setup

**Development (Sandbox):**
1. Sign up at https://mailgun.com/
2. Use provided sandbox domain
3. Add authorized recipients in dashboard
4. Copy API Key and Domain to `.env`

**Production (Custom Domain):**
1. Add your domain in Mailgun dashboard
2. Add DNS records (SPF, DKIM, CNAME) to your domain registrar
3. Verify domain (takes 24-48 hours)
4. Update `.env` with custom domain

---

## Troubleshooting

### Common Issues

**Backend won't start:**
```bash
# Check if port is in use
lsof -i :5002
kill -9 <PID>

# Check logs
cd backend
npm run dev
```

**Database connection fails:**
```bash
# Verify MongoDB is running
mongosh
# Check connection string in .env
```

**Frontend can't connect to backend:**
```bash
# Verify VITE_API_URL in frontend/.env
# Check CORS_ORIGIN in backend/.env
# Ensure backend is running
```

**GitHub Actions deployment fails:**
1. Check Actions tab for error logs
2. Verify GitHub Pages is set to "GitHub Actions" source
3. Ensure `base: '/bluecity-jodhpur/'` is in `vite.config.ts`

**Images not loading after deployment:**
- Confirm base path is correct in vite.config.ts
- Check browser console for 404 errors
- Verify images are in public/ or referenced correctly

**Mailgun emails not sending:**
- Verify API key and domain in `.env`
- Check authorized recipients (sandbox only)
- Review Mailgun dashboard logs

---

## Quick Reference

### Start Development

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Deploy to GitHub Pages

```bash
git add .
git commit -m "Update frontend"
git push origin main
# Auto-deploys via GitHub Actions
```

### Check Logs

```bash
# Backend (development)
cd backend && npm run dev

# Backend (production with PM2)
pm2 logs bluecity-backend

# Frontend build errors
cd frontend && npm run build
```

---

**Document Version:** 2.0  
**Last Updated:** December 28, 2025  
**Maintained By:** Development Team

For questions or issues, refer to the main documentation or contact the team.

