import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import { MoreVertical } from 'lucide-react';

// Types
type Applicant = {
  id: number;
  position: string;
  status: string;
};

type Event = {
  title: string;
  description: string;
  date: string;
  registered: number;
  image?: string;
};

const EmployerDashboard: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [applicants, setApplicants] = useState<Applicant[]>([
    { id: 1, position: 'High School Teacher', status: 'For Interviewing' },
    { id: 2, position: 'High School Teacher', status: 'For Interviewing' },
    { id: 3, position: 'High School Teacher', status: 'For Interviewing' },
    { id: 4, position: 'High School Teacher', status: 'For Interviewing' },
  ]);

  const [events, setEvents] = useState<Event[]>([
    { title: 'JOB FAIR 2025', description: 'Description', date: '2025-05-07', registered: 11 },
  ]);

  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    description: '',
    date: '',
    registered: 0,
    image: '',
  });

  const handleViewApplication = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedApplicant(null);
    setModalOpen(false);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const handleSaveEvent = () => {
    if (isEditingEvent && selectedEvent) {
      setEvents((prev) =>
        prev.map((e) => (e.title === selectedEvent.title ? newEvent : e))
      );
    } else {
      setEvents((prev) => [...prev, newEvent]);
    }
    setEventModalOpen(false);
    setIsEditingEvent(false);
    setSelectedEvent(null);
    setNewEvent({ title: '', description: '', date: '', registered: 0, image: '' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDropdown = (id: string) => {
    setDropdownOpenId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (id: string, type: 'event' | 'applicant') => {
    if (type === 'event') {
      const event = events.find((e) => e.title === id);
      if (event) {
        setSelectedEvent(event);
        setNewEvent(event);
        setIsEditingEvent(true);
        setEventModalOpen(true);
      }
    } else if (type === 'applicant') {
      const applicant = applicants.find((a) => a.id === Number(id));
      if (applicant) {
        setSelectedApplicant(applicant);
        setModalOpen(true);
      }
    }
  };

  const handleDelete = (id: string, type: 'event' | 'applicant') => {
    if (type === 'event') {
      setEvents((prev) => prev.filter((e) => e.title !== id));
    } else if (type === 'applicant') {
      setApplicants((prev) => prev.filter((a) => a.id !== Number(id)));
    }
    setDropdownOpenId(null);
  };

  return (
    <div className="min-h-screen bg-[#F0F5F9] text-gray-800">
      <Navbar />

      {/* Applicant Modal */}
      {modalOpen && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#F0F5F9] rounded-lg p-6 w-96 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Applicant Details</h2>
            <div className="space-y-2 text-sm">
              <p><strong>ID:</strong> {selectedApplicant.id}</p>
              <p><strong>Position:</strong> {selectedApplicant.position}</p>
              <p><strong>Status:</strong> {selectedApplicant.status}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Event Modal */}
      {eventModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#F0F5F9] p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">
              {isEditingEvent ? 'Edit Event' : 'Add New Event'}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Event Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="file"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded-md"
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSaveEvent}
                  className="bg-[#144272] text-white px-4 py-2 rounded-lg"
                >
                  {isEditingEvent ? 'Save Changes' : 'Add Event'}
                </button>
                <button
                  onClick={() => {
                    setEventModalOpen(false);
                    setIsEditingEvent(false);
                    setSelectedEvent(null);
                    setNewEvent({ title: '', description: '', date: '', registered: 0, image: '' });
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard */}
      <div className="p-6 grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-9 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Recent</h2>
            <div className="flex space-x-6 border-b border-gray-200 pb-2">
              <button className="text-blue-900 font-semibold border-b-2 border-blue-900">Job Application</button>
              
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-2">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="min-w-[300px] bg-[#144272] text-white rounded-lg p-4 relative flex-shrink-0"
                >
                  <MoreVertical
                    className="absolute top-4 right-4 cursor-pointer"
                    onClick={() => toggleDropdown(`left::${event.title}`)}
                  />
                  {dropdownOpenId === `left::${event.title}` && (
                    <div className="absolute bg-white text-black rounded-lg shadow-lg p-2 mt-2 right-4 z-10">
                      <button
                        onClick={() => handleEdit(event.title, 'event')}
                        className="block w-full text-left p-2 text-sm text-blue-500 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.title, 'event')}
                        className="block w-full text-left p-2 text-sm text-red-500 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  <h3 className="font-bold text-lg mt-5">{event.title}</h3>
                  <p>{event.description}</p>
                  <p className="text-sm mt-2">{event.date}</p>
                  <p className="text-sm mt-1">{event.registered} Registered</p>
                </div>
              ))}
            </div>
          </div>

          {/* Application Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-[#F0F5F9] p-4 text-[#144272] font-semibold">Application Management</div>
            <table className="w-full text-left bg-[#144272] text-white">
              <thead className="bg-[#F0F5F9] text-sm text-gray-800">
                <tr>
                  <th className="px-4 py-2 text-center">Applicant ID</th>
                  <th className="px-4 py-2 text-center">Position</th>
                  <th className="px-4 py-2 text-center">View Application</th>
                  <th className="px-4 py-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((a) => (
                  <tr key={a.id} className="border-t border-[#F0F5F9] text-sm">
                    <td className="px-4 py-2 text-center">{a.id}</td>
                    <td className="px-4 py-2 text-center">{a.position}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        className="text-[#F0F5F9] underline"
                        onClick={() => handleViewApplication(a)}
                      >
                        View Application
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <select
                        className="bg-[#F0F5F9] text-[#144272] px-3 py-1 rounded-full"
                        value={a.status}
                        onChange={(e) => handleStatusChange(a.id, e.target.value)}
                      >
                        <option value="For Interviewing">For Interviewing</option>
                        <option value="Accept">Accept</option>
                        <option value="Reject">Reject</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Events */}
        <div className="col-span-3 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Events</h2>
            <button
              onClick={() => {
                setIsEditingEvent(false);
                setSelectedEvent(null);
                setNewEvent({ title: '', description: '', date: '', registered: 0, image: '' });
                setEventModalOpen(true);
              }}
              className="bg-[#144272] text-white px-4 py-2 rounded-lg"
            >
              Add Event
            </button>
          </div>

          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="bg-[#144272] text-white rounded-lg p-4 relative">
                <MoreVertical
                  className="absolute top-4 right-4 cursor-pointer"
                  onClick={() => toggleDropdown(`right::${event.title}`)}
                />
                {dropdownOpenId === `right::${event.title}` && (
                  <div className="absolute bg-white text-black rounded-lg shadow-lg p-2 mt-2 right-4 z-10">
                    <button
                      onClick={() => handleEdit(event.title, 'event')}
                      className="block w-full text-left p-2 text-sm text-blue-500 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.title, 'event')}
                      className="block w-full text-left p-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
                <h3 className="font-bold text-sm">{event.title}</h3>
                <p className="text-xs">{event.description}</p>
                <p className="text-xs mt-2">{event.registered} Registered</p>
                <p className="text-xs">{event.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
