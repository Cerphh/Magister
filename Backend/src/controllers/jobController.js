const Job = require("../models/jobModel");

class JobController {
  // Create a new job
  static async createJob(req, res) {
    const { title, institution, location, applicationDeadline, category, description, institutionType } = req.body;

    try {
      const jobData = {
        title,
        institution,
        location,
        applicationDeadline,
        category,
        description,
        institutionType,
        datePosted: new Date(),
      };

      const jobId = await Job.createJob(jobData);
      res.status(201).json({ message: "Job posted successfully", jobId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Search jobs with filters
  static async searchJobs(req, res) {
    const { title, location, institutionType, date } = req.body;

    try {
      const filters = { title, location, institutionType, date };
      const jobs = await Job.getJobs(filters);
      res.status(200).json({ jobs });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = JobController;
