import React, { useState } from 'react';

interface ProfileData {
  uid?: string;
  displayName: string;
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
            value={formData.displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            placeholder="Display Name"
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Location"
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <textarea
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            placeholder="About you"
            className="w-full border rounded px-3 py-2 text-sm"
            rows={3}
          />

          <div>
            <label className="text-sm text-[#082C57]">Subjects</label>
            <div className="flex gap-3 mt-2 flex-wrap">
              {allSubjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => toggleItem('subjects', subject)}
                  className={`border rounded px-3 py-2 text-sm ${formData.subjects.includes(subject) ? 'bg-blue-600 text-white' : ''}`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-[#082C57]">Teaching Level</label>
            <div className="flex gap-3 mt-2 flex-wrap">
              {allTeachingLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => toggleItem('teachingLevel', level)}
                  className={`border rounded px-3 py-2 text-sm ${formData.teachingLevel.includes(level) ? 'bg-green-600 text-white' : ''}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button onClick={onClose} className="px-4 py-2 text-sm bg-gray-300 rounded text-black">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 text-sm bg-blue-600 rounded text-white">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
