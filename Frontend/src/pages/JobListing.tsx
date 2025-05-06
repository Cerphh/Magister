import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Navbar from '../components/NavBar';

const JobBoard = () => {
  const [showMenu, setShowMenu] = useState(false);

  const jobList = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    title: 'RPA Developer',
    company: 'AIOS',
    location: 'Metro Manila (On site)',
    logo: '/logo192.png',
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[#2C74B3]">
      <Navbar />

      {/* Header */}
      <div className="text-center py-10 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white">
          Get The <span className="font-semibold text-[#144272]">Right Job</span> You Deserve
        </h1>
      </div>

      {/* Main Layout */}
      <div className="flex gap-6 px-16 pb-1 h-[70vh]">
        {/* Left Panel */}
        <div className="flex flex-col">
          {/* Search Filters */}
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

          {/* Job List */}
          <div className="bg-white text-black rounded-2xl overflow-y-auto divide-y flex-1">
            {jobList.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <img src={job.logo} alt="Company Logo" className="h-10 w-10" />
                  <div>
                    <p className="font-semibold">{job.title}</p>
                    <p className="text-sm">{job.company}</p>
                    <p className="text-sm">{job.location}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-red-500 text-lg">✖</button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Job Details */}
        <div className="flex-1 bg-white rounded-2xl p-6 overflow-hidden relative max-h-[calc(100vh-240px)]">
          {/* Menu Button */}
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
          <div className="flex items-center gap-4 mb-4">
            <img src="/aios-logo.png" alt="AIOS" className="w-14 h-14" />
            <div>
              <h3 className="text-lg font-semibold">AIOS</h3>
              <p className="text-xl font-bold text-gray-800">RPA Developer</p>
              <p className="text-sm text-gray-600">Metro Manila</p>
              <div className="mt-2 space-x-2">
                <span className="text-sm px-2 py-1 bg-gray-200 rounded-full">On-Site</span>
                <span className="text-sm px-2 py-1 bg-gray-200 rounded-full">Full-time</span>
              </div>
            </div>
          </div>

          <button className="bg-[#144272] text-white py-2 px-6 rounded-lg text-sm mb-6">
            Apply Now
          </button>

          {/* Job Description */}
          <div className="overflow-y-auto pr-2" style={{ maxHeight: 'calc(100% - 180px)' }}>
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-1">About the job</h4>
              <p className="text-sm text-gray-700">
                🚀 Exciting Opportunity: Process Automation Engineer 🚀<br />
                For candidates that can start 7–15 days, the pay range and compensation package is Php 50k–70k/month.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-1">About the role</h4>
              <p className="text-sm text-gray-700">
                As a Process Automation Engineer, you'll play a pivotal role in transforming business operations
                by designing and implementing scalable automation solutions. Collaborate across teams, analyze workflows,
                and deploy tools like UiPath to drive efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
