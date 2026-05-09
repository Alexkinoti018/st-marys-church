import { createClient } from '@supabase/supabase-js';
import { CalendarDays, MapPin, Clock } from 'lucide-react';

// 1. FIX: Opt out of Next.js static caching to ensure real-time event updates
export const dynamic = 'force-dynamic';

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

export default async function EventsPage() {
  const { data: events, error } = await supabase
    .from('church_events')
    .select('*')
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return <div className="text-center mt-10 text-red-500">Failed to load events.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">Upcoming Events</h1>
      <p className="text-center text-gray-600 mb-10">
        Join us at St. Mary’s AIPCA Church, Kathelwa
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events?.map((event: ChurchEvent) => {
          const eventDate = new Date(event.event_date);
          
          // 2. FIX: Explicitly set the timezone to Africa/Nairobi so Vercel doesn't default to UTC
          const dateString = eventDate.toLocaleDateString('en-US', { 
            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
            timeZone: 'Africa/Nairobi'
          });
          
          const timeString = eventDate.toLocaleTimeString('en-US', { 
            hour: '2-digit', minute: '2-digit',
            timeZone: 'Africa/Nairobi'
          });

          return (
            <div key={event.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">{event.title}</h2>
              <p className="text-gray-600 mb-6 flex-grow">{event.description}</p>
              
              <div className="space-y-2 text-sm text-gray-500 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-blue-600" />
                  <span>{dateString}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{timeString}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          );
        })}

        {(!events || events.length === 0) && (
          <div className="col-span-full text-center text-gray-500 py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            No upcoming events scheduled at the moment. Please check back later!
          </div>
        )}
      </div>
    </div>
  );
}