"use client";

import React from 'react';
import { Users, Music, Heart, Star, Shield, Church, BookOpen } from 'lucide-react';

export default function AboutPage() {
  const choirs = [
    "Main Church Choir", "Youth Choir", "Women’s Guild Choir", 
    "Men’s Association Choir", "Sunday School Choir", "St. Mary’s Praise Team",
    "Kathelwa Evangelism Choir", "Archdeaconry Choir", "Mothers Union Choir"
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* 1. UPGRADED HERO SECTION (Matches Prayer Wall & Homepage) */}
      <header className="bg-[#1a2233] text-white py-28 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-[#1a2233] to-orange-900/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Church className="mx-auto mb-6 text-orange-500" size={48} />
          <h1 className="text-5xl md:text-7xl font-black italic mb-6 tracking-tight">Our Story.</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            St. Mary's AIPCA Kathelwa is more than a building; it is a vibrant family of believers 
            dedicated to faith, community, and the rich traditions of the African Independent Pentecostal Church of Africa.
          </p>
        </div>
      </header>

      {/* 2. NEW: MISSION & VISION SECTION */}
      <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-20 mb-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-orange-500" size={24} />
              <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Our Mission</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              To preach the gospel of Jesus Christ, nurture believers in their spiritual growth, and serve the Kathelwa community with unwavering love, compassion, and dedication.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-orange-500" size={24} />
              <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Our Vision</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              To be a beacon of hope and a center of spiritual excellence, raising a generation that fiercely loves God and transforms society through Christian values.
            </p>
          </div>
        </div>
      </section>

      {/* 3. UPGRADED LEADERSHIP SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Guided By Faith</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">Church Leadership</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { role: "Chairman", icon: <Shield size={24} />, color: "text-blue-600", bg: "bg-blue-50", border: "hover:border-blue-200" },
            { role: "Secretary", icon: <Users size={24} />, color: "text-orange-600", bg: "bg-orange-50", border: "hover:border-orange-200" },
            { role: "Treasurer", icon: <Heart size={24} />, color: "text-pink-600", bg: "bg-pink-50", border: "hover:border-pink-200" }
          ].map((leader, i) => (
            <div key={i} className={`bg-white p-10 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${leader.border} group text-center`}>
              <div className={`w-16 h-16 mx-auto ${leader.bg} ${leader.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {leader.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">{leader.role}</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Executive Committee</p>
              <p className="text-slate-500 text-sm leading-relaxed">Serving the St. Mary's congregation with dedication, transparency, and unshakeable faith.</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. UPGRADED CHOIRS SECTION */}
      <section className="bg-[#1a2233] text-white py-24 mt-20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Music className="mx-auto text-orange-500 mb-6" size={48} />
            <h2 className="text-4xl md:text-5xl font-black italic mb-4">The 9 Choirs of Kathelwa</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">Lifting our voices in harmony and praise across generations.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {choirs.map((choir, index) => (
              <div 
                key={index} 
                className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-orange-500 hover:border-orange-400 transition-all duration-300 cursor-default flex items-center gap-4 shadow-lg"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Music size={16} className="text-orange-400 group-hover:text-white" />
                </div>
                <p className="font-bold tracking-wide text-slate-200 group-hover:text-white">{choir}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}