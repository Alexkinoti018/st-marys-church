"use client";

import React from 'react';
import { Users, Music, Heart, Star, Shield } from 'lucide-react';

export default function AboutPage() {
  const choirs = [
    "Main Church Choir", "Youth Choir", "Women’s Guild Choir", 
    "Men’s Association Choir", "Sunday School Choir", "St. Mary’s Praise Team",
    "Kathelwa Evangelism Choir", "Archdeaconry Choir", "Mothers Union Choir"
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <header className="bg-slate-900 text-white py-24 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-black italic mb-4">Our Story.</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          St. Mary's AIPCA Kathelwa is more than a building; it is a family of believers 
          dedicated to the African Independent Pentecostal Church of Africa traditions.
        </p>
      </header>

      {/* Leadership Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-1 w-20 bg-orange-500"></div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Church Leadership</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { role: "Chairman", icon: <Shield className="text-blue-500" /> },
            { role: "Secretary", icon: <Star className="text-orange-500" /> },
            { role: "Treasurer", icon: <Heart className="text-pink-500" /> }
          ].map((leader, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <div className="mb-4">{leader.icon}</div>
              <h3 className="text-xl font-bold">{leader.role}</h3>
              <p className="text-slate-500 text-sm mt-2">Serving the St. Mary's community with dedication and faith.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Choirs Section */}
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Music className="mx-auto text-orange-500 mb-4" size={40} />
            <h2 className="text-4xl font-black italic">The 9 Choirs of Kathelwa</h2>
            <p className="text-slate-400 mt-4">Lifting our voices in harmony and praise.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {choirs.map((choir, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-orange-500 transition-colors duration-300">
                <p className="font-bold tracking-wide">{choir}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}