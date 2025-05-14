import React, { useState } from "react";
import Navbar from "../components/NavBar";
import { MoreVertical } from "lucide-react";

const EmployerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Jobs" | "Applications" | "Events">("Jobs");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);

  // Dummy data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "High School Teacher",
      institution: "City Public School",
      description: "Teaching high school students various subjects.",
      type: ["Full-time", "On-site"],
      status: "Active"
    },
    {
      id: 2,
      title: "Math Tutor",
      institution: "Learning Center",
      description: "Provide one-on-one math tutoring to students.",
      type: ["Part-time", "Remote"],
      status: "Active"
    }
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "John Smith",
      position: "High School Teacher",
      appliedDate: "2023-05-15",
      status: "For Interviewing",
      resume: "john_smith_resume.pdf"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Math Tutor",
      appliedDate: "2023-05-18",
      status: "Accepted",
      resume: "sarah_johnson_resume.pdf"
    }
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "JOB FAIR 2025",
      description: "Annual Career Fair for education professionals",
      date: "2025-05-07",
      time: "10:00 AM - 4:00 PM",
      location: "Convention Center, New York",
      registered: 11
    }
  ]);

  const handleViewItemClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (id: number) => {
    if (activeTab === "Jobs") {
      setJobs(jobs.filter(job => job.id !== id));
    } else if (activeTab === "Events") {
      setEvents(events.filter(event => event.id !== id));
    }
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

  const renderDetails = () => {
    if (!selectedItem) return null;

    return (
      <div className="space-y-4">
        {activeTab === "Jobs" && (
          <>
            <p><strong>Title:</strong> {selectedItem.title}</p>
            <p><strong>Institution:</strong> {selectedItem.institution}</p>
            <p><strong>Description:</strong> {selectedItem.description}</p>
            <p><strong>Type:</strong> {selectedItem.type?.join(", ")}</p>
            <p><strong>Status:</strong> {selectedItem.status}</p>
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
          <div className="flex space-x-6 border-b pb-2 mb-4">
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
        </div>
      </div>

      {/* Modal */}
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
    </div>
  );
};

export default EmployerDashboard;