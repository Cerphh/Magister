import React, { useState } from "react";
import Navbar from "../components/NavBar";
import { useAdminValidation } from "../hooks/useAdminValidation";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Job Post");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { items, loading, validateItem } = useAdminValidation(activeTab);

  const handleViewItemClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleValidationClick = (id: string, action: string) => {
    validateItem(id, action);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const renderDetails = () => {
  if (!selectedItem) return null;

  return (
    <div>
      {activeTab === "Job Post" && (
        <>
          <p><strong>Title:</strong> {selectedItem.title}</p>
          <p><strong>Institution:</strong> {selectedItem.institution}</p>
          <p><strong>Description:</strong> {selectedItem.description}</p>
          <p><strong>Type:</strong> {selectedItem.type?.join(", ")}</p>
        </>
      )}
      {activeTab === "Resources" && (
        <>
          <p><strong>Display Name:</strong> {selectedItem.displayName}</p>
          <p><strong>Subject:</strong> {selectedItem.subject}</p>
          <p><strong>Description:</strong> {selectedItem.description}</p>
          <p><strong>File Type:</strong> {selectedItem.fileType}</p>
          <p><strong>Level:</strong> {selectedItem.level}</p>
        </>
      )}
      {activeTab === "Events" && (
        <>
          <p><strong>Title:</strong> {selectedItem.title}</p>
          <p><strong>Organizer:</strong> {selectedItem.organizer}</p>
          <p><strong>Category:</strong> {selectedItem.category}</p>
          <p><strong>Location:</strong> {selectedItem.location}</p>
          <p><strong>Date:</strong> {new Date(selectedItem.date).toLocaleString()}</p>
          <p><strong>Description:</strong> {selectedItem.description}</p>
        </>
      )}
    </div>
  );
};

  return (
    <div className="min-h-screen bg-[#F0F5F9] text-gray-800">
      <Navbar />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">DASHBOARD</h1>

        <div className="bg-white border rounded-lg p-4">
          <div className="flex space-x-6 border-b pb-2 mb-4">
            {["Job Post", "Resources", "Events"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
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

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left bg-[#144272] text-white">
                <thead className="bg-[#F0F5F9] text-sm text-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-center">ID</th>
                    {activeTab === "Job Post" && (
                      <th className="px-4 py-2 text-center">Title</th>
                    )}
                    {activeTab === "Resources" && (
                      <th className="px-4 py-2 text-center">Name</th>
                    )}
                    {activeTab === "Events" && (
                      <th className="px-4 py-2 text-center">Event Name</th>
                    )}
                    <th className="px-4 py-2 text-center">View Details</th>
                    <th className="px-4 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item: any) => (
                    <tr key={item.id} className="border-t border-[#F0F5F9] text-sm">
                      <td className="px-4 py-2 text-center">{item.id}</td>
                      <td className="px-4 py-2 text-center">
                        {activeTab === "Job Post"
                          ? item.title
                          : activeTab === "Resources"
                          ? item.displayName
                          : item.name}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="text-white font-semibold underline hover:text-[#F0F5F9]"
                          onClick={() => handleViewItemClick(item)}
                        >
                          View Details
                        </button>
                      </td>
                      <td className="px-4 py-2 text-center space-x-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition"
                          onClick={() => handleValidationClick(item.id, "accept")}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
                          onClick={() => handleValidationClick(item.id, "reject")}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

export default AdminDashboard;
