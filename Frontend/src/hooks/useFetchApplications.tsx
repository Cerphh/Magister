import { useState } from 'react';
import axios from 'axios';

export const useFetchApplications = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async (applicantId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/jobs/applications/by-applicant', {
        applicantId,
      });

      if (response.status === 200) {
        setApplications(response.data.applications || []);
      } else {
        setError('Failed to fetch applications.');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { applications, loading, error, fetchApplications };
};
