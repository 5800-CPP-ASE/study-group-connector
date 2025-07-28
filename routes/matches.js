const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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

function hasOverlap(avail1, avail2) {
  return avail1.some(a1 => avail2.some(a2 => a1 === a2));
}

router.get('/', authMiddleware, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const matches = await User.find({
      _id: { $ne: currentUser._id },
      courses: { $in: currentUser.courses }
    });
    const filteredMatches = matches.filter(match => hasOverlap(currentUser.availability, match.availability));
    res.json(filteredMatches.map(m => ({ id: m._id, email: m.email, courses: m.courses, availability: m.availability })));
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;