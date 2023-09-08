// models/Pdf.js
const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  filename: String,
});

const Pdf = mongoose.model('Pdf', pdfSchema);

module.exports = Pdf;
