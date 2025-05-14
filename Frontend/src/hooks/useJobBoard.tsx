import { useEffect, useState } from 'react';

export interface Job {
  id: string;
  title: string;
  institution: string;
  location: string;
  description: string;
  applicationDeadline: string;
  category: string;
  institutionType: string;
  datePosted: string;
  type: string[];
  details: string;
}

export const useJobBoard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allTypes, setAllTypes] = useState<string[]>([]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/jobs/all");
      const data = await response.json();

      const formattedJobs = data.jobs.map((job: any) => ({
        ...job,
        id: job.id,
      }));

      setJobs(formattedJobs);

      // Extract unique categories and types
      const categories = [...new Set(formattedJobs.map((job) => job.category))];
      const types = [...new Set(formattedJobs.flatMap((job) => job.type))];

      setAllCategories(categories);
      setAllTypes(types);
    } catch (err) {
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const applyToJob = async (
  companyId: string,
  jobId: string,
  applicantId: string,
  resume: File,
  message: string
) => {
  const formData = new FormData();
  formData.append("companyId", companyId); // Add this line
  formData.append("jobId", jobId);
  formData.append("applicantId", applicantId);
  formData.append("resume", resume);
  formData.append("message", message);

  const response = await fetch("http://localhost:5000/api/jobs/apply", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to submit application");
  }

  return await response.json();
};

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    error,
    applyToJob,
    allCategories,
    allTypes,
  };
};
