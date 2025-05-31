const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  // Check for token in Authorization header
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Extract token from "Bearer <token>" format
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trim();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }
    req.user = { userId: user._id, email: user.email, name: user.name };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Signing First' });
  }
};