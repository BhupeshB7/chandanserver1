const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Create a new user
router.post('/create', formController.createForm);

// Fetch all users
router.get('/all', formController.getAllForm);

// Fetch a user by ID
router.get('/:userId', formController.getFormById);

// Update a user by ID
router.put('/:userId', formController.updateFormById);

// Delete a user by ID
router.delete('/:userId', formController.deleteFormById);

module.exports = router;
