'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { createClient } from '@/lib/supabase/client';
import type { FAQ } from '@/types/database';

const staticFaqs: FAQ[] = [
  {
    id: 'static-1',
    question: 'Apakah menerima custom cake?',
    answer: 'Ya, kami menerima pesanan custom cake sesuai keinginan Anda. Hubungi kami melalui WhatsApp untuk konsultasi lebih lanjut mengenai desain dan harga.',
    created_at: '',
  },
  {
    id: 'static-2',
    question: 'Berapa lama proses pembuatan?',
    answer: 'Proses pembuatan biasanya membutuhkan waktu 1-3 hari kerja tergantung jenis produk. Untuk custom order, bisa membutuhkan waktu lebih lama. Kami sarankan memesan minimal 3 hari sebelumnya.',
    created_at: '',
  },
  {
    id: 'static-3',
    question: 'Apakah tersedia layanan delivery?',
    answer: 'Ya, kami menyediakan layanan delivery di area Jakarta Barat dan sekitarnya. Biaya pengiriman disesuaikan dengan jarak. Hubungi kami untuk informasi lebih detail.',
    created_at: '',
  },
  {
    id: 'static-4',
    question: 'Bagaimana cara pemesanan?',
    answer: 'Anda bisa memesan melalui WhatsApp, Tokopedia, atau langsung mengisi form pemesanan di halaman Order Now. Tim kami akan segera memproses pesanan Anda.',
    created_at: '',
  },
  {
    id: 'static-5',
    question: 'Apakah produk Keiki sudah tersertifikasi halal?',
    answer: 'Ya, seluruh produk Keiki dibuat dengan bahan-bahan halal. Kami berkomitmen untuk menjaga kualitas dan keamanan produk sesuai standar halal.',
    created_at: '',
  },
];

function FaqItem({ faq, isOpen, onClick }: { faq: FAQ; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border border-border-light rounded-2xl overflow-hidden bg-white hover:border-primary/50 transition-colors duration-300">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-text pr-4" style={{ fontFamily: 'var(--font-heading)' }}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown size={20} className="text-accent" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-text-light leading-relaxed border-t border-border-light pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqAccordion() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFaqs() {
      const supabase = createClient();
      const { data } = await supabase
        .from('faq')
        .select('*')
        .order('created_at', { ascending: true });

      if (data) {
        setFaqs(data);
        if (data.length > 0) setOpenId(data[0].id);
      } else {
        setFaqs(staticFaqs);
        setOpenId(staticFaqs[0].id);
      }
      setLoading(false);
    }
    fetchFaqs();
  }, []);

  if (loading) {
    return (
      <div className="space-y-3 max-w-3xl mx-auto">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-white border border-border-light rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className="space-y-3 max-w-3xl mx-auto">
        {staticFaqs.map((faq, index) => (
          <AnimatedSection key={faq.id} delay={index * 0.05} variant="slideUp">
            <FaqItem
              faq={faq}
              isOpen={openId === faq.id}
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          </AnimatedSection>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <AnimatedSection key={faq.id} delay={index * 0.05} variant="slideUp">
          <FaqItem
            faq={faq}
            isOpen={openId === faq.id}
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
          />
        </AnimatedSection>
      ))}
    </div>
  );
}
