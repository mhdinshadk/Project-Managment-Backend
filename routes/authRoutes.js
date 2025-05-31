const express = require('express');
const { signup, login , logout , getAuthStatus } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/status', getAuthStatus);

module.exports = router;