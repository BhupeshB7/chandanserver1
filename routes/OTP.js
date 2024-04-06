// server/routes/api.js
const express = require('express');
const router = express.Router();
const OtpModel = require('../models/OTPSchema');
const nodemailer = require('nodemailer');

router.post('/generateOTP', async (req, res) => {
  const email = req.body.email;
  
  // Generate OTP and save it in the database
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await OtpModel.findOneAndUpdate({ email }, { otp }, { upsert: true });

  // Send OTP via Email
  const transporter = nodemailer.createTransport({
    service: "gmail", // e.g., 'Gmail'
    auth: {
      user: 'jivikasfg@gmail.com',
      pass: 'kkgwrdjycjjpzsfe',
    },
  });
//  const mailOptions = {
  //   from: 'jivikasfg@gmail.com',
  //   to: email,
  //   subject: 'Your one-time code',
  //   text: `Your OTP is: ${otp}`,
  // };
  // 
  const mailOptions = {
    from: 'jivikasfg@gmail.com',
    to: email,
    subject: 'Your one-time code',
    html: `
        <h4 style="font-weight: bold;">JIVIKA SFG CMP</h4>
        <hr style="border: 8px solid blueViolet;">
        <p>Hi there, here is your one-time code</p>
        <p style="font-weight: bold;">${otp}</p>
        <p>Please enter the code into the prompt for SuccessFully verified your Account</p>
        <h5>Best</h5>
        <p>The Jivika SFG CMP Team</p>
        <p>This email was sent to ${email} because you interact with JivikaSFG service. Please do not reply.</p>
    `,
};
// Now you can use nodemailer or your email sending mechanism to send this mailOptions.

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  res.json({ message: 'OTP generated and sent successfully' });
});

router.post('/verifyOTP', async (req, res) => {
  const email = req.body.email;
  const userOTP = req.body.otp;

  // Retrieve user's OTP from the database
  const user = await OtpModel.findOne({ email });

  if (!user || user.otp !== userOTP) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  // Mark the user as verified
  user.isVerified = true;
  await user.save();

  res.json({ message: 'OTP verified successfully' });
});

module.exports = router;