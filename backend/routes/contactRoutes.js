const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/submit', contactController.submitContactForm);
router.get('/', contactController.getAllContacts);
router.delete('/:id', contactController.deleteContact);

module.exports = router;
