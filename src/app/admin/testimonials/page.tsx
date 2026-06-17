'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Upload, MessageSquare } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Testimonial } from '@/types/database';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ name: '', review: '', photo: '' });
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => { fetchTestimonials(); }, []);

  async function fetchTestimonials() {
    const supabase = createClient();
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (data) setTestimonials(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const supabase = createClient();
      let photoUrl = form.photo;
      if (imageFile) {
        const ext = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${ext}`;
        await supabase.storage.from('testimonials').upload(fileName, imageFile);
        const { data } = supabase.storage.from('testimonials').getPublicUrl(fileName);
        photoUrl = data.publicUrl;
      }
      const testimonialData = { name: form.name, review: form.review, photo: photoUrl };
      if (editing) {
        await supabase.from('testimonials').update(testimonialData).eq('id', editing.id);
      } else {
        await supabase.from('testimonials').insert([testimonialData]);
      }
      await fetchTestimonials();
      resetForm();
    } catch { alert('Gagal menyimpan testimoni'); }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Yakin ingin menghapus testimoni ini?')) return;
    const supabase = createClient();
    await supabase.from('testimonials').delete().eq('id', id);
    await fetchTestimonials();
  }

  function resetForm() {
    setForm({ name: '', review: '', photo: '' });
    setEditing(null);
    setShowForm(false);
    setImageFile(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text" style={{ fontFamily: 'var(--font-heading)' }}>Testimoni</h1>
          <p className="text-text-light text-sm mt-1">Kelola ulasan pelanggan</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-colors"
        >
          <Plus size={18} /> Tambah Testimoni
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-border-light p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text" style={{ fontFamily: 'var(--font-heading)' }}>
              {editing ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
            </h2>
            <button onClick={resetForm} className="p-1 hover:bg-secondary rounded-lg"><X size={18} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Nama Pelanggan *</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Ulasan *</label>
              <textarea required rows={4} value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })}
                className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Foto Pelanggan</label>
              <label className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-border rounded-xl text-sm text-text-light hover:border-accent hover:text-accent cursor-pointer transition-colors w-fit">
                <Upload size={16} /> {imageFile ? imageFile.name : 'Upload Foto'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
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
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-white rounded-xl animate-pulse" />)}</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-border-light">
          <MessageSquare size={48} className="mx-auto text-border mb-3" />
          <p className="text-text-light">Belum ada testimoni</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl border border-border-light p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-text text-sm">{t.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => { setForm({ name: t.name, review: t.review, photo: t.photo || '' }); setEditing(t); setShowForm(true); }}
                    className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Edit2 size={14} /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
              <p className="text-text-light text-sm line-clamp-3">&ldquo;{t.review}&rdquo;</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
