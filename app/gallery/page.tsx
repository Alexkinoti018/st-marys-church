"use client";

import React, { useState } from 'react';
import { Camera, X, LayoutGrid, Church, Flame, Users, Music } from 'lucide-react';

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const categories = [
    { name: 'All', icon: <LayoutGrid size={18} /> },
    { name: 'Sunday Service', icon: <Church size={18} /> },
    { name: 'Youth', icon: <Flame size={18} /> },
    { name: 'Community', icon: <Users size={18} /> },
    { name: 'Choirs', icon: <Music size={18} /> },
  ];
  
  const photos = [
    { id: 1, category: 'Sunday Service', title: 'Main Service Worship', src: 'https://picsum.photos/seed/church1/800/600' },
    { id: 2, category: 'Youth', title: 'Youth Fun Day', src: 'https://picsum.photos/seed/church2/800/600' },
    { id: 3, category: 'Community', title: 'Kathelwa Outreach', src: 'https://picsum.photos/seed/church3/800/600' },
    { id: 4, category: 'Choirs', title: 'Choir Competitions', src: 'https://picsum.photos/seed/church4/800/600' },
    { id: 5, category: 'Youth', title: 'Bible Study', src: 'https://picsum.photos/seed/church5/800/600' },
    { id: 6, category: 'Community', title: 'Food Drive', src: 'https://picsum.photos/seed/church6/800/600' },
  ];

  const filteredPhotos = filter === 'All' ? photos : photos.filter(p => p.category === filter);

  return (
    <div className={`min-h-screen bg-slate-50 pb-20 ${selectedImage ? 'overflow-hidden' : ''}`}>
      
      {/* HERO SECTION */}
      <header className="bg-slate-900 text-white pt-24 pb-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-blue-900/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Camera className="mx-auto mb-6 text-orange-500" size={48} />
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight italic text-white">Church Life.</h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">Capturing moments of faith, joy, and community at St. Mary's AIPCA Kathelwa.</p>
        </div>
      </header>

      {/* FILTER BAR */}
      <section className="sticky top-20 z-40 px-4 -mt-10 flex justify-center">
        <div className="bg-white/80 backdrop-blur-xl p-2 rounded-full shadow-2xl shadow-slate-200 border border-slate-100 max-w-full overflow-hidden">
          <div className="flex items-center gap-1 overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat) => {
              const isActive = filter === cat.name;
              return (
                <button 
                  key={cat.name} 
                  onClick={() => setFilter(cat.name)} 
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-wide whitespace-nowrap transition-all duration-300 ${
                    isActive 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className={`${isActive ? 'text-orange-500' : 'text-slate-400'} transition-colors duration-300`}>
                    {cat.icon}
                  </span>
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY - NOW USING FLEXBOX FOR CENTERING */}
      <section className="max-w-7xl mx-auto px-4 py-16 flex flex-wrap justify-center gap-8 relative z-20">
        {filteredPhotos.map((photo) => (
          <div 
            key={photo.id} 
            onClick={() => setSelectedImage(photo)} 
            // Width is calculated to fit 1 on mobile, 2 on tablets, and 3 on desktops, while keeping gap spacing
            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] group relative bg-slate-200 rounded-[2.5rem] overflow-hidden cursor-pointer aspect-[4/3] shadow-xl border border-white"
          >
            <img src={photo.src} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 flex flex-col justify-end">
              <span className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                {categories.find(c => c.name === photo.category)?.icon} {photo.category}
              </span>
              <h3 className="text-white text-2xl font-bold">{photo.title}</h3>
            </div>
          </div>
        ))}
        
        {/* Empty State Fallback */}
        {filteredPhotos.length === 0 && (
          <div className="w-full text-center py-20 text-slate-400 font-bold tracking-widest uppercase">
            No photos found in this category.
          </div>
        )}
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl" onClick={() => setSelectedImage(null)}></div>
          <div className="relative w-full max-w-5xl animate-in zoom-in-95 duration-300">
            <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white flex items-center gap-2 font-bold uppercase text-xs hover:text-orange-500 transition-colors">
              CLOSE <X size={24} />
            </button>
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl">
              <img src={selectedImage.src} alt={selectedImage.title} className="w-full h-auto max-h-[75vh] object-cover" />
              <div className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <span className="text-orange-500 text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-2">
                    {categories.find(c => c.name === selectedImage.category)?.icon} {selectedImage.category}
                  </span>
                  <h2 className="text-3xl font-black text-slate-900">{selectedImage.title}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}