import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OrderForm from '@/components/order/OrderForm';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { MessageCircle, Store, Phone } from 'lucide-react';
import { LINKS, BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Order Now',
  description: 'Pesan produk Keiki Bakery sekarang melalui WhatsApp, Tokopedia, atau form pemesanan online.',
};

export default function OrderPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Header */}
        <section className="py-12 px-4 sm:px-6 bg-gradient-to-b from-secondary/50 to-background">
          <div className="max-w-7xl mx-auto text-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 bg-primary/20 text-accent text-sm font-medium rounded-full mb-4">
                Pemesanan
              </span>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Order <span className="text-accent">Now</span>
              </h1>
              <p className="text-text-light max-w-2xl mx-auto">
                Pilih metode pemesanan yang paling nyaman untuk Anda
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Order Methods */}
        <section className="py-8 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
              <AnimatedSection delay={0}>
                <a
                  href={LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 bg-white rounded-2xl border border-border-light hover:border-green-300 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle size={24} className="text-green-500" />
                  </div>
                  <h3 className="font-bold text-text mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    WhatsApp
                  </h3>
                  <p className="text-text-light text-sm">Pesan langsung via chat</p>
                </a>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <a
                  href={LINKS.tokopedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 bg-white rounded-2xl border border-border-light hover:border-green-300 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Store size={24} className="text-green-600" />
                  </div>
                  <h3 className="font-bold text-text mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    Tokopedia
                  </h3>
                  <p className="text-text-light text-sm">Beli di marketplace</p>
                </a>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="group block p-6 bg-white rounded-2xl border border-border-light hover:border-accent/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone size={24} className="text-accent" />
                  </div>
                  <h3 className="font-bold text-text mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    Telepon
                  </h3>
                  <p className="text-text-light text-sm">Hubungi langsung</p>
                </a>
              </AnimatedSection>
            </div>

            {/* Order Form */}
            <AnimatedSection>
              <div className="bg-white rounded-2xl border border-border-light shadow-sm p-8 sm:p-12">
                <div className="text-center mb-8">
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-text mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Form Pemesanan
                  </h2>
                  <p className="text-text-light">
                    Isi form di bawah ini dan kami akan menghubungi Anda
                  </p>
                </div>
                <OrderForm />
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
