const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const JobController = require("../controllers/jobController");

const router = express.Router();

// Setup local storage for resumes
const resumeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../../resumes");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9]/g, "_");
    cb(null, `${timestamp}_${sanitized}${ext}`);
  },
});

const uploadResume = multer({ storage: resumeStorage });

router.post("/post", JobController.createJob);
router.post("/search", JobController.searchJobs);
router.post("/apply", uploadResume.single("resume"), JobController.applyToJob);
router.post("/applications", JobController.getApplicationsByCompany);
router.post("/update-status", JobController.updateApplicationStatus);

module.exports = router;
