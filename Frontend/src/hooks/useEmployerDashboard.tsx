import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/jobs";

export type JobType = {
  id: string;
  title: string;
  institution: string;
  location: string;
  applicationDeadline: string | null;
  category: string | null;
  description: string;
  institutionType: string | null;
  details: string | null;
  type: string[];
  datePosted: string;
  companyId: string;
  status?: string;
};

export type ApplicationType = {
  id: string;
  name: string;
  position: string;
  appliedDate: string;
  status: string;
  resume: string;
};

export type EventType = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  registered: number;
};

export function useEmployerDashboard() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobsByCompany = async () => {
    setLoading(true);
    try {
      const userString = localStorage.getItem("user");
      if (!userString) throw new Error("User not found in localStorage");
      
      const user = JSON.parse(userString);
      if (!user?.uid) throw new Error("User UID not found");
      
      const res = await axios.post(`${API_BASE}/by-company`, { companyId: user.uid });
      setJobs(res.data.jobs || []);
    } catch (err) {
      setError("Failed to fetch jobs");
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData: Omit<JobType, "id" | "datePosted">) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/post`, jobData);
      setJobs(prev => [...prev, res.data.job]);
      return { success: true };
    } catch (err) {
      setError("Failed to create job");
      console.error("Failed to create job:", err);
      return { success: false, error: "Failed to create job" };
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId: string) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE}/${jobId}`);
      setJobs(prev => prev.filter(job => job.id !== jobId));
      return { success: true };
    } catch (err) {
      setError("Failed to delete job");
      console.error("Failed to delete job:", err);
      return { success: false, error: "Failed to delete job" };
    } finally {
      setLoading(false);
    }
  };

  return {
    jobs,
    applications,
    events,
    loading,
    error,
    fetchJobsByCompany,
    createJob,
    deleteJob,
    setApplications,
    setEvents
  };
}