'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Lock, Trash2, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { verifyAdminPin } from '../events/actions'; 

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface GalleryImage {
  id: number;
  title: string;
  image_url: string;
  category: string;
}

export default function AdminGalleryPage() {
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setImages(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      fetchImages();
    }
  }, [isAuthorized, fetchImages]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    const isValid = await verifyAdminPin(pin);
    if (isValid) {
      setIsAuthorized(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPin('');
    }
    setIsVerifying(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select an image to upload.');
      return;
    }
    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('church-gallery').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('church-gallery').getPublicUrl(filePath);
      const imageUrl = publicUrlData.publicUrl;

      const { error: dbError } = await supabase.from('gallery_images').insert([{ title, image_url: imageUrl, category }]);
      if (dbError) throw dbError;

      setTitle('');
      setCategory('General');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      fetchImages();

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image. Check Supabase Storage policies.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (image: GalleryImage) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    setIsLoading(true);
    try {
      const urlParts = image.image_url.split('/');
      const filePath = `uploads/${urlParts[urlParts.length - 1]}`;

      await supabase.storage.from('church-gallery').remove([filePath]);
      const { error } = await supabase.from('gallery_images').delete().eq('id', image.id);
      if (error) throw error;

      setImages(images.filter((img) => img.id !== image.id));
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete image.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-500 text-sm mt-1">Photo Gallery Moderation</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                id="admin-pin-gallery"
                title="Admin PIN"
                aria-label="Admin PIN"
                type="password"
                placeholder="Enter Admin PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
              {pinError && <p className="text-red-500 text-sm mt-2">Incorrect PIN. Please try again.</p>}
            </div>
            <button type="submit" disabled={isVerifying} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2 disabled:opacity-50">
              {isVerifying && <Loader2 className="w-4 h-4 animate-spin" />}
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
        <button onClick={() => setIsAuthorized(false)} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
          Lock Dashboard
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            Upload Photo
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label htmlFor="image-title" className="block text-sm font-medium text-gray-700 mb-1">Photo Title</label>
              <input id="image-title" type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. Youth Choir Sunday" />
            </div>
            <div>
              <label htmlFor="image-category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select id="image-category" aria-label="Image Category" title="Image Category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="General">General</option>
                <option value="Sunday Service">Sunday Service</option>
                <option value="Youth">Youth</option>
                <option value="Choir">Choir</option>
                <option value="Events">Special Events</option>
              </select>
            </div>
            <div>
              <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">Select Image</label>
              <input 
                id="image-upload"
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                title="Upload Image File"
                aria-label="Upload Image File"
                required 
                onChange={(e) => setFile(e.target.files?.[0] || null)} 
                className="w-full p-2 border border-gray-300 rounded-md text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
              />
            </div>
            <button type="submit" disabled={isUploading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center gap-2">
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Current Gallery</h2>
          {isLoading && images.length === 0 ? (
            <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /></div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <div key={image.id} className="group relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <img src={image.image_url} alt={image.title} className="w-full h-40 object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                    <div>
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">{image.category}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-white text-sm font-medium truncate pr-2">{image.title}</p>
                      <button aria-label={`Delete image: ${image.title}`} onClick={() => handleDelete(image)} className="text-red-400 hover:text-red-300 bg-white/10 hover:bg-white/20 p-1.5 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {images.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <ImageIcon className="w-12 h-12 mb-3 text-gray-400" />
                  <p>No photos uploaded yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}