import Navbar from '../components/NavBar'; // Adjust as needed
import { Search, Calendar, MapPin } from 'lucide-react';

const events = [
  {
    title: 'Annual Education Conference',
    date: 'June 05, 2025',
    location: 'Makati City, Philippines',
    type: 'Seminar',
    image: '/src/assets/event1.png',
  },
  {
    title: 'Teacher Training Workshop',
    date: 'July 25, 2025',
    location: 'Makati City, Philippines',
    type: 'Seminar',
    image: '/src/assets/event2.png',
  },
  {
    title: 'Online Webinar: Digital Education',
    date: 'August 15, 2025',
    location: 'Online',
    type: 'Webinar',
    image: '/src/assets/event3.png',
  },
];

const Events = () => {
  return (
    <div className="bg-[#F2F8FD] min-h-screen">
      <Navbar />

      <div className="px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-semibold text-[#082C57]">All Events</h1>

          <div className="flex flex-wrap items-center gap-3">
            {['All', 'Job Fair', 'Webinar', 'Seminar'].map((filter, idx) => (
              <button
                key={idx}
                className={`px-4 py-1.5 border rounded-full text-sm font-medium ${
                  filter === 'All' ? 'bg-[#082C57] text-white' : 'text-[#082C57] border-[#082C57]'
                }`}
              >
                {filter}
              </button>
            ))}

            <div className="flex items-center border rounded-full px-4 py-1.5 bg-white">
              <input
                type="text"
                placeholder="Search"
                className="outline-none border-none text-sm bg-transparent placeholder:text-[#6B7280]"
              />
              <Search size={16} className="ml-2 text-[#082C57]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <span className="absolute top-2 right-2 bg-[#082C57] text-white text-xs px-2 py-1 rounded">
                  {event.type}
                </span>
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg text-[#082C57]">{event.title}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Join us for a day of insightful talks and networking with fellow educators
                </p>

                <div className="flex items-center text-sm text-gray-600 mt-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="mr-4">Date: {event.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Location: {event.location}</span>
                </div>

                <div className="mt-3 text-right">
                  <a href="#" className="text-[#205295] text-sm font-medium hover:underline">
                    See more...
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
