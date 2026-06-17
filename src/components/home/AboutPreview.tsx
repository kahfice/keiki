'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function AboutPreview() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image collage */}
          <AnimatedSection variant="slideRight">
            <div className="relative">
              {/* Main large image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/products/Cinnamon Rolls.png"
                  alt="Produk Keiki - Cinnamon Rolls"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Small overlay image — top right */}
              <div className="absolute -top-5 -right-5 w-36 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-background hidden md:block">
                <Image
                  src="/images/products/Fruit Pie.png"
                  alt="Produk Keiki - Fruit Pie"
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </div>

              {/* Small overlay image — bottom left */}
              <div className="absolute -bottom-5 -left-5 w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-4 border-background hidden md:block">
                <Image
                  src="/images/products/Pie Coklat.png"
                  alt="Produk Keiki - Pie Coklat"
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>

              {/* Info card */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-border-light hidden sm:block">
                <div className="text-xs text-text-light">Berdiri Sejak</div>
                <div className="text-xl font-bold text-accent" style={{ fontFamily: 'var(--font-heading)' }}>2019</div>
                <div className="text-xs text-text-light">Melayani Jakarta</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Text side */}
          <AnimatedSection variant="slideLeft" delay={0.2}>
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary/20 text-accent text-sm font-medium rounded-full mb-4">
                Tentang Kami
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Cerita di Balik <span className="text-accent">Keiki</span>
              </h2>
              <p className="text-text-light leading-relaxed mb-6 text-lg">
                Keiki hadir untuk menghadirkan kebahagiaan melalui setiap produk yang dibuat. Kami percaya bahwa makanan bukan sekadar untuk dinikmati, tetapi juga menjadi bagian dari momen berharga bersama keluarga, sahabat, dan orang terkasih.
              </p>
              <p className="text-text-light leading-relaxed mb-8">
                Dengan bahan berkualitas dan proses yang higienis, setiap produk Keiki dibuat dengan penuh perhatian agar selalu memberikan rasa yang hangat dan berkesan.
              </p>

              <div className="flex flex-wrap gap-8 mb-8">
                {[
                  { value: '100%', label: 'Bahan Premium' },
                  { value: 'Fresh', label: 'Setiap Hari' },
                  { value: 'Halal', label: 'Tersertifikasi' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-xl font-bold text-accent" style={{ fontFamily: 'var(--font-heading)' }}>
                      {item.value}
                    </div>
                    <div className="text-sm text-text-light">{item.label}</div>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-text text-white font-semibold rounded-full hover:bg-text/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Selengkapnya
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
