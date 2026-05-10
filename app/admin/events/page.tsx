'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Lock, Trash2, CalendarPlus, Loader2 } from 'lucide-react';
import { verifyAdminPin } from './actions'; 

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface ChurchEvent {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
}

export default function AdminEventsPage() {
  const [isMounted, setIsMounted] = useState(false);

  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('St. Mary’s AIPCA Church, Kathelwa');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('church_events')
      .select('*')
      .order('event_date', { ascending: true });

    if (!error && data) {
      setEvents(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      fetchEvents();
    }
  }, [isAuthorized, fetchEvents]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
    const isValid = await verifyAdminPin(pin);
    
    if (isValid) {
      setIsAuthorized(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPin('');
    }
    setIsVerifying(false);
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const isoDate = new Date(eventDate).toISOString();

    const { error } = await supabase.from('church_events').insert([
      { title, description, event_date: isoDate, location }
    ]);

    if (!error) {
      setTitle('');
      setDescription('');
      setEventDate('');
      setLocation('St. Mary’s AIPCA Church, Kathelwa');
      fetchEvents(); 
    } else {
      alert('Failed to add event.');
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    setIsLoading(true);
    const { error } = await supabase.from('church_events').delete().eq('id', id);
    if (!error) {
      setEvents(events.filter((event) => event.id !== id));
    } else {
      alert('Failed to delete event.');
    }
    setIsLoading(false);
  };

  if (!isMounted) return null;

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-500 text-sm mt-1">Events Calendar Moderation</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                id="admin-pin-events"
                title="Admin PIN"
                aria-label="Admin PIN"
                type="password"
                placeholder="Enter Admin PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
              {pinError && <p className="text-red-500 text-sm mt-2">Incorrect PIN. Please try again.</p>}
            </div>
            <button type="submit" disabled={isVerifying} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-50">
              {isVerifying && <Loader2 className="w-4 h-4 animate-spin" />}
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
        <button onClick={() => setIsAuthorized(false)} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
          Lock Dashboard
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CalendarPlus className="w-5 h-5 text-blue-600" />
            Add New Event
          </h2>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div>
              <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
              <input id="event-title" type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. Youth Choir Practice" />
            </div>
            <div>
              <label htmlFor="event-date" className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
              <input id="event-date" type="datetime-local" title="Event Date and Time" aria-label="Event Date and Time" required value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="event-location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input id="event-location" type="text" placeholder="e.g. Main Sanctuary" required value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="event-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea id="event-description" required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Details about the event..." />
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center gap-2">
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Publish Event
            </button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Current Events</h2>
          {isLoading && events.length === 0 ? (
            <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="p-3 font-medium text-gray-600">Date & Time</th>
                    <th className="p-3 font-medium text-gray-600">Event Details</th>
                    <th className="p-3 font-medium text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => {
                    const d = new Date(event.event_date);
                    return (
                      <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-3 text-sm text-gray-700">
                          <div className="font-semibold">
                            {d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Africa/Nairobi' })}
                          </div>
                          <div className="text-gray-500">
                            {d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Nairobi' })}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{event.description}</div>
                        </td>
                        <td className="p-3 text-right">
                          <button aria-label={`Delete event: ${event.title}`} onClick={() => handleDelete(event.id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-md transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {events.length === 0 && (
                    <tr><td colSpan={3} className="p-6 text-center text-gray-500">No events found. Add one to get started.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}