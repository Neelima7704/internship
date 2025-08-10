const express = require('express');
const router = express.Router();

// Placeholder route - will be implemented later
router.get('/', (req, res) => {
  res.json({ message: 'Admin route working' });
});

module.exports = router; 