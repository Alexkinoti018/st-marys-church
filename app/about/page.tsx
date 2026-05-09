"use client";

import React, { useState, useEffect } from 'react';
import { Church, BookOpen, Star, Music, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AboutPage() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const choirs = [
    "Main Church Choir", "Youth Choir", "Mother Council", 
    "Church Elders", "Sunday School Choir", "St. Mary’s Praise Team",
    "Kathelwa Evangelism Choir", "Archdeaconry Choir", "Mothers Union Choir"
  ];

  useEffect(() => {
    async function fetchStaff() {
      try {
        setIsLoading(true);
        // Using church-staff to match your preferred naming
        const { data, error } = await supabase
          .from('church-staff')
          .select('*')
          .order('priority', { ascending: true });

        if (error) throw error;
        setLeaders(data || []);
      } catch (err) {
        console.error("Error fetching staff:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStaff();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* HERO SECTION */}
      <header className="bg-[#1a2233] text-white py-28 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-[#1a2233] to-orange-900/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Church className="mx-auto mb-6 text-orange-500" size={48} />
          <h1 className="text-5xl md:text-7xl font-black italic mb-6 tracking-tight">Our Story.</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            St. Mary's AIPCA Kathelwa is a vibrant family of believers dedicated to faith, 
            community, and the rich traditions of the AIPCA.
          </p>
        </div>
      </header>

      {/* MISSION & VISION */}
      <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-20 mb-24">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <BookOpen className="text-orange-600 mb-6" size={32} />
            <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              To preach the gospel of Jesus Christ, nurture believers in spiritual growth, 
              and serve the Kathelwa community with unwavering love.
            </p>
          </div>
          <div>
            <Star className="text-blue-600 mb-6" size={32} />
            <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 mb-4">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              To be a beacon of hope and spiritual excellence, raising a generation 
              that fiercely loves God.
            </p>
          </div>
        </div>
      </section>

      {/* LEADERSHIP SECTION - THE IMAGE FIX */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Guided By Faith</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 text-center uppercase">Church Leadership</h2>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-orange-500" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {leaders.map((leader, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border-2 border-transparent shadow-xl transition-all duration-500 hover:-translate-y-3 hover:border-orange-400 text-center">
                
                {/* FIX: Container with background and object-contain */}
                <div className="w-40 h-40 rounded-full mb-6 mx-auto bg-slate-100 border-4 border-slate-50 overflow-hidden shadow-inner flex items-center justify-center">
                  <img 
                    src={leader.image_url || "/placeholder-avatar.png"} 
                    alt={leader.name} 
                    className="w-full h-full object-contain transition-all duration-700" 
                  />
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-1">{leader.name}</h3>
                <p className="text-orange-600 text-xs font-black uppercase tracking-widest mb-4">{leader.role}</p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {leader.bio || "Serving the St. Mary's congregation with dedication and faith."}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CHOIRS */}
      <section className="bg-slate-900 text-white py-28 mt-24 rounded-[4rem] mx-4 shadow-2xl">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="text-left">
              <Music className="text-orange-500 mb-6" size={48} />
              <h2 className="text-4xl md:text-6xl font-black italic">The 9 Choirs</h2>
              <p className="text-slate-400 mt-4 text-xl">Harmony in worship across all generations.</p>
            </div>
            <Link href="/gallery?filter=Choir" className="bg-white/10 hover:bg-orange-600 px-8 py-4 rounded-full transition-all font-bold group flex items-center gap-2">
              View Choir Gallery
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {choirs.map((choir, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:border-orange-500 transition-all group">
                <CheckCircle2 size={20} className="text-orange-500 group-hover:text-white" />
                <p className="font-bold text-slate-200 group-hover:text-white">{choir}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}