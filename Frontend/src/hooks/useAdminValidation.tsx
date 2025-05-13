// src/hooks/useAdminValidation.ts
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/admin";

export type JobType = {
  id: string;
  title: string;
  institution: string;
  type: string[];
  description: string;
  status?: string;
};

export type ResourceType = {
  id: string;
  displayName: string;
  subject: string;
  description: string;
  fileType: string;
  level: string;
  status?: string;
};

type ItemType = JobType | ResourceType;

export function useAdminValidation(tab: string) {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const endpoint =
        tab === "Job Post"
          ? "jobs"
          : tab === "Resources"
          ? "resources"
          : "events/all"; // You said skip events for now
      const res = await axios.get(`${API_BASE}/${endpoint}`);
      setItems((res.data.jobs || res.data.resources || res.data.events).map((item: any) => ({
        ...item,
        status: "Accept",
      })));
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateItem = async (id: string, action: string) => {
    const endpoint =
      tab === "Job Post"
        ? "jobs/validate"
        : tab === "Resources"
        ? "resources/validate"
        : "events/validate";

    const payload =
      tab === "Job Post"
        ? { jobId: id, action }
        : tab === "Resources"
        ? { resourceId: id, action }
        : { eventId: id, action };

    try {
      await axios.post(`${API_BASE}/${endpoint}`, payload);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [tab]);

  return { items, loading, validateItem };
}
