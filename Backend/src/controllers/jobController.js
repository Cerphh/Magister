const Job = require("../models/jobModel");
const JobApplication = require("../models/jobApplicationModel");
const { db } = require("../config/firebase");
const path = require("path");
const fs = require("fs");

class JobController {
  static async createJob(req, res) {
    const {
      title,
      institution,
      location,
      applicationDeadline,
      category,
      description,
      institutionType,
      details,
      type,
      companyId
    } = req.body;

    try {
      const jobData = {
        title,
        institution,
        location,
        applicationDeadline: applicationDeadline || null,
        category: category || null,
        description,
        institutionType: institutionType || null,
        details: details || null,
        type: Array.isArray(type) ? type : [],
        datePosted: new Date(),
        companyId
      };

      const jobId = await Job.createPendingJob(jobData);
      res.status(201).json({ message: "Job submitted for review", jobId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllJobs(req, res) {
    try {
      const snapshot = await db.collection("jobs").get();
      const jobs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json({ jobs });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async searchJobs(req, res) {
    const { title, location, institutionType, date, type, category } = req.body;

    try {
      const filters = {
        title,
        location,
        institutionType,
        date,
        type: Array.isArray(type) ? type : [],
        category: Array.isArray(category) ? category : [],
      };

      const jobs = await Job.getJobs(filters);
      res.status(200).json({ jobs });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async applyToJob(req, res) {
  try {
    const { jobId, applicantId, companyId, jobTitle, message } = req.body;

    if (!req.file || !jobId || !applicantId || !companyId || !jobTitle) {
      return res
        .status(400)
        .json({ error: "Missing required fields, including jobTitle or resume file." });
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
      companyId,
      jobTitle,     
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

  static async getApplicationsByApplicant(req, res) {
    const { applicantId } = req.body;

    if (!applicantId) {
      return res.status(400).json({ error: "Missing applicantId" });
    }

    try {
      const applications = await JobApplication.getApplicationsByApplicant(applicantId);
      res.status(200).json({ applications });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateApplicationStatus(req, res) {
    const { applicationId, status } = req.body;

    if (!applicationId || !status) {
      return res
        .status(400)
        .json({ error: "applicationId and status are required" });
    }

    try {
      await JobApplication.updateStatus(applicationId, status);
      res.status(200).json({ message: "Application status updated" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteJob(req, res) {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ error: "jobId is required" });
    }

    try {
      await Job.deleteJobById(jobId);
      res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async viewResume(req, res) {
    const { applicationId } = req.body;

    if (!applicationId) {
      return res.status(400).json({ error: "applicationId is required" });
    }

    try {
      const application = await JobApplication.getApplicationById(applicationId);
      
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }

      const resumePath = application.resume.path;

      if (!fs.existsSync(resumePath)) {
        return res.status(404).json({ error: "Resume not found on server" });
      }

      const fileName = path.basename(resumePath); 
      res.download(resumePath, fileName);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getJobsByCompany(req, res) {
    const { companyId } = req.body;

    if (!companyId) {
      return res.status(400).json({ error: "companyId is required" });
    }

    try {
      const jobs = await Job.getJobsByCompanyId(companyId);
      res.status(200).json({ jobs });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = JobController;
