import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Produk',
  description: 'Jelajahi koleksi produk premium Keiki Bakery - Bread, Cake, Pastry, dan Cookies dengan bahan berkualitas tinggi.',
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Header */}
        <section className="py-12 px-4 sm:px-6 bg-gradient-to-b from-secondary/50 to-background">
          <div className="max-w-7xl mx-auto text-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 bg-primary/20 text-accent text-sm font-medium rounded-full mb-4">
                Koleksi Kami
              </span>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Produk <span className="text-accent">Keiki</span>
              </h1>
              <p className="text-text-light max-w-2xl mx-auto">
                Temukan berbagai pilihan produk bakery premium kami. Dibuat dengan bahan berkualitas tinggi untuk cita rasa terbaik.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Products */}
        <section className="py-8 pb-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <ProductGrid />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
