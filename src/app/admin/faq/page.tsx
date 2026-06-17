'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, HelpCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { FAQ } from '@/types/database';

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [form, setForm] = useState({ question: '', answer: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchFaqs(); }, []);

  async function fetchFaqs() {
    const supabase = createClient();
    const { data } = await supabase.from('faq').select('*').order('created_at', { ascending: true });
    if (data) setFaqs(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    if (editing) {
      await supabase.from('faq').update(form).eq('id', editing.id);
    } else {
      await supabase.from('faq').insert([form]);
    }
    await fetchFaqs();
    resetForm();
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Yakin ingin menghapus FAQ ini?')) return;
    const supabase = createClient();
    await supabase.from('faq').delete().eq('id', id);
    await fetchFaqs();
  }

  function resetForm() {
    setForm({ question: '', answer: '' });
    setEditing(null);
    setShowForm(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text" style={{ fontFamily: 'var(--font-heading)' }}>FAQ</h1>
          <p className="text-text-light text-sm mt-1">Kelola pertanyaan yang sering diajukan</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-colors"
        >
          <Plus size={18} /> Tambah FAQ
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-border-light p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text" style={{ fontFamily: 'var(--font-heading)' }}>
              {editing ? 'Edit FAQ' : 'Tambah FAQ Baru'}
            </h2>
            <button onClick={resetForm} className="p-1 hover:bg-secondary rounded-lg"><X size={18} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Pertanyaan *</label>
              <input
                type="text" required value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Jawaban *</label>
              <textarea
                required rows={4} value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 resize-none"
              />
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
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-white rounded-xl animate-pulse" />)}</div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-border-light">
          <HelpCircle size={48} className="mx-auto text-border mb-3" />
          <p className="text-text-light">Belum ada FAQ</p>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-2xl border border-border-light p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-text text-sm mb-1">{faq.question}</h3>
                  <p className="text-text-light text-sm">{faq.answer}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => { setForm({ question: faq.question, answer: faq.answer }); setEditing(faq); setShowForm(true); }}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="Edit"
                  ><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(faq.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Hapus">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
