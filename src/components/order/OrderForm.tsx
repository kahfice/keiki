'use client';

import { useState, useEffect } from 'react';
import { Send, CheckCircle, MessageCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { LINKS } from '@/lib/constants';
import type { Product } from '@/types/database';

export default function OrderForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    product_name: '',
    quantity: 1,
    note: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient();
      const { data } = await supabase
        .from('products')
        .select('id, name')
        .order('name');
      if (data) setProducts(data as Product[]);
    }
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: insertError } = await supabase
      .from('orders')
      .insert([formData]);

    if (insertError) {
      setError('Gagal mengirim pesanan. Silakan coba lagi.');
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const getWhatsAppLink = () => {
    const message = `Halo Keiki! Saya ingin memesan:\n\nNama: ${formData.customer_name}\nProduk: ${formData.product_name}\nJumlah: ${formData.quantity}\n${formData.note ? `Catatan: ${formData.note}` : ''}`;
    return `${LINKS.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle size={40} className="text-success" />
        </div>
        <h3
          className="text-2xl font-bold text-text mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Pesanan Berhasil Dikirim!
        </h3>
        <p className="text-text-light mb-8 max-w-md mx-auto">
          Terima kasih telah memesan di Keiki. Tim kami akan segera menghubungi Anda untuk konfirmasi.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all duration-300 hover:shadow-lg"
          >
            <MessageCircle size={20} />
            Lanjutkan via WhatsApp
          </a>
          <button
            onClick={() => {
              setSuccess(false);
              setFormData({
                customer_name: '',
                phone: '',
                product_name: '',
                quantity: 1,
                note: '',
              });
            }}
            className="px-8 py-3.5 bg-white text-text font-semibold rounded-full border border-border hover:border-accent transition-all duration-300"
          >
            Pesan Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
      {error && (
        <div className="p-4 bg-error/10 text-error rounded-xl text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="customer_name" className="block text-sm font-medium text-text mb-2">
          Nama Lengkap *
        </label>
        <input
          type="text"
          id="customer_name"
          required
          value={formData.customer_name}
          onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-text placeholder:text-text-light/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
          placeholder="Masukkan nama lengkap"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
          Nomor HP / WhatsApp *
        </label>
        <input
          type="tel"
          id="phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-text placeholder:text-text-light/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
          placeholder="08xxxxxxxxxx"
        />
      </div>

      <div>
        <label htmlFor="product_name" className="block text-sm font-medium text-text mb-2">
          Produk *
        </label>
        <select
          id="product_name"
          required
          value={formData.product_name}
          onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-text focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        >
          <option value="">Pilih produk</option>
          {products.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
          <option value="Custom Order">Custom Order</option>
        </select>
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-text mb-2">
          Jumlah *
        </label>
        <input
          type="number"
          id="quantity"
          required
          min={1}
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-text focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        />
      </div>

      <div>
        <label htmlFor="note" className="block text-sm font-medium text-text mb-2">
          Catatan
        </label>
        <textarea
          id="note"
          rows={3}
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-text placeholder:text-text-light/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
          placeholder="Tambahkan catatan khusus (opsional)"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send size={18} />
            Kirim Pesanan
          </>
        )}
      </button>
    </form>
  );
}
