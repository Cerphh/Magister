const { db } = require("../config/firebase");

class AdminController {
  // === RESOURCE VALIDATION ===
  static async fetchPendingResources(req, res) {
    try {
      const snapshot = await db.collection("pending_resources").get();
      const resources = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json({ resources });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async validateResource(req, res) {
    const { resourceId, action } = req.body;
    try {
      const ref = db.collection("pending_resources").doc(resourceId);
      const doc = await ref.get();
      if (!doc.exists) return res.status(404).json({ error: "Resource not found" });

      if (action === "accept") {
        await db.collection("resources").doc(resourceId).set(doc.data());
      }
      await ref.delete();
      res.status(200).json({ message: `Resource ${action}ed successfully` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // === JOB VALIDATION ===
  static async fetchPendingJobs(req, res) {
    try {
      const snapshot = await db.collection("pending_jobs").get();
      const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json({ jobs });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async validateJob(req, res) {
    const { jobId, action } = req.body;
    try {
      const ref = db.collection("pending_jobs").doc(jobId);
      const doc = await ref.get();
      if (!doc.exists) return res.status(404).json({ error: "Job not found" });

      if (action === "accept") {
        await db.collection("jobs").doc(jobId).set(doc.data());
      }
      await ref.delete();
      res.status(200).json({ message: `Job ${action}ed successfully` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // === EVENT VALIDATION ===
  static async fetchPendingEvents(req, res) {
    try {
      const snapshot = await db.collection("pending_events").get();
      const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json({ events });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async validateEvent(req, res) {
    const { eventId, action } = req.body;
    try {
      const ref = db.collection("pending_events").doc(eventId);
      const doc = await ref.get();
      if (!doc.exists) return res.status(404).json({ error: "Event not found" });

      if (action === "accept") {
        await db.collection("events").doc(eventId).set(doc.data());
      }
      await ref.delete();
      res.status(200).json({ message: `Event ${action}ed successfully` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AdminController;
