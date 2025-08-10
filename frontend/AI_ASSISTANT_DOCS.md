# AI Assistant Panel Documentation

## Overview
The AI Assistant Panel is a floating sidebar component that provides AI-powered travel assistance with three main features:

1. **📦 Packing Assistant** - Get personalized packing suggestions
2. **🗓️ Itinerary Generator** - Create customized travel itineraries  
3. **❓ FAQ Help Chatbot** - Get answers to travel questions

## Features

### ✨ Core Functionality
- **Collapsible sections** for organized content
- **Mock AI responses** with realistic delay simulation
- **Input validation** with user-friendly error messages
- **Toast notifications** for success/error feedback
- **Loading states** with spinner animations
- **Clear/reset functionality** for each section

### 🎨 UI/UX Features
- **Floating panel** fixed to bottom-right corner
- **Dark translucent design** with backdrop blur
- **Rounded corners** and modern styling
- **Smooth animations** and transitions
- **Mobile responsive** with auto-collapse
- **Toggle button** for easy open/close

### 📱 Mobile Responsive
- Auto-collapses on screens < 768px width
- Full-screen overlay on mobile devices
- Touch-friendly interface
- Optimized button sizes for mobile

## File Structure
```
src/
├── components/
│   └── AIAssistantPanel.jsx     # Main component
└── services/
    └── aiServices.js            # API functions & mock responses
```

## Integration

The component is already integrated into `App.jsx` and will appear on all pages:

```jsx
import AIAssistantPanel from "./components/AIAssistantPanel";

function App() {
  return (
    <Router>
      {/* Your existing routes */}
      <AIAssistantPanel />
    </Router>
  );
}
```

## Usage

### For Users
1. **Click the chat icon** in the bottom-right corner to open the panel
2. **Expand any section** by clicking on the section header
3. **Type your question/request** in the textarea
4. **Click Submit** to get AI assistance
5. **View the response** below your input
6. **Clear the section** using the trash icon if needed

### For Developers

#### Customizing Responses
Edit the mock responses in `src/services/aiServices.js`:

```javascript
const mockResponses = {
  packing: "Your custom packing response...",
  itinerary: "Your custom itinerary response...", 
  faq: "Your custom FAQ response..."
};
```

#### Adding Real AI Integration
Replace the mock `callGeminiAPI` function with actual API calls:

```javascript
export const callGeminiAPI = async (promptType, userInput) => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ promptType, userInput })
  });
  return await response.text();
};
```

#### Customizing Styles
The component uses Tailwind CSS classes. Key customization points:

- **Panel position**: Change `bottom-4 right-4` classes
- **Colors**: Modify `bg-gray-900`, `bg-blue-600`, etc.
- **Dimensions**: Adjust `w-96`, `max-h-[calc(100vh-2rem)]`
- **Animations**: Customize `transition-all duration-300`

#### Error Handling
The component includes comprehensive error handling:

- **Empty input validation**
- **API error catching**
- **User-friendly error messages**
- **Toast notifications**

## Technical Details

### State Management
- Uses React hooks (`useState`, `useEffect`)
- Manages multiple state objects for different concerns
- Responsive design with window resize listener

### Performance
- Lazy loading of sections (content only renders when expanded)
- Debounced API calls (1.5s simulation delay)
- Efficient re-renders with proper dependency arrays

### Accessibility
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast colors for readability
- Semantic HTML structure

## Troubleshooting

### Common Issues
1. **Panel not showing**: Check that the component is imported and rendered in App.jsx
2. **Styles not working**: Ensure Tailwind CSS is properly configured
3. **API errors**: Check the console for detailed error messages
4. **Mobile issues**: Test responsive behavior at different screen sizes

### Development Tips
- Use browser dev tools to test responsive design
- Check console for any error messages
- Test with different input lengths and types
- Verify toast notifications appear correctly

## Future Enhancements

### Planned Features
- Real Gemini AI API integration
- User authentication and chat history
- Customizable themes and colors
- Additional travel assistance categories
- Voice input/output capabilities
- Offline mode with cached responses

### Customization Options
- Position (top-left, bottom-left, etc.)
- Size and layout variations
- Additional AI service providers
- Custom branding and themes
