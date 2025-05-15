import React, { useState } from 'react';
import type { ProfileData } from '../types/profile';

interface EditProfileModalProps {
  profileData: ProfileData;
  onClose: () => void;
  onSave: (updatedData: ProfileData) => Promise<void>;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profileData,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ProfileData>(profileData);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      const oldData = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedData = { ...oldData, ...formData };
      await onSave(updatedData);
      localStorage.setItem('user', JSON.stringify(updatedData));
      onClose();
    } catch (err) {
      console.error('Failed to save:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleArrayValue = (
    key: 'subjects' | 'teachingLevel',
    value: string
  ) => {
    const currentValues = (formData as any)[key] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value];

    setFormData((prev) => ({
      ...prev,
      [key]: updatedValues,
    }));
  };

  const subjectOptions = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English Language',
  'Literature',
  'History',
  'Geography',
  'Computer Science',
  'Economics',
  'Business Studies',
  'Philosophy',
  'Psychology',
  'Political Science',
  'Sociology',
  'Art',
  'Music',
  'Physical Education',
  'Religious Studies',
  'Special Education',
  'Engineering',
  'Environmental Science',
  'Health Education',
  'Language Acquisition (e.g., Spanish, French)',
];


  const levelOptions = [
  'Preschool',
  'Kindergarten',
  'Elementary School',
  'Middle School',
  'High School',
  'Undergraduate (College)',
  'Graduate (Masters)',
  'Postgraduate (PhD)',
  'Technical/Vocational',
  'Adult Education',
  'Special Needs Education',
];


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-[#082C57]">Edit Profile</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="displayName"
            value={formData.displayName || ''}
            onChange={handleChange}
            placeholder="Display Name"
            className="w-full px-3 py-2 border rounded"
          />

          <input
            type="text"
            name="location"
            value={formData.location || ''}
            onChange={handleChange}
            placeholder="Location"
            className="w-full px-3 py-2 border rounded"
          />

          {'companyName' in formData && (
            <input
              type="text"
              name="companyName"
              value={formData.companyName || ''}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full px-3 py-2 border rounded"
            />
          )}

          {'companyType' in formData && (
            <input
              type="text"
              name="companyType"
              value={formData.companyType || ''}
              onChange={handleChange}
              placeholder="Company Type"
              className="w-full px-3 py-2 border rounded"
            />
          )}

          {'subjects' in formData && (
            <div>
              <label className="block font-semibold text-sm mb-2 text-gray-700">
                Subjects of Expertise
              </label>
              <div className="flex flex-wrap gap-2">
                {subjectOptions.map((subject) => {
                  const isSelected = formData.subjects?.includes(subject);
                  return (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => toggleArrayValue('subjects', subject)}
                      className={`px-3 py-1 rounded-full text-sm border transition ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {subject}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {'teachingLevel' in formData && (
            <div>
              <label className="block font-semibold text-sm mb-2 text-gray-700">
                Teaching Level
              </label>
              <div className="flex flex-wrap gap-2">
                {levelOptions.map((level) => {
                  const isSelected = formData.teachingLevel?.includes(level);
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => toggleArrayValue('teachingLevel', level)}
                      className={`px-3 py-1 rounded-full text-sm border transition ${
                        isSelected
                          ? 'bg-green-600 text-white border-green-600'
                          : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <textarea
            name="about"
            value={formData.about || ''}
            onChange={handleChange}
            placeholder="About"
            className="w-full px-3 py-2 border rounded h-24 resize-none"
          />
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
