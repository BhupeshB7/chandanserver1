const express = require('express');
const EmployeeMonth = require('../models/EmployeeMonth');
const router = express.Router();

// API endpoint for submitting the form data
// Replace your current code for saving a user with this updated code

router.post('/employeMonth', async (req, res) => {
    const {name, userId, aadharNo } = req.body;
    const newUser = new EmployeeMonth({name, userId, aadharNo });
  
    try {
      await newUser.save();
      res.status(200).send('User data saved successfully.');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error while saving user data.');
    }
  });
  // Route to search for a user by userId
router.get('/employeeMonth/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await EmployeeMonth.findOne({ userId:userId });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  module.exports = router