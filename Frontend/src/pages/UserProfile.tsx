import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import EditProfileModal from '../components/EditProfileModal';

type UserType = 'applicant' | 'employer';

interface UserProfileProps {
  userType?: UserType;
}

const UserProfile: React.FC<UserProfileProps> = ({ userType = 'applicant' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Juan Dela Cruz',
    location: 'Philippines',
    role: userType === 'applicant' ? 'Licensed High School Teacher' : 'HR Manager at ABC School',
    subjects: ['Math', 'Science', 'English'],
    teachingLevel: ['High School', 'College'],
    about:
      userType === 'applicant'
        ? 'Passionate educator with 5+ years of experience teaching high school students. Focused on helping learners build strong foundations in math and science.'
        : 'We are a private institution aiming to provide quality education. Currently hiring qualified teachers for the upcoming academic year.',
  });

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
              <h1 className="text-2xl font-bold text-[#082C57]">{profileData.name}</h1>
              <p className="text-gray-600">{profileData.role}</p>
              <p className="text-sm text-gray-500 mt-1">{profileData.location}</p>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Subjects */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#082C57] mb-2">
              {userType === 'applicant' ? 'Subjects of Expertise' : 'Hiring Fields'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {profileData.subjects.map((subject) => (
                <span
                  key={subject}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>

          {/* Teaching Levels */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#082C57] mb-2">Teaching Level</h2>
            <div className="flex flex-wrap gap-2">
              {profileData.teachingLevel.map((level) => (
                <span
                  key={level}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {level}
                </span>
              ))}
            </div>
          </div>

          {/* About */}
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
          onSave={(updated) => {
            setProfileData(updated);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export { UserProfile };
