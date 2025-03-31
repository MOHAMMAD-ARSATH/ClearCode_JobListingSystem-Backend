const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

// Get all contacts
router.get('/', contactController.getAllContacts);

// Add a new contact
router.post('/', contactController.addContact);

module.exports = router;