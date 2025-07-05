const express = require('express');
const cors = require('cors');
const storyRoutes = require('./routes/storyRoutes');
const config = require('./config/config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/stories', storyRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server error');
});

app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});