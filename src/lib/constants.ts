export const BRAND = {
  name: 'Keiki',
  tagline: 'Taste of the Legacy Tradition',
  description: 'Keiki hadir untuk menghadirkan kebahagiaan melalui setiap produk yang dibuat dengan bahan berkualitas dan proses yang higienis.',
  address: 'Jl. Al Mubarok Raya No.2A, RT.1/RW.8, Joglo, Kec. Kembangan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11640',
  email: 'keiki.indonesia@gmail.com',
  phone: '+6285920104599',
} as const;

export const LINKS = {
  whatsapp: 'https://wa.me/6285920104599',
  instagram: 'https://www.instagram.com/keiki_id',
  tokopedia: 'https://www.tokopedia.com/keikistore',
} as const;

export const CATEGORIES = ['Bread', 'Cake', 'Pastry', 'Cookies'] as const;

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Produk', href: '/products' },
  { label: 'Order Now', href: '/order' },
  { label: 'FAQ', href: '/faq' },
] as const;
