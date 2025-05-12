import { useState } from 'react';
import axios from 'axios';


type ProfileData =
  | {
      uid?: string;
      displayName?: string;
      location?: string;
      role: 'applicant';
      subjects?: string[];
      teachingLevel?: string[];
      about?: string;
    }
  | {
      uid?: string;
      displayName?: string;
      location?: string;
      role: 'employer';
      companyName?: string;
      companyType?: string;
      about?: string;
    };

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
        role: data.role,
        subjects: data.role === 'applicant' ? data.subjects || [] : [],
        teachingLevel: data.role === 'applicant' ? data.teachingLevel || [] : [],
        about: data.about || '',
        companyName: data.role === 'employer' ? data.companyName || '' : '',
        companyType: data.role === 'employer' ? data.companyType || '' : '',
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
