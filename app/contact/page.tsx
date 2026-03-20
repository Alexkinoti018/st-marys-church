"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-slate-900 text-white py-24 px-4 text-center relative overflow-hidden">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white">Get in Touch.</h1>
        <p className="text-lg text-slate-400 max-w-xl mx-auto">Have a question or need a prayer? We are here to listen.</p>
      </header>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6"><MapPin size={24} /></div>
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <p className="text-slate-500 text-sm">St. Mary's AIPCA, Kathelwa, Meru County.</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl text-white">
            <div className="w-12 h-12 bg-white/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6"><Clock size={24} /></div>
            <h3 className="text-xl font-bold mb-2 text-white">Service Times</h3>
            <p className="text-slate-400 text-sm">Sun: 9:00 AM | Sat (Youth): 2:00 PM</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 h-full">
            {status === 'success' ? (
              <div className="text-center p-10"><h3 className="text-2xl font-bold text-green-600">Message Received!</h3></div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input required className="w-full bg-slate-50 border-none rounded-2xl p-4" placeholder="Full Name" />
                <input required type="email" className="w-full bg-slate-50 border-none rounded-2xl p-4" placeholder="your@email.com" />
                <textarea required rows={6} className="w-full bg-slate-50 border-none rounded-2xl p-4" placeholder="Message" />
                <button className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-orange-500 transition-all flex items-center justify-center gap-3">
                  {status === 'sending' ? 'SENDING...' : <>SEND MESSAGE <Send size={18} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}