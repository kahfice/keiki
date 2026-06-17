'use client';

import { Wheat, HandHeart, Award } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const features = [
  {
    icon: Wheat,
    title: 'Fresh Ingredients',
    description: 'Menggunakan bahan berkualitas tinggi yang dipilih dengan cermat untuk menjaga cita rasa terbaik di setiap produk.',
  },
  {
    icon: HandHeart,
    title: 'Handmade Daily',
    description: 'Dibuat setiap hari dengan proses yang higienis dan penuh perhatian oleh baker berpengalaman kami.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Menjaga kualitas produk pada setiap pesanan dengan standar tinggi untuk kepuasan pelanggan.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-accent text-sm font-medium rounded-full mb-4">
            Kenapa Memilih Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Why Choose <span className="text-accent">Keiki</span>?
          </h2>
          <p className="text-text-light max-w-2xl mx-auto">
            Kami berkomitmen memberikan yang terbaik untuk Anda
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection
              key={feature.title}
              delay={index * 0.15}
              variant="slideUp"
            >
              <div className="group relative p-8 bg-white rounded-2xl border border-border-light hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 text-center">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={28} className="text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-text mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  {feature.title}
                </h3>
                <p className="text-text-light text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-tr-2xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
