"use client";

import React, { useState, useRef } from 'react';
import { Trash2, Lock, ShieldCheck, Church, Loader2, UploadCloud, ImagePlus, UserPen, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// Added is_approved back into the type!
type PrayerRequest = {
  id: number;
  name: string;
  request: string;
  created_at: string;
  prayers_count: number;
  is_approved: boolean; 
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Gallery Upload State
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Leadership Upload State - UPGRADED TO INCLUDE NAME
  const [leaderRole, setLeaderRole] = useState('Chairman');
  const [leaderName, setLeaderName] = useState('');
  const [uploadingLeader, setUploadingLeader] = useState(false);
  const leaderInputRef = useRef<HTMLInputElement>(null);

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

  // ==========================================
  // PRAYER MODERATION LOGIC
  // ==========================================
  // THIS IS THE ADMIN CODE: It must fetch EVERYTHING!
  const fetchPrayers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('prayer_requests')
      .select('*')
      .order('created_at', { ascending: false }); // Notice there is no .eq() here!

    if (error) console.error("Error fetching prayers:", error);
    else if (data) setPrayers(data as PrayerRequest[]);
    setLoading(false);
  };

  const handleApprove = async (id: number) => {
    const { error } = await supabase
      .from('prayer_requests')
      .update({ is_approved: true })
      .eq('id', id);
      
    if (error) {
      alert(`Approval Failed: ${error.message}`);
    } else {
      fetchPrayers();
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this prayer request?")) return;
    
    const { error } = await supabase
      .from('prayer_requests')
      .delete()
      .eq('id', id);
      
    if (error) {
      alert(`Deletion Failed: ${error.message}`);
    } else {
      fetchPrayers();
    }
  }; // FIXED: Added missing semicolon

  // ==========================================
  // GALLERY BULK UPLOADER
  // ==========================================
  const handleGalleryBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploadingGallery(true);
      let successCount = 0;
      let errorCount = 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(`Uploading ${i + 1} of ${files.length}...`);

        const fileExt = file.name.split('.').pop();
        const uniqueFileName = `Community/bulk-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

        const { error } = await supabase.storage.from('church-gallery').upload(uniqueFileName, file, { cacheControl: '3600', upsert: false });

        if (error) {
          console.error(`Error uploading ${file.name}:`, error);
          errorCount++;
        } else {
          successCount++;
        }
      }

      if (errorCount > 0) alert(`Finished. Uploaded ${successCount} photos, but ${errorCount} failed.`);
      else alert(`Success! All ${successCount} photos have been added to the public gallery.`);
      
    } catch (error) {
      alert("An unexpected error occurred during the bulk upload.");
    } finally {
      setUploadingGallery(false);
      setUploadProgress('');
      if (galleryInputRef.current) galleryInputRef.current.value = '';
    }
  };

  // ==========================================
  // LEADERSHIP PROFILE UPLOADER (Wired to Database!)
  // ==========================================
  const handleLeaderUpload = async () => {
    const file = leaderInputRef.current?.files?.[0];
    
    if (!leaderName || !file) {
      alert("Please enter the leader's name AND select a photo first.");
      return;
    }

    try {
      setUploadingLeader(true);
      
      // 1. Upload the image
      const fileExt = file.name.split('.').pop();
      const fileName = `Leadership/${leaderRole.toLowerCase()}-${Date.now()}.${fileExt}`;
      
      const { error: storageError } = await supabase.storage
        .from('church-gallery')
        .upload(fileName, file);

      if (storageError) throw storageError;

      // 2. Get the public URL
      const { data: urlData } = supabase.storage.from('church-gallery').getPublicUrl(fileName);
      const imageUrl = urlData.publicUrl;

      // 3. Save Name and URL to the database table
      const { error: dbError } = await supabase
        .from('leadership')
        .upsert(
          { role: leaderRole, name: leaderName, image_url: imageUrl },
          { onConflict: 'role' }
        );

      if (dbError) throw dbError;

      alert(`${leaderRole} updated successfully! Check the About page.`);
      setLeaderName('');
      if (leaderInputRef.current) leaderInputRef.current.value = '';
      
    } catch (error: any) {
      alert(`An error occurred: ${error.message}`);
    } finally {
      setUploadingLeader(false);
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
              type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter PIN..."
              className="w-full text-center text-2xl tracking-[0.5em] p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none mb-6 font-bold text-slate-900 transition-all" autoFocus
            />
            <button type="submit" className="w-full bg-blue-600 text-white font-black uppercase tracking-widest text-sm py-4 rounded-2xl hover:bg-blue-700 transition shadow-lg">
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
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Master Dashboard</h1>
              <p className="text-sm text-slate-500 font-medium">Managing St. Mary&apos;s AIPCA live data</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
            <Church size={16} /> Back to Website
          </Link>
        </div>

        {/* UPLOAD CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Leadership Uploader */}
          <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6 flex flex-col justify-between">
            <div className="mb-6">
              <h2 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
                <UserPen className="text-blue-600" size={20} /> Leadership Profiles
              </h2>
              <p className="text-sm text-slate-500">Update the official names and photos for the church committee.</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <select 
                aria-label="Leader role"
                value={leaderRole} 
                onChange={(e) => setLeaderRole(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none focus:border-blue-500"
              >
                <option value="Chairman">Chairman</option>
                <option value="Chairlady">Chairlady</option>
                <option value="Secretary">Secretary</option>
                <option value="Treasurer">Treasurer</option>
              </select>

              <input 
                type="text" 
                placeholder="Leader's Full Name" 
                value={leaderName}
                onChange={(e) => setLeaderName(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 outline-none focus:border-blue-500"
              />

              <input type="file" accept="image/*" ref={leaderInputRef} title="Leader photo" aria-label="Leader photo" className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-blue-100 file:text-blue-600 hover:file:bg-blue-200 cursor-pointer" />

              <button 
                onClick={handleLeaderUpload} 
                disabled={uploadingLeader} 
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold tracking-wide transition-all mt-2 ${uploadingLeader ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {uploadingLeader ? <><Loader2 className="animate-spin" size={18} /> Saving...</> : <><UploadCloud size={18} /> Update Profile</>}
              </button>
            </div>
          </div>

          {/* Card 2: Bulk Gallery Uploader */}
          <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6 flex flex-col justify-between">
            <div className="mb-6">
              <h2 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
                <ImagePlus className="text-orange-500" size={20} /> Event Gallery
              </h2>
              <p className="text-sm text-slate-500">Upload multiple photos at once. They will automatically appear in the 'Community' tab of the public gallery.</p>
            </div>
            
            <div className="relative mt-auto">
              <input type="file" accept="image/*" multiple onChange={handleGalleryBulkUpload} ref={galleryInputRef} disabled={uploadingGallery} title="Select gallery photos" aria-label="Select gallery photos" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold tracking-wide transition-all ${uploadingGallery ? 'bg-slate-100 text-slate-400' : 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600'}`}>
                {uploadingGallery ? <><Loader2 className="animate-spin" size={18} /> {uploadProgress}</> : <><UploadCloud size={18} /> Select Bulk Photos</>}
              </div>
            </div>
          </div>

        </div>

        {/* ======================================= */}
        {/* PRAYER MODERATION TABLE */}
        {/* ======================================= */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-900 text-white">
            <h2 className="font-bold text-lg tracking-wide">Prayer Moderation</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-widest font-black">
                  <th className="p-5">Status</th>
                  <th className="p-5">Date</th>
                  <th className="p-5">Author</th>
                  <th className="p-5 w-1/2">Request Text</th>
                  <th className="p-5 text-right">Actions</th>
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
                    <td colSpan={5} className="p-12 text-center text-slate-400 font-medium">No prayers found in the database.</td>
                  </tr>
                ) : (
                  prayers.map((prayer) => (
                    <tr key={prayer.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors group">
                      <td className="p-5">
                        {prayer.is_approved ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Live</span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Pending</span>
                        )}
                      </td>
                      <td className="p-5 text-sm text-slate-500 font-medium whitespace-nowrap">
                        {new Date(prayer.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-5 font-bold text-slate-900 whitespace-nowrap">{prayer.name || "Anonymous"}</td>
                      <td className="p-5 text-slate-600 text-sm leading-relaxed">{prayer.request}</td>
                      <td className="p-5">
                        {/* FIXED: Wrapped buttons in a div to prevent Safari flexbox layout crashes on tables */}
                        <div className="flex justify-end gap-2">
                          {!prayer.is_approved && (
                            <button onClick={() => handleApprove(prayer.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all" title="Approve Prayer">
                              <CheckCircle size={20} />
                            </button>
                          )}
                          <button onClick={() => handleDelete(prayer.id)} className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Delete Prayer">
                            <Trash2 size={20} />
                          </button>
                        </div>
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