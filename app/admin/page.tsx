"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, Lock, ShieldCheck, Search, Church } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Connect to the live database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [prayers, setPrayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // The secret passcode to unlock the dashboard
  const SECRET_PIN = "kathelwa2026";

  // Handle the login screen
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

  // Fetch all prayers from the database
  const fetchPrayers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('prayers')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setPrayers(data);
    setLoading(false);
  };

  // Delete a specific prayer
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this prayer request?")) return;

    const { error } = await supabase
      .from('prayers')
      .delete()
      .eq('id', id);

    if (!error) {
      // Refresh the list after successful deletion
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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Access</h1>
          <p className="text-slate-500 mb-8">Enter the secure passcode to manage the St. Mary's database.</p>
          
          <form onSubmit={handleLogin}>
            <input 
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter PIN..."
              className="w-full text-center text-2xl tracking-widest p-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none mb-6"
              autoFocus
            />
            <button type="submit" className="w-full bg-blue-700 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: THE ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <ShieldCheck size={32} className="text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Moderation Dashboard</h1>
              <p className="text-sm text-slate-500">Managing St. Mary's AIPCA live data</p>
            </div>
          </div>
          <a href="/" className="flex items-center gap-2 text-sm font-bold text-blue-700 hover:underline">
            <Church size={16} /> Back to Website
          </a>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-900 text-white">
            <h2 className="font-bold text-lg">Active Prayer Requests</h2>
            <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold">{prayers.length} Total</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Author</th>
                  <th className="p-4 font-semibold w-1/2">Request Text</th>
                  <th className="p-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="p-8 text-center text-slate-400">Loading database...</td></tr>
                ) : prayers.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-slate-400">No prayers found in the database.</td></tr>
                ) : (
                  prayers.map((prayer) => (
                    <tr key={prayer.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="p-4 text-sm text-slate-500">
                        {new Date(prayer.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 font-medium text-slate-900">
                        {prayer.author_name}
                      </td>
                      <td className="p-4 text-slate-600">
                        {prayer.request_text}
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleDelete(prayer.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
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