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

      if (filters.location) query = query.where("location", "==", filters.location);
      if (filters.institutionType) query = query.where("institutionType", "==", filters.institutionType);
      if (filters.date) {
        const date = new Date(filters.date);
        query = query.where("datePosted", ">=", date);
      }

      const snapshot = await query.get();
      let jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Title search (partial match)
      if (filters.title) {
        const lowerTitle = filters.title.toLowerCase();
        jobs = jobs.filter(job => job.title.toLowerCase().includes(lowerTitle));
      }

      // Type filter (array match)
      if (filters.type && filters.type.length > 0) {
        jobs = jobs.filter(job =>
          Array.isArray(job.type) && job.type.some(t => filters.type.includes(t))
        );
      }

      // Category filter
      if (filters.category && filters.category.length > 0) {
        jobs = jobs.filter(job => filters.category.includes(job.category));
      }

      return jobs;
    } catch (error) {
      throw new Error("Error fetching jobs: " + error.message);
    }
  }

  static async deleteJobById(jobId) {
    try {
      const jobRef = db.collection("jobs").doc(jobId);
      const jobDoc = await jobRef.get();

      if (!jobDoc.exists) throw new Error("Job not found");

      await jobRef.delete();

      const pendingJobRef = db.collection("pending_jobs").doc(jobId);
      const pendingJobDoc = await pendingJobRef.get();
      if (pendingJobDoc.exists) {
        await pendingJobRef.delete();
      }

    } catch (error) {
      throw new Error("Error deleting job: " + error.message);
    }
  }
}

module.exports = Job;
