const express = require("express");
const EventController = require("../controllers/eventController");

const router = express.Router();

router.post("/create", EventController.createEvent);
router.get("/all", EventController.getEvents);
router.post("/filter", EventController.filterEvents);
router.post("/register", EventController.registerForEvent);
router.delete("/events", EventController.deleteEvent);

module.exports = router;