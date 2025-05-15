const Event = require("../models/eventModel");

class EventController {
  static async createEvent(req, res) {
    const {
      title,
      date,
      description,
      location,
      organizer,
      category,
      companyId
    } = req.body;

    if (!companyId) {
      return res.status(400).json({ error: "companyId is required" });
    }

    try {
      const eventData = {
        title,
        date,
        description,
        location,
        organizer,
        category,
        companyId,
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

  static async getEventsByCompanyId(req, res) {
    const { companyId } = req.body;

    if (!companyId) {
      return res.status(400).json({ error: "companyId is required" });
    }

    try {
      const events = await Event.getEventsByCompanyId(companyId);
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
    const { companyId, eventId, name, email, userId } = req.body;

    if (!companyId || !eventId || !name || !email || !userId) {
      return res.status(400).json({ error: "eventId, name, email, and userId are required" });
    }

    try {
      await Event.registerUser(companyId, eventId, { name, email, userId });
      res.status(200).json({ message: "User registered for event successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteEvent(req, res) {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: "eventId is required" });
    }

    try {
      await Event.deleteEventById(eventId);
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EventController;
