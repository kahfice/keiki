import type { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Wheat, HandHeart, Award, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Keiki hadir untuk menghadirkan kebahagiaan melalui setiap produk bakery premium yang dibuat dengan bahan berkualitas dan proses higienis.',
};

const values = [
  {
    icon: Wheat,
    title: 'Bahan Berkualitas',
    description: 'Kami hanya menggunakan bahan-bahan terbaik dan terpilih untuk setiap produk.',
  },
  {
    icon: HandHeart,
    title: 'Dibuat dengan Cinta',
    description: 'Setiap produk dibuat dengan penuh perhatian dan dedikasi oleh baker berpengalaman.',
  },
  {
    icon: Award,
    title: 'Standar Premium',
    description: 'Menjaga standar kualitas tinggi untuk memberikan yang terbaik bagi pelanggan.',
  },
  {
    icon: ShieldCheck,
    title: 'Higienis & Aman',
    description: 'Proses produksi yang higienis dan terjamin keamanannya untuk kenyamanan Anda.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Hero */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-secondary/50 to-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection variant="slideRight">
                <span className="inline-block px-4 py-1.5 bg-primary/20 text-accent text-sm font-medium rounded-full mb-4">
                  Tentang Kami
                </span>
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-6 leading-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Cerita di Balik <span className="text-accent">Keiki</span> Bakery
                </h1>
                <p className="text-text-light text-lg leading-relaxed mb-6">
                  Keiki hadir untuk menghadirkan kebahagiaan melalui setiap produk yang dibuat. Kami percaya bahwa makanan bukan sekadar untuk dinikmati, tetapi juga menjadi bagian dari momen berharga bersama keluarga, sahabat, dan orang terkasih.
                </p>
                <p className="text-text-light leading-relaxed">
                  Dengan bahan berkualitas dan proses yang higienis, setiap produk Keiki dibuat dengan penuh perhatian agar selalu memberikan rasa yang hangat dan berkesan. Kami berkomitmen untuk terus berinovasi dan memberikan produk terbaik untuk pelanggan kami.
                </p>
              </AnimatedSection>

              <AnimatedSection variant="slideLeft" delay={0.2}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/products/Pineapple Pie.png"
                    alt="Keiki Bakery - Produk Premium"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-block px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
                      <span className="text-white text-sm font-medium" style={{ fontFamily: 'var(--font-heading)' }}>
                        Taste of the Legacy Tradition
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 px-4 sm:px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/20 text-accent text-sm font-medium rounded-full mb-4">
                Misi Kami
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-text mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Nilai-Nilai <span className="text-accent">Keiki</span>
              </h2>
              <p className="text-text-light max-w-2xl mx-auto text-lg">
                Setiap produk yang kami buat didasari oleh nilai-nilai yang kami pegang teguh
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <AnimatedSection key={value.title} delay={index * 0.1} variant="slideUp">
                  <div className="group p-8 bg-white rounded-2xl border border-border-light hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 text-center h-full">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <value.icon size={24} className="text-accent" />
                    </div>
                    <h3
                      className="text-lg font-bold text-text mb-3"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-text-light text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-24 px-4 sm:px-6 bg-gradient-to-br from-[#3D2B1F] to-[#5C3D2E]">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <blockquote
                className="text-xl sm:text-2xl text-white/90 leading-relaxed italic mb-8"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                &ldquo;Kami percaya bahwa makanan bukan sekadar untuk dinikmati, tetapi juga menjadi bagian dari momen berharga bersama keluarga, sahabat, dan orang terkasih.&rdquo;
              </blockquote>
              <div className="text-primary font-semibold">Keiki</div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
