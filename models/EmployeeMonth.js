const { default: mongoose } = require("mongoose");

// Define a mongoose schema and model for the user data
const userSchema = new mongoose.Schema({
    name:String,
    userId: String,
    aadharNo: String,
  });
   const EmployeeMonth = mongoose.model('EmployeeMonth', userSchema);
   module.exports = EmployeeMonth;