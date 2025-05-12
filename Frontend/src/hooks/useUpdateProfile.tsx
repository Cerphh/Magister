import { useState } from 'react';
import axios from 'axios';

interface ProfileData {
  displayName?: string;
  location?: string;
  role?: string;
  subjects?: string[];
  teachingLevel?: string[];
  about?: string;
  companyName?: string;
  companyType?: string;
}

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (data: ProfileData) => {
    try {
      setLoading(true);
      setError(null);

      const storedUser = localStorage.getItem('user');
      const currentUser = storedUser ? JSON.parse(storedUser) : null;
      const uid = currentUser?.uid;

      if (!uid) {
        throw new Error('User UID not found in localStorage');
      }

      const updatedData = {
        uid,
        displayName: data.displayName || '',
        location: data.location || '',
        role: data.role || '',
        subjects: data.subjects || [],
        teachingLevel: data.teachingLevel || [],
        about: data.about || '',
        companyName: data.companyName || '',
        companyType: data.companyType || '',
      };

      const filteredData = Object.fromEntries(
        Object.entries(updatedData).filter(([_, value]) =>
          Array.isArray(value) ? value.length > 0 : value !== ''
        )
      );

      const response = await axios.post('http://localhost:5000/api/auth/profile', filteredData);
      const updatedUserData = response.data;

      const newUserData = { ...currentUser, ...updatedUserData };
      localStorage.setItem('user', JSON.stringify(newUserData));

      return updatedUserData;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error };
};
