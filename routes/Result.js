const express = require("express");
const router = express.Router();
const ResultController = require("../controllers/ResultCotroller");

// ...

// PDF routes
router.post("/Resultupload", upload.single("pdf"),ResultController.uploadResult);
router.get("/Resultfetch/:userId", ResultController.getResult);
router.delete("/Result/delete/:pdfId", ResultController.deleteResult);

// ...

module.exports = router;
