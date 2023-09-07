const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    // required: true,
  },
  AadharNo: {
    type: String,
    // required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    // required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  tenthResult: {
    type: Number,
    required: true,
  },
  twelthResult: {
    type: Number,
    // required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Form', formSchema);
