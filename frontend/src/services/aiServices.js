/**
 * AI Services - Travel assistance API functions
 * This file handles all AI-related API calls through our Express.js backend
 */

/**
 * Call Gemini AI through our Express.js backend API
 * @param {string} promptType - Type of prompt (packing, itinerary, faq)
 * @param {string} userInput - User's input text
 * @returns {Promise<string>} - AI response text
 */
export const callGeminiAPI = async (promptType, userInput) => {
  try {
    // Call our Express.js backend API
    const response = await fetch('http://localhost:5000/api/ai/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        promptType,
        userInput: userInput.trim()
      })
    });

    // Parse response
    const data = await response.json();

    // Check if request was successful
    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status}`);
    }

    // Check if we have a valid response
    if (!data.success || !data.response) {
      throw new Error('No response received from AI service.');
    }

    return data.response;

  } catch (error) {
    console.error('AI Service Error:', error);
    return handleAPIError(error);
  }
};

/**
 * Error handler for API calls
 * @param {Error} error - The error object
 * @returns {string} - User-friendly error message
 */
export const handleAPIError = (error) => {
  console.error('AI Service Error:', error);
  
  // Provide specific error messages based on error type
  if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
    return "Unable to connect to AI service. Please check your internet connection and try again.";
  }
  
  if (error.message.includes('Rate limit') || error.message.includes('429')) {
    return "AI service is currently busy. Please wait a moment and try again.";
  }
  
  if (error.message.includes('Authentication') || error.message.includes('401') || error.message.includes('403')) {
    return "AI service authentication error. Please contact support if this persists.";
  }
  
  if (error.message.includes('500')) {
    return "AI service is temporarily unavailable. Please try again later.";
  }
  
  return "Sorry, I'm having trouble processing your request right now. Please try again in a moment.";
};
