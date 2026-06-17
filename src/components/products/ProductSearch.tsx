'use client';

import { Search } from 'lucide-react';

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="relative max-w-md w-full">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/50"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari produk..."
        className="w-full pl-12 pr-4 py-3.5 bg-white border border-border rounded-full text-text placeholder:text-text-light/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
        id="product-search"
      />
    </div>
  );
}
