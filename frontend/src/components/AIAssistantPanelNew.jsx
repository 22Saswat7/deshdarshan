

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { callGeminiAPI, handleAPIError } from '../services/aiServices';

const AIAssistantPanel = ({ isOpen, setIsOpen }) => {
  // Main panel state
  // isOpen and setIsOpen are now controlled from App
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentMode, setCurrentMode] = useState('home'); // 'home', 'chat', 'wizard'
  const [selectedAssistant, setSelectedAssistant] = useState(null);
  
  // Chat history for conversation-like experience
  const [chatHistory, setChatHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Wizard state for step-by-step guidance
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardData, setWizardData] = useState({});
  
  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  
  // Refs for auto-scrolling
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  // Assistant types with enhanced configuration
  const assistants = [
    {
      id: 'packing',
      title: 'Smart Packing Assistant',
      icon: '🎒',
      color: 'from-emerald-500 to-teal-600',
      description: 'Get AI-powered packing lists tailored to your destination, weather, and activities',
      features: ['Weather-based suggestions', 'Activity-specific items', 'Cultural considerations', 'Weight optimization'],
      wizard: {
        steps: [
          { question: "Where are you traveling to?", field: 'destination', type: 'text' },
          { question: "How many days will you be traveling?", field: 'duration', type: 'number' },
          { question: "What's the main purpose of your trip?", field: 'purpose', type: 'select', options: ['Business', 'Leisure', 'Adventure', 'Cultural', 'Family'] },
          { question: "What activities do you plan to do?", field: 'activities', type: 'text' }
        ]
      }
    },
    {
      id: 'itinerary',
      title: 'Smart Itinerary Planner',
      icon: '📅',
      color: 'from-blue-500 to-indigo-600',
      description: 'Create detailed travel plans with optimized routes, timing, and local insights',
      features: ['Day-by-day planning', 'Route optimization', 'Local recommendations', 'Budget estimates'],
      wizard: {
        steps: [
          { question: "Which destination would you like to explore?", field: 'destination', type: 'text' },
          { question: "How many days do you have?", field: 'days', type: 'number' },
          { question: "What's your travel style?", field: 'style', type: 'select', options: ['Relaxed', 'Moderate', 'Packed', 'Adventure'] },
          { question: "What are your main interests?", field: 'interests', type: 'text' },
          { question: "What's your approximate budget per day?", field: 'budget', type: 'select', options: ['Budget (₹1000-2000)', 'Mid-range (₹2000-5000)', 'Luxury (₹5000+)', 'No specific budget'] }
        ]
      }
    },
    {
      id: 'faq',
      title: 'Travel Expert Chat',
      icon: '💬',
      color: 'from-purple-500 to-pink-600',
      description: 'Ask any travel question and get expert advice instantly',
      features: ['Instant answers', 'Local insights', 'Safety tips', 'Cultural guidance'],
      wizard: null // Direct chat mode
    }
  ];

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768 && !isOpen) {
        setCurrentMode('home');
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isOpen]);

  // Auto-scroll to bottom when chat or wizard step updates (with timeout for reliability)
  // Track if user was near bottom before update
  const wasNearBottom = useRef(true);
  useEffect(() => {
    if (chatRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
      wasNearBottom.current = scrollHeight - scrollTop - clientHeight < 50;
    }
    // eslint-disable-next-line
  }, [chatHistory.length, wizardStep]);

  useLayoutEffect(() => {
    if (chatRef.current && wasNearBottom.current) {
      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }, 50);
    }
  }, [chatHistory, wizardStep]);

  // Focus input when chat mode is active
  useEffect(() => {
    if (currentMode === 'chat' && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [currentMode]);

  /**
   * Show toast notification
   */
  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 4000);
  };

  /**
   * Start assistant session
   */
  const startAssistant = (assistant) => {
    setSelectedAssistant(assistant);
    setChatHistory([
      {
        type: 'assistant',
        content: `Hello! I'm your ${assistant.title}. ${assistant.description}`,
        timestamp: new Date()
      }
    ]);

    if (assistant.wizard) {
      setCurrentMode('wizard');
      setWizardStep(0);
      setWizardData({});
    } else {
      setCurrentMode('chat');
    }
  };

  /**
   * Handle wizard step completion
   */
  const handleWizardStep = (value) => {
    const step = selectedAssistant.wizard.steps[wizardStep];
    const newData = { ...wizardData, [step.field]: value };
    setWizardData(newData);

    // Add user response to chat
    setChatHistory(prev => [...prev, {
      type: 'user',
      content: value,
      timestamp: new Date()
    }]);

    if (wizardStep < selectedAssistant.wizard.steps.length - 1) {
      // Move to next step
      setWizardStep(wizardStep + 1);
      setTimeout(() => {
        setChatHistory(prev => [...prev, {
          type: 'assistant',
          content: selectedAssistant.wizard.steps[wizardStep + 1].question,
          timestamp: new Date()
        }]);
      }, 500);
    } else {
      // Complete wizard and generate AI response
      completeWizard(newData);
    }
  };

  /**
   * Complete wizard and get AI response
   */
  const completeWizard = async (data) => {
    setCurrentMode('chat');
    setIsLoading(true);

    // Create a comprehensive prompt from wizard data
    const prompt = Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    try {
      const response = await callGeminiAPI(selectedAssistant.id, prompt);
      setChatHistory(prev => [...prev, {
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        isAI: true
      }]);
      showToast('Perfect! I\'ve created your personalized recommendations.', 'success');
    } catch (error) {
      const errorMessage = handleAPIError(error);
      setChatHistory(prev => [...prev, {
        type: 'assistant',
        content: errorMessage,
        timestamp: new Date(),
        isError: true
      }]);
      showToast('Sorry, there was an issue. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle direct chat message
   */
  const handleChatSubmit = async () => {
    if (!currentInput.trim() || isLoading) return;

    const userMessage = currentInput.trim();
    setCurrentInput('');

    // Add user message to chat
    setChatHistory(prev => [...prev, {
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    setIsLoading(true);

    try {
      const response = await callGeminiAPI(selectedAssistant.id, userMessage);
      setChatHistory(prev => [...prev, {
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        isAI: true
      }]);
    } catch (error) {
      const errorMessage = handleAPIError(error);
      setChatHistory(prev => [...prev, {
        type: 'assistant',
        content: errorMessage,
        timestamp: new Date(),
        isError: true
      }]);
      showToast('Sorry, there was an issue. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset to home screen
   */
  const resetToHome = () => {
    setCurrentMode('home');
    setSelectedAssistant(null);
    setChatHistory([]);
    setWizardStep(0);
    setWizardData({});
    setCurrentInput('');
  };

  /**
   * Render home screen with assistant selection
   */
  const renderHomeScreen = () => (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🗺️</span>
        </div>
        <h2 className="text-2xl font-bold text-white">AI Travel Assistant</h2>
        <p className="text-slate-300 text-sm">Choose your travel companion to get started</p>
      </div>

      {/* Assistant Cards */}
      <div className="space-y-4">
        {assistants.map((assistant) => (
          <div
            key={assistant.id}
            onClick={() => startAssistant(assistant)}
            className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-600/50 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:border-slate-500 hover:shadow-lg hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${assistant.color} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}>
                {assistant.icon}
              </div>
              
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {assistant.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {assistant.description}
                </p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {assistant.features.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-700/50 text-xs text-slate-300 rounded-lg"
                    >
                      {feature}
                    </span>
                  ))}
                  {assistant.features.length > 2 && (
                    <span className="px-2 py-1 bg-slate-700/50 text-xs text-slate-300 rounded-lg">
                      +{assistant.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <div className="text-slate-400 group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-400">💡</span>
          <h4 className="text-sm font-medium text-blue-300">Pro Tip</h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          For best results, be specific about your destination, dates, and preferences. The more details you provide, the better recommendations you'll get!
        </p>
      </div>
    </div>
  );

  /**
   * Render wizard mode
   */
  const renderWizardMode = () => {
    const currentStep = selectedAssistant.wizard.steps[wizardStep];
    
    return (
      <div className="flex-1 flex flex-col">
        {/* Progress indicator */}
        <div className="p-4 border-b border-slate-600/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Step {wizardStep + 1} of {selectedAssistant.wizard.steps.length}</span>
            <span className="text-xs text-slate-400">{Math.round(((wizardStep + 1) / selectedAssistant.wizard.steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${selectedAssistant.color} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${((wizardStep + 1) / selectedAssistant.wizard.steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Chat area with wizard question */}
  <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[60vh] pb-24">
          {chatHistory.map((message, index) => (
            <ChatMessage key={index} message={message} selectedAssistant={selectedAssistant} />
          ))}
          
          {/* Current wizard question */}
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 bg-gradient-to-br ${selectedAssistant.color} rounded-full flex items-center justify-center text-sm`}>
                {selectedAssistant.icon}
              </div>
              <span className="text-sm font-medium text-slate-300">Question {wizardStep + 1}</span>
            </div>
            <p className="text-white font-medium mb-4">{currentStep.question}</p>
            
            <WizardInput 
              step={currentStep} 
              onSubmit={handleWizardStep}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    );
  };

  /**
   * Render chat mode
   */
  const renderChatMode = () => (
    <div className="flex-1 flex flex-col max-h-[70vh]">
      {/* Chat messages */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[60vh] pb-24">
        {chatHistory.map((message, index) => (
          <ChatMessage key={index} message={message} selectedAssistant={selectedAssistant} />
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 text-slate-400">
            <div className={`w-8 h-8 bg-gradient-to-br ${selectedAssistant.color} rounded-full flex items-center justify-center text-sm`}>
              {selectedAssistant.icon}
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Chat input */}
      <div className="p-4 border-t border-slate-600/50">
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
            placeholder={`Ask ${selectedAssistant.title.toLowerCase()}...`}
            disabled={isLoading}
            className="flex-1 bg-slate-700/70 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          <button
            onClick={handleChatSubmit}
            disabled={!currentInput.trim() || isLoading}
            className={`px-6 py-3 bg-gradient-to-r ${selectedAssistant.color} hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 font-medium`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  // Mobile collapsed state or minimized state
  if ((isMobile && !isOpen) || isMinimized) {
    // If minimized (desktop), show a floating button to restore
    if (isMinimized) {
      return (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsMinimized(false)}
            className="bg-gradient-to-br from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 group relative"
            aria-label="Restore AI Assistant"
          >
            <span role="img" aria-label="Robot" className="text-2xl">🤖</span>
          </button>
        </div>
      );
    }
    // If mobile and closed, show the open button
    if (isMobile && !isOpen) {
      return (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-br from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 group relative"
            aria-label="Open AI Assistant"
          >
            <span role="img" aria-label="Robot" className="text-2xl">🤖</span>
          </button>
        </div>
      );
    }
    return null;
  }

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-[60] px-6 py-3 rounded-xl shadow-2xl transition-all duration-500 transform ${
          toast.show ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        } ${
          toast.type === 'success' 
            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white' 
            : toast.type === 'error'
            ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
        }`}>
          <div className="flex items-center gap-2">
            {toast.type === 'success' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : toast.type === 'error' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Panel */}
      <div className={`fixed transition-all duration-500 ease-in-out z-50 ${
        isMobile 
          ? 'inset-0 bg-black bg-opacity-60 backdrop-blur-sm' 
          : 'bottom-4 right-4 w-[420px] max-h-[calc(100vh-2rem)]'
      }`}>
        <div className={`bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/50 ${
          isMobile ? 'h-full w-full rounded-none' : 'max-h-full h-[600px]'
        } flex flex-col overflow-hidden`}>
          
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-600/50 bg-gradient-to-r from-slate-800/50 to-slate-700/50 shrink-0">
            <div className="flex items-center gap-3">
              {currentMode !== 'home' && (
                <button
                  onClick={resetToHome}
                  className="text-slate-400 hover:text-white transition-all duration-200 p-1 rounded-lg hover:bg-slate-700/50"
                  aria-label="Back to home"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              
              <div>
                <h2 className="text-lg font-bold text-white">
                  {selectedAssistant ? selectedAssistant.title : 'AI Travel Assistant'}
                </h2>
                {selectedAssistant && (
                  <p className="text-xs text-slate-400 mt-1">
                    {currentMode === 'wizard' ? 'Setup Assistant' : 'Chat Mode'}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {!isMobile && (
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-slate-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-slate-700/50"
                  aria-label="Minimize AI Assistant"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
              )}
              
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-slate-700/50"
                aria-label="Close AI Assistant"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content based on current mode */}
          {currentMode === 'home' && renderHomeScreen()}
          {currentMode === 'wizard' && renderWizardMode()}
          {currentMode === 'chat' && renderChatMode()}

          {/* Footer - only show on home screen */}
          {currentMode === 'home' && (
            <div className="p-4 border-t border-slate-600/50 text-center bg-gradient-to-r from-slate-800/30 to-slate-700/30 shrink-0">
              <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Powered by Gemini AI • Your intelligent travel companion
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Toggle Button (when panel is closed) */}
      {!isMobile && !isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-br from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/25 group relative"
            aria-label="Open AI Assistant"
          >
            <svg className="w-7 h-7 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse flex items-center justify-center">
              <span className="text-xs text-white font-bold">AI</span>
            </div>
          </button>
        </div>
      )}
    </>
  );
};

// Chat Message Component
const ChatMessage = ({ message, selectedAssistant }) => {
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className={`w-8 h-8 bg-gradient-to-br ${selectedAssistant.color} rounded-full flex items-center justify-center text-sm shrink-0`}>
          {selectedAssistant.icon}
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'bg-gradient-to-br from-blue-600 to-blue-700' : message.isError ? 'bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30' : 'bg-gradient-to-br from-slate-700/70 to-slate-800/70'} rounded-2xl px-4 py-3`}>
        <div className={`text-sm leading-relaxed ${isUser ? 'text-white' : message.isError ? 'text-red-200' : 'text-slate-200'}`}>
          {message.isAI ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-emerald-300 mb-2">
                <span>✨</span>
                <span>AI Generated Response</span>
              </div>
              <div className="prose prose-invert max-w-none text-slate-100">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none text-slate-100">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
        
        <div className={`text-xs mt-2 ${isUser ? 'text-blue-200' : 'text-slate-400'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-sm shrink-0">
          👤
        </div>
      )}
    </div>
  );
};

// Wizard Input Component
const WizardInput = ({ step, onSubmit, isLoading }) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!value.trim() || isLoading) return;
    onSubmit(value.trim());
    setValue('');
  };

  if (step.type === 'select') {
    return (
      <div className="space-y-3">
        {step.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSubmit(option)}
            disabled={isLoading}
            className="w-full text-left p-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500 rounded-xl text-white transition-all duration-200 disabled:opacity-50"
          >
            {option}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <input
        type={step.type === 'number' ? 'number' : 'text'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Type your answer..."
        disabled={isLoading}
        className="flex-1 bg-slate-700/70 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      />
      <button
        onClick={handleSubmit}
        disabled={!value.trim() || isLoading}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 font-medium"
      >
        Next
      </button>
    </div>
  );
};

export default AIAssistantPanel;
