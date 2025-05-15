import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

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
  jobId: string;
  applicantId: string;
  companyId: string;
  resume: {
    filename: string;
    originalName: string;
    path: string;
    mimetype: string;
    size: number;
  };
  message?: string;
  status: string;
  appliedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
};

export type EventType = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  category: string;
  companyId: string;
  attendees: Array<{
    name: string;
    email: string;
    userId: string;
    companyId: string;
  }>;
  createdAt: string;
};

export function useEmployerDashboard() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentUser = () => {
    const userString = localStorage.getItem("user");
    if (!userString) throw new Error("User not found in localStorage");
    
    const user = JSON.parse(userString);
    if (!user?.uid) throw new Error("User UID not found");
    
    return user;
  };

  // Jobs
  const fetchJobsByCompany = async () => {
    setLoading(true);
    try {
      const user = getCurrentUser();
      const res = await axios.post(`${API_BASE}/jobs/by-company`, { companyId: user.uid });
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
      const res = await axios.post(`${API_BASE}/jobs/post`, jobData);
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
      await axios.delete(`${API_BASE}/jobs/${jobId}`);
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

  // Applications
  const fetchApplicationsByCompany = async () => {
    setLoading(true);
    try {
      const user = getCurrentUser();
      const res = await axios.post(`${API_BASE}/jobs/applications/by-company`, { 
        companyId: user.uid 
      });
      setApplications(res.data.applications || []);
    } catch (err) {
      setError("Failed to fetch applications");
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/jobs/update-status`, { 
        applicationId, 
        status 
      });
      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status } : app
      ));
      return { success: true };
    } catch (err) {
      setError("Failed to update application status");
      console.error("Failed to update application status:", err);
      return { success: false, error: "Failed to update application status" };
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = async (applicationId: string) => {
    try {
      const response = await axios.post(`${API_BASE}/jobs/view-resume`, { 
        applicationId 
      }, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const application = applications.find(app => app.id === applicationId);
      const originalName = application?.resume?.originalName || 'resume.pdf';
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', originalName);
      document.body.appendChild(link);
      link.click();
      
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download resume:", err);
      throw err;
    }
  };

  // Events
  const fetchEventsByCompany = async () => {
    setLoading(true);
    try {
      const user = getCurrentUser();
      const res = await axios.post(`${API_BASE}/events/company`, { 
        companyId: user.uid 
      });
      setEvents(res.data.events || []);
    } catch (err) {
      setError("Failed to fetch events");
      console.error("Failed to fetch events:", err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<EventType, "id" | "attendees" | "createdAt">) => {
    setLoading(true);
    try {
      const user = getCurrentUser();
      const res = await axios.post(`${API_BASE}/events/create`, {
        ...eventData,
        companyId: user.uid
      });
      setEvents(prev => [...prev, res.data.event]);
      return { success: true };
    } catch (err) {
      setError("Failed to create event");
      console.error("Failed to create event:", err);
      return { success: false, error: "Failed to create event" };
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId: string) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/events/delete`, { eventId });
      setEvents(prev => prev.filter(event => event.id !== eventId));
      return { success: true };
    } catch (err) {
      setError("Failed to delete event");
      console.error("Failed to delete event:", err);
      return { success: false, error: "Failed to delete event" };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = getCurrentUser();
      if (user) {
        await fetchJobsByCompany();
        await fetchApplicationsByCompany();
        await fetchEventsByCompany();
      }
    };
    fetchData();
  }, []);

  return {
    jobs,
    applications,
    events,
    loading,
    error,
    fetchJobsByCompany,
    createJob,
    deleteJob,
    fetchApplicationsByCompany,
    updateApplicationStatus,
    downloadResume,
    fetchEventsByCompany,
    createEvent,
    deleteEvent
  };
}