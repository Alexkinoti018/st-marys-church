"use client";

import React, { useState, useEffect } from 'react';
import { Heart, Send, User, MessageSquareQuote, Calendar, Loader2 } from 'lucide-react';
// This is the crucial link to your database!
import { supabase } from '@/lib/supabase';

type PrayerRequest = {
  id: number;
  name: string;
  request: string;
  created_at: string; 
  prayers_count: number; 
  hasPrayed?: boolean; 
};

export default function PrayerWallPage() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPrayer, setNewPrayer] = useState({ name: '', request: '' });

  // 1. Fetch real prayers when the page loads
  useEffect(() => {
    fetchPrayers();
  }, []);

  const fetchPrayers = async () => {
    try {
      const { data, error } = await supabase
        .from('prayer_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedData = data.map((prayer) => ({
          ...prayer,
          hasPrayed: false
        }));
        setPrayers(formattedData);
      }
    } catch (error) {
      console.error('Error fetching prayers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // 2. Send the real prayer to the database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayer.request.trim()) return;
    
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('prayer_requests')
        .insert([
          { 
            name: newPrayer.name.trim() === '' ? 'Anonymous' : newPrayer.name,
            request: newPrayer.request.trim()
          }
        ])
        .select();

      if (error) throw error;

      if (data) {
        const insertedPrayer = { ...data[0], hasPrayed: false };
        setPrayers([insertedPrayer, ...prayers]);
        setNewPrayer({ name: '', request: '' });
      }
    } catch (error) {
      console.error('Error submitting prayer:', error);
      alert('Failed to submit prayer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Update the database when someone clicks "I Prayed"
  const handlePrayClick = async (id: number) => {
    const prayerToUpdate = prayers.find(p => p.id === id);
    if (!prayerToUpdate) return;

    const newCount = prayerToUpdate.hasPrayed 
      ? prayerToUpdate.prayers_count - 1 
      : prayerToUpdate.prayers_count + 1;

    setPrayers(prayers.map(prayer => {
      if (prayer.id === id) {
        return { ...prayer, prayers_count: newCount, hasPrayed: !prayer.hasPrayed };
      }
      return prayer;
    }));

    try {
      const { error } = await supabase
        .from('prayer_requests')
        .update({ prayers_count: newCount })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating prayer count:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <header className="bg-[#1a2233] text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-[#1a2233] to-blue-900/40"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <MessageSquareQuote className="mx-auto mb-6 text-orange-500" size={48} />
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight italic">Prayer Wall.</h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            "Carry each other’s burdens, and in this way you will fulfill the law of Christ." <br/> <span className="text-orange-500 font-bold text-sm uppercase tracking-widest mt-2 block">— Galatians 6:2</span>
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 lg:sticky lg:top-28">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Share a Request</h2>
            <p className="text-slate-500 text-sm mb-8">Let the St. Mary's community stand with you in prayer.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative border border-slate-200 rounded-2xl overflow-hidden focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                <div className="absolute left-4 top-4 text-slate-400"><User size={18} /></div>
                <input 
                  type="text" 
                  value={newPrayer.name}
                  onChange={(e) => setNewPrayer({...newPrayer, name: e.target.value})}
                  className="w-full bg-slate-50 pl-12 pr-4 py-4 outline-none text-slate-900" 
                  placeholder="Your Name (Optional)" 
                />
              </div>
              
              <textarea 
                required 
                rows={5} 
                value={newPrayer.request}
                onChange={(e) => setNewPrayer({...newPrayer, request: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none text-slate-900" 
                placeholder="How can we pray for you?" 
              />

              <button 
                disabled={isSubmitting || !newPrayer.request.trim()}
                className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-orange-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg uppercase tracking-widest text-sm"
              >
                {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> POSTING...</> : <>SUBMIT PRAYER <Send size={18} /></>}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
               <Loader2 className="animate-spin mb-4 text-orange-500" size={40} />
               <p className="font-bold tracking-widest uppercase text-sm">Loading Prayers...</p>
            </div>
          )}

          {!isLoading && prayers.map((prayer) => (
            <div key={prayer.id} className="bg-white p-8 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-slate-100 transition-all hover:shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-black uppercase text-sm">
                       {/* If name exists, use first letter. If not, use 'A' */}
                       {(prayer.name || 'A').charAt(0)}
                </div>
                {/* If name exists, display it. If not, display 'Anonymous' */}
                   <h3 className="font-bold text-slate-900">{prayer.name || 'Anonymous'}</h3>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <Calendar size={14} /> {formatDate(prayer.created_at)}
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-8 text-lg">"{prayer.request}"</p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <span className="text-sm font-bold text-slate-400">
                  <span className="text-slate-900">{prayer.prayers_count}</span> people prayed for this
                </span>
                
                <button 
                  onClick={() => handlePrayClick(prayer.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                    prayer.hasPrayed 
                    ? 'bg-orange-50 text-orange-600 border border-orange-200 shadow-inner' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <Heart size={16} className={prayer.hasPrayed ? 'fill-orange-500 text-orange-500' : ''} />
                  {prayer.hasPrayed ? 'PRAYED' : 'I PRAYED FOR THIS'}
                </button>
              </div>
            </div>
          ))}
          
          {!isLoading && prayers.length === 0 && (
            <div className="bg-white p-12 rounded-[2.5rem] text-center border border-slate-100">
              <Heart className="mx-auto text-slate-300 mb-4" size={48} />
              <h3 className="text-xl font-bold text-slate-900 mb-2">No prayers yet</h3>
              <p className="text-slate-500">Be the first to share a prayer request with the Kathelwa community.</p>
            </div>
          )}
        </div>

      </section>
    </div>
  );
}