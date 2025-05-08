// hooks/useNotifications.ts
import { useEffect, useState } from 'react';

export interface Notification {
  message: string;
  role: 'applicant' | 'employer';
  timestamp: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNotifications([
        { message: "You successfully applied for RPA Developer.", role: "applicant", timestamp: "2 mins ago" },
        { message: "Juan Dela Cruz applied for your job posting: Math Teacher.", role: "employer", timestamp: "10 mins ago" },
        { message: "Your uploaded resource 'STEM Syllabus' was approved.", role: "applicant", timestamp: "1 hour ago" },
        { message: "Your job posting 'Math Teacher' has been approved.", role: "employer", timestamp: "1 day ago" },
        { message: "You registered for 'DepEd Event 2025'.", role: "applicant", timestamp: "2 days ago" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return { notifications, loading };
};
