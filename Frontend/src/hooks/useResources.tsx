import { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/resources";

export const useResources = () => {
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const [error, setError] = useState<string | null>(null);

  // Upload a new resource
  const uploadResource = async (
    file: File,
    displayName: string,
    description: string,
    subject?: string,
    level?: string
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("displayName", displayName);
    formData.append("description", description);
    if (subject) formData.append("subject", subject);
    if (level) formData.append("level", level);

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.error || "Upload failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch all resources
  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/all`);
      setResources(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch resources");
    } finally {
      setLoading(false);
    }
  };

  // Filter resources
  const filterResources = async (filters: {
    subject?: string;
    level?: string;
    fileType?: string;
    displayName?: string;
  }) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/filter`, filters);
      setResources(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Filter failed");
    } finally {
      setLoading(false);
    }
  };

  // Download a resource by originalName
  const downloadResource = async (originalName: string) => {
    try {
      const res = await axios.post(
        `${API_BASE}/download`,
        { originalName },
        { responseType: "blob" }
      );

      // Trigger browser download
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", originalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: any) {
      setError(err.response?.data?.error || "Download failed");
      throw err;
    }
  };

  return {
    loading,
    error,
    resources,
    fetchResources,
    filterResources,
    uploadResource,
    downloadResource,
  };
};
