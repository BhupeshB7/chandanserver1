// Define a MongoDB schema and model for the messages
const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    name: String,
    message: String,
    userId:String
  });
  const Pdf = mongoose.model('Task', messageSchema);

module.exports = Pdf;