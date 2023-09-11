// controllers/pdfController.js
const Pdf = require("../models/File");

exports.uploadPdf = async (req, res) => {
  try {
    const { filename } = req.file;
    const newPdf = new Pdf({ filename });
    await newPdf.save();
    res.status(201).json({ message: "PDF uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error uploading the PDF" });
  }
};

exports.getPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find({}, "-_id filename");
    res.json(pdfs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching PDFs" });
  }
};

exports.deletePdfs = async (req, res) => {
  try {
    const { _id } = req.params;
    const pdfs = await Pdf.findById(_id);
    if (!pdfs) {
      return res.status(404).json({ error: "File Not Found!" });
    }
    res.status(200).json({ success: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete PDF" });
  }
};
