import React from 'react';
import Navbar from '../components/NavBar'; // Adjust path as needed
import { MoreHorizontal, MoreVertical } from 'lucide-react';

const EmployerDashboard: React.FC = () => {
  const recentApplications = [
    { title: 'HIGH SCHOOL TEACHER', description: 'Description', date: '05/07/25', applied: 11 },
    { title: 'JOB FAIR 2025', description: 'Description', date: '05/07/25', applied: 11 },
    { title: 'JOB FAIR 2025', description: 'Description', date: '05/07/25', applied: 11 },
  ];

  const events = [
    { title: 'JOB FAIR 2025', description: 'Description', date: '05/07/25', registered: 11 },
    { title: 'JOB FAIR 2025', description: 'Description', date: '05/07/25', registered: 11 },
    { title: 'JOB FAIR 2025', description: 'Description', date: '05/07/25', registered: 11 },
  ];

  const applicants = [
    { id: 1, position: 'High School Teacher', status: 'For Interviewing' },
    { id: 2, position: 'High School Teacher', status: 'For Interviewing' },
    { id: 3, position: 'High School Teacher', status: 'For Interviewing' },
    { id: 4, position: 'High School Teacher', status: 'For Interviewing' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      <div className="p-6 grid grid-cols-12 gap-6">
        {/* Left - Dashboard Content */}
        <div className="col-span-9 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Recent</h2>
            <div className="flex space-x-6 border-b border-gray-200 pb-2">
              <button className="text-blue-900 font-semibold border-b-2 border-blue-900">Job Application</button>
              <button className="text-gray-500">Events</button>
            </div>
          </div>

          <div className="overflow-x-auto">
  <div className="flex space-x-4 pb-2">
    {recentApplications.concat(recentApplications).map((job, index) => (
      <div
        key={index}
        className="min-w-[300px] bg-[#144272] text-white rounded-lg p-4 relative flex-shrink-0"
      >
        <MoreHorizontal className="absolute top-4 right-4" />
        <h3 className="font-bold text-lg mt-5">{job.title}</h3>
        <p>{job.description}</p>
        <p className="text-sm mt-2">{job.date}</p>
        <p className="text-sm mt-1">{job.applied} Applied</p>
      </div>
    ))}
  </div>
</div>

          {/* Application Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-4 font-semibold">Application Management</div>
            <table className="w-full text-left">
              <thead className="bg-gray-200 text-sm text-gray-600">
                <tr>
                  <th className="px-4 py-2">Applicant ID</th>
                  <th className="px-4 py-2">Position</th>
                  <th className="px-4 py-2">Application</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((a) => (
                  <tr key={a.id} className="border-t text-sm">
                    <td className="px-4 py-2">{a.id}</td>
                    <td className="px-4 py-2">{a.position}</td>
                    <td className="px-4 py-2">
                      <button className="text-[#144272] underline">View Application</button>
                    </td>
                    <td className="px-4 py-2">
                      <span className="bg-blue-100 text-[#144272] px-3 py-1 rounded-full">{a.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right - Events */}
        <div className="col-span-3 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Event</h2>
            <button className="border border-gray-400 px-3 py-1 rounded-full text-sm">Add event</button>
          </div>

          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="bg-[#144272] text-white rounded-lg p-4 relative">
                <MoreVertical className="absolute top-4 right-4" />
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
