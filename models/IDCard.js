// models/Pdf.js
const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  filename: String,
  userId: String, // Add userId field
});

const IDCard = mongoose.model("IDCard", pdfSchema);

module.exports = IDCard;
