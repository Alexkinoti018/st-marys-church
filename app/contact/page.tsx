"use client";

import React, { useState } from 'react';
import { MapPin, Send, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setStatus('sending');

  try {
    const { error } = await supabase
      .from('contact_messages') // This matches the table we just created
      .insert([
        { 
          full_name: formData.name, 
          email: formData.email, 
          message: formData.message 
        }
      ]);

    if (error) throw error;
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
  } catch (error) {
    console.error('Error sending message:', error);
    alert("Something went wrong. Please try again.");
    setStatus('idle');
  }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <header className="bg-slate-900 text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900 to-orange-900/20"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Get in Touch.</h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Have a question or need a prayer? We are here to listen and support you.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">Location</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              St. Mary's AIPCA, Kathelwa,<br />
              Meru County, Kenya.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl text-white transition-transform hover:-translate-y-1">
  <div className="w-12 h-12 bg-white/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
    <Clock size={24} />
  </div>
  <h3 className="text-xl font-bold mb-4 text-white border-b border-white/10 pb-2">Service & Choir Times</h3>
  
  <div className="space-y-4">
    <div>
      <p className="text-orange-400 font-bold text-xs uppercase tracking-widest">Main Service</p>
      <p className="text-slate-100 text-sm">Sun: 9:00 AM — 12:30 PM</p>
    </div>

    <div className="space-y-2">
      <p className="text-orange-400 font-bold text-xs uppercase tracking-widest">Choir Rehearsals (2:00 PM - 5:30 PM)</p>
      <ul className="text-slate-300 text-sm space-y-1 border-l-2 border-orange-500/30 pl-3">
        <li><span className="text-white font-medium">MON:</span> NEEMA CHOIR</li>
        <li><span className="text-white font-medium">TUE:</span> SENIOR & YOUTH CHOIR</li>
        <li><span className="text-white font-medium">THUR:</span> FURAHA & YOUTH CHOIR</li>
        <li><span className="text-white font-medium">FRI:</span> MSINGI CHOIR</li>
        <li><span className="text-white font-medium">SAT:</span> YOUTH CHOIR</li>
      </ul>
    </div>
  </div>
</div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 h-full">
            {status === 'success' ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">Message Received!</h3>
                <p className="text-slate-500">Thank you for reaching out. We will get back to you shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-orange-600 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700 ml-2">Full Name</label>
                  <input 
                    required 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all" 
                    placeholder="Enter your full name" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700 ml-2">Email Address</label>
                  <input 
                    required 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all" 
                    placeholder="example@gmail.com" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700 ml-2">Message</label>
                  <textarea 
                    required 
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all resize-none" 
                    placeholder="How can we help or pray for you?" 
                  />
                </div>

                <button 
                  disabled={status === 'sending'}
                  className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-orange-600 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {status === 'sending' ? (
                    'SENDING...'
                  ) : (
                    <>SEND MESSAGE <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}