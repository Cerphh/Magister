const Event = require("../models/eventModel");

class EventController {
  static async createEvent(req, res) {
    const {
      title,
      date,
      description,
      location,
      organizer,
      registrationLink
    } = req.body;

    try {
      const eventData = {
        title,
        date: new Date(date),
        description,
        location,
        organizer,
        registrationLink,
        attendees: [],
        createdAt: new Date(),
      };

      const eventId = await Event.createPendingEvent(eventData);
      res.status(201).json({ message: "Event submitted for review", eventId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getEvents(req, res) {
    try {
      const events = await Event.getAllEvents();
      res.status(200).json({ events });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async filterEvents(req, res) {
    const filters = req.body;

    try {
      const events = await Event.filterEvents(filters);
      res.status(200).json({ events });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async registerForEvent(req, res) {
    const { eventId, name, email, userId } = req.body;

    if (!eventId || !name || !email || !userId) {
      return res.status(400).json({ error: "eventId, name, email, and userId are required" });
    }

    try {
      await Event.registerUser(eventId, { name, email, userId });
      res.status(200).json({ message: "User registered for event successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EventController;