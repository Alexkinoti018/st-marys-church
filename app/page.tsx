import React from 'react';
import { Church, MapPin, Clock, Heart, ArrowRight } from 'lucide-react';

// Modern 2026 Server Component
export default function ChurchHome() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* GLASSMORPHIC NAVIGATION */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Church className="text-blue-700" size={32} />
            <span className="text-xl font-bold tracking-tight">ST. MARY'S AIPCA</span>
          </div>
          <div className="hidden md:flex gap-8 font-medium">
            <a href="#about" className="hover:text-blue-700 transition">Our History</a>
            <a href="#services" className="hover:text-blue-700 transition">Services</a>
            <a href="#giving" className="hover:text-blue-700 transition">Tithes</a>
          </div>
          <button className="rounded-full bg-blue-700 px-6 py-2 text-white font-semibold hover:bg-blue-800 transition shadow-lg">
            Join Live
          </button>
        </div>
      </nav>

      {/* HERO SECTION WITH INNOVATIVE LAYOUT */}
      <header className="relative flex h-[90vh] items-center justify-center overflow-hidden bg-slate-900 pt-16">
        <div className="absolute inset-0 opacity-40">
           {/* In production, replace with a high-res video of Kathelwa landscape */}
          <img 
            src="/api/placeholder/1920/1080" 
            alt="Church Interior" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="mb-4 inline-block rounded-full bg-blue-500/20 px-4 py-1 text-sm font-semibold text-blue-300 backdrop-blur-sm">
            Welcome to Kathelwa, Meru
          </span>
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-white md:text-7xl">
            Worshipping God, <br />
            <span className="text-blue-400">Serving Community.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Experience spiritual growth and fellowship at St. Mary’s AIPCA Kathelwa. 
            Join us every Sunday as we celebrate our faith in the heart of Meru.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-bold text-slate-900 hover:bg-slate-100 transition">
              Plan Your Visit <ArrowRight size={20} />
            </button>
            <button className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-md hover:bg-white/20">
              Submit Prayer Request
            </button>
          </div>
        </div>
      </header>

      {/* SERVICE TIMES - BENTO GRID TREND */}
      <section id="services" className="py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold">Weekly Services</h2>
            <p className="text-slate-600 mt-2">Join us at our sanctuary in Kathelwa</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Sunday Service */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 hover:shadow-2xl transition duration-500">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Clock size={24} />
              </div>
              <h3 className="text-2xl font-bold">Sunday Worship</h3>
              <p className="mt-4 text-slate-600 italic">"Main Service & Liturgy"</p>
              <p className="mt-2 font-semibold text-blue-700">09:00 AM — 12:30 PM</p>
            </div>

            {/* Youth Meeting */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 hover:shadow-2xl transition duration-500">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
                <Heart size={24} />
              </div>
              <h3 className="text-2xl font-bold">Youth Fellowship</h3>
              <p className="mt-4 text-slate-600">Empowering the next generation of AIPCA leaders.</p>
              <p className="mt-2 font-semibold text-purple-700">Saturdays 2:00 PM</p>
            </div>

            {/* Location Card */}
            <div className="group rounded-3xl bg-slate-900 p-8 text-white">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                <MapPin size={24} />
              </div>
              <h3 className="text-2xl font-bold">Find Us</h3>
              <p className="mt-4 text-slate-400">Kathelwa Market Road, <br />Meru County, Kenya.</p>
              <button className="mt-6 font-bold text-blue-400 underline decoration-2 underline-offset-4">
                Open in Google Maps
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-slate-500">© 2026 St. Mary’s AIPCA Church, Kathelwa. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}