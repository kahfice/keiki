'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, X, Upload, Package } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { CATEGORIES } from '@/lib/constants';
import type { Product } from '@/types/database';

const emptyProduct = {
  name: '',
  category: 'Bread' as string,
  price: 0,
  description: '',
  image_url: '',
  badge: null as string | null,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const supabase = createClient();
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  }

  async function uploadImage(file: File): Promise<string> {
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage
      .from('products')
      .upload(fileName, file);
    if (error) throw error;
    const { data } = supabase.storage.from('products').getPublicUrl(fileName);
    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const supabase = createClient();
      let imageUrl = form.image_url;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const productData = {
        ...form,
        image_url: imageUrl,
        badge: form.badge || null,
      };

      if (editing) {
        await supabase
          .from('products')
          .update(productData)
          .eq('id', editing.id);
      } else {
        await supabase.from('products').insert([productData]);
      }

      await fetchProducts();
      resetForm();
    } catch {
      alert('Gagal menyimpan produk');
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    const supabase = createClient();
    await supabase.from('products').delete().eq('id', id);
    await fetchProducts();
  }

  function resetForm() {
    setForm(emptyProduct);
    setEditing(null);
    setShowForm(false);
    setImageFile(null);
  }

  function openEdit(product: Product) {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description || '',
      image_url: product.image_url || '',
      badge: product.badge,
    });
    setEditing(product);
    setShowForm(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text" style={{ fontFamily: 'var(--font-heading)' }}>
            Produk
          </h1>
          <p className="text-text-light text-sm mt-1">Kelola produk Keiki Bakery</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-colors"
        >
          <Plus size={18} />
          Tambah Produk
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-border-light p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text" style={{ fontFamily: 'var(--font-heading)' }}>
              {editing ? 'Edit Produk' : 'Tambah Produk Baru'}
            </h2>
            <button onClick={resetForm} className="p-1 hover:bg-secondary rounded-lg transition-colors">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Nama Produk *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Kategori *</label>
              <select
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Harga (Rp) *</label>
              <input
                type="number"
                required
                min={0}
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Badge</label>
              <select
                value={form.badge || ''}
                onChange={(e) => setForm({ ...form, badge: e.target.value || null })}
                className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
              >
                <option value="">Tanpa Badge</option>
                <option value="Best Seller">Best Seller</option>
                <option value="New Product">New Product</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-text mb-1">Deskripsi</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 resize-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-text mb-1">Foto Produk</label>
              <div className="flex items-center gap-4">
                {(form.image_url || imageFile) && (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-border-light">
                    <Image
                      src={imageFile ? URL.createObjectURL(imageFile) : form.image_url}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                )}
                <label className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-border rounded-xl text-sm text-text-light hover:border-accent hover:text-accent cursor-pointer transition-colors">
                  <Upload size={16} />
                  Upload Foto
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>

            <div className="sm:col-span-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 border border-border rounded-xl text-sm font-medium text-text-light hover:bg-secondary transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-colors disabled:opacity-50"
              >
                {saving ? 'Menyimpan...' : editing ? 'Update Produk' : 'Simpan Produk'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-white rounded-xl animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-border-light">
          <Package size={48} className="mx-auto text-border mb-3" />
          <p className="text-text-light">Belum ada produk</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border-light overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light bg-secondary/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-light uppercase">Produk</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-light uppercase">Kategori</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-light uppercase">Harga</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-light uppercase">Badge</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-text-light uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border-light last:border-0 hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-secondary">
                          {product.image_url && (
                            <Image src={product.image_url} alt={product.name} fill className="object-cover" sizes="40px" />
                          )}
                        </div>
                        <span className="font-medium text-text text-sm">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-text">
                      Rp {product.price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3">
                      {product.badge ? (
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          product.badge === 'Best Seller' ? 'bg-accent/10 text-accent' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {product.badge}
                        </span>
                      ) : (
                        <span className="text-text-light text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
