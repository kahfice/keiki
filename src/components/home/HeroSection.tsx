'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const heroProducts = [
  { src: '/images/products/Burger Croissant.png', alt: 'Burger Croissant', delay: 0 },
  { src: '/images/products/Cinnamon Rolls.png', alt: 'Cinnamon Rolls', delay: 0.15 },
  { src: '/images/products/Fruit Pie.png', alt: 'Fruit Pie', delay: 0.3 },
  { src: '/images/products/Pie Coklat.png', alt: 'Pie Coklat', delay: 0.45 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3D2B1F] via-[#5C3D2E] to-[#2A1A10]" />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #EEDC9A 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      {/* Floating circles decoration */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 right-[22%] w-20 h-20 border border-primary/20 rounded-full hidden lg:block pointer-events-none"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-32 left-[22%] w-32 h-32 border border-primary/10 rounded-full hidden lg:block pointer-events-none"
      />

      {/* Main layout: text left, product grid right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Text Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-5 py-2 bg-primary/15 backdrop-blur-sm border border-primary/20 rounded-full text-primary text-sm font-medium tracking-widest uppercase mb-8">
                ✨ Taste of the Legacy Tradition
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Hadirkan{' '}
              <span className="text-primary">Kebahagiaan</span>
              <br />
              di Setiap Gigitan
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-white/70 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Dibuat dengan bahan pilihan berkualitas tinggi dan penuh cinta,
              setiap produk Keiki dirancang untuk memberikan momen berharga
              bersama orang terkasih.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/products"
                className="group flex items-center gap-2 px-8 py-4 bg-primary text-text font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5"
              >
                <ShoppingBag size={20} />
                Lihat Produk
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/order"
                className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                Order Sekarang
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-12 flex items-center justify-center lg:justify-start gap-10"
            >
              {[
                { value: '100+', label: 'Produk' },
                { value: '500+', label: 'Pelanggan' },
                { value: '4.9★', label: 'Rating' },
              ].map((stat, i) => (
                <div key={stat.label} className={`text-center ${i > 0 ? 'border-l border-white/10 pl-10' : ''}`}>
                  <div className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-sm mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Product Image Grid */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {heroProducts.map((product, index) => (
                <motion.div
                  key={product.alt}
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 + product.delay, ease: 'easeOut' }}
                  className={`relative overflow-hidden rounded-2xl shadow-2xl border border-white/10 ${
                    index === 0 ? 'aspect-[4/3]' :
                    index === 1 ? 'aspect-square mt-6' :
                    index === 2 ? 'aspect-square -mt-6' :
                    'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={product.src}
                    alt={product.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1280px) 20vw, 280px"
                    priority={index < 2}
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  {/* Product name label */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block px-3 py-1 bg-black/40 backdrop-blur-sm text-white/90 text-xs font-medium rounded-full">
                      {product.alt}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
