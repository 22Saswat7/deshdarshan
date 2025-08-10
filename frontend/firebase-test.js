// Test Firebase Configuration
// Add this to your browser console to test Firebase setup

console.log('Testing Firebase Configuration...');
console.log('Environment Variables:');
console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY ? 'Set ✓' : 'Missing ✗');
console.log('Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'Set ✓' : 'Missing ✗');
console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Set ✓' : 'Missing ✗');

// Test Firebase Auth
import { auth } from './src/firebase.js';
console.log('Firebase Auth initialized:', auth ? 'Yes ✓' : 'No ✗');
console.log('Auth App:', auth.app.name);
console.log('Auth Project ID:', auth.app.options.projectId);
