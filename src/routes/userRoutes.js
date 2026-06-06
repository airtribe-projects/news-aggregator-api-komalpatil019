const express = require('express');
const router = express.Router();

const {
    signup,
    login,
    getPreferences,
    updatePreferences
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);

router.get('/preferences', authMiddleware, getPreferences);
router.put('/preferences', authMiddleware, updatePreferences);

module.exports = router;