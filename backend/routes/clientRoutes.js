const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// @route   GET /api/clients
// @desc    Get all clients
router.get('/', clientController.getAllClients);

// @route   POST /api/clients
// @desc    Add a new client
router.post('/', clientController.addClient);



router.delete('/:id', clientController.deleteClient);

module.exports = router;
