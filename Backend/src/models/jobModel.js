const { db } = require("../config/firebase");

class Job {
  // Save to pending collection
  static async createPendingJob(jobData) {
    try {
      const jobRef = db.collection("pending_jobs").doc();
      await jobRef.set(jobData);
      return jobRef.id;
    } catch (error) {
      throw new Error("Error creating job: " + error.message);
    }
  }

  static async getJobs(filters = {}) {
    try {
      let query = db.collection("jobs");

      if (filters.title) query = query.where("title", "==", filters.title);
      if (filters.location) query = query.where("location", "==", filters.location);
      if (filters.institutionType) query = query.where("institutionType", "==", filters.institutionType);
      if (filters.date) {
        const date = new Date(filters.date);
        query = query.where("datePosted", ">=", date);
      }

      const snapshot = await query.get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error("Error fetching jobs: " + error.message);
    }
  }
}

module.exports = Job;
