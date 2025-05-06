import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Navbar from '../components/NavBar';

const JobBoard = () => {
  const jobs = [
    {
      id: 1,
      title: 'RPA Developer',
      company: 'AIOS',
      location: 'Metro Manila (On site)',
      description: '🚀 Exciting Opportunity: Process Automation Engineer 🚀',
      details: 'As a Process Automation Engineer, you\'ll play a pivotal role in transforming business operations...',
      type: ['On-Site', 'Full-time'],
    },
    {
      id: 2,
      title: 'Math Teacher',
      company: 'Bright Future Academy',
      location: 'Cebu City (On site)',
      description: '📘 We are hiring passionate math teachers!',
      details: 'You will teach junior high school, prepare lesson plans, and support learners in achieving math proficiency.',
      type: ['On-Site', 'Part-time'],
    },
    {
      id: 3,
      title: 'Science Instructor',
      company: 'STEM School PH',
      location: 'Davao (Remote)',
      description: '🔬 Inspire the next generation of scientists!',
      details: 'Deliver engaging online science content for high school students using interactive virtual labs.',
      type: ['Remote', 'Full-time'],
    },
  ];

  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleApply = () => {
    setShowModal(true);
  };

  const handleConfirmApplication = () => {
    if (!resume) {
      alert('Please upload a resume before applying.');
      return;
    }

    // Simulate sending application
    alert(`Application submitted for ${selectedJob.title}!\nName: ${user?.displayName || 'N/A'}\nEmail: ${user?.email || 'N/A'}\nResume: ${resume.name}`);
    
    setShowModal(false);
    setResume(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2C74B3]">
      <Navbar />

      <div className="text-center py-10 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white">
          Get The <span className="font-semibold text-[#144272]">Right Job</span> You Deserve
        </h1>
      </div>

      <div className="flex gap-6 px-16 pb-1 h-[70vh]">
        {/* Left Panel */}
        <div className="flex flex-col w-[50%]">
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Teaching Skills"
              className="flex-1 px-4 py-2 rounded-l-lg text-black"
            />
            <input
              type="text"
              placeholder="Qualifications"
              className="px-4 py-2 text-black"
            />
            <button className="bg-[#144272] px-4 text-white rounded-r-lg">Search</button>
          </div>

          <div className="bg-white text-black rounded-2xl overflow-y-auto divide-y flex-1">
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex flex-col">
                  <p className="font-semibold">{job.title}</p>
                  <p className="text-sm">{job.company}</p>
                  <p className="text-sm">{job.location}</p>
                </div>
                <button className="text-gray-400 hover:text-red-500 text-lg">✖</button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white rounded-2xl p-6 overflow-hidden relative max-h-[calc(100vh-240px)]">
          {/* Menu */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-600 hover:text-black"
            >
              <BsThreeDotsVertical size={20} />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-10">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Save</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Not Interested</button>
              </div>
            )}
          </div>

          {/* Job Details */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{selectedJob.company}</h3>
            <p className="text-xl font-bold text-gray-800">{selectedJob.title}</p>
            <p className="text-sm text-gray-600">{selectedJob.location}</p>
            <div className="mt-2 space-x-2">
              {selectedJob.type.map((tag, i) => (
                <span key={i} className="text-sm px-2 py-1 bg-gray-200 rounded-full">{tag}</span>
              ))}
            </div>
          </div>

          <button
            onClick={handleApply}
            className="bg-[#144272] text-white py-2 px-6 rounded-lg text-sm mb-6"
          >
            Apply Now
          </button>

          <div className="overflow-y-auto pr-2" style={{ maxHeight: 'calc(100% - 180px)' }}>
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-1">About the job</h4>
              <p className="text-sm text-gray-700">{selectedJob.description}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-1">About the role</h4>
              <p className="text-sm text-gray-700">{selectedJob.details}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Apply for {selectedJob.title}</h2>

            {/* User Info from localStorage */}
            <div className="mb-4">
              <p className="text-sm text-gray-700">Name: <strong>{user?.displayName || 'N/A'}</strong></p>
              <p className="text-sm text-gray-700">Email: <strong>{user?.email || 'N/A'}</strong></p>
            </div>

            <label className="block text-sm font-medium mb-1">Upload Resume</label>
            <input
              type="file"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              className="mb-4 block w-full border px-4 py-2"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApplication}
                className="px-4 py-2 bg-[#144272] text-white rounded hover:bg-[#0f3460]"
              >
                Confirm Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobBoard;
