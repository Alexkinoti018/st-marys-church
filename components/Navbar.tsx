"use client";

import Link from 'next/link';
// Fixed: Added ArrowRight to the imports!
import { Church, Menu, X, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Ministries', href: '/ministries' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Prayer Wall', href: '/prayer-wall' },
    
  ];

  return (
    <header className="w-full sticky top-0 z-[100] flex flex-col drop-shadow-sm">
      
      {/* 1. THE DARK UTILITY HEADER */}
      <div className="bg-[#1a2233] text-white py-3 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-xs border-b border-slate-700">
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start mb-2 md:mb-0">
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-orange-500 transition"><Facebook size={14} /></Link>
            <Link href="#" className="hover:text-orange-500 transition"><Instagram size={14} /></Link>
            <Link href="#" className="hover:text-orange-500 transition"><Twitter size={14} /></Link>
            <Link href="#" className="hover:text-orange-500 transition"><Youtube size={14} /></Link>
          </div>
          <div className="hidden md:flex items-center gap-5 text-slate-300 font-medium tracking-wide">
            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-orange-500" /> Kathelwa, Meru County</span>
            <span className="flex items-center gap-1.5"><Phone size={12} className="text-orange-500" /> 0111 012200</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6 font-bold text-orange-500 uppercase tracking-widest text-[10px] md:text-xs">
          <Link href="/contact" className="hover:text-white transition">Partner With Us</Link>
          <Link href="/contact" className="hover:text-white transition">Become A Volunteer</Link>
        </div>
      </div>

      {/* 2. THE MAIN WHITE NAVBAR */}
      <nav className="bg-white/95 backdrop-blur-md relative border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-black text-slate-900 tracking-tighter text-xl">
              <Church className="text-orange-500" size={28} />
              ST. MARY'S AIPCA
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-bold text-slate-500 hover:text-orange-500 transition uppercase tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Premium Overlapping GIVE Button */}
            <div className="hidden lg:flex items-center justify-end w-32 h-20 relative">
               <div className="absolute top-2 right-0 w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-50 z-50">
                 <Link href="/give" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-7 rounded-full transition text-sm uppercase tracking-widest shadow-lg shadow-orange-500/30">
                   GIVE
                 </Link>
               </div>
            </div>

            {/* Mobile Toggle */}
            <button className="lg:hidden p-2 text-slate-600 hover:text-orange-500 transition" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* 3. MOBILE DROPDOWN MENU */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 p-6 space-y-4 animate-in slide-in-from-top duration-300 shadow-2xl absolute w-full left-0 z-40">
            <div className="flex flex-col gap-3 pb-6 mb-2 border-b border-slate-100 text-sm text-slate-600 font-medium">
               <span className="flex items-center gap-3"><MapPin size={18} className="text-orange-500" /> Kathelwa, Meru County</span>
               <span className="flex items-center gap-3"><Phone size={18} className="text-orange-500" /> 0111 012200</span>
            </div>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="block text-xl font-black text-slate-900 hover:text-orange-500 transition"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col items-center gap-4">
               <Link href="/give" className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition text-sm uppercase tracking-widest shadow-lg shadow-orange-500/20">
                  GIVE
               </Link>
               <Link href="/contact" className="text-slate-500 font-bold hover:text-orange-500 text-xs flex items-center gap-2 uppercase tracking-widest">
                 Become a Volunteer <ArrowRight size={14}/>
               </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}