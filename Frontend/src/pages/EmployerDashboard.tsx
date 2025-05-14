import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import { MoreVertical } from "lucide-react";
import { useEmployerDashboard } from "../hooks/useEmployerDashboard";

const EmployerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Jobs" | "Applications" | "Events">("Jobs");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [newJobData, setNewJobData] = useState({
    title: "",
    institution: "",
    location: "",
    applicationDeadline: "",
    category: "",
    description: "",
    institutionType: "",
    details: "",
    employmentType: "",
    workLocation: "",
    type: [] as string[],
  });

  const {
    jobs,
    applications,
    events,
    loading,
    error,
    fetchJobsByCompany,
    createJob,
    deleteJob,
    setApplications,
    setEvents
  } = useEmployerDashboard();

  useEffect(() => {
    if (activeTab === "Jobs") {
      fetchJobsByCompany();
    }
  }, [activeTab]);

  const handleViewItemClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = async (id: string) => {
    await deleteJob(id);
    setDropdownOpenId(null);
  };

  const handleRemoveApplication = (id: number) => {
    setApplications(applications.filter(app => app.id !== id));
    setDropdownOpenId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleCreateJob = async () => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      console.error("User not found in localStorage");
      return;
    }
    
    const user = JSON.parse(userString);
    if (!user?.uid) {
      console.error("User UID not found");
      return;
    }

    // Combine employment type and work location into the type array
    const type = [];
    if (newJobData.employmentType) type.push(newJobData.employmentType);
    if (newJobData.workLocation) type.push(newJobData.workLocation);

    const result = await createJob({
      ...newJobData,
      type,
      companyId: user.uid
    });
    
    if (result.success) {
      setIsCreateJobModalOpen(false);
      setNewJobData({
        title: "",
        institution: "",
        location: "",
        applicationDeadline: "",
        category: "",
        description: "",
        institutionType: "",
        details: "",
        employmentType: "",
        workLocation: "",
        type: []
      });
    }
  };

  const renderDetails = () => {
    if (!selectedItem) return null;

    return (
      <div className="space-y-4">
        {activeTab === "Jobs" && (
          <>
            <p><strong>Title:</strong> {selectedItem.title}</p>
            <p><strong>Institution:</strong> {selectedItem.institution}</p>
            <p><strong>Location:</strong> {selectedItem.location}</p>
            <p><strong>Description:</strong> {selectedItem.description}</p>
            <p><strong>Type:</strong> {selectedItem.type?.join(", ")}</p>
            <p><strong>Posted:</strong> {new Date(selectedItem.datePosted).toLocaleDateString()}</p>
            {selectedItem.applicationDeadline && (
              <p><strong>Deadline:</strong> {new Date(selectedItem.applicationDeadline).toLocaleDateString()}</p>
            )}
          </>
        )}
        {activeTab === "Applications" && (
          <>
            <p><strong>Name:</strong> {selectedItem.name}</p>
            <p><strong>Position:</strong> {selectedItem.position}</p>
            <p><strong>Applied Date:</strong> {selectedItem.appliedDate}</p>
            <p><strong>Status:</strong> {selectedItem.status}</p>
            <p><strong>Resume:</strong> {selectedItem.resume}</p>
          </>
        )}
        {activeTab === "Events" && (
          <>
            <p><strong>Title:</strong> {selectedItem.title}</p>
            <p><strong>Description:</strong> {selectedItem.description}</p>
            <p><strong>Date:</strong> {selectedItem.date}</p>
            <p><strong>Time:</strong> {selectedItem.time}</p>
            <p><strong>Location:</strong> {selectedItem.location}</p>
            <p><strong>Registered:</strong> {selectedItem.registered}</p>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F0F5F9] text-gray-800">
      <Navbar />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">EMPLOYER DASHBOARD</h1>

        <div className="bg-white border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-6 border-b pb-2">
              {["Jobs", "Applications", "Events"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "Jobs" | "Applications" | "Events")}
                  className={`${
                    activeTab === tab
                      ? "text-[#144272] font-semibold border-b-2 border-[#144272]"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {activeTab === "Jobs" && (
              <button
                onClick={() => setIsCreateJobModalOpen(true)}
                className="bg-[#144272] text-white px-4 py-2 rounded-lg hover:bg-[#12345f]"
              >
                Add Job
              </button>
            )}
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left bg-[#144272] text-white">
                <thead className="bg-[#F0F5F9] text-sm text-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-center">ID</th>
                    {activeTab === "Jobs" && (
                      <th className="px-4 py-2 text-center">Title</th>
                    )}
                    {activeTab === "Applications" && (
                      <th className="px-4 py-2 text-center">Applicant</th>
                    )}
                    {activeTab === "Events" && (
                      <th className="px-4 py-2 text-center">Event</th>
                    )}
                    <th className="px-4 py-2 text-center">View Details</th>
                    <th className="px-4 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTab === "Jobs" && jobs.map((job) => (
                    <tr key={job.id} className="border-t border-[#F0F5F9] text-sm">
                      <td className="px-4 py-2 text-center">{job.id}</td>
                      <td className="px-4 py-2 text-center">{job.title}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="text-white font-semibold underline hover:text-[#F0F5F9]"
                          onClick={() => handleViewItemClick(job)}
                        >
                          View Details
                        </button>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="relative inline-block">
                          <MoreVertical 
                            className="cursor-pointer"
                            onClick={() => setDropdownOpenId(`job-${job.id}`)}
                          />
                          {dropdownOpenId === `job-${job.id}` && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                              <button
                                onClick={() => handleDeleteItem(job.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                Delete Job
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeTab === "Applications" && applications.map((app) => (
                    <tr key={app.id} className="border-t border-[#F0F5F9] text-sm">
                      <td className="px-4 py-2 text-center">{app.id}</td>
                      <td className="px-4 py-2 text-center">{app.name}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="text-white font-semibold underline hover:text-[#F0F5F9]"
                          onClick={() => handleViewItemClick(app)}
                        >
                          View Details
                        </button>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="relative inline-block">
                          <MoreVertical 
                            className="cursor-pointer"
                            onClick={() => setDropdownOpenId(`app-${app.id}`)}
                          />
                          {dropdownOpenId === `app-${app.id}` && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                              <button
                                onClick={() => handleRemoveApplication(app.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                Remove Application
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeTab === "Events" && events.map((event) => (
                    <tr key={event.id} className="border-t border-[#F0F5F9] text-sm">
                      <td className="px-4 py-2 text-center">{event.id}</td>
                      <td className="px-4 py-2 text-center">{event.title}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="text-white font-semibold underline hover:text-[#F0F5F9]"
                          onClick={() => handleViewItemClick(event)}
                        >
                          View Details
                        </button>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="relative inline-block">
                          <MoreVertical 
                            className="cursor-pointer"
                            onClick={() => setDropdownOpenId(`event-${event.id}`)}
                          />
                          {dropdownOpenId === `event-${event.id}` && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                              <button
                                onClick={() => handleDeleteItem(event.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                Delete Event
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Details</h2>
            {renderDetails()}
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-[#144272] text-white px-4 py-2 rounded-lg hover:bg-[#12345f]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Job Modal */}
      {isCreateJobModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Create New Job</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title*</label>
                <input
                  type="text"
                  value={newJobData.title}
                  onChange={(e) => setNewJobData({...newJobData, title: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Institution*</label>
                <input
                  type="text"
                  value={newJobData.institution}
                  onChange={(e) => setNewJobData({...newJobData, institution: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location*</label>
                <input
                  type="text"
                  value={newJobData.location}
                  onChange={(e) => setNewJobData({...newJobData, location: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description*</label>
                <textarea
                  value={newJobData.description}
                  onChange={(e) => setNewJobData({...newJobData, description: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employment Type*</label>
                  <select
                    value={newJobData.employmentType}
                    onChange={(e) => setNewJobData({...newJobData, employmentType: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Work Location*</label>
                  <select
                    value={newJobData.workLocation}
                    onChange={(e) => setNewJobData({...newJobData, workLocation: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  >
                    <option value="">Select location</option>
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Application Deadline</label>
                <input
                  type="date"
                  value={newJobData.applicationDeadline}
                  onChange={(e) => setNewJobData({...newJobData, applicationDeadline: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsCreateJobModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateJob}
                  className="bg-[#144272] text-white px-4 py-2 rounded-lg hover:bg-[#12345f]"
                >
                  Create Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;