"use client";

import React, { useState } from 'react';
import { Church, ArrowLeft, Heart, Smartphone, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function GivePage() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, amount }),
      });

      const data = await response.json();
      
      if (data.ResponseCode === "0") {
        setStatus('success');
      } else {
        console.error("Daraja Error:", data);
        setStatus('error');
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-500/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl z-0"></div>

      {/* Static Navigation Header - Fixed positioning */}
      <div className="w-full max-w-md mb-6 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-500 transition font-bold text-sm uppercase bg-white/60 px-4 py-2 rounded-lg shadow-sm backdrop-blur-sm border border-slate-200">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shadow-inner">
            <Heart size={32} fill="currentColor" />
          </div>
        </div>
        
        <h1 className="text-2xl font-extrabold text-center text-slate-900 tracking-tight mb-2">Partner With Us</h1>
        <p className="text-center text-slate-500 mb-8 text-sm">
          Give securely via M-Pesa to support the ministries of St. Mary's AIPCA Kathelwa.
        </p>

        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center animate-pulse">
            <Smartphone size={40} className="text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-green-900 text-lg mb-1">Check Your Phone</h3>
            <p className="text-green-700 text-sm">Please enter your M-Pesa PIN on your device to complete the offering.</p>
            <button onClick={() => setStatus('idle')} className="mt-6 text-sm font-bold text-green-700 underline">Make another donation</button>
          </div>
        ) : (
          <form onSubmit={handlePayment} className="space-y-6">
            
            {/* Fixed Phone Input Layout */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">M-Pesa Number</label>
              <div className="flex bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 transition shadow-sm">
                <div className="flex items-center justify-center px-4 bg-slate-200/50 border-r border-slate-200 text-slate-600 font-bold">
                  +254
                </div>
                <input 
                  type="tel" 
                  required
                  placeholder="712 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full py-3 px-4 outline-none font-medium bg-transparent text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Amount (Ksh)</label>
              <input 
                type="number" 
                required
                min="1"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none font-medium transition text-lg shadow-sm text-slate-900"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition shadow-lg flex justify-center items-center gap-2 mt-4 disabled:opacity-70"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : 'Donate via M-Pesa'}
            </button>
            
            {status === 'error' && (
              <p className="text-red-500 text-sm text-center font-medium mt-3">Something went wrong. Check your API keys and try again.</p>
            )}
          </form>
        )}
        
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400">
          <Church size={16} /> <span className="text-xs font-semibold tracking-wider uppercase">St. Mary's Daraja Integration</span>
        </div>
      </div>
    </div>
  );
}