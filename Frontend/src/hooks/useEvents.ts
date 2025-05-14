import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

export interface EventData {
  id: string;
  title: string;
  date: string; // Converted to ISO string
  location: string;
  type: string;
  image?: string;
  description: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        type: event.category || event.type,
        image: event.image || '',
        date: new Date(event.date._seconds * 1000).toISOString(), // Convert Firestore timestamp to ISO
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

      await axios.post('http://localhost:5000/api/events/register', {
        eventId,
        userId: user.uid,
        name: user.displayName,
        email: user.email
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
