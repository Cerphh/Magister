import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import EditProfileModal from '../components/EditProfileModal';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import type { ProfileData, EmployerProfileData } from '../types/profile';

const LOCAL_STORAGE_KEY = 'user';

const EmployerProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const { updateProfile, loading: updateLoading, error } = useUpdateProfile();

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const parsed = JSON.parse(storedData);
      const formattedData: EmployerProfileData = {
        uid: parsed.uid,
        displayName: parsed.displayName || 'No Name',
        location: parsed.location || 'No Location',
        role: 'employer',
        companyName: parsed.companyName || 'No Company',
        companyType: parsed.companyType || 'No Type',
        about: parsed.about || 'No Information',
      };
      setProfileData(formattedData);
    }
    setLoading(false);
  }, []);

  const handleSave = async (updated: ProfileData) => {
    if (profileData && updated.role === 'employer') {
      try {
        const response = await updateProfile({ ...updated, uid: profileData.uid });
        if (response) {
          const updatedUserData = { ...profileData, ...updated };
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUserData));
          setProfileData(updatedUserData);
          setIsModalOpen(false);
        }
      } catch (err) {
        console.error('Error updating profile:', err);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading profile...</div>;
  }

  if (!profileData || profileData.role !== 'employer') {
    return <div className="text-center py-12 text-red-500">No employer profile data found.</div>;
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src="/src/assets/logo.png"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-[#082C57]">{profileData.displayName}</h1>
              <p className="text-gray-600">{profileData.role}</p>
              <p className="text-sm text-gray-500 mt-1">{profileData.location}</p>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#082C57] mb-2">Company Name</h2>
            <p className="text-gray-700 text-sm">{profileData.companyName}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#082C57] mb-2">Company Type</h2>
            <p className="text-gray-700 text-sm">{profileData.companyType}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#082C57] mb-2">About</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{profileData.about}</p>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <EditProfileModal
          profileData={profileData}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {updateLoading && <div className="text-center py-4 text-gray-500">Updating profile...</div>}
      {error && <div className="text-center py-4 text-red-500">{error}</div>}
    </div>
  );
};

export default EmployerProfile;
