import { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';
import { Search, Calendar, MapPin, X } from 'lucide-react';
import { useEvents, EventData } from '../hooks/useEvents';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const Events = () => {
  const { events, loading, registerForEvent } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);

  useEffect(() => {
    let updatedEvents = events;

    if (filter !== 'All') {
      updatedEvents = updatedEvents.filter(event => event.type === filter);
    }

    if (searchTerm.trim() !== '') {
      updatedEvents = updatedEvents.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(updatedEvents);
  }, [filter, searchTerm, events]);

  const openModal = (event: EventData) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="bg-[#F2F8FD] min-h-screen">
      <Navbar />

      <div className="px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-semibold text-[#082C57]">All Events</h1>

          <div className="flex flex-wrap items-center gap-3">
            {['All', 'Job Fair', 'Webinar', 'Seminar'].map((f, idx) => (
              <button
                key={idx}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 border rounded-full text-sm font-medium transition-colors ${
                  f === filter
                    ? 'bg-[#082C57] text-white'
                    : 'text-[#082C57] border-[#082C57]'
                }`}
              >
                {f}
              </button>
            ))}

            <div className="flex items-center border rounded-full px-4 py-1.5 bg-white">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="outline-none border-none text-sm bg-transparent placeholder:text-[#6B7280]"
              />
              <Search size={16} className="ml-2 text-[#082C57]" />
            </div>
          </div>
        </div>

        {loading ? (
          <p className="mt-10 text-center text-[#082C57] font-medium">Loading events...</p>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredEvents.map((event, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <span className="absolute top-2 right-2 bg-[#082C57] text-white text-xs px-2 py-1 rounded">
                    {event.type}
                  </span>
                  {event.image && (
                    <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
                  )}
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-lg text-[#082C57]">{event.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>

                  <div className="flex items-center text-sm text-gray-600 mt-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="mr-4">Date: {formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Location: {event.location}</span>
                  </div>

                  <div className="mt-3 text-right">
                    <button
                      onClick={() => openModal(event)}
                      className="text-[#205295] text-sm font-medium hover:underline"
                    >
                      See more...
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-gray-500">No events found.</p>
        )}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold text-[#082C57]">{selectedEvent.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{selectedEvent.description}</p>
            <div className="mt-4 text-sm text-gray-600">
              <div className="flex items-center mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(selectedEvent.date)}</span>
              </div>
              <div className="flex items-center mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{selectedEvent.location}</span>
              </div>
              <div className="text-xs bg-[#082C57] text-white inline-block px-2 py-1 rounded">
                {selectedEvent.type}
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={() => registerForEvent(selectedEvent.id)}
                className="mt-4 px-4 py-2 bg-[#144272] text-white text-sm rounded hover:bg-[#2C74B3] transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
