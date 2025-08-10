# ✅ Deployment Checklist

## Before Deployment

### 🔑 API Keys Required
- [ ] Firebase configuration (7 variables)
- [ ] Razorpay API keys (Key ID + Secret)
- [ ] Google Gemini API key

### 📝 Accounts Needed
- [ ] Firebase project created
- [ ] Razorpay account (test mode enabled)
- [ ] Google Cloud Console (for Gemini API)
- [ ] Vercel account

## Deployment Steps

### 🚀 Frontend (Vercel)
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Import repository: `22Saswat7/deshdarshan`
- [ ] Set root directory: `frontend`
- [ ] Framework preset: `Vite`
- [ ] Add environment variables:
  - [ ] `VITE_FIREBASE_API_KEY`
  - [ ] `VITE_FIREBASE_AUTH_DOMAIN`
  - [ ] `VITE_FIREBASE_PROJECT_ID`
  - [ ] `VITE_FIREBASE_STORAGE_BUCKET`
  - [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - [ ] `VITE_FIREBASE_APP_ID`
  - [ ] `VITE_RAZORPAY_KEY_ID`
  - [ ] `VITE_API_BASE_URL` (will update after backend deploy)
- [ ] Deploy frontend
- [ ] Copy frontend URL

### 🔧 Backend (Vercel)
- [ ] Create new Vercel project
- [ ] Import same repository: `22Saswat7/deshdarshan`
- [ ] Set root directory: `backend`
- [ ] Framework preset: `Other`
- [ ] Add environment variables:
  - [ ] `RAZORPAY_KEY_ID`
  - [ ] `RAZORPAY_KEY_SECRET`
  - [ ] `GEMINI_API_KEY`
  - [ ] `FRONTEND_URL` (use frontend URL from above)
  - [ ] `NODE_ENV=production`
- [ ] Deploy backend
- [ ] Copy backend URL

### 🔗 Final Configuration
- [ ] Update frontend `VITE_API_BASE_URL` with backend URL
- [ ] Redeploy frontend
- [ ] Test authentication
- [ ] Test payment flow
- [ ] Test AI assistant

## 🧪 Testing Production

### Authentication
- [ ] Google Sign-in works
- [ ] Email/password login works
- [ ] Protected routes functioning

### Payments
- [ ] Test card: `4111 1111 1111 1111`
- [ ] Payment flow completes
- [ ] Booking confirmation shows

### AI Assistant
- [ ] Chat interface loads
- [ ] Responses generate correctly
- [ ] Recommendations appear

## 🎯 Success Criteria

✅ **Frontend Live**: https://your-app.vercel.app
✅ **Backend Live**: https://your-api.vercel.app
✅ **Authentication Working**
✅ **Payments Processing**
✅ **AI Assistant Active**

---

🎉 **Your DeshDarshan is now live and ready for users!** 🇮🇳
