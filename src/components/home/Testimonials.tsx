'use client';

import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { createClient } from '@/lib/supabase/client';
import type { Testimonial } from '@/types/database';

const staticTestimonials: Testimonial[] = [
  {
    id: 'static-1',
    name: 'Rina Aulia',
    photo: null,
    review: 'Cinnamon Rolls-nya enak banget! Lembut, manis pas, dan aromanya harum. Suka banget sama Keiki, bakal order lagi!',
    created_at: '',
  },
  {
    id: 'static-2',
    name: 'Budi Santoso',
    photo: null,
    review: 'Fruit Pie-nya fresh banget, buah-buahnya segar dan kulit pie-nya renyah. Cocok banget buat hadiah. Recommended!',
    created_at: '',
  },
  {
    id: 'static-3',
    name: 'Dewi Maharani',
    photo: null,
    review: 'Pesan Burger Croissant buat sarapan, mantap! Packagingnya rapi dan produknya sampai masih hangat. Pelayanannya juga ramah.',
    created_at: '',
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      const supabase = createClient();
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (data) setTestimonials(data);
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-4 sm:px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-4 w-24 bg-border-light rounded mb-4" />
                <div className="h-20 bg-border-light rounded mb-4" />
                <div className="h-4 w-32 bg-border-light rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const displayTestimonials = testimonials.length > 0 ? testimonials : staticTestimonials;

  return (
    <section className="py-24 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-accent text-sm font-medium rounded-full mb-4">
            Testimoni
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Kata <span className="text-accent">Pelanggan</span> Kami
          </h2>
          <p className="text-text-light max-w-2xl mx-auto">
            Kepuasan pelanggan adalah prioritas utama kami
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTestimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.id} delay={index * 0.1} variant="slideUp">
              <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-border-light">
                {/* Quote icon */}
                <Quote size={32} className="text-primary/30 mb-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>

                {/* Review */}
                <p className="text-text-light leading-relaxed mb-6 text-sm">
                  &ldquo;{testimonial.review}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-text text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-text-light text-xs">Pelanggan Keiki</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
