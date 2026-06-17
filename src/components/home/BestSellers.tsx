'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';
import { createClient } from '@/lib/supabase/client';
import type { Product } from '@/types/database';

export default function BestSellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBestSellers() {
      const supabase = createClient();
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('badge', 'Best Seller')
        .limit(4);

      if (data) setProducts(data);
      setLoading(false);
    }
    fetchBestSellers();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-4 sm:px-6 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-8 w-48 bg-primary/20 rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-10 w-96 bg-border-light rounded-lg mx-auto mb-4 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-56 bg-border-light" />
                <div className="p-5">
                  <div className="h-5 w-3/4 bg-border-light rounded mb-2" />
                  <div className="h-4 w-1/2 bg-border-light rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If no best sellers in DB, show static fallback products
  const staticFallback = [
    {
      id: 'static-1',
      name: 'Burger Croissant',
      price: 35000,
      description: 'Croissant lembut dengan isian daging sapi pilihan yang gurih dan segar.',
      image_url: '/images/products/Burger Croissant.png',
      badge: 'Best Seller' as const,
      category: 'Pastry',
      created_at: '',
    },
    {
      id: 'static-2',
      name: 'Cinnamon Rolls',
      price: 28000,
      description: 'Roti gulung kayu manis dengan glasur krim keju yang manis dan lembut.',
      image_url: '/images/products/Cinnamon Rolls.png',
      badge: 'Best Seller' as const,
      category: 'Bread',
      created_at: '',
    },
    {
      id: 'static-3',
      name: 'Fruit Pie',
      price: 45000,
      description: 'Pie dengan topping buah segar aneka warna, renyah di luar lembut di dalam.',
      image_url: '/images/products/Fruit Pie.png',
      badge: 'Best Seller' as const,
      category: 'Pastry',
      created_at: '',
    },
    {
      id: 'static-4',
      name: 'Pie Coklat',
      price: 42000,
      description: 'Pie coklat premium dengan filling ganache yang kaya dan bertekstur sempurna.',
      image_url: '/images/products/Pie Coklat.png',
      badge: 'New Product' as const,
      category: 'Pastry',
      created_at: '',
    },
  ];

  const displayProducts = products.length > 0 ? products : staticFallback;

  return (
    <section className="py-24 px-4 sm:px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-accent text-sm font-medium rounded-full mb-4">
            Produk Unggulan
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Best Seller <span className="text-accent">Products</span>
          </h2>
          <p className="text-text-light max-w-2xl mx-auto">
            Produk-produk favorit pelanggan kami yang selalu menjadi pilihan utama
          </p>
        </AnimatedSection>

        {displayProducts.length > 0 ? (          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 0.1} variant="scaleUp">
                <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border-light">
                  {/* Badge */}
                  {product.badge && <Badge type={product.badge} />}

                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={product.image_url || '/images/products/Burger Croissant.png'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-text text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      {product.name}
                    </h3>
                    <p className="text-accent font-semibold text-lg">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                    {product.description && (
                      <p className="text-text-light text-sm mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-light">Produk unggulan segera hadir!</p>
          </div>
        )}

        <AnimatedSection className="text-center mt-12">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5"
          >
            Lihat Semua Produk
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
