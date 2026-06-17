'use client';

import Image from 'next/image';
import Badge from '@/components/ui/Badge';
import type { Product } from '@/types/database';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border-light cursor-pointer"
    >
      {/* Badge */}
      {product.badge && <Badge type={product.badge} />}

      {/* Image */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <Image
          src={product.image_url || '/images/products/Burger Croissant.png'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* View overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-text">
            Lihat Detail
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>
        <h3 className="font-bold text-text text-lg mt-2" style={{ fontFamily: 'var(--font-heading)' }}>
          {product.name}
        </h3>
        <p className="text-accent font-semibold text-lg mt-1">
          Rp {product.price.toLocaleString('id-ID')}
        </p>
        {product.description && (
          <p className="text-text-light text-sm mt-2 line-clamp-2">
            {product.description}
          </p>
        )}
      </div>
    </div>
  );
}
