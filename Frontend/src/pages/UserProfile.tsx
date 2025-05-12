import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import EditProfileModal from '../components/EditProfileModal';
import { useUpdateProfile } from '../hooks/useUpdateProfile';

type UserType = 'applicant' | 'employer';

interface UserProfileProps {
  userType?: UserType;
}

interface ProfileData {
  uid?: string;
  displayName: string;
  location: string;
  role: string;
  subjects: string[];
  teachingLevel: string[];
  about: string;
}

const LOCAL_STORAGE_KEY = 'user';

const UserProfile: React.FC<UserProfileProps> = ({ userType = 'applicant' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const { updateProfile, loading: updateLoading, error } = useUpdateProfile();

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const parsed = JSON.parse(storedData);
      const formattedData: ProfileData = {
        uid: parsed.uid,
        displayName: parsed.displayName || 'No Name',
        location: parsed.location || 'No Location',
        role: userType,
        subjects: parsed.subjects || [],
        teachingLevel: parsed.teachingLevel || [],
        about: parsed.about || 'No Information',
      };
      setProfileData(formattedData);
    }
    setLoading(false);
  }, [userType]);

  const handleSave = async (updated: ProfileData) => {
    if (profileData) {
      try {
        const response = await updateProfile({ ...updated, uid: profileData.uid });
        if (response.message) {
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

  if (!profileData) {
    return <div className="text-center py-12 text-red-500">No profile data found.</div>;
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
            <h2 className="text-lg font-semibold text-[#082C57] mb-2">
              {userType === 'applicant' ? 'Subjects of Expertise' : 'Hiring Fields'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {profileData.subjects.length > 0 ? (
                profileData.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {subject}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No subjects listed</span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#082C57] mb-2">Teaching Level</h2>
            <div className="flex flex-wrap gap-2">
              {profileData.teachingLevel.length > 0 ? (
                profileData.teachingLevel.map((level) => (
                  <span
                    key={level}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {level}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No teaching level specified</span>
              )}
            </div>
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

      {/* Loading spinner */}
      {updateLoading && <div className="text-center py-4 text-gray-500">Updating profile...</div>}

      {/* Error handling */}
      {error && <div className="text-center py-4 text-red-500">{error}</div>}
    </div>
  );
};

export { UserProfile };
