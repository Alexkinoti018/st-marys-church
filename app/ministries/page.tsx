"use client";

import React from 'react';
import { Users, HeartHandshake, Flame, Baby, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MinistriesPage() {
  const ministries = [
    {
      title: "Women's Guild",
      description: "A pillar of strength in the church, dedicated to prayer, community service, and mentoring younger women in faith and life.",
      icon: <HeartHandshake size={32} />,
      color: "text-pink-600",
      bg: "bg-pink-50",
      border: "group-hover:border-pink-200"
    },
    {
      title: "Men's Association",
      description: "Empowering men to be godly leaders in their homes and community through fellowship, mentorship, and economic empowerment.",
      icon: <Users size={32} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "group-hover:border-blue-200"
    },
    {
      title: "Youth Ministry",
      description: "A dynamic, energetic space for young adults to grow spiritually, discover their talents, and navigate life with a biblical foundation.",
      icon: <Flame size={32} />,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "group-hover:border-orange-200"
    },
    {
      title: "Sunday School",
      description: "Laying a strong spiritual foundation for our children through engaging Bible stories, songs, and age-appropriate teachings.",
      icon: <Baby size={32} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "group-hover:border-emerald-200"
    },
    {
      title: "Evangelism & Outreach",
      description: "Taking the Gospel beyond the church walls into Kathelwa and beyond, fulfilling the Great Commission with love and action.",
      icon: <BookOpen size={32} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "group-hover:border-purple-200"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      
      {/* HERO SECTION */}
      <header className="bg-[#1a2233] text-white py-28 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#1a2233] to-slate-800"></div>
        <div className="relative z-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Users className="mx-auto mb-6 text-orange-500" size={48} />
          <h1 className="text-5xl md:text-7xl font-black italic mb-6 tracking-tight">Our Ministries.</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            There is a place for everyone at St. Mary's. Find your community, discover your purpose, and serve alongside fellow believers.
          </p>
        </div>
      </header>

      {/* MINISTRIES GRID */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {ministries.map((ministry, i) => (
            <div 
              key={i} 
              className={`group bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${ministry.border} flex flex-col h-full`}
            >
              <div className={`w-16 h-16 rounded-2xl ${ministry.bg} ${ministry.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {ministry.icon}
              </div>
              
              <h2 className="text-2xl font-black text-slate-900 mb-4">{ministry.title}</h2>
              <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                {ministry.description}
              </p>
              
              <div className="pt-6 border-t border-slate-100 mt-auto">
                <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-orange-500 transition-colors">
                  Learn More <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}

          {/* JOIN CALL TO ACTION CARD */}
          <div className="group bg-orange-500 rounded-[2rem] p-8 shadow-xl shadow-orange-500/20 border border-orange-400 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full text-white">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
              <HeartHandshake size={32} />
            </div>
            <h2 className="text-2xl font-black mb-4">Get Involved</h2>
            <p className="text-orange-100 leading-relaxed mb-8 flex-grow">
              We are always looking for passionate individuals to serve. Speak to the church leadership this Sunday to find where your talents can best be used!
            </p>
            <div className="pt-6 border-t border-white/20 mt-auto">
              <Link href="/give" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-orange-200 transition-colors">
                Support our work <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>
      
    </div>
  );
}