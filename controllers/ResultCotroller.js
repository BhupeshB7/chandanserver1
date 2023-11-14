// controllers/pdfController.js
const Pdf = require("../models/File");

exports.uploadResult = async (req, res) => {
  try {
    const { filename, userId } = req.file; // Get userId from request
    const newPdf = new Pdf({ filename, userId });
    await newPdf.save();
    res.status(201).json({ message: "Result uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error uploading the Result" });
  }
};

exports.getResult = async (req, res) => {
  try {
    const userId = req.params.userId; // Get userId from request params
    const pdfs = await Pdf.find({ userId }, "-_id filename");
    res.json(pdfs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Result" });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    const pdfId = req.params.pdfId; // Get PDF ID from request params
    await Pdf.deleteOne({ _id: pdfId });
    res.json({ message: "Result deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the Result" });
  }
};
