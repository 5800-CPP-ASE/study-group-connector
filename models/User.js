const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: [{ type: String }],
  availability: [{ type: String }],
});
module.exports = mongoose.model('User', UserSchema);