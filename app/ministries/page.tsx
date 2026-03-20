"use client";

import React, { useState } from 'react';
import { Heart, Shield, Flame, Award, X, Calendar, Phone, ArrowRight, Star } from 'lucide-react';

export default function MinistriesPage() {
  const [selectedMinistry, setSelectedMinistry] = useState<any>(null);

  const ministries = [
    {
      id: "women",
      name: "Women's Council",
      tagline: "The Bedrock of Faith",
      description: "Dedicated to spiritual empowerment, community outreach, and fostering a deep sense of fellowship among the women of Kathelwa.",
      leader: "Chairlady",
      meeting: "Every 2nd Sunday",
      icon: <Heart size={32} />,
      colorClass: "text-pink-600",
      bgClass: "bg-pink-50",
      btnClass: "hover:bg-pink-600",
      image: "/api/placeholder/800/600"
    },
    {
      id: "elders",
      name: "Church Elders",
      tagline: "Wisdom & Oversight",
      description: "Providing spiritual oversight and wisdom. Our Elders guide the liturgical traditions of the AIPCA and offer pastoral care.",
      leader: "Chairman",
      meeting: "Monthly Summit",
      icon: <Shield size={32} />,
      colorClass: "text-blue-600",
      bgClass: "bg-blue-50",
      btnClass: "hover:bg-blue-600",
      image: "/api/placeholder/800/600"
    },
    {
      id: "youth",
      name: "Youth Ministry",
      tagline: "The Future of Kathelwa",
      description: "A vibrant space for young adults to build lifelong friendships and take active leadership roles within the church.",
      leader: "Youth Coordinator",
      meeting: "Saturdays at 2:00 PM",
      icon: <Flame size={32} />,
      colorClass: "text-orange-600",
      bgClass: "bg-orange-50",
      btnClass: "hover:bg-orange-600",
      image: "/api/placeholder/800/600"
    },
    {
      id: "ama",
      name: "AMA (Men's Association)",
      tagline: "Leading with Integrity",
      description: "Empowering men to be spiritual leaders in their homes and pillars of strength within the St. Mary's community.",
      leader: "AMA Chairman",
      meeting: "Last Sunday",
      icon: <Award size={32} />,
      colorClass: "text-slate-600",
      bgClass: "bg-slate-100",
      btnClass: "hover:bg-slate-800",
      image: "/api/placeholder/800/600"
    }
  ];

  return (
    <div className={`min-h-screen bg-slate-50 pb-20 ${selectedMinistry ? 'overflow-hidden' : ''}`}>
      
      {/* HERO */}
      <header className="bg-slate-900 text-white py-28 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-orange-500/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-orange-500/30">
            <Star size={14} /> Get Involved
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight italic text-white">Ministries.</h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto font-medium">
            Active faith for a growing community. Find your place to serve in Kathelwa.
          </p>
        </div>
      </header>

      {/* ZIG-ZAG SECTIONS */}
      <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-20 space-y-12">
        {ministries.map((m, index) => (
          <section 
            key={m.id} 
            className={`bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100 flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
          >
            <div className={`md:w-1/2 h-72 md:h-auto ${m.bgClass} relative overflow-hidden group flex items-center justify-center`}>
              <img src={m.image} alt={m.name} className="w-full h-full object-cover mix-blend-multiply opacity-60 group-hover:scale-110 transition duration-700" />
              <div className="absolute bg-white p-5 rounded-3xl shadow-xl">
                {React.cloneElement(m.icon as React.ReactElement<any>, { className: m.colorClass })}
              </div>
            </div>

            <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <span className={`${m.colorClass} font-black text-[10px] uppercase tracking-[0.3em] mb-4`}>{m.tagline}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{m.name}</h2>
              <p className="text-slate-500 leading-relaxed mb-10 text-lg">{m.description}</p>
              
              <button 
                onClick={() => setSelectedMinistry(m)}
                className={`w-full md:w-fit bg-slate-900 text-white font-bold py-4 px-10 rounded-2xl ${m.btnClass} transition-all duration-300`}
              >
                View Details
              </button>
            </div>
          </section>
        ))}
      </div>

      {/* MODAL */}
      {selectedMinistry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" onClick={() => setSelectedMinistry(null)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <button type="button" onClick={() => setSelectedMinistry(null)} aria-label="Close details" title="Close details" className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition">
              <span className="sr-only">Close details</span>
              <X size={24} />
            </button>
            <div className="p-12">
              <div className={`${selectedMinistry.bgClass} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                {React.cloneElement(selectedMinistry.icon as React.ReactElement<any>, { className: selectedMinistry.colorClass })}
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">{selectedMinistry.name}</h3>
              <div className="space-y-4 my-8">
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
                  <Calendar className="text-orange-500" size={20} />
                  <p className="font-bold text-slate-700 text-sm">{selectedMinistry.meeting}</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
                  <Phone className="text-blue-500" size={20} />
                  <p className="font-bold text-slate-700 text-sm">{selectedMinistry.leader}</p>
                </div>
              </div>
              <button onClick={() => setSelectedMinistry(null)} className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-orange-500 transition shadow-lg">
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}