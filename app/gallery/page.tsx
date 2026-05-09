"use client";

import React, { useState, useEffect } from 'react';
import { Camera, X, LayoutGrid, Church, Flame, Users, Music, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// 1. Strict TypeScript definition
type GalleryPhoto = {
  id: number;
  category: string;
  title: string;
  src: string;
};

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryPhoto | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Note: 'Choir' here matches your SQL/Upload form exactly
  const categories = [
    { name: 'All', icon: <LayoutGrid size={18} /> },
    { name: 'Sunday Service', icon: <Church size={18} /> },
    { name: 'Youth', icon: <Flame size={18} /> },
    { name: 'Community', icon: <Users size={18} /> },
    { name: 'Choir', icon: <Music size={18} /> }, 
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      
      // 2. Optimized: Fetch directly from your SQL table 'gallery_images'
      // This is much faster than listing files from storage folders
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedPhotos: GalleryPhoto[] = data.map((img) => ({
          id: img.id,
          category: img.category,
          title: img.title, // Uses the real title saved in SQL
          src: img.image_url,
        }));
        setPhotos(formattedPhotos);
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPhotos = filter === 'All' ? photos : photos.filter(p => p.category === filter);

  return (
    <div className={`min-h-screen bg-slate-50 pb-20 ${selectedImage ? 'overflow-hidden' : ''}`}>
      
      {/* HERO SECTION */}
      <header className="bg-slate-900 text-white pt-24 pb-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-blue-900/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Camera className="mx-auto mb-6 text-orange-500" size={48} />
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight italic text-white">Church Life.</h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Capturing moments of faith, joy, and community at St. Mary&apos;s AIPCA Kathelwa.
          </p>
        </div>
      </header>

      {/* FILTER BAR */}
      <section className="sticky top-20 z-40 px-4 -mt-10 flex justify-center">
        <div className="bg-white/80 backdrop-blur-xl p-2 rounded-full shadow-2xl border border-slate-100 max-w-full overflow-hidden">
          <div className="flex items-center gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => {
              const isActive = filter === cat.name;
              return (
                <button 
                  key={cat.name} 
                  onClick={() => setFilter(cat.name)} 
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                    isActive 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-transparent text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <span className={isActive ? 'text-orange-500' : 'text-slate-400'}>
                    {cat.icon}
                  </span>
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="max-w-7xl mx-auto px-4 py-16 flex flex-wrap justify-center gap-8 relative z-20">
        
        {isLoading && (
          <div className="w-full flex flex-col items-center justify-center py-20 text-slate-400">
             <Loader2 className="animate-spin mb-4 text-orange-500" size={40} />
             <p className="font-bold tracking-widest uppercase text-sm">Loading Gallery...</p>
          </div>
        )}

        {!isLoading && filteredPhotos.map((photo) => (
          <div 
            key={photo.id} 
            onClick={() => setSelectedImage(photo)} 
            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] group relative bg-slate-900 rounded-[2.5rem] overflow-hidden cursor-pointer aspect-[4/3] shadow-xl border border-white"
          >
            <img 
              src={photo.src} 
              alt={photo.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 flex flex-col justify-end">
              <span className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                {categories.find(c => c.name === photo.category)?.icon} {photo.category}
              </span>
              <h3 className="text-white text-2xl font-bold capitalize">{photo.title}</h3>
            </div>
          </div>
        ))}
        
        {!isLoading && filteredPhotos.length === 0 && (
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
            <div className="bg-slate-950 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-800">
              <img src={selectedImage.src} alt={selectedImage.title} className="w-full h-auto max-h-[75vh] object-contain" />
              <div className="p-8 md:p-10 bg-white">
                <span className="text-orange-500 text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-2">
                  {categories.find(c => c.name === selectedImage.category)?.icon} {selectedImage.category}
                </span>
                <h2 className="text-3xl font-black text-slate-900 capitalize">{selectedImage.title}</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}