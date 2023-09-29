// controllers/pdfController.js
const Pdf = require("../models/File");

exports.uploadIDCard = async (req, res) => {
  try {
    const { filename, userId } = req.file; // Get userId from request
    const newPdf = new Pdf({ filename, userId });
    await newPdf.save();
    res.status(201).json({ message: "PDF uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error uploading the PDF" });
  }
};

exports.getIDCard = async (req, res) => {
  try {
    const userId = req.params.userId; // Get userId from request params
    const pdfs = await Pdf.find({ userId }, "-_id filename");
    res.json(pdfs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching PDFs" });
  }
};

exports.deleteIDCard = async (req, res) => {
  try {
    const pdfId = req.params.pdfId; // Get PDF ID from request params
    await Pdf.deleteOne({ _id: pdfId });
    res.json({ message: "PDF deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the PDF" });
  }
};
