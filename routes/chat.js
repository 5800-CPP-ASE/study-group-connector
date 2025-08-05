const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { authMiddleware } = require('./profile');
const pusher = require('../config/pusher');

// Get messages endpoint
router.get('/:room', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room }).sort('timestamp').populate('sender', 'email').populate('receiver', 'email'); 
    
    await Message.updateMany({ room: req.params.room, receiver: req.user.id, read: false }, { read: true });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// unread count, counts unread messages
router.get('/unread/:userId', authMiddleware, async (req, res) => {
  try {
    const unread = await Message.countDocuments({ receiver: req.user.id, read: false });
    res.json(unread);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Send message endpoint: save to DB and trigger Pusher
router.post('/send', authMiddleware, async (req, res) => {
  const { room, receiver, text } = req.body;
  const sender = req.user.id; // From auth middleware
  try {
    const message = new Message({ sender, receiver, text, room });
    await message.save();
    const populatedMessage = await Message.findById(message._id).populate('sender', 'email').populate('receiver', 'email');
    await pusher.trigger(room, 'message', populatedMessage); // Broadcast via Pusher
    res.json(populatedMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;