const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  room: { type: String, required: true },  // e.g., course code as room
});
module.exports = mongoose.model('Message', MessageSchema);