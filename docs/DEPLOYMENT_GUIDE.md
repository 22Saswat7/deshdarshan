# 🚀 GitHub & Vercel Deployment Guide for DeshDarshan

## 📋 Pre-deployment Checklist
✅ Git repository initialized
✅ All files committed
✅ Environment templates created
✅ Vercel configuration files ready

## 🐙 GitHub Setup

### 1. Create GitHub Repository
1. Go to [GitHub.com](https://github.com/new)
2. Repository name: `deshdarshan`
3. Description: `Modern travel platform for exploring India with AI assistance and payment integration`
4. Set as Public
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 2. Push to GitHub
```bash
# Add GitHub remote (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/deshdarshan.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🚀 Vercel Deployment

### Option A: Deploy via Vercel Dashboard (Recommended)

#### Frontend Deployment
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your `deshdarshan` repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   ```
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_BASE_URL=https://your-backend.vercel.app/api
   ```
6. Click "Deploy"

#### Backend Deployment
1. In Vercel dashboard, click "New Project" again
2. Import same repository
3. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
4. Add Environment Variables:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   FRONTEND_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   ```
5. Click "Deploy"

### Option B: Deploy via Vercel CLI

#### Install Vercel CLI
```bash
npm i -g vercel
vercel login
```

#### Deploy Frontend
```bash
cd frontend
vercel --prod
# Follow prompts and add environment variables
```

#### Deploy Backend
```bash
cd ../backend
vercel --prod
# Follow prompts and add environment variables
```

## 🔗 Post-Deployment Setup

### 1. Update API URLs
After backend deployment, update frontend environment:
```env
VITE_API_BASE_URL=https://your-backend.vercel.app/api
```

### 2. Update CORS Settings
Update backend `.env`:
```env
FRONTEND_URL=https://your-frontend.vercel.app
```

### 3. Firebase Configuration
Add your Vercel domain to Firebase:
1. Firebase Console → Authentication → Settings
2. Add domain: `your-app.vercel.app`

### 4. Razorpay Webhook (Optional)
1. Razorpay Dashboard → Settings → Webhooks
2. Add URL: `https://your-backend.vercel.app/api/payment/webhook`

## 🧪 Testing Production

### Test URLs
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.vercel.app/health`
- **Payment**: Use test card `4111 1111 1111 1111`

### Test Flow
1. ✅ Homepage loads
2. ✅ Navigate to destination
3. ✅ Fill booking form
4. ✅ Payment modal opens
5. ✅ Complete test payment
6. ✅ Booking confirmation

## 🔄 Auto-Deployment

Once connected to GitHub:
- **Frontend**: Auto-deploys on push to `main` branch
- **Backend**: Auto-deploys on push to `main` branch
- **Rollbacks**: Available in Vercel dashboard

## 📝 Custom Domain (Optional)

### Add Custom Domain
1. Vercel Dashboard → Project → Settings → Domains
2. Add your domain: `deshdarshan.com`
3. Configure DNS records as shown
4. Update environment variables with new domain

## 🛡️ Security Checklist

✅ Environment variables added to Vercel
✅ `.env` files in `.gitignore`
✅ API keys not committed to Git
✅ CORS configured properly
✅ Firebase domains whitelisted

## 🎯 Success URLs

After successful deployment:
- **Live App**: `https://deshdarshan.vercel.app`
- **API Health**: `https://deshdarshan-api.vercel.app/health`
- **GitHub Repo**: `https://github.com/yourusername/deshdarshan`

---

## 🚨 Troubleshooting

### Common Issues:
1. **Build Fails**: Check build logs in Vercel dashboard
2. **API Errors**: Verify environment variables
3. **Payment Issues**: Check Razorpay credentials
4. **Auth Issues**: Verify Firebase configuration

### Get Help:
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- GitHub Issues: [Create issue in your repo](https://github.com/yourusername/deshdarshan/issues)

**🎉 Your app is now live and ready for users!**
