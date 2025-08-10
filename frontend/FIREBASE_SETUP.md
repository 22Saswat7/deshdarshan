# Firebase Setup Instructions

## 1. Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Create a project" or "Add project"
3. Enter project name (e.g., "deshdarshan-app")
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication
1. In Firebase Console, go to "Authentication" 
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Enable "Google" provider
   - Add your email as authorized domain
   - Add support email

## 3. Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click "Web" icon (</>) to add a web app
4. Register app with nickname
5. Copy the firebaseConfig object values

## 4. Create .env File
Create a `.env` file in the frontend directory with:

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 5. Add Authorized Domains
1. In Firebase Console > Authentication > Settings
2. Add your domains to "Authorized domains":
   - localhost
   - 127.0.0.1
   - Your production domain

## 6. Test Authentication
After setup, restart your dev server and test login!
