import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import EditProfileModal from '../components/EditProfileModal';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { useFetchApplications } from '../hooks/useFetchApplications';
import type { ProfileData, ApplicantProfileData } from '../types/profile';

const LOCAL_STORAGE_KEY = 'user';

interface UserProfileProps {
  userType: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplicationsModalOpen, setIsApplicationsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<ApplicantProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const { updateProfile, loading: updateLoading, error } = useUpdateProfile();
  const { applications, loading: applicationsLoading, error: applicationsError, fetchApplications } = useFetchApplications();

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const parsed = JSON.parse(storedData);
      const formattedData: ApplicantProfileData = {
        uid: parsed.uid,
        displayName: parsed.displayName || 'No Name',
        location: parsed.location || 'No Location',
        role: 'applicant',
        subjects: parsed.subjects || [],
        teachingLevel: parsed.teachingLevel || [],
        about: parsed.about || 'No Information',
      };
      setProfileData(formattedData);
    }
    setLoading(false);
  }, [userType]);

  const handleSave = async (updated: ProfileData) => {
    if (profileData?.role === 'applicant' && updated.role === 'applicant') {
      try {
        const response = await updateProfile({ ...updated, uid: profileData.uid });
        if (response) {
          const updatedUserData: ApplicantProfileData = { ...profileData, ...updated };
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUserData));
          setProfileData(updatedUserData);
          setIsModalOpen(false);
        }
      } catch (err) {
        console.error('Error updating profile:', err);
      }
    }
  };

  const openApplicationsModal = () => {
    if (profileData?.uid) {
      fetchApplications(profileData.uid);
      setIsApplicationsModalOpen(true);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading profile...</div>;
  }

  if (!profileData || profileData.role !== 'applicant') {
    return <div className="text-center py-12 text-red-500">No applicant profile data found.</div>;
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
            <h2 className="text-lg font-semibold text-[#082C57] mb-2">Subjects of Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {profileData.subjects && profileData.subjects.length > 0 ? (
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
              {profileData.teachingLevel && profileData.teachingLevel.length > 0 ? (
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

          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit Profile
            </button>
            <button
              onClick={openApplicationsModal}
              className="px-4 py-2 text-sm rounded bg-green-600 text-white hover:bg-green-700"
            >
              My Applications
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

      {isApplicationsModalOpen && (
        <ApplicationsModal
          applications={applications}
          loading={applicationsLoading}
          error={applicationsError}
          onClose={() => setIsApplicationsModalOpen(false)}
        />
      )}

      {updateLoading && <div className="text-center py-4 text-gray-500">Updating profile...</div>}
      {error && <div className="text-center py-4 text-red-500">{error}</div>}
    </div>
  );
};

interface ApplicationsModalProps {
  applications: any[];
  loading: boolean;
  error: string | null;
  onClose: () => void;
}

const ApplicationsModal: React.FC<ApplicationsModalProps> = ({ applications, loading, error, onClose }) => {
  const formatDate = (date: any) => {
    if (!date) return "N/A";
    // support Firestore Timestamp or ISO string
    if (date._seconds && date._nanoseconds) {
      const ms = date._seconds * 1000 + Math.floor(date._nanoseconds / 1000000);
      return new Date(ms).toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-auto shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-lg"
          aria-label="Close applications modal"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">My Job Applications</h2>

        {loading && <p>Loading applications...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && applications.length === 0 && (
          <p>No applications found.</p>
        )}

        {!loading && !error && applications.length > 0 && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Job Title</th>
                <th className="text-left py-2 px-4">Status</th>
                <th className="text-left py-2 px-4">Applied Date</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id || app.id} className="border-b">
                  <td className="py-2 px-4">{app.jobTitle || app.job?.title || 'N/A'}</td>
                  <td className="py-2 px-4">{app.status || 'N/A'}</td>
                  <td className="py-2 px-4">{formatDate(app.createdAt || app.appliedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
