const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// authentication middleware to verify jwt token and attach user
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

// update endoint (authenticate, update courses, save user)
router.put('/update', authMiddleware, async (req, res) => {
  const { courses, availability } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.courses = courses;
    user.availability = availability;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = { router, authMiddleware };