/**
 * AI Routes - Gemini API Integration
 * Handles all AI-related requests for the travel assistant
 */

const express = require('express');
const router = express.Router();

/**
 * POST /api/ai/gemini
 * Proxy requests to Gemini AI API to avoid CORS issues
 */
router.post('/gemini', async (req, res) => {
  try {
    // Validate API key
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return res.status(500).json({
        error: 'API configuration error',
        message: 'Server configuration issue. Please contact support.'
      });
    }

    // Validate request body
    const { promptType, userInput } = req.body;
    if (!promptType || !userInput) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'promptType and userInput are required'
      });
    }

  // Generate appropriate prompt, always ask for concise, Gemini-style, bullet-pointed output
  let promptText = generatePrompt(promptType, userInput.trim());
  promptText += '\n\nPlease keep the response concise, in clear bullet points, and formatted for easy reading. Do not include explanations or extra notes unless specifically asked.';

    // Make request to Gemini API
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: promptText }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      }
    );

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', response.status, errorText);
      
      // Return appropriate error based on status
      if (response.status === 429) {
        return res.status(429).json({
          error: 'Rate limit exceeded',
          message: 'AI service is currently busy. Please try again in a moment.'
        });
      }
      
      if (response.status === 401 || response.status === 403) {
        return res.status(500).json({
          error: 'Authentication error',
          message: 'AI service authentication issue. Please contact support.'
        });
      }
      
      return res.status(500).json({
        error: 'AI service error',
        message: 'Unable to process your request right now. Please try again later.'
      });
    }

    // Parse and return successful response
    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
      return res.status(500).json({
        error: 'Invalid response',
        message: 'No response received from AI service. Please try again.'
      });
    }

    // Return successful response
    res.status(200).json({
      success: true,
      response: textResponse,
      promptType,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Route Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred. Please try again later.',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
});

/**
 * Dynamic Prompt Generator
 * @param {string} promptType - Type of prompt (packing, itinerary, faq)
 * @param {string} userInput - User's input text
 * @returns {string} - Formatted prompt for AI
 */
function generatePrompt(promptType, userInput) {
  const baseContext = "You are a helpful and knowledgeable travel assistant for DeshDarshan, a platform focused on Indian travel destinations. Provide detailed, practical, and culturally aware advice.";

  switch (promptType) {
    case 'packing':
      return `${baseContext}

Create a comprehensive packing checklist based on this travel request: "${userInput}"

Please provide:
- Essential items categorized by type (clothing, electronics, documents, etc.)
- Weather-appropriate recommendations
- Cultural considerations for the destination
- Special items for planned activities
- Practical tips for packing efficiently
- Items to avoid or restrictions to consider

Format your response with clear headings and bullet points for easy reading.`;

    case 'itinerary':
      return `${baseContext}

Create a detailed travel itinerary based on this request: "${userInput}"

Please include:
- Day-by-day schedule with timing suggestions
- Must-visit attractions and hidden gems
- Local cuisine recommendations and where to try them
- Cultural experiences and festivals (if applicable)
- Transportation options between locations
- Budget estimates for different categories
- Best times to visit specific places
- Local customs and etiquette tips

Format your response with clear day divisions and practical information.`;

    case 'faq':
      return `${baseContext}

Answer this travel question comprehensively: "${userInput}"

Please provide:
- A direct and clear answer to the question
- Relevant background information
- Practical tips and recommendations
- Safety considerations if applicable
- Cultural insights where relevant
- Alternative options or suggestions
- Additional resources or contacts if helpful

Keep your response informative yet concise, focusing on actionable advice.`;

    default:
      return `${baseContext}

Please provide helpful travel advice for: "${userInput}"

Include relevant tips, recommendations, and practical information that would be useful for travelers.`;
  }
}

module.exports = router;
