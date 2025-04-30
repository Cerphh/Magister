const { db } = require("../config/firebase");

class Job {
  static async createJob(jobData) {
    try {
      const jobRef = db.collection("jobs").doc();
      await jobRef.set(jobData);
      return jobRef.id;
    } catch (error) {
      throw new Error("Error creating job: " + error.message);
    }
  }

  static async getJobs(filters = {}) {
    try {
      let query = db.collection("jobs");

      // Apply filters if provided
      if (filters.title) {
        query = query.where("title", "==", filters.title);
      }
      if (filters.location) {
        query = query.where("location", "==", filters.location);
      }
      if (filters.institutionType) {
        query = query.where("institutionType", "==", filters.institutionType);
      }
      if (filters.date) {
        const date = new Date(filters.date);
        query = query.where("datePosted", ">=", date);
      }

      const snapshot = await query.get();
      const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return jobs;
    } catch (error) {
      throw new Error("Error fetching jobs: " + error.message);
    }
  }
}

module.exports = Job;
