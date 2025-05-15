const express = require("express");
const upload = require("../config/multer");
const ResourceController = require("../controllers/resourceController");

const router = express.Router();

router.post("/upload", upload.single("file"), ResourceController.uploadResource);
router.post("/download", ResourceController.downloadResource);
router.get("/all", ResourceController.getAllResources);
router.post("/filter", ResourceController.filterResources);
router.delete("/resources", ResourceController.deleteResource);

module.exports = router;
