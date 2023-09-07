// routes/employee.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Create a new employee
router.post('/employees', async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const employee = new Employee({ name, email, mobile });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
