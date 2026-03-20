import Link from 'next/link';
import { PlayCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* HERO SECTION - Duplicate menus have been removed! */}
      <header className="relative bg-[#1a2233] text-white pt-40 pb-56 px-4 text-center flex flex-col items-center justify-center overflow-hidden">
        
        {/* Subtle radial gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-[#1a2233]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="text-orange-500 font-black tracking-[0.4em] uppercase text-xs mb-6 block">
            Welcome to Kathelwa
          </span>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight italic text-white">
            Seek Ye First.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Join St. Mary's AIPCA for uplifting worship, a loving community, and a deeper connection with Christ in Meru County.
          </p>
          
          {/* Reduced Button Overload */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/about" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 px-10 rounded-full transition-all duration-300 shadow-xl shadow-orange-500/30 text-sm uppercase tracking-widest flex items-center gap-2"
            >
              Plan Your Visit <ArrowRight size={16}/>
            </Link>
            
            <Link 
              href="/gallery" 
              className="bg-white/10 hover:bg-white text-white hover:text-slate-950 font-bold py-5 px-10 rounded-full transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 border border-white/20 text-sm uppercase tracking-widest"
            >
              <PlayCircle size={20} /> Watch Live
            </Link>
          </div>
        </div>
      </header>

      {/* PASTE YOUR SERMONS SECTION BELOW THIS LINE */}
      {/* <section className="py-20 px-4 bg-white rounded-t-[3rem] -mt-10 relative z-10"> ... </section> */}
      
    </div>
  );
}