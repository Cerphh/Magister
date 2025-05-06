import { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  status: 'Rejected' | 'Hired' | 'For Interviewing';
};

const MyJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState('Applied');

  useEffect(() => {
    const stored = localStorage.getItem('appliedJobs');
    if (stored) setJobs(JSON.parse(stored));
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-[#F7FAFC] min-h-screen px-8 py-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">My Jobs</h1>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-300 mb-4">
          {['Saved', 'Applied', 'Archived'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Jobs List */}
        <div className="bg-white rounded-md shadow-sm">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="flex justify-between items-center px-6 py-4 border-b hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-sm text-gray-900">{job.title}</p>
                  <p className="text-sm text-gray-700">{job.company}</p>
                  <p className="text-xs text-gray-500">{job.location}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                      job.status === 'Hired'
                        ? 'bg-green-600'
                        : job.status === 'Rejected'
                        ? 'bg-red-500'
                        : 'bg-blue-600'
                    }`}
                  >
                    {job.status}
                  </span>
                  <div className="relative group">
                    <button className="text-gray-500 hover:text-black">⋮</button>
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg hidden group-hover:block z-10">
                      <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">View details</button>
                      <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">Archived</button>
                      <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">Withdraw</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-600">No applications yet.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
