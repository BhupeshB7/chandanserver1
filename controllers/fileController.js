const File = require('../models/File');

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

module.exports = { uploadFile };
