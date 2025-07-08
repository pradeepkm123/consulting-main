const express = require('express');
const router = express.Router();
const counterController = require('../controllers/counterController');

// @route   GET /api/counter
// @desc    Get counter data
router.get('/', counterController.getCounterData);

// @route   POST /api/counter
// @desc    Update counter data
router.post('/', counterController.updateCounterData);

module.exports = router;
