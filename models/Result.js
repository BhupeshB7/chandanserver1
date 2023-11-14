// models/Pdf.js
const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  filename: String,
  userId: String, // Add userId field
});

const IDCard = mongoose.model("Result", ResultSchema);

module.exports = IDCard;
