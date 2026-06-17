-- Keiki Bakery Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Bread', 'Cake', 'Pastry', 'Cookies')),
  price BIGINT NOT NULL,
  description TEXT,
  image_url TEXT,
  badge TEXT CHECK (badge IN ('Best Seller', 'New Product', NULL)),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product images table (gallery)
CREATE TABLE IF NOT EXISTS product_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ table
CREATE TABLE IF NOT EXISTS faq (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  photo TEXT,
  review TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  note TEXT,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Diproses', 'Selesai')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Instagram showcase table
CREATE TABLE IF NOT EXISTS instagram_showcase (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  thumbnail_url TEXT NOT NULL,
  instagram_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_badge ON products(badge);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_instagram_showcase_active ON instagram_showcase(is_active, display_order);

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_showcase ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Public can view product images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public can view FAQ" ON faq FOR SELECT USING (true);
CREATE POLICY "Public can view testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can view active instagram" ON instagram_showcase FOR SELECT USING (is_active = true);

-- Public can insert orders
CREATE POLICY "Public can create orders" ON orders FOR INSERT WITH CHECK (true);

-- Authenticated users (admin) full access
CREATE POLICY "Admin full access products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access product_images" ON product_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access faq" ON faq FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access instagram" ON instagram_showcase FOR ALL USING (auth.role() = 'authenticated');

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('testimonials', 'testimonials', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('instagram', 'instagram', true) ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public can view product images" ON storage.objects FOR SELECT USING (bucket_id = 'products');
CREATE POLICY "Public can view testimonial images" ON storage.objects FOR SELECT USING (bucket_id = 'testimonials');
CREATE POLICY "Public can view instagram images" ON storage.objects FOR SELECT USING (bucket_id = 'instagram');

CREATE POLICY "Admin can upload product images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can update product images" ON storage.objects FOR UPDATE USING (bucket_id = 'products' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can delete product images" ON storage.objects FOR DELETE USING (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "Admin can upload testimonial images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'testimonials' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can update testimonial images" ON storage.objects FOR UPDATE USING (bucket_id = 'testimonials' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can delete testimonial images" ON storage.objects FOR DELETE USING (bucket_id = 'testimonials' AND auth.role() = 'authenticated');

CREATE POLICY "Admin can upload instagram images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'instagram' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can update instagram images" ON storage.objects FOR UPDATE USING (bucket_id = 'instagram' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can delete instagram images" ON storage.objects FOR DELETE USING (bucket_id = 'instagram' AND auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO faq (question, answer) VALUES
  ('Apakah menerima custom cake?', 'Ya, kami menerima pesanan custom cake sesuai permintaan Anda. Silakan hubungi kami melalui WhatsApp untuk konsultasi desain dan harga.'),
  ('Berapa lama proses pembuatan?', 'Untuk produk reguler, proses pembuatan memakan waktu 1-2 hari. Untuk custom cake, waktu pembuatan sekitar 3-5 hari tergantung tingkat kerumitan.'),
  ('Apakah tersedia layanan delivery?', 'Ya, kami menyediakan layanan delivery untuk area Jakarta Barat dan sekitarnya. Untuk area lainnya, silakan hubungi kami untuk informasi lebih lanjut.'),
  ('Bagaimana cara pemesanan?', 'Anda dapat melakukan pemesanan melalui WhatsApp, Tokopedia, atau mengisi form pemesanan di website ini. Tim kami akan segera menghubungi Anda untuk konfirmasi.');

INSERT INTO testimonials (name, review) VALUES
  ('Sarah Dewi', 'Kue dari Keiki selalu fresh dan rasanya luar biasa! Setiap ada acara keluarga, pasti pesan dari sini. Highly recommended!'),
  ('Budi Santoso', 'Cinnamon rolls terbaik yang pernah saya coba di Jakarta. Teksturnya lembut dan aromanya harum. Pasti order lagi!'),
  ('Linda Wijaya', 'Pelayanan ramah dan produk berkualitas. Pie coklatnya jadi favorit keluarga kami. Terima kasih Keiki!');

INSERT INTO products (name, category, price, description, image_url, badge) VALUES
  ('Burger Croissant', 'Bread', 35000, 'Perpaduan unik antara croissant renyah dengan isian burger yang gurih dan lezat. Cocok untuk sarapan atau brunch.', '/images/products/Burger Croissant.png', 'Best Seller'),
  ('Cinnamon Rolls', 'Pastry', 28000, 'Cinnamon rolls klasik dengan aroma kayu manis yang menggoda dan topping cream cheese yang creamy.', '/images/products/Cinnamon Rolls.png', 'Best Seller'),
  ('Fruit Pie', 'Cake', 45000, 'Pie segar dengan topping buah-buahan pilihan dan pastry cream yang lembut. Tampilan cantik dan rasa menyegarkan.', '/images/products/Fruit Pie.png', 'New Product'),
  ('Pie Coklat', 'Cake', 40000, 'Pie coklat dengan ganache rich chocolate yang meleleh di mulut. Sempurna untuk pecinta coklat sejati.', '/images/products/Pie Coklat.png', NULL),
  ('Pineapple Pie', 'Cake', 38000, 'Pie nanas dengan filling nanas segar yang manis dan asam. Kulit pie yang renyah dan buttery.', '/images/products/Pineapple Pie.png', NULL),
  ('Pizza Cup', 'Bread', 25000, 'Pizza dalam bentuk cup yang praktis dan lezat. Isian keju mozzarella, saus tomat, dan topping pilihan.', '/images/products/Pizza Cup.png', 'New Product');
