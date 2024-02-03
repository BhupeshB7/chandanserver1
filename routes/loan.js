const express = require('express');
const Loan = require('../models/Loan');
const router= express.Router();

router.post('/create', async (req, res) => {
    const { aadharNo, name } = req.body;
  
    try {
      const user = new Loan({ aadharNo, name });
      await user.save();
      res.status(201).json({ message: 'Loan Details created successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user.' });
      console.log(error);
    }
  });
  router.get('/get/:aadharNo', async (req, res) => {
    const { aadharNo } = req.params;
  
    try {
      const user = await Loan.findOne({ aadharNo });
      if (user) {
       return res.json({success:true,message:'SuccessFully fetched!', name: user.name });
      } else {
       return res.status(404).json({ success:false,error: 'Details not found.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user.' });
    }
  });
  module.exports =router;