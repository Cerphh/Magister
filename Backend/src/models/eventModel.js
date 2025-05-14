const { db } = require("../config/firebase");
const admin = require("firebase-admin");

class Event {
  static async createPendingEvent(eventData) {
    const ref = db.collection("pending_events").doc();
    await ref.set(eventData);
    return ref.id;
  }

  static async getAllEvents() {
    const snapshot = await db.collection("events").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getEventsByCompanyId(companyId) {
    const snapshot = await db.collection("events")
      .where("companyId", "==", companyId)
      .get();
      
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async filterEvents(filters = {}) {
    let query = db.collection("events");
    if (filters.title) query = query.where("title", "==", filters.title);
    if (filters.location) query = query.where("location", "==", filters.location);
    if (filters.organizer) query = query.where("organizer", "==", filters.organizer);
    if (filters.category) query = query.where("category", "==", filters.category);

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async registerUser(companyId, eventId, { name, email, userId }) {
    const eventRef = db.collection("events").doc(eventId);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) throw new Error("Event not found");

    const userData = { companyId, name, email, userId };

    await eventRef.update({
      attendees: admin.firestore.FieldValue.arrayUnion(userData),
    });

    await eventRef.collection("registrations").add({
      ...userData,
      registeredAt: new Date(),
    });

    await db.collection("event_registrations").add({
      userId,
      eventId,
      registeredAt: new Date(),
    });
  }

  static async deleteEventById(eventId) {
    const eventRef = db.collection("events").doc(eventId);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) throw new Error("Event not found");

    await eventRef.delete();

    const pendingEventRef = db.collection("pending_events").doc(eventId);
    const pendingEventDoc = await pendingEventRef.get();
    if (pendingEventDoc.exists) {
      await pendingEventRef.delete();
    }
  }
}

module.exports = Event;
