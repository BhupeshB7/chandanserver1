// routes/payment.js
const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Create a new Payment History
router.post('/payment', async (req, res) => {
  try {
    const { name, userId, payment, aadharNo } = req.body;
    const employee = new Payment({ name, userId, payment, aadharNo });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch all Payment History
router.get('/paymentHistory', async (req, res) => {
  try {
    const payment = await Payment.find();
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
