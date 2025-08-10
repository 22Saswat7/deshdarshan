# 🇮🇳 DeshDarshan - Modern Travel Platform for India

![DeshDarshan](https://img.shields.io/badge/DeshDarshan-Travel%20Platform-blue)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange)
![Razorpay](https://img.shields.io/badge/Razorpay-Payments-purple)

## 🚀 Project Overview

**Live Demo**: [Deploy on Vercel](https://vercel.com) 🚀

DeshDarshan is a comprehensive full-stack travel platform built with React and Node.js, featuring:
- 🤖 AI-powered travel assistant using Google's Gemini API
- 💳 Integrated Razorpay payment system with real transactions
- 🔐 Firebase authentication with Google Sign-in
- 🌍 Regional destination exploration across India
- 💰 Dynamic pricing system with real-time calculations
- 📱 Responsive design for all devices

## ✨ Features

- **Regional Exploration**: Discover East, West, North, and South India
- **Dynamic Pricing**: Activity-based pricing with tax calculations
- **Secure Payments**: Razorpay integration with test/live modes
- **AI Assistant**: Gemini AI for travel recommendations
- **User Authentication**: Firebase with Google OAuth
- **Responsive Design**: Mobile-first Tailwind CSS design
- **Booking System**: Complete flow from selection to confirmation

## 🔧 Quick Setup

### Prerequisites
- Node.js 18+
- Firebase account
- Razorpay account
- Google Gemini AI API key

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/deshdarshan.git
cd deshdarshan

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Setup environment variables
cp .env.example .env
# Fill in your API keys

# Run development servers
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Frontend  
cd frontend && npm run dev
```

## 🌐 Deployment

### Deploy to Vercel
```bash
# Deploy frontend
cd frontend
vercel --prod

# Deploy backend
cd ../backend
vercel --prod
```

### Environment Variables for Production
Set these in your Vercel dashboard:
- `GEMINI_API_KEY`
- `RAZORPAY_KEY_ID` 
- `RAZORPAY_KEY_SECRET`
- `FRONTEND_URL`

## 🎯 Payment Testing

Use Razorpay test credentials:
- **Card**: `4111 1111 1111 1111`
- **CVV**: `123`
- **Expiry**: `12/25`

## 📁 Project Structure

```
DeshDarshan/
├── backend/                 # Express.js API Server
│   ├── routes/
│   │   └── ai.js           # AI/Gemini API routes
│   ├── package.json        # Backend dependencies
│   └── server.js           # Main server file
├── frontend/               # React.js Frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── AIAssistantPanel.jsx
│   │   └── services/
│   │       └── aiServices.js
│   └── package.json        # Frontend dependencies
├── .env                    # Environment variables
├── package.json           # Root package.json for scripts
└── README.md              # This file
```

## 🛠 Tech Stack

### Backend
- **Express.js** - Web framework
- **Node.js** - Runtime environment
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Rate Limiting** - API protection
- **dotenv** - Environment variables

### Frontend
- **React.js** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation

### AI Integration
- **Google Gemini API** - AI assistant functionality

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

### 1. Clone and Install Dependencies
```bash
# Clone the repository
git clone <your-repo-url>
cd DeshDarshan

# Install root dependencies
npm install

# Install backend dependencies
npm run backend:install

# Install frontend dependencies
npm run frontend:install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
# Gemini API Configuration
GEMINI_API_KEY=your-actual-gemini-api-key-here

# Database Configuration (for future use)
MONGODB_URI=mongodb://localhost:27017/deshdarshan

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### 3. Getting Your Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

## 🚀 Running the Application

### Development Mode (Both servers)
```bash
npm run dev
```
This starts both backend (port 5000) and frontend (port 5173) concurrently.

### Individual Services
```bash
# Backend only
npm run backend:dev

# Frontend only
npm run frontend:dev
```

### Production Mode
```bash
# Build frontend
npm run build

# Start backend server
npm run start
```

## 🤖 AI Assistant Features

The AI Assistant Panel provides three main services:

### 📦 Packing Assistant
- Personalized packing suggestions
- Weather-appropriate recommendations
- Cultural considerations
- Activity-specific items

### 🗓️ Itinerary Generator
- Day-by-day travel plans
- Local attractions and experiences
- Cultural insights and tips
- Budget considerations

### ❓ FAQ Help Chatbot
- Travel-related questions
- Safety and practical advice
- Local customs information
- Alternative recommendations

## 📡 API Endpoints

### Backend API Routes

#### POST `/api/ai/gemini`
Processes AI requests through Gemini API.

**Request Body:**
```json
{
  "promptType": "packing|itinerary|faq",
  "userInput": "Your travel question or request"
}
```

**Response:**
```json
{
  "success": true,
  "response": "AI generated response",
  "promptType": "packing",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

#### GET `/health`
Health check endpoint for server status.

## 🔒 Security Features

- **CORS Protection** - Configured for frontend domain
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Helmet** - Security headers
- **Input Validation** - Request body validation
- **Error Handling** - Comprehensive error responses

## 🎨 Frontend Components

### AIAssistantPanel.jsx
- Floating panel with collapsible sections
- Mobile responsive design
- Toast notifications
- Loading states and error handling

### aiServices.js
- API client for backend communication
- Error handling and user-friendly messages
- Type-safe request/response handling

## 🔧 Development Tips

### Backend Development
```bash
# Watch for changes
npm run backend:dev

# Check server health
curl http://localhost:5000/health

# Test AI endpoint
curl -X POST http://localhost:5000/api/ai/gemini \
  -H "Content-Type: application/json" \
  -d '{"promptType":"faq","userInput":"Best time to visit India"}'
```

### Frontend Development
```bash
# Start development server
npm run frontend:dev

# Build for production
npm run frontend:build
```

## 🐛 Troubleshooting

### Common Issues

1. **Backend not starting**
   - Check if port 5000 is available
   - Verify `.env` file exists and has correct variables
   - Check Node.js version (>=18)

2. **Frontend API errors**
   - Ensure backend is running on port 5000
   - Check CORS configuration
   - Verify API endpoints in aiServices.js

3. **Gemini API errors**
   - Verify API key is correct and active
   - Check API quotas and limits
   - Review request format

4. **CORS Issues**
   - Verify FRONTEND_URL in .env matches your frontend URL
   - Check CORS configuration in server.js

### Debug Commands
```bash
# Check backend logs
npm run backend:dev

# Test API connectivity
curl http://localhost:5000/health

# Check frontend build
npm run frontend:build
```

## 🚀 Deployment

### Backend Deployment (Railway/Heroku/DigitalOcean)
1. Set environment variables on your platform
2. Deploy backend folder
3. Update FRONTEND_URL to production domain

### Frontend Deployment (Netlify/Vercel)
1. Build frontend: `npm run frontend:build`
2. Deploy `frontend/dist` folder
3. Update backend CORS settings

## 🔮 Future Enhancements

- [ ] MongoDB integration for user data
- [ ] User authentication system
- [ ] Chat history and preferences
- [ ] Advanced AI features (voice, images)
- [ ] Real-time notifications
- [ ] Travel booking integration

## 🚀 Deployment

### Quick Deploy to Vercel

#### Frontend Deployment
1. **Import Repository**: Go to [vercel.com](https://vercel.com) and import `22Saswat7/deshdarshan`
2. **Set Root Directory**: `frontend`
3. **Framework Preset**: Vite
4. **Environment Variables**: Add all `VITE_*` variables
5. **Deploy**: Click deploy

#### Backend Deployment
1. **Create New Project**: Import same repository
2. **Set Root Directory**: `backend`
3. **Framework Preset**: Other
4. **Environment Variables**: Add `RAZORPAY_*` and `GEMINI_API_KEY`
5. **Deploy**: Click deploy

### Environment Variables

**Frontend (.env):**
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_API_BASE_URL=https://your-backend-url.vercel.app
```

**Backend (.env):**
```env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=https://your-frontend-url.vercel.app
NODE_ENV=production
```

📖 **Detailed Guide**: See [docs/VERCEL_DEPLOYMENT_GUIDE.md](./docs/VERCEL_DEPLOYMENT_GUIDE.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - See LICENSE file for details.

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review API documentation
