

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
  // Fetch all users
router.get( '/message',async (req, res) => {
  try {
    const message = await Message.find();
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: 'failed to fetch data' });
  }
});

module.exports = router;