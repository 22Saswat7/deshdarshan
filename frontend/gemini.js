/**
 * Vercel Serverless Function - Gemini API Proxy
 * This function handles Gemini API requests to avoid CORS issues
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Only POST requests are supported.' });
    return;
  }

  try {
    // Get API key from environment variables
    const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      console.error('VITE_GEMINI_API_KEY not found in environment variables');
      res.status(500).json({ 
        error: 'API configuration error. Please check server configuration.' 
      });
      return;
    }

    // Validate request body
    if (!req.body || !req.body.contents) {
      res.status(400).json({ 
        error: 'Invalid request body. Expected contents array.' 
      });
      return;
    }

    // Make request to Gemini API
    const geminiResponse = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        },
        body: JSON.stringify(req.body)
      }
    );

    // Check if Gemini API request was successful
    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API Error:', geminiResponse.status, errorText);
      
      res.status(geminiResponse.status).json({ 
        error: `Gemini API Error: ${geminiResponse.status}`,
        details: errorText
      });
      return;
    }

    // Parse and return the response
    const data = await geminiResponse.json();
    res.status(200).json(data);

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ 
      error: 'Internal server error occurred while processing your request.',
      details: error.message 
    });
  }
}
