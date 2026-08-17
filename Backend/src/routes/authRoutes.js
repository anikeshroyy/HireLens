const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/oauth
router.post('/oauth', authController.oauthLogin);

// POST /api/auth/google
router.post('/google', authController.googleLogin);

// GET /api/auth/config
router.get('/config', authController.getConfig);

module.exports = router;
