export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
  badge: 'Best Seller' | 'New Product' | null;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string | null;
  review: string;
  created_at: string;
}

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  product_name: string;
  quantity: number;
  note: string;
  status: 'Pending' | 'Diproses' | 'Selesai';
  created_at: string;
}

export interface InstagramShowcase {
  id: string;
  thumbnail_url: string;
  instagram_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}
