const { db } = require("../config/firebase");

class Resource {
  static async savePendingMetadata(metadata) {
    const ref = db.collection("pending_resources").doc();
    await ref.set(metadata);
    return ref.id;
  }

  static async getMetadataByOriginalName(name) {
    const snapshot = await db.collection("resources")
      .where("originalName", "==", name)
      .limit(1)
      .get();

    if (snapshot.empty) throw new Error("File metadata not found in database.");
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  }

  static async getAll() {
    const snapshot = await db.collection("resources").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getFiltered(filters = {}) {
    let query = db.collection("resources");
    if (filters.subject) query = query.where("subject", "==", filters.subject);
    if (filters.level) query = query.where("level", "==", filters.level);
    if (filters.fileType) query = query.where("fileType", "==", filters.fileType);
    if (filters.displayName) query = query.where("displayName", "==", filters.displayName);

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

module.exports = Resource;
