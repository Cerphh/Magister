const express = require("express");
const AdminController = require("../controllers/adminController");

const router = express.Router();

// Resource validation
router.get("/resources", AdminController.fetchPendingResources);
router.post("/resources/validate", AdminController.validateResource);

// Job validation
router.get("/jobs", AdminController.fetchPendingJobs);
router.post("/jobs/validate", AdminController.validateJob);

// Event validation
router.get("/events", AdminController.fetchPendingEvents);
router.post("/events/validate", AdminController.validateEvent);

module.exports = router;
