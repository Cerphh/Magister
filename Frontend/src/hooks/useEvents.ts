import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

export interface EventData {
  id: string;
  title: string;
  date: string; // ISO string
  location: string;
  type: string;
  image?: string;
  description: string;
  companyId: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (date: any): string => {
    if (typeof date === 'string') {
      return new Date(date).toISOString();
    } else if (typeof date === 'object' && '_seconds' in date) {
      return new Date(date._seconds * 1000).toISOString();
    } else {
      return new Date().toISOString(); // fallback
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/events/all');
      const rawEvents = response.data.events;

      const formattedEvents: EventData[] = rawEvents.map((event: any) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        type: event.category || event.type || 'General',
        image: event.image || '',
        date: formatDate(event.date),
        companyId: event.companyId || '',
      }));

      setEvents(formattedEvents);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const registerForEvent = async (eventId: string) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('You must be logged in to register.');

      if (!user.displayName || !user.email) {
        throw new Error('Your profile must include a display name and email.');
      }

      const companyId = user.uid;
      await axios.post('http://localhost:5000/api/events/register', {
        eventId,
        userId: user.uid,
        name: user.displayName,
        email: user.email,
        companyId,
      });

      alert('Successfully registered for the event!');
    } catch (err: any) {
      alert(`Registration failed: ${err.response?.data?.error || err.message}`);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, error, registerForEvent };
};
