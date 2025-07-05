const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { generateStory } = require('../controllers/storyController');
const config = require('../config/config');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: config.rateLimit,
  message: 'Too many story generation requests'
});

router.post('/generate', limiter, generateStory);

module.exports = router;