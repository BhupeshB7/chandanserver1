

  // server/routes/api.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Task')

// Create a route to handle message submissions
router.post('/messages', async (req, res) => {
    try {
      const { name, message } = req.body;
      const newMessage = new Message({ name, message });
      await newMessage.save();
      res.status(201).json({ message: 'Message submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error submitting message' });
    }
  });
  

module.exports = router;