const express = require("express");
const router = express.Router();
const IDController = require("../controllers/IDCardController");

// ...

// PDF routes
router.post("/IDCardupload", upload.single("pdf"), IDController.uploadIDCard);
router.get("/IDCardfetch/:userId", IDController.getIDCard);
router.delete("/IDCarddelete/:pdfId", IDController.deleteIDCard);

// ...

module.exports = router;
