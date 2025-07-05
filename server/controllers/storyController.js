const config = require('../config/config');
const { 
  buildGeminiPayload,
  getValidModel
} = require('../utils/apiHelpers');

const generateStory = async (req, res) => {
  try {
    const { prompt, genre, length } = req.body;
    const model = getValidModel();
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/${config.gemini.apiVersion}/models/${model}:generateContent` +
      `?key=${config.gemini.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildGeminiPayload(prompt, genre, length))
      }
    );

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Gemini API Error: ${data.error.message}`);
    }

    if (!data.candidates || !data.candidates[0].content.parts[0].text) {
      throw new Error('Unexpected response format from Gemini');
    }

    res.json({
      success: true,
      story: data.candidates[0].content.parts[0].text
    });

  } catch (error) {
    console.error('Generation Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.stack // Remove in production
    });
  }
};