const File = require('../models/File');
const fs = require('fs');
const path = require('path');
const uploadFile = async (req, res) => {
  console.log(req.files); // Check what's in req.files
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  const file = req.files.file;
  console.log(file); // Check the 'file' object
  const maxSize = 5000 * 1024; // 500KB

  if (!file || file.size > maxSize) {
    return res.status(400).json({ message: 'File size exceeds the limit.' });
  }

  const newFile = new File({
    filename: file.name,
    contentType: file.mimetype,
    size: file.size,
    data: file.data,
  });

  try {
    await newFile.save();
    res.status(201).json({ message: 'File uploaded successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const pdfsDirectory = path.join(__dirname, '../uploads');

const getPdfList = (req, res) => {
  fs.readdir(pdfsDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    const pdfFiles = files.filter((file) => path.extname(file).toLowerCase() === '.pdf');
    res.json({ pdfFiles });
  });
};

const getPdf = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(pdfsDirectory, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'File not found.' });
  }

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
};

module.exports = { uploadFile, getPdf, getPdfList };
