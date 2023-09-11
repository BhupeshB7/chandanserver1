// routes/pdfRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const pdfController = require('../controllers/fileController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/uploads', upload.single('pdf'), pdfController.uploadPdf);
router.get('/pdfs', pdfController.getPdfs);
router.delete('/pdfs/:_id', pdfController.deletePdfs);

module.exports = router;
