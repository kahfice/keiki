import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://keiki-bakery.vercel.app'),
  title: {
    default: 'Keiki - Taste of the Legacy Tradition',
    template: '%s | Keiki Bakery',
  },
  description: 'Keiki Bakery - Toko roti premium dengan bahan berkualitas tinggi. Menyediakan bread, cake, pastry, dan cookies dengan cita rasa terbaik di Jakarta Barat.',
  keywords: ['Bakery', 'Toko Roti', 'Cake Shop', 'Pastry', 'Fresh Bread', 'Keiki Bakery', 'Jakarta Barat', 'Roti Premium'],
  authors: [{ name: 'Keiki Bakery' }],
  creator: 'Keiki Bakery',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Keiki Bakery',
    title: 'Keiki - Taste of the Legacy Tradition',
    description: 'Keiki Bakery - Toko roti premium dengan bahan berkualitas tinggi. Menyediakan bread, cake, pastry, dan cookies dengan cita rasa terbaik.',
    images: [{ url: '/images/logo.jpeg', width: 1200, height: 630, alt: 'Keiki Bakery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keiki - Taste of the Legacy Tradition',
    description: 'Keiki Bakery - Toko roti premium dengan bahan berkualitas tinggi.',
    images: ['/images/logo.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logo.jpeg',
    apple: '/images/logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`h-full antialiased ${playfair.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
