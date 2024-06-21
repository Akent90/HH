const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = process.env.JWT_SECRET || 'your_secret_key';

const authMiddleware = async (req) => {
  const token = req.headers.authorization || '';

  if (!token) {
    return req;
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id);
    req.user = user;
  } catch (err) {
    console.error('Token verification error:', err);
  }

  return req;
};

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
};

module.exports = {
  authMiddleware,
  generateToken,
};
