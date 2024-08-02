const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.use('/twitter', require('./twitter')); // Protecting Twitter routes

module.exports = router;
