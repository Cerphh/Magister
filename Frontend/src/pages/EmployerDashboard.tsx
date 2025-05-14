import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/NavBar";
import { MoreVertical, Download } from "lucide-react";
import { useEmployerDashboard } from "../hooks/useEmployerDashboard";

const EmployerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Jobs" | "Applications" | "Events">("Jobs");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAttendeesModalOpen, setIsAttendeesModalOpen] = useState(false);
  const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  
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

  const [newEventData, setNewEventData] = useState({
    title: "",
    date: "",
    description: "",
    location: "",
    organizer: "",
    category: "",
  });

  const dropdownRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  const {
    jobs,
    applications,
    events,
    loading,
    error,
    fetchJobsByCompany,
    createJob,
    deleteJob,
    fetchApplicationsByCompany,
    updateApplicationStatus,
    downloadResume,
    fetchEventsByCompany,
    createEvent,
    deleteEvent,
  } = useEmployerDashboard();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpenId && !dropdownRefs.current[dropdownOpenId]?.contains(event.target as Node)) {
        setDropdownOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpenId]);

  useEffect(() => {
    if (activeTab === "Jobs") {
      fetchJobsByCompany();
    } else if (activeTab === "Applications") {
      fetchApplicationsByCompany();
    } else if (activeTab === "Events") {
      fetchEventsByCompany();
    }
  }, [activeTab]);

  const handleViewItemClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleViewAttendees = () => {
    setIsAttendeesModalOpen(true);
  };

  const handleDeleteItem = async (id: string) => {
    if (activeTab === "Jobs") {
      await deleteJob(id);
    } else if (activeTab === "Events") {
      await deleteEvent(id);
    }
    setDropdownOpenId(null);
  };

  const handleStatusChange = async (applicationId: string, status: string) => {
    await updateApplicationStatus(applicationId, status);
    setDropdownOpenId(null);
  };

  const handleDownloadResume = async (applicationId: string) => {
    try {
      await downloadResume(applicationId);
    } catch (err) {
      console.error("Failed to download resume:", err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const closeAttendeesModal = () => {
    setIsAttendeesModalOpen(false);
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

  const handleCreateEvent = async () => {
    const result = await createEvent(newEventData);
    if (result.success) {
      setIsCreateEventModalOpen(false);
      setNewEventData({
        title: "",
        date: "",
        description: "",
        location: "",
        organizer: "",
        category: "",
      });
    }
  };

  const formatFirebaseTimestamp = (timestamp: { _seconds: number, _nanoseconds: number }) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
    return date.toLocaleString();
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
            <p><strong>Job ID:</strong> {selectedItem.jobId}</p>
            <p><strong>Applicant ID:</strong> {selectedItem.applicantId}</p>
            <p><strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                selectedItem.status === "Accepted" ? "bg-green-100 text-green-800" :
                selectedItem.status === "Rejected" ? "bg-red-100 text-red-800" :
                "bg-blue-100 text-blue-800"
              }`}>
                {selectedItem.status}
              </span>
            </p>
            <p><strong>Applied At:</strong> {formatFirebaseTimestamp(selectedItem.appliedAt)}</p>
            <div className="flex items-center">
              <strong className="mr-2">Resume:</strong>
              <button 
                onClick={() => handleDownloadResume(selectedItem.id)}
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </button>
            </div>
          </>
        )}
        {activeTab === "Events" && (
          <>
            <p><strong>Title:</strong> {selectedItem.title}</p>
            <p><strong>Description:</strong> {selectedItem.description}</p>
            <p><strong>Date:</strong> {new Date(selectedItem.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {selectedItem.location}</p>
            <p><strong>Organizer:</strong> {selectedItem.organizer}</p>
            <p><strong>Category:</strong> {selectedItem.category}</p>
            <div className="flex items-center">
              <strong className="mr-2">Attendees:</strong>
              <button 
                onClick={handleViewAttendees}
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                {selectedItem.attendees?.length || 0} (View List)
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderAttendeesModal = () => {
    if (!selectedItem || !selectedItem.attendees) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          <h2 className="text-xl font-bold mb-4">Event Attendees</h2>
          <div className="space-y-4">
            {selectedItem.attendees.length === 0 ? (
              <p>No attendees registered yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">User ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItem.attendees.map((attendee: any, index: number) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{attendee.name}</td>
                        <td className="px-4 py-2">{attendee.email}</td>
                        <td className="px-4 py-2">{attendee.userId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={closeAttendeesModal}
              className="bg-[#144272] text-white px-4 py-2 rounded-lg hover:bg-[#12345f]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderActionDropdown = (id: string, type: 'job' | 'application' | 'event') => {
    const dropdownId = `${type}-${id}`;
    const isOpen = dropdownOpenId === dropdownId;

    return (
      <div className="relative inline-block text-left" ref={el => dropdownRefs.current[dropdownId] = el}>
        <div>
          <button
            type="button"
            onClick={() => setDropdownOpenId(isOpen ? null : dropdownId)}
            className="flex items-center justify-center w-full rounded-md px-2 py-2 text-sm focus:outline-none"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        {isOpen && (
          <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {type === 'job' && (
              <button
                onClick={() => handleDeleteItem(id)}
                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
              >
                Delete Job
              </button>
            )}
            {type === 'application' && (
              <>
                <button
                  onClick={() => handleStatusChange(id, "Accepted")}
                  className="block w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-gray-100"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange(id, "For Interview")}
                  className="block w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-gray-100"
                >
                  For Interview
                </button>
                <button
                  onClick={() => handleStatusChange(id, "Rejected")}
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleDownloadResume(id)}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-100 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </button>
              </>
            )}
            {type === 'event' && (
              <button
                onClick={() => handleDeleteItem(id)}
                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
              >
                Delete Event
              </button>
            )}
          </div>
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
            {activeTab === "Events" && (
              <button
                onClick={() => setIsCreateEventModalOpen(true)}
                className="bg-[#144272] text-white px-4 py-2 rounded-lg hover:bg-[#12345f]"
              >
                Create Event
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
                      <>
                        <th className="px-4 py-2 text-center">Applicant ID</th>
                        <th className="px-4 py-2 text-center">Status</th>
                      </>
                    )}
                    {activeTab === "Events" && (
                      <th className="px-4 py-2 text-center">Title</th>
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
                        {renderActionDropdown(job.id, 'job')}
                      </td>
                    </tr>
                  ))}
                  {activeTab === "Applications" && applications.map((app) => (
                    <tr key={app.id} className="border-t border-[#F0F5F9] text-sm">
                      <td className="px-4 py-2 text-center">{app.id}</td>
                      <td className="px-4 py-2 text-center">{app.applicantId}</td>
                      <td className="px-4 py-2 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          app.status === "Accepted" ? "bg-green-100 text-green-800" :
                          app.status === "Rejected" ? "bg-red-100 text-red-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="text-white font-semibold underline hover:text-[#F0F5F9]"
                          onClick={() => handleViewItemClick(app)}
                        >
                          View Details
                        </button>
                      </td>
                      <td className="px-4 py-2 text-center">
                        {renderActionDropdown(app.id, 'application')}
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
                        {renderActionDropdown(event.id, 'event')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
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

      {/* Attendees Modal */}
      {isAttendeesModalOpen && renderAttendeesModal()}

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

      {/* Create Event Modal */}
      {isCreateEventModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Create New Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title*</label>
                <input
                  type="text"
                  value={newEventData.title}
                  onChange={(e) => setNewEventData({...newEventData, title: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date*</label>
                <input
                  type="date"
                  value={newEventData.date}
                  onChange={(e) => setNewEventData({...newEventData, date: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description*</label>
                <textarea
                  value={newEventData.description}
                  onChange={(e) => setNewEventData({...newEventData, description: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location*</label>
                <input
                  type="text"
                  value={newEventData.location}
                  onChange={(e) => setNewEventData({...newEventData, location: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Organizer*</label>
                <input
                  type="text"
                  value={newEventData.organizer}
                  onChange={(e) => setNewEventData({...newEventData, organizer: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category*</label>
                <input
                  type="text"
                  value={newEventData.category}
                  onChange={(e) => setNewEventData({...newEventData, category: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsCreateEventModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateEvent}
                  className="bg-[#144272] text-white px-4 py-2 rounded-lg hover:bg-[#12345f]"
                >
                  Create Event
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