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

    if (filters.subject) query = query.where("subject", "==", filters.subject.toLowerCase());
    if (filters.level) query = query.where("level", "==", filters.level.toLowerCase());
    if (filters.fileType) query = query.where("fileType", "==", filters.fileType.toLowerCase());

    const snapshot = await query.get();
    const results = [];

    snapshot.forEach(doc => {
      const data = doc.data();

      const displayNameMatch = filters.displayName
        ? data.displayName.toLowerCase().includes(filters.displayName.toLowerCase())
        : true;

      if (displayNameMatch) {
        results.push({ id: doc.id, ...data });
      }
    });

    return results;
  }

  static async getMetadataById(resourceId) {
    const doc = await db.collection("resources").doc(resourceId).get();

    if (!doc.exists) throw new Error("Resource not found");
    
    return { id: doc.id, ...doc.data() };
  }

  static async deleteMetadataById(resourceId) {
    await db.collection("resources").doc(resourceId).delete();
  }
}

module.exports = Resource;
