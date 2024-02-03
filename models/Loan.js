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
  }
});

module.exports = mongoose.model('Loan', loanSchema);
