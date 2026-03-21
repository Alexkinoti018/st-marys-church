"use client";

import React, { useState } from 'react';
import { Heart, Send, User, MessageSquareQuote, Calendar } from 'lucide-react';

// Define the shape of our Prayer Request data
type PrayerRequest = {
  id: number;
  name: string;
  request: string;
  date: string;
  prayersCount: number;
  hasPrayed: boolean; // Tracks if the current user clicked the button
};

export default function PrayerWallPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPrayer, setNewPrayer] = useState({ name: '', request: '' });

  // Mock Database State (This will be replaced by your Supabase fetch)
  const [prayers, setPrayers] = useState<PrayerRequest[]>([
    {
      id: 1,
      name: "Anonymous",
      request: "Please pray for my mother who is undergoing surgery this Tuesday. Praying for the doctors and for a quick recovery.",
      date: "Mar 20, 2026",
      prayersCount: 12,
      hasPrayed: false
    },
    {
      id: 2,
      name: "John K.",
      request: "Praying for the youth of Kathelwa as they prepare for their upcoming national exams. May God grant them peace and understanding.",
      date: "Mar 18, 2026",
      prayersCount: 24,
      hasPrayed: true
    },
    {
      id: 3,
      name: "Sarah M.",
      request: "Thanking God for the safe arrival of our newborn baby girl! Please pray for our family as we transition into this new season.",
      date: "Mar 15, 2026",
      prayersCount: 45,
      hasPrayed: false
    }
  ]);

  // Handle Form Submission (This will be replaced by your Supabase INSERT)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newEntry: PrayerRequest = {
        id: Date.now(),
        name: newPrayer.name || "Anonymous",
        request: newPrayer.request,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        prayersCount: 0,
        hasPrayed: false
      };
      
      setPrayers([newEntry, ...prayers]);
      setNewPrayer({ name: '', request: '' });
      setIsSubmitting(false);
    }, 1000); // Simulating network delay
  };

  // Handle clicking the "I prayed for this" button (Replaced by Supabase UPDATE)
  const handlePrayClick = (id: number) => {
    setPrayers(prayers.map(prayer => {
      if (prayer.id === id) {
        return {
          ...prayer,
          prayersCount: prayer.hasPrayed ? prayer.prayersCount - 1 : prayer.prayersCount + 1,
          hasPrayed: !prayer.hasPrayed
        };
      }
      return prayer;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      
      {/* HERO SECTION */}
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

      {/* MAIN CONTENT AREA */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Sticky Submission Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 lg:sticky lg:top-28">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Share a Request</h2>
            <p className="text-slate-500 text-sm mb-8">Let the St. Mary's community stand with you in prayer.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
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
              </div>
              
              <div>
                <textarea 
                  required 
                  rows={5} 
                  value={newPrayer.request}
                  onChange={(e) => setNewPrayer({...newPrayer, request: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none text-slate-900" 
                  placeholder="How can we pray for you?" 
                />
              </div>

              <button 
                disabled={isSubmitting || !newPrayer.request.trim()}
                className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-orange-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? 'POSTING...' : <>SUBMIT PRAYER <Send size={18} /></>}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: The Prayer Feed */}
        <div className="lg:col-span-2 space-y-6">
          {prayers.map((prayer) => (
            <div key={prayer.id} className="bg-white p-8 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-slate-100 transition-all hover:shadow-xl">
              
              {/* Header: Name & Date */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-black uppercase text-sm">
                    {prayer.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-slate-900">{prayer.name}</h3>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <Calendar size={14} /> {prayer.date}
                </div>
              </div>

              {/* The Request */}
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                "{prayer.request}"
              </p>

              {/* Interaction Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <span className="text-sm font-bold text-slate-400">
                  <span className="text-slate-900">{prayer.prayersCount}</span> people prayed for this
                </span>
                
                <button 
                  onClick={() => handlePrayClick(prayer.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                    prayer.hasPrayed 
                    ? 'bg-orange-50 text-orange-600 border border-orange-200' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Heart size={16} className={prayer.hasPrayed ? 'fill-orange-500 text-orange-500' : ''} />
                  {prayer.hasPrayed ? 'PRAYED' : 'I PRAYED FOR THIS'}
                </button>
              </div>

            </div>
          ))}
          
          {prayers.length === 0 && (
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