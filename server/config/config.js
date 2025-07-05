require('dotenv').config();

// Valid Gemini models as of July 2024
const SUPPORTED_MODELS = {
  'gemini-1.5-pro-latest': {
    maxTokens: 8192,
    endpoint: 'generateContent'
  },
  'gemini-1.0-pro': {
    maxTokens: 30720,
    endpoint: 'generateContent'
  },
  'gemini-1.5-flash': {
    maxTokens: 8192,
    endpoint: 'generateContent'
  }
};

// Get the best available model
function getBestModel() {
  // In production, you might check available models via API
  // For now, we'll use the latest pro version
  return 'gemini-1.5-pro-latest';
}

module.exports = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    apiVersion: 'v1beta',
    model: getBestModel(),
    get endpoint() {
      const modelConfig = SUPPORTED_MODELS[this.model];
      if (!modelConfig) {
        throw new Error(`Model ${this.model} is not supported`);
      }
      return `https://generativelanguage.googleapis.com/${this.apiVersion}/models/${this.model}:${modelConfig.endpoint}`;
    },
    get maxTokens() {
      return SUPPORTED_MODELS[this.model]?.maxTokens || 8192;
    }
  },
  server: {
    port: process.env.PORT || 5000,
    rateLimit: process.env.RATE_LIMIT || 100,
    environment: process.env.NODE_ENV || 'development'
  },
  // For future model availability checks
  modelEndpoint: `https://generativelanguage.googleapis.com/${process.env.GEMINI_API_VERSION || 'v1beta'}/models`,
  
  // Utility methods
  isModelSupported(modelName) {
    return !!SUPPORTED_MODELS[modelName];
  },
  
  getSupportedModels() {
    return Object.keys(SUPPORTED_MODELS);
  }
};