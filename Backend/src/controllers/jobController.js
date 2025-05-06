const Job = require("../models/jobModel");
const JobApplication = require("../models/jobApplicationModel");
const path = require("path");
const fs = require("fs");

class JobController {
  // Create a new job (goes to pending_jobs)
  static async createJob(req, res) {
    const {
      title,
      institution,
      location,
      applicationDeadline,
      category,
      description,
      institutionType,
      companyId,
    } = req.body;

    try {
      const jobData = {
        title,
        institution,
        location,
        applicationDeadline,
        category,
        description,
        institutionType,
        companyId,
        datePosted: new Date(),
      };

      const jobId = await Job.createPendingJob(jobData);
      res.status(201).json({ message: "Job submitted for review", jobId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

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

  static async applyToJob(req, res) {
    try {
      const { jobId, applicantId, message } = req.body;

      if (!req.file || !jobId || !applicantId) {
        return res.status(400).json({ error: "Missing required fields or resume file." });
      }

      const file = req.file;

      const resumeMetadata = {
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      };

      const applicationData = {
        jobId,
        applicantId,
        resume: resumeMetadata,
        message: message || "",
        status: "Pending",
        appliedAt: new Date(),
      };

      const applicationId = await JobApplication.createApplication(applicationData);
      res.status(201).json({ message: "Application submitted", applicationId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getApplicationsByCompany(req, res) {
    const { companyId } = req.body;

    if (!companyId) {
      return res.status(400).json({ error: "Missing companyId" });
    }

    try {
      const applications = await JobApplication.getApplicationsByCompany(companyId);
      res.status(200).json({ applications });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateApplicationStatus(req, res) {
    const { applicationId, status } = req.body;

    if (!applicationId || !status) {
      return res.status(400).json({ error: "applicationId and status are required" });
    }

    try {
      await JobApplication.updateStatus(applicationId, status);
      res.status(200).json({ message: "Application status updated" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = JobController;