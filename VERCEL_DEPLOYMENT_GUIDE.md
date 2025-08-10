# 🚀 Vercel Deployment Guide

## 🎯 Deploy Frontend

1. **Go to Vercel**: [https://vercel.com](https://vercel.com)
2. **Sign in with GitHub**
3. **Import Repository**:
   - Click "New Project"
   - Select `22Saswat7/deshdarshan`
   - **Important**: Set root directory to `frontend`
   - Framework preset: Vite
   - Click "Deploy"

### Environment Variables for Frontend
Add these in Vercel dashboard:
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_API_BASE_URL=https://your-backend-url.vercel.app
```

## 🎯 Deploy Backend

1. **Create new project** in Vercel
2. **Import same repository** (`22Saswat7/deshdarshan`)
3. **Important**: Set root directory to `backend`
4. Framework preset: Other
5. Click "Deploy"

### Environment Variables for Backend
Add these in Vercel dashboard:
```
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FRONTEND_URL=https://your-frontend-url.vercel.app
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
```

## 🔗 Update Frontend API URL

After backend deployment, update frontend environment:
1. Copy backend Vercel URL
2. Update `VITE_API_BASE_URL` in frontend Vercel settings
3. Redeploy frontend

## 🎉 Expected Result

- **Frontend**: `https://deshdarshan-frontend.vercel.app`
- **Backend**: `https://deshdarshan-backend.vercel.app`
- **Full Stack**: Working payment system with Razorpay
- **Authentication**: Firebase Google Sign-in
- **AI Features**: Gemini API integration

## 🚨 Common Issues & Fixes

### CORS Errors
Backend `server.js` already has CORS configured for Vercel.

### Environment Variables
Make sure all variables are set in Vercel dashboard (not .env files).

### Build Errors
Check build logs in Vercel dashboard for specific errors.

---

**Your DeshDarshan is ready for production! 🇮🇳🚀**
