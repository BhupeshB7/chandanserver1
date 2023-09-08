const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.post('/upload', fileController.uploadFile);
router.post('/pdf', fileController.uploadFile);
router.post('/:fileName', fileController.uploadFile);

module.exports = router;
