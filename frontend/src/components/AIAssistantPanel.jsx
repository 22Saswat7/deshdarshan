/**
 * AI Assistant Panel Component
 * A floating sidebar for AI-powered travel assistance with three sections:
 * - Packing Assistant
 * - Itinerary Generator  
 * - FAQ Help Chatbot
 */

import React, { useState, useEffect } from 'react';
import { callGeminiAPI, handleAPIError } from '../services/aiServices';

const AIAssistantPanel = () => {
  // Main panel state
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Section states (which sections are expanded)
  const [expandedSections, setExpandedSections] = useState({
    packing: false,
    itinerary: false,
    faq: false
  });

  // Input states for each section
  const [inputs, setInputs] = useState({
    packing: '',
    itinerary: '',
    faq: ''
  });

  // Loading states for each section
  const [loading, setLoading] = useState({
    packing: false,
    itinerary: false,
    faq: false
  });

  // Response states for each section
  const [responses, setResponses] = useState({
    packing: '',
    itinerary: '',
    faq: ''
  });

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-collapse on mobile
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * Toggle section expansion
   */
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  /**
   * Handle input changes for each section
   */
  const handleInputChange = (section, value) => {
    setInputs(prev => ({
      ...prev,
      [section]: value
    }));
  };

  /**
   * Show toast notification
   */
  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 4000);
  };

  /**
   * Handle form submission for each section
   */
  const handleSubmit = async (section) => {
    const userInput = inputs[section].trim();
    
    // Validate input
    if (!userInput) {
      showToast('Please enter your question or request before submitting.', 'error');
      return;
    }

    // Set loading state
    setLoading(prev => ({ ...prev, [section]: true }));
    
    try {
      // Call mock AI API
      const response = await callGeminiAPI(section, userInput);
      
      // Update response state
      setResponses(prev => ({
        ...prev,
        [section]: response
      }));
      
      showToast('Response generated successfully!', 'success');
    } catch (error) {
      const errorMessage = handleAPIError(error);
      setResponses(prev => ({
        ...prev,
        [section]: errorMessage
      }));
      showToast('Failed to get AI response. Please try again.', 'error');
    } finally {
      // Clear loading state
      setLoading(prev => ({ ...prev, [section]: false }));
    }
  };

  /**
   * Clear section data
   */
  const clearSection = (section) => {
    setInputs(prev => ({ ...prev, [section]: '' }));
    setResponses(prev => ({ ...prev, [section]: '' }));
  };

  // Section configuration
  const sections = [
    {
      key: 'packing',
      title: '📦 Packing Assistant',
      placeholder: 'Tell me about your destination, trip duration, and activities planned...',
      description: 'Get personalized packing suggestions for your trip'
    },
    {
      key: 'itinerary',
      title: '🗓️ Itinerary Generator',
      placeholder: 'Describe your destination, interests, budget, and how many days...',
      description: 'Create a customized travel itinerary'
    },
    {
      key: 'faq',
      title: '❓ FAQ Help Chatbot',
      placeholder: 'Ask any travel-related question...',
      description: 'Get answers to common travel questions'
    }
  ];

  if (isMobile && !isOpen) {
    // Mobile collapsed state - show only toggle button
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-br from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 group"
          aria-label="Open AI Assistant"
        >
          <svg className="w-7 h-7 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
        </button>
      </div>
    );
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
            : 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
        }`}>
          <div className="flex items-center gap-2">
            {toast.type === 'success' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          : 'bottom-4 right-4 w-96 max-h-[calc(100vh-2rem)]'
      }`}>
        <div className={`bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-600/50 ${
          isMobile ? 'h-full w-full rounded-none' : 'max-h-full'
        } flex flex-col overflow-hidden`}>
          
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-600/50 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                🤖
              </div>
              AI Travel Assistant
            </h2>
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

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {sections.map((section) => (
              <div key={section.key} className="border border-slate-600/50 rounded-xl overflow-hidden shadow-lg">
                
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-full p-4 bg-gradient-to-r from-slate-800/80 to-slate-700/80 hover:from-slate-700/80 hover:to-slate-600/80 transition-all duration-300 text-left flex items-center justify-between text-white group"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-lg flex items-center gap-2">
                      {section.title}
                    </div>
                    <div className="text-sm text-slate-300 mt-1">{section.description}</div>
                  </div>
                  <svg 
                    className={`w-6 h-6 transition-transform duration-300 text-slate-300 group-hover:text-white ${
                      expandedSections[section.key] ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Section Content */}
                {expandedSections[section.key] && (
                  <div className="p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 space-y-4 animate-in slide-in-from-top duration-300">
                    
                    {/* Input Area */}
                    <div className="space-y-3">
                      <textarea
                        value={inputs[section.key]}
                        onChange={(e) => handleInputChange(section.key, e.target.value)}
                        placeholder={section.placeholder}
                        className="w-full p-4 bg-slate-700/70 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm"
                        rows="4"
                        disabled={loading[section.key]}
                      />
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleSubmit(section.key)}
                          disabled={loading[section.key] || !inputs[section.key].trim()}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02] disabled:transform-none"
                        >
                          {loading[section.key] ? (
                            <span className="flex items-center justify-center gap-3">
                              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                              Submit
                            </span>
                          )}
                        </button>
                        
                        {(inputs[section.key] || responses[section.key]) && (
                          <button
                            onClick={() => clearSection(section.key)}
                            className="px-4 py-3 bg-slate-600/70 hover:bg-slate-500/70 text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                            title="Clear section"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* AI Response */}
                    {responses[section.key] && (
                      <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 rounded-xl p-4 backdrop-blur-sm shadow-inner">
                        <div className="flex items-center gap-2 text-sm text-slate-300 mb-3">
                          <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                            ✨
                          </div>
                          AI Response:
                        </div>
                        <div className="text-white text-sm whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto custom-scrollbar">
                          {responses[section.key]}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-600/50 text-center bg-gradient-to-r from-slate-800/30 to-slate-700/30">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Powered by AI • Travel smarter with personalized assistance
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Toggle Button (when panel is closed) */}
      {!isMobile && !isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-br from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/25 group"
            aria-label="Open AI Assistant"
          >
            <svg className="w-7 h-7 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          </button>
        </div>
      )}
    </>
  );
};

export default AIAssistantPanel;
