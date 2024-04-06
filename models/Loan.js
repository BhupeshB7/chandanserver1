// models/Employee.js
const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  aadharNo: {
    type: String,
    required: true,
  },
  approved:{
    type: Boolean,
    default: false,
  },
  accountNo:{
    type: Number,
    unique: true,
  },
  ifscCode:{
    type: String,
    unique: true,
  },
  description:{
    type: String,
  },
  amount:{
    type: Number,
  }
});

module.exports = mongoose.model('Loan', loanSchema);
