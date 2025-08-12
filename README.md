# DeshDarshan - MERN Stack Travel Platform with AI Assistant

## 🚀 Project Overview

DeshDarshan is a comprehensive travel platform built with the MERN stack, featuring an AI-powered assistant for personalized travel advice using Google's Gemini API.

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
