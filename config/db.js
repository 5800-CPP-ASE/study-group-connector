const mongoose = require('mongoose');

// connect to db instance
const connectDB = async () => {
  try {
    console.log('Connecting to DB with URI:', process.env.MONGODB_URI);  
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 30000 }); 
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('DB connect error:', err.message);
    process.exit(1);
  }
};
module.exports = connectDB;