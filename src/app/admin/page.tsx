'use client';

import { useEffect, useState } from 'react';
import { Package, ShoppingCart, HelpCircle, MessageSquare } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Stats {
  products: number;
  orders: number;
  faqs: number;
  testimonials: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ products: 0, orders: 0, faqs: 0, testimonials: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient();

      const [productsRes, ordersRes, faqsRes, testimonialsRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }),
        supabase.from('faq').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        products: productsRes.count ?? 0,
        orders: ordersRes.count ?? 0,
        faqs: faqsRes.count ?? 0,
        testimonials: testimonialsRes.count ?? 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Produk', value: stats.products, icon: Package, color: 'bg-blue-50 text-blue-500' },
    { label: 'Total Pesanan', value: stats.orders, icon: ShoppingCart, color: 'bg-green-50 text-green-500' },
    { label: 'Total FAQ', value: stats.faqs, icon: HelpCircle, color: 'bg-purple-50 text-purple-500' },
    { label: 'Total Testimoni', value: stats.testimonials, icon: MessageSquare, color: 'bg-orange-50 text-orange-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl sm:text-3xl font-bold text-text"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Dashboard
        </h1>
        <p className="text-text-light mt-1">Selamat datang di Admin Dashboard Keiki</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-border-light p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon size={22} />
              </div>
            </div>
            <div className="text-3xl font-bold text-text" style={{ fontFamily: 'var(--font-heading)' }}>
              {loading ? (
                <div className="h-8 w-12 bg-border-light rounded animate-pulse" />
              ) : (
                card.value
              )}
            </div>
            <div className="text-sm text-text-light mt-1">{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
