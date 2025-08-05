require('dotenv').config(); // load env vars
const express = require('express');
const connectDB = require('../config/db');
const cors = require('cors');
const http = require('http');

// Start DB connection immediately
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err.message);
});

// create server instance
const app = express();
const server = http.createServer(app);

// add CORS middleware to only allow requests from deployed frontend
app.use(cors({ origin: 'https://study-group-connector.vercel.app' })); 
app.use(express.json());

// mount routes
app.use('/api/auth', require('../routes/auth'));
app.use('/api/profile', require('../routes/profile').router);
app.use('/api/matches', require('../routes/matches'));
app.use('/api/chat', require('../routes/chat'));

// For local runs only: Listen on port if run directly
const PORT = process.env.PORT || 5000;
if (require.main === module) {
  console.log(`Starting local server on port ${PORT}`);
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;