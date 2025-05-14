import React, { useState } from "react";
import Navbar from "../components/NavBar";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Job Post");
  const [applicants, setApplicants] = useState([
    { id: 1, position: "High School Teacher", status: "Accept" },
    { id: 2, position: "High School Teacher", status: "Reject" },
    { id: 3, position: "High School Teacher", status: "Accept" },
    { id: 4, position: "High School Teacher", status: "Accept" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleStatusChange = (id: number, newStatus: string) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id ? { ...applicant, status: newStatus } : applicant
      )
    );
  };

  const handleViewItemClick = (applicant: any) => {
    setSelectedItem(applicant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null); // Reset selected item
  };

  const renderTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-left bg-[#144272] text-white">
        <thead className="bg-[#F0F5F9] text-sm text-gray-800">
          <tr>
            <th className="px-4 py-2 text-center">
              {activeTab === "Resources"
                ? "Resource ID"
                : activeTab === "Events"
                ? "Event ID"
                : "Applicant ID"}
            </th>
            {activeTab === "Job Post" && (
              <th className="px-4 py-2 text-center">Position</th>
            )}
            <th className="px-4 py-2 text-center">View Pending Item</th>
            <th className="px-4 py-2 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant.id} className="border-t border-[#F0F5F9] text-sm">
              <td className="px-4 py-2 text-center">{applicant.id}</td>
              {activeTab === "Job Post" && (
                <td className="px-4 py-2 text-center">{applicant.position}</td>
              )}
              <td className="px-4 py-2 text-center">
                <button
                  className="text-[#F0F5F9] underline"
                  onClick={() => handleViewItemClick(applicant)}
                >
                  View Item
                </button>
              </td>
              <td className="px-4 py-2 text-center">
                <select
                  className="bg-[#F0F5F9] text-[#144272] px-3 py-1 rounded-full"
                  value={applicant.status}
                  onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                >
                  <option value="Accept">Accept</option>
                  <option value="Reject">Reject</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F5F9] text-gray-800">
      <Navbar />

      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">DASHBOARD</h1>

        <div className="bg-[#F0F5F9] border rounded-lg p-4">
          <div className="flex space-x-6 border-b pb-2 mb-4">
            {["Job Post", "Resources", "Events"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`$${
                  activeTab === tab
                    ? 'text-[#144272]-900 font-semibold border-b-2 border-[#144272]-900'
                    : 'text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {renderTable()}
        </div>
      </div>

      {/* Modal for Viewing Item */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#F0F5F9] p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Applicant Details</h2>
            <p><strong>Applicant ID:</strong> {selectedItem?.id}</p>
            {activeTab === "Job Post" && <p><strong>Position:</strong> {selectedItem?.position}</p>}
            <p><strong>Status:</strong> {selectedItem?.status}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-[#144272] text-[#F0F5F9] px-4 py-2 rounded-lg"
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

export default AdminDashboard;
