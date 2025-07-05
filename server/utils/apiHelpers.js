const { gemini } = require('../config/config');

exports.getValidModel = () => {
  // List of currently available models (as of July 2024)
  const validModels = [
    "gemini-1.5-pro-latest",
    "gemini-1.0-pro",
    "gemini-1.5-flash"
  ];
  return validModels[0]; // Using the latest pro model
};

exports.buildGeminiPayload = (prompt, genre, length) => {
  const model = this.getValidModel();
  
  return {
    contents: [{
      parts: [{
        text: `Write a ${genre} story about: ${prompt} (${length} length, ${this.getWordCount(length)} words)`
      }]
    }],
    generationConfig: {
      temperature: 0.8,
      topP: 0.9,
      maxOutputTokens: length === 'short' ? 512 : length === 'medium' ? 1024 : 2048
    }
  };
};

exports.getWordCount = (length) => {
  const counts = { 
    short: '100-200', 
    medium: '300-500', 
    long: '600-800' 
  };
  return counts[length] || counts.medium;
};