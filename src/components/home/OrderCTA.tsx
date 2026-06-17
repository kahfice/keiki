'use client';

import Link from 'next/link';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { LINKS } from '@/lib/constants';

export default function OrderCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3D2B1F] via-[#5C3D2E] to-[#2A1A10]" />

      {/* Decorative */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <AnimatedSection>
          <span className="inline-block px-4 py-1.5 bg-primary/15 text-primary text-sm font-medium rounded-full mb-6 backdrop-blur-sm border border-primary/20">
            Siap Memesan?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Pesan Sekarang &<br />
            <span className="text-primary">Rasakan Kelezatannya</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Jangan lewatkan kesempatan untuk menikmati produk premium dari Keiki.
            Pesan sekarang dan buat momen spesial bersama orang terkasih.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/order"
              className="group flex items-center gap-2 px-8 py-4 bg-primary text-text font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5"
            >
              <ShoppingBag size={20} />
              Order Sekarang
            </Link>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle size={20} />
              Hubungi Kami
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
