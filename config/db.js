const mongoose = require('mongoose');

// connect to db instance
const connectDB = async () => {
  try {
    console.log('Connecting to DB with URI:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 50000,  
      socketTimeoutMS: 60000,  
      connectTimeoutMS: 30000,
      bufferTimeoutMS: 30000 
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('DB connect error:', err.message);
    
    throw err; // Rethrow to catch in index.js
  }
};
module.exports = connectDB;