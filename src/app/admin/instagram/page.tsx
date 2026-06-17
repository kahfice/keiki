'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, X, Upload, Eye, EyeOff, GripVertical, Camera } from 'lucide-react';
import InstagramIcon from '@/components/ui/InstagramIcon';
import { createClient } from '@/lib/supabase/client';
import type { InstagramShowcase } from '@/types/database';

export default function AdminInstagramPage() {
  const [posts, setPosts] = useState<InstagramShowcase[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<InstagramShowcase | null>(null);
  const [form, setForm] = useState({ thumbnail_url: '', instagram_url: '', display_order: 0, is_active: true });
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    const supabase = createClient();
    const { data } = await supabase.from('instagram_showcase').select('*').order('display_order', { ascending: true });
    if (data) setPosts(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const supabase = createClient();
      let thumbnailUrl = form.thumbnail_url;
      if (imageFile) {
        const ext = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${ext}`;
        await supabase.storage.from('instagram').upload(fileName, imageFile);
        const { data } = supabase.storage.from('instagram').getPublicUrl(fileName);
        thumbnailUrl = data.publicUrl;
      }
      const postData = { ...form, thumbnail_url: thumbnailUrl };
      if (editing) {
        await supabase.from('instagram_showcase').update(postData).eq('id', editing.id);
      } else {
        await supabase.from('instagram_showcase').insert([postData]);
      }
      await fetchPosts();
      resetForm();
    } catch { alert('Gagal menyimpan'); }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Yakin ingin menghapus postingan ini?')) return;
    const supabase = createClient();
    await supabase.from('instagram_showcase').delete().eq('id', id);
    await fetchPosts();
  }

  async function toggleActive(post: InstagramShowcase) {
    const supabase = createClient();
    await supabase.from('instagram_showcase').update({ is_active: !post.is_active }).eq('id', post.id);
    setPosts(posts.map((p) => p.id === post.id ? { ...p, is_active: !p.is_active } : p));
  }

  async function moveOrder(id: string, direction: 'up' | 'down') {
    const supabase = createClient();
    const index = posts.findIndex((p) => p.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === posts.length - 1)) return;
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    const currentOrder = posts[index].display_order;
    const swapOrder = posts[swapIndex].display_order;
    await Promise.all([
      supabase.from('instagram_showcase').update({ display_order: swapOrder }).eq('id', posts[index].id),
      supabase.from('instagram_showcase').update({ display_order: currentOrder }).eq('id', posts[swapIndex].id),
    ]);
    await fetchPosts();
  }

  function resetForm() {
    setForm({ thumbnail_url: '', instagram_url: '', display_order: posts.length, is_active: true });
    setEditing(null);
    setShowForm(false);
    setImageFile(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text" style={{ fontFamily: 'var(--font-heading)' }}>Instagram Showcase</h1>
          <p className="text-text-light text-sm mt-1">Kelola postingan Instagram yang ditampilkan di website</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-colors">
          <Plus size={18} /> Tambah Post
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-border-light p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text" style={{ fontFamily: 'var(--font-heading)' }}>
              {editing ? 'Edit Post' : 'Tambah Post Baru'}
            </h2>
            <button onClick={resetForm} className="p-1 hover:bg-secondary rounded-lg"><X size={18} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Instagram URL *</label>
              <input type="url" required value={form.instagram_url}
                onChange={(e) => setForm({ ...form, instagram_url: e.target.value })}
                className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
                placeholder="https://www.instagram.com/p/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Thumbnail *</label>
              <div className="flex items-center gap-4">
                {(form.thumbnail_url || imageFile) && (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-border-light">
                    <Image src={imageFile ? URL.createObjectURL(imageFile) : form.thumbnail_url} alt="Preview" fill className="object-cover" sizes="80px" />
                  </div>
                )}
                <label className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-border rounded-xl text-sm text-text-light hover:border-accent hover:text-accent cursor-pointer transition-colors">
                  <Upload size={16} /> Upload Thumbnail
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                </label>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-accent" />
                Aktif
              </label>
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={resetForm} className="px-5 py-2.5 border border-border rounded-xl text-sm font-medium text-text-light hover:bg-secondary">Batal</button>
              <button type="submit" disabled={saving} className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark disabled:opacity-50">
                {saving ? 'Menyimpan...' : editing ? 'Update' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="aspect-square bg-white rounded-xl animate-pulse" />)}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-border-light">
          <InstagramIcon size={48} className="mx-auto text-border mb-3" />
          <p className="text-text-light">Belum ada postingan Instagram</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div key={post.id} className={`bg-white rounded-2xl border border-border-light overflow-hidden ${!post.is_active ? 'opacity-50' : ''}`}>
              <div className="relative aspect-square">
                <Image src={post.thumbnail_url} alt="Instagram post" fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button onClick={() => moveOrder(post.id, 'up')} className="p-1 rounded hover:bg-secondary text-text-light" title="Move up">
                    <GripVertical size={14} />
                  </button>
                  <button onClick={() => toggleActive(post)} className={`p-1 rounded transition-colors ${post.is_active ? 'hover:bg-green-50 text-green-500' : 'hover:bg-gray-100 text-gray-400'}`} title={post.is_active ? 'Nonaktifkan' : 'Aktifkan'}>
                    {post.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => { setForm({ thumbnail_url: post.thumbnail_url, instagram_url: post.instagram_url, display_order: post.display_order, is_active: post.is_active }); setEditing(post); setShowForm(true); }}
                    className="p-1.5 rounded hover:bg-blue-50 text-blue-500"><Edit2 size={14} /></button>
                  <button onClick={() => handleDelete(post.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
