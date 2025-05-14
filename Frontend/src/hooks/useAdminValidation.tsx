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

export type EventType = {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  organizer: string;
  category: string;
  createdAt: string;
  status?: string;
};

type ItemType = JobType | ResourceType | EventType;

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
          : tab === "Events"
          ? "events"
          : "";
      const res = await axios.get(`${API_BASE}/${endpoint}`);
      const rawData = res.data.jobs || res.data.resources || res.data.events;

      setItems(
        rawData.map((item: any) => {
          if (tab === "Events") {
            return {
              id: item.id,
              title: item.title,
              location: item.location,
              date: item.date,
              description: item.description,
              organizer: item.organizer,
              category: item.category,
              createdAt: item.createdAt,
              status: "accept",
            };
          }
          return { ...item, status: "accept" };
        })
      );
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
        : tab === "Events"
        ? "events/validate"
        : "";

    const payload =
      tab === "Job Post"
        ? { jobId: id, action }
        : tab === "Resources"
        ? { resourceId: id, action }
        : tab === "Events"
        ? { eventId: id, action }
        : {};

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
