import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FaqAccordion from '@/components/faq/FaqAccordion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { LINKS } from '@/lib/constants';
import { MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Pertanyaan yang sering diajukan tentang Keiki Bakery - pemesanan, pengiriman, custom cake, dan lainnya.',
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Header */}
        <section className="py-12 px-4 sm:px-6 bg-gradient-to-b from-secondary/50 to-background">
          <div className="max-w-7xl mx-auto text-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 bg-primary/20 text-accent text-sm font-medium rounded-full mb-4">
                Bantuan
              </span>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Frequently Asked <span className="text-accent">Questions</span>
              </h1>
              <p className="text-text-light max-w-2xl mx-auto">
                Temukan jawaban untuk pertanyaan yang sering diajukan tentang Keiki Bakery
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-8 pb-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <FaqAccordion />

            <AnimatedSection className="text-center mt-16">
              <p className="text-text-light mb-4">
                Masih punya pertanyaan? Jangan ragu untuk menghubungi kami
              </p>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageCircle size={20} />
                Hubungi via WhatsApp
              </a>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
