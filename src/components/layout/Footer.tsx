import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import InstagramIcon from '@/components/ui/InstagramIcon';
import { BRAND, LINKS, NAV_ITEMS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text text-white/90">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30">
                <Image
                  src="/images/logo.jpeg"
                  alt="Keiki Bakery"
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-wider text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  KEIKI
                </h3>
                <p className="text-xs text-primary/80 tracking-widest uppercase">
                  {BRAND.tagline}
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {BRAND.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Navigasi
            </h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Kontak
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">{BRAND.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a
                  href={LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-primary transition-colors text-sm"
                >
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-white/60 hover:text-primary transition-colors text-sm"
                >
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Social Media
            </h4>
            <div className="flex gap-3">
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <Phone size={18} />
              </a>
              <a
                href={LINKS.tokopedia}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Tokopedia"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </a>
            </div>
            <div className="mt-6">
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary/20 hover:bg-primary/30 text-primary rounded-full text-sm font-medium transition-all duration-300"
              >
                <Phone size={16} />
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-white/40 text-sm">
            &copy; {currentYear} Keiki Bakery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
