"use client";

import React, { useState, useEffect } from 'react';
import { Church, ArrowLeft, Heart, Send, Loader2, MessageCircleHeart } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';


// Connect to the live Supabase database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// TEMPORARY DEBUG LINE
console.log("Debug URL:", supabaseUrl);

export default function PrayerWallPage() {
  const [prayers, setPrayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [name, setName] = useState('');
  const [requestText, setRequestText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Fetch prayers when the page loads
  useEffect(() => {
    fetchPrayers();
  }, []);

  const fetchPrayers = async () => {
    const { data, error } = await supabase
      .from('prayer_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setPrayers(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !requestText.trim()) return;
    
    setIsSubmitting(true);

    const { error } = await supabase
      .from('prayer_requests')
      .insert([
        { author_name: name, request_text: requestText }
      ]);

    if (!error) {
      setSuccessMsg(true);
      setName('');
      setRequestText('');
      fetchPrayers(); // Refresh the wall instantly
      
      // Hide success message after 4 seconds
      setTimeout(() => setSuccessMsg(false), 4000);
    } else {
      console.error("Supabase Error:", error?.message || error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Navigation */}
      <nav className="bg-white text-slate-800 shadow-sm sticky top-0 z-40 h-16 px-4 md:px-8 flex items-center justify-between w-full border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-orange-500 transition font-bold text-sm uppercase tracking-wide">
          <ArrowLeft size={18} /> Back to Home
        </Link>
        <div className="flex items-center gap-2 font-bold text-slate-900 tracking-tight">
          <Church className="text-orange-500" size={24} />
          ST. MARY'S AIPCA
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-slate-900 text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <MessageCircleHeart size={32} className="text-blue-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Prayer Wall</h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            "For where two or three gather in my name, there am I with them." Share your burdens, and let the Kathelwa community stand with you in prayer.
          </p>
        </div>
      </header>

      {/* Main Content Area: Two Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: The Submit Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 sticky top-24">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Submit a Request</h2>
            <p className="text-slate-500 text-sm mb-6">Your request will be posted publicly on the wall below so our congregation can pray for you.</p>

            {successMsg ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 text-center font-medium animate-pulse">
                Your prayer request has been shared!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g., John Doe or Anonymous"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Your Prayer Request</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="How can we pray for you today?"
                    value={requestText}
                    onChange={(e) => setRequestText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-md flex justify-center items-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <><Send size={18} /> Post Prayer</>}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: The Live Wall */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Recent Prayers</h3>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
              {prayers.length} Active
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 size={40} className="animate-spin mb-4 text-blue-300" />
              <p>Loading the prayer wall...</p>
            </div>
          ) : prayers.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <Heart size={48} className="text-slate-200 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-slate-700 mb-1">The wall is quiet right now</h4>
              <p className="text-slate-500 text-sm">Be the first to share a prayer request with the community.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {prayers.map((prayer) => (
                <div key={prayer.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-slate-900">{prayer.author_name}</h4>
                    <span className="text-xs font-medium text-slate-400">
                      {new Date(prayer.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    "{prayer.request_text}"
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-slate-400 hover:text-red-500 cursor-pointer transition w-max">
                    <Heart size={16} /> <span className="text-xs font-bold">Pray for this</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}