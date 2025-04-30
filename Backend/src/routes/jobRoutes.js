const express = require("express");
const JobController = require("../controllers/jobController");

const router = express.Router();

// Post a new job (only authorized users can post jobs)
router.post("/post", JobController.createJob);

// Search for jobs with filters
router.post("/search", JobController.searchJobs);

module.exports = router;
