"use client";

import React, { useState } from 'react';
import { Trash2, Lock, ShieldCheck, Church, Loader2 } from 'lucide-react';
import Link from 'next/link';
// Import our single, secure Supabase connection
import { supabase } from '@/lib/supabase';

// Explicit TypeScript definition prevents Vercel build errors
type PrayerRequest = {
  id: number;
  name: string;
  request: string;
  created_at: string;
  prayers_count: number;
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // The secret passcode to unlock the dashboard
  const SECRET_PIN = "kathelwa2026";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === SECRET_PIN) {
      setIsAuthenticated(true);
      fetchPrayers();
    } else {
      alert("Incorrect passcode.");
      setPasscode('');
    }
  };

  const fetchPrayers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('prayer_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching prayers:", error);
    } else if (data) {
      // Cast the data to our strict type to keep Vercel happy
      setPrayers(data as PrayerRequest[]);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this prayer request?")) return;

    const { error } = await supabase
      .from('prayer_requests')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchPrayers();
    } else {
      console.error("Error deleting:", error);
      alert("Failed to delete the prayer.");
    }
  };

  // ==========================================
  // VIEW 1: THE LOCK SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center border border-slate-100">
          <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Admin Access</h1>
          <p className="text-slate-500 mb-8 text-sm">Enter the secure passcode to manage the St. Mary&apos;s live database.</p>
          
          <form onSubmit={handleLogin}>
            <input 
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter PIN..."
              className="w-full text-center text-2xl tracking-[0.5em] p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none mb-6 font-bold text-slate-900 transition-all"
              autoFocus
            />
            <button type="submit" className="w-full bg-blue-600 text-white font-black uppercase tracking-widest text-sm py-4 rounded-2xl hover:bg-blue-700 transition shadow-lg">
              Unlock Dashboard
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
             <Link href="/" className="text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center justify-center gap-2 transition-colors">
               <Church size={16} /> Return to Website
             </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: THE ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Moderation Dashboard</h1>
              <p className="text-sm text-slate-500 font-medium">Managing St. Mary&apos;s AIPCA live data</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
            <Church size={16} /> Back to Website
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-900 text-white">
            <h2 className="font-bold text-lg tracking-wide">Active Prayer Requests</h2>
            <span className="bg-blue-600 px-4 py-1.5 rounded-full text-xs font-black tracking-widest">{prayers.length} TOTAL</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-widest font-black">
                  <th className="p-5">Date</th>
                  <th className="p-5">Author</th>
                  <th className="p-5 w-1/2">Request Text</th>
                  <th className="p-5 text-center">Prayers</th>
                  <th className="p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-400">
                      <Loader2 className="animate-spin mx-auto mb-2 text-blue-500" size={32} />
                      <p className="font-bold tracking-widest uppercase text-xs">Loading database...</p>
                    </td>
                  </tr>
                ) : prayers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-400 font-medium">
                      No prayers found in the database.
                    </td>
                  </tr>
                ) : (
                  prayers.map((prayer) => (
                    <tr key={prayer.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors group">
                      <td className="p-5 text-sm text-slate-500 font-medium whitespace-nowrap">
                        {new Date(prayer.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="p-5 font-bold text-slate-900 whitespace-nowrap">
                        {prayer.name || "Anonymous"} 
                      </td>
                      <td className="p-5 text-slate-600 text-sm leading-relaxed">
                        {prayer.request} 
                      </td>
                      <td className="p-5 text-center font-bold text-slate-900">
                        {prayer.prayers_count || 0} 
                      </td>
                      <td className="p-5 text-right">
                        <button 
                          onClick={() => handleDelete(prayer.id)}
                          className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Delete Prayer"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}