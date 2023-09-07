// models/Employee.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    // required: true,
  },
  payment: {
    type: Number,
    required: true,
  },
  aadharNo:{
    type: Number,
    required: true
  }
},
{timestamps:true});

module.exports = mongoose.model('Payment', paymentSchema);
