import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Navbar from '../components/NavBar';
import { useJobBoard, Job } from '../hooks/useJobBoard';

const JobBoard = () => {
  const { jobs, loading, error, applyToJob, allCategories, allTypes } = useJobBoard();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterType, setFilterType] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleApply = () => {
    if (!selectedJob) return;
    setShowModal(true);
  };

  const handleConfirmApplication = async () => {
    if (!resume || !selectedJob) {
      alert('Please upload a resume and select a job.');
      return;
    }

    try {
      await applyToJob(selectedJob.id, user.uid, resume, message);
      alert('Application submitted successfully!');
      setShowModal(false);
      setResume(null);
      setMessage('');
    } catch (err) {
      alert('Failed to submit application.');
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
    (filterCategory === '' || job.category.toLowerCase() === filterCategory.toLowerCase()) &&
    (filterType === '' || job.type.includes(filterType))
  );

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
          <div className="flex mb-4 space-x-2">
            <input
              type="text"
              placeholder="Search by Job Title"
              className="flex-1 px-4 py-2 rounded-lg text-black"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 rounded-lg text-black"
            >
              <option value="">All Categories</option>
              {allCategories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 rounded-lg text-black"
            >
              <option value="">All Job Types</option>
              {allTypes.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
            </select>
            <button
              className="bg-gray-300 px-3 rounded hover:bg-gray-400"
              onClick={() => {
                setSearchTitle('');
                setFilterCategory('');
                setFilterType('');
              }}
            >
              Clear
            </button>
          </div>

          <div className="bg-white text-black rounded-2xl overflow-y-auto divide-y flex-1">
            {loading ? (
              <p className="text-center p-4">Loading jobs...</p>
            ) : error ? (
              <p className="text-center p-4 text-red-500">{error}</p>
            ) : filteredJobs.length === 0 ? (
              <p className="text-center p-4">No jobs match your criteria.</p>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex flex-col">
                    <p className="font-semibold">{job.title}</p>
                    <p className="text-sm">{job.institution}</p>
                    <p className="text-sm">{job.location}</p>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 text-lg">✖</button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white rounded-2xl p-6 overflow-hidden relative max-h-[calc(100vh-240px)]">
          {selectedJob ? (
            <>
              <div className="absolute top-4 right-4">
                <button onClick={() => setShowMenu(!showMenu)} className="text-gray-600 hover:text-black">
                  <BsThreeDotsVertical size={20} />
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-10">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Save</button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Not Interested</button>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold">{selectedJob.institution}</h3>
                <p className="text-xl font-bold text-gray-800">{selectedJob.title}</p>
                <p className="text-sm text-gray-600">{selectedJob.location}</p>
                <div className="mt-2 space-x-2">
                  {selectedJob.type.map((tag, i) => (
                    <span key={i} className="text-sm px-2 py-1 bg-gray-200 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>

              <button onClick={handleApply} className="bg-[#144272] text-white py-2 px-6 rounded-lg text-sm mb-6">
                Apply Now
              </button>

              <div className="overflow-y-auto pr-2" style={{ maxHeight: 'calc(100% - 180px)' }}>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-1">About the Job</h4>
                  <p className="text-sm text-gray-700">{selectedJob.description}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-1">About the Position</h4>
                  <p className="text-sm text-gray-700">{selectedJob.details}</p>
                </div>
              </div>
            </>
          ) : (
            <p>Select a job to view details</p>
          )}
        </div>
      </div>

      {/* Application Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Apply for {selectedJob.title}</h2>

            <div className="mb-4">
              <p className="text-sm text-gray-700">Name: <strong>{user?.displayName || 'N/A'}</strong></p>
              <p className="text-sm text-gray-700">Email: <strong>{user?.email || 'N/A'}</strong></p>
            </div>

            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mb-4 block w-full border px-4 py-2"
            />

            <label className="block text-sm font-medium mb-1">Upload Resume</label>
            <input
              type="file"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              className="mb-4 block w-full border px-4 py-2"
            />

            <div className="flex justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={handleConfirmApplication} className="px-4 py-2 bg-[#144272] text-white rounded hover:bg-[#0f3460]">
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
