'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import InstagramIcon from '@/components/ui/InstagramIcon';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { createClient } from '@/lib/supabase/client';
import { LINKS } from '@/lib/constants';
import type { InstagramShowcase as InstagramPost } from '@/types/database';

export default function InstagramShowcase() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient();
      const { data } = await supabase
        .from('instagram_showcase')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(4);

      if (data) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <section className="py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-accent text-sm font-medium rounded-full mb-4">
            @keiki_id
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Follow Us on <span className="text-accent">Instagram</span>
          </h2>
          <p className="text-text-light max-w-2xl mx-auto">
            Temukan inspirasi, produk terbaru, dan momen spesial Keiki melalui Instagram kami.
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-border-light animate-pulse" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {posts.map((post, index) => (
              <AnimatedSection key={post.id} delay={index * 0.1} variant="scaleUp">
                <a
                  href={post.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square rounded-2xl overflow-hidden block"
                >
                  <Image
                    src={post.thumbnail_url}
                    alt="Instagram post"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <InstagramIcon
                      size={32}
                      className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-50"
                    />
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary/50 rounded-2xl">
            <InstagramIcon size={48} className="mx-auto text-accent/50 mb-4" />
            <p className="text-text-light">
              Follow Instagram kami untuk melihat produk dan kreasi terbaru.
            </p>
          </div>
        )}

        <AnimatedSection className="text-center mt-10">
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            <InstagramIcon size={20} />
            Follow Instagram
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
