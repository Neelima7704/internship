const express = require('express');
const router = express.Router();
const { register, login, logout, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile/update', protect, updateProfile);

module.exports = router; 