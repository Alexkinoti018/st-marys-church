"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlayCircle, ArrowRight, Youtube, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [sermons, setSermons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    const { data, error } = await supabase
      .from('sermons')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3); // Only show the 3 most recent sermons on the homepage

    if (data) setSermons(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* YOUR HERO SECTION */}
      <header className="relative bg-[#1a2233] text-white pt-40 pb-56 px-4 text-center flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-[#1a2233]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="text-orange-500 font-black tracking-[0.4em] uppercase text-xs mb-6 block">
            Welcome to Kathelwa
          </span>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight italic text-white">
            Seek Ye First.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Join St. Mary's AIPCA for uplifting worship, a loving community, and a deeper connection with Christ in Meru County.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/about" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 px-10 rounded-full transition-all duration-300 shadow-xl shadow-orange-500/30 text-sm uppercase tracking-widest flex items-center gap-2"
            >
              Plan Your Visit <ArrowRight size={16}/>
            </Link>
            
            <Link 
              href="/gallery" 
              className="bg-white/10 hover:bg-white text-white hover:text-slate-950 font-bold py-5 px-10 rounded-full transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 border border-white/20 text-sm uppercase tracking-widest"
            >
              <PlayCircle size={20} /> Watch Live
            </Link>
          </div>
        </div>
      </header>

      {/* THE DYNAMIC SERMONS SECTION */}
      <section className="py-20 px-4 bg-white rounded-t-[3rem] -mt-10 relative z-10 shadow-2xl shadow-slate-900/10">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Latest Sermons</h2>
              <p className="text-slate-500 text-lg">Catch up on recent messages from our sanctuary.</p>
            </div>
            <a href="https://youtube.com" target="_blank" rel="noopener" className="flex items-center gap-2 text-red-600 font-bold hover:text-red-700 transition bg-red-50 px-6 py-3 rounded-full text-sm uppercase tracking-widest">
              <Youtube size={20} /> Subscribe
            </a>
          </div>

          {/* Sermon Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              <div className="md:col-span-3 py-20 flex flex-col items-center text-slate-400">
                <Loader2 className="animate-spin mb-4 text-orange-500" size={40} />
                <p className="font-bold tracking-widest uppercase text-sm">Loading Sermons...</p>
              </div>
            ) : sermons.length === 0 ? (
              <div className="md:col-span-3 py-20 text-center bg-slate-50 rounded-3xl border border-slate-100">
                <PlayCircle className="mx-auto text-slate-300 mb-4" size={48} />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No sermons uploaded yet</h3>
                <p className="text-slate-500">Check back soon for the latest Sunday messages.</p>
              </div>
            ) : (
              sermons.map((sermon) => (
                <a 
                  key={sermon.id} 
                  href={sermon.youtube_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="group bg-slate-50 rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 hover:border-orange-200 transition-all duration-300 flex flex-col"
                >
                  <div className="aspect-video bg-slate-900 relative flex items-center justify-center">
                    {/* Dark overlay that fades on hover */}
                    <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition duration-300 z-10"></div>
                    <Youtube size={48} className="text-white/80 group-hover:text-red-600 group-hover:scale-110 transition-all duration-300 z-20 drop-shadow-lg" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                      <Calendar size={14} /> {new Date(sermon.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mb-2 line-clamp-2">{sermon.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mt-auto">{sermon.description}</p>
                  </div>
                </a>
              ))
            )}
          </div>

        </div>
      </section>
      
    </div>
  );
}