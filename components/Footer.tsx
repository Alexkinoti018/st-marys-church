import Link from 'next/link';
import { Church, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ChevronRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Ministries', href: '/ministries' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Prayer Wall', href: '/prayer-wall' },
  ];

  return (
    <footer className="bg-[#1a2233] text-slate-300 py-16 px-4 md:px-8 border-t-4 border-orange-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* 1. Brand Section */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 font-black text-white tracking-tighter text-2xl">
            <Church className="text-orange-500" size={32} />
            ST. MARY&apos;S
          </Link>
          <p className="text-sm leading-relaxed font-medium text-slate-400">
            Worshipping God and serving the community in Meru County. Join us as we seek Him first and grow together in faith and love.
          </p>
          <div className="flex items-center gap-4 pt-2">
            {/* STRICT OPTIMIZATION: External links use standard <a> tags instead of Next.js <Link> */}
            <a href="https://web.facebook.com/StMarysAipcaChurchKathelwa" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-all" aria-label="St. Mary's Facebook (opens in new tab)" title="St. Mary's Facebook (opens in new tab)"><Facebook size={18} /></a>
            <a href="https://www.instagram.com/stmarysaipcakathelwa/" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-all" aria-label="St. Mary's Instagram (opens in new tab)" title="St. Mary's Instagram (opens in new tab)"><Instagram size={18} /></a>
            <a href="https://www.youtube.com/@StMarysAipcaChurchKathelwa" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-all" aria-label="St. Mary's YouTube (opens in new tab)" title="St. Mary's YouTube (opens in new tab)"><Youtube size={18} /></a>
          </div>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h3 className="text-white font-black uppercase tracking-widest mb-6 text-sm">Quick Links</h3>
          <ul className="space-y-4">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="text-sm font-medium hover:text-orange-500 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight size={14} className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Service Times */}
        <div>
          <h3 className="text-white font-black uppercase tracking-widest mb-6 text-sm">Service Times</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400">Main Sunday Service</span>
              <span className="text-white font-bold">9:00 AM</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400">Youth Service (Sat)</span>
              <span className="text-white font-bold">2:00 PM</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400">Mid-Week Prayer (Wed)</span>
              <span className="text-white font-bold">5:00 PM</span>
            </li>
          </ul>
        </div>

        {/* 4. Contact Info */}
        <div>
          <h3 className="text-white font-black uppercase tracking-widest mb-6 text-sm">Contact Us</h3>
          <ul className="space-y-5 text-sm font-medium">
            <li className="flex items-start gap-3">
              <MapPin className="text-orange-500 shrink-0 mt-0.5" size={18} />
              <span>St. Mary&apos;s AIPCA Kathelwa<br />Meru County, Kenya</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-orange-500 shrink-0" size={18} />
              <span>+254724236350</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-orange-500 shrink-0" size={18} />
              <span>info@stmarysaipca.co.ke</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
        {/* STRICT OPTIMIZATION: suppressHydrationWarning added for the Date function */}
        <p suppressHydrationWarning>&copy; {currentYear} St. Mary&apos;s AIPCA Kathelwa. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}