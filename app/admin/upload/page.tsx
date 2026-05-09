"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Upload, CheckCircle, AlertCircle, Loader2, Camera } from 'lucide-react';

export default function UploadPortal() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sunday Service');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{type: 'success' | 'error' | null, msg: string}>({type: null, msg: ''});

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setLoading(true);
    setStatus({type: null, msg: ''});

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('church-gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('church-gallery')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('gallery_images')
        .insert([{ title, category, image_url: publicUrl }]);

      if (dbError) throw dbError;

      setStatus({type: 'success', msg: 'Post successful!'});
      setFile(null);
      setTitle('');
    } catch (err: any) {
      setStatus({type: 'error', msg: `Error: ${err.message}`});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-md w-full border border-slate-300">
        <div className="text-center mb-10">
          <div className="bg-orange-500 w-16 h-16 rounded-3xl rotate-12 flex items-center justify-center mx-auto mb-6">
            <Camera className="text-white -rotate-12" size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Portal</h1>
          <p className="text-slate-600 font-bold text-sm uppercase tracking-widest mt-1">St. Mary's Gallery</p>
        </div>

        <form onSubmit={handleUpload} className="space-y-6">
          <div className="relative border-4 border-dashed border-slate-300 rounded-3xl p-12 text-center bg-slate-50 group transition-all hover:border-orange-500">
            <input 
              id="file-input"
              type="file" 
              accept="image/*" 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              aria-label="Choose photo to upload"
              title="Choose photo to upload"
            />
            <Upload className="mx-auto text-slate-500 mb-4" size={40} />
            <p className="text-sm font-black text-slate-900">{file ? file.name : "CHOOSE PHOTO"}</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="text-xs font-black text-slate-900 uppercase ml-1">Photo Title</label>
            <input 
              id="title"
              type="text" 
              placeholder="Enter title..." 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full p-5 bg-white border-2 border-slate-400 rounded-2xl text-slate-900 placeholder:text-slate-500 focus:border-orange-500 outline-none font-bold" 
              required 
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-xs font-black text-slate-900 uppercase ml-1">Category</label>
            <select 
              id="category"
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="w-full p-5 bg-white border-2 border-slate-400 rounded-2xl text-slate-900 font-bold focus:border-orange-500 outline-none appearance-none"
              title="Category"
            >
              <option value="Sunday Service">Sunday Service</option>
              <option value="Choir">Choir</option>
              <option value="Youth">Youth</option>
              <option value="Community">Community</option>
            </select>
          </div>

          <button 
            type="submit"
            disabled={loading} 
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-orange-500 transition-all active:scale-95 disabled:bg-slate-300 shadow-xl"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : "PUBLISH NOW"}
          </button>

          {status.type && (
            <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${
              status.type === 'success' ? 'bg-green-100 text-green-900 border border-green-300' : 'bg-red-100 text-red-900 border border-red-300'
            }`}>
              {status.type === 'success' ? <CheckCircle size={20}/> : <AlertCircle size={20}/>}
              {status.msg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}