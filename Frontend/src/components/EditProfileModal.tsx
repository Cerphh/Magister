import React, { useState } from 'react';

interface ProfileData {
  name: string;
  location: string;
  role: string;
  subjects: string[];
  teachingLevel: string[];
  about: string;
}

interface Props {
  profileData: ProfileData;
  onClose: () => void;
  onSave: (updatedData: ProfileData) => void;
}

const allSubjects = ['Math', 'Science', 'English', 'History', 'PE', 'Music', 'Art', 'ICT', 'Filipino'];
const allTeachingLevels = ['Preschool', 'Elementary', 'High School', 'College', 'Vocational', 'Graduate'];

const EditProfileModal: React.FC<Props> = ({ profileData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    ...profileData,
  });

  const toggleItem = (key: 'subjects' | 'teachingLevel', item: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].includes(item)
        ? prev[key].filter((i: string) => i !== item)
        : [...prev[key], item],
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl relative">
        <h2 className="text-xl font-bold mb-4 text-[#082C57]">Edit Profile</h2>

        <div className="space-y-4">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="Role"
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Location"
            className="w-full border rounded px-3 py-2 text-sm"
          />

          {/* Subjects Multi-Select */}
          <div>
            <label className="block font-medium text-sm mb-1">Subjects of Expertise</label>
            <div className="flex flex-wrap gap-2">
              {allSubjects.map(subject => (
                <button
                  key={subject}
                  onClick={() => toggleItem('subjects', subject)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    formData.subjects.includes(subject)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {/* Teaching Levels Multi-Select */}
          <div>
            <label className="block font-medium text-sm mb-1">Teaching Levels</label>
            <div className="flex flex-wrap gap-2">
              {allTeachingLevels.map(level => (
                <button
                  key={level}
                  onClick={() => toggleItem('teachingLevel', level)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    formData.teachingLevel.includes(level)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            rows={4}
            placeholder="About"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
