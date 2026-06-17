'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Order } from '@/types/database';

const statusColors: Record<string, string> = {
  Pending: 'bg-pending/10 text-pending',
  Diproses: 'bg-process/10 text-process',
  Selesai: 'bg-success/10 text-success',
};

const statusOptions: Order['status'][] = ['Pending', 'Diproses', 'Selesai'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const supabase = createClient();
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setOrders(data);
    setLoading(false);
  }

  async function updateStatus(id: string, status: Order['status']) {
    const supabase = createClient();
    await supabase.from('orders').update({ status }).eq('id', id);
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  const filteredOrders = filter
    ? orders.filter((o) => o.status === filter)
    : orders;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text" style={{ fontFamily: 'var(--font-heading)' }}>
          Pesanan
        </h1>
        <p className="text-text-light text-sm mt-1">Kelola pesanan pelanggan</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilter('')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            filter === '' ? 'bg-accent text-white' : 'bg-white border border-border text-text-light hover:border-accent/50'
          }`}
        >
          Semua ({orders.length})
        </button>
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === status ? 'bg-accent text-white' : 'bg-white border border-border text-text-light hover:border-accent/50'
            }`}
          >
            {status} ({orders.filter((o) => o.status === status).length})
          </button>
        ))}
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-white rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-border-light">
          <p className="text-text-light">Belum ada pesanan</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border-light overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light bg-secondary/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-light uppercase">Pelanggan</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-light uppercase">Produk</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-light uppercase">Jumlah</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-light uppercase">Catatan</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-light uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-light uppercase">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border-light last:border-0 hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-text">{order.customer_name}</div>
                      <div className="text-xs text-text-light">{order.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-text">{order.product_name}</td>
                    <td className="px-4 py-3 text-sm text-text">{order.quantity}</td>
                    <td className="px-4 py-3 text-sm text-text-light max-w-[200px] truncate">
                      {order.note || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value as Order['status'])}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full border-0 cursor-pointer ${statusColors[order.status]}`}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-text-light">
                      {new Date(order.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
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
