# Bakery Company Profile Website - Keiki

Buatkan website Bakery Company Profile modern, profesional, elegan, responsive, dan mobile-friendly menggunakan:

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Database, Authentication, Storage)
- Framer Motion
- Deploy ke Vercel
- SEO Friendly
- Clean Code Architecture
- Responsive Mobile, Tablet, dan Desktop

---

# Brand Identity

## Brand Name

Keiki

# Brand Assets

## Logo

Gunakan logo resmi Keiki yang akan saya upload.

Logo harus digunakan pada:

- Navbar
- Footer
- Login Dashboard Admin
- Favicon Website
- Open Graph Image (jika memungkinkan)

## Logo Guidelines

- Jangan mengubah bentuk logo.
- Pertahankan proporsi logo.
- Gunakan versi logo yang sesuai dengan background terang atau gelap.
- Pastikan logo tetap jelas pada desktop maupun mobile.

## Brand Presentation

Logo harus menjadi identitas utama website dan ditampilkan secara profesional serta konsisten di seluruh halaman.

## Primary Color

#EEDC9A

## Color Palette

- Primary: #EEDC9A
- Secondary: #F7F2E3
- Accent: #C58B45
- Text: #3D2B1F
- Background: #FFFDF8

---

# Design Concept

Tema bakery premium yang hangat, modern, dan profesional.

Style:

- Modern Bakery
- Elegant
- Clean Layout
- Soft Shadow
- Rounded Corner
- Smooth Animation
- Luxury Feel
- Premium Company Profile

Gunakan whitespace yang cukup dan visual yang nyaman dibaca.

---

# Navigation Menu

Navbar sticky saat scroll.

Menu:

1. Home
2. About Us
3. Produk
4. Order Now
5. FAQ

Navbar harus responsive dengan hamburger menu pada mobile.

---

# Home Page

## Hero Section

Tampilkan:

- Background bakery image berkualitas tinggi
- Headline yang menarik
- Deskripsi singkat tentang Keiki
- CTA Button:
  - Lihat Produk
  - Order Sekarang

---

## Why Choose Keiki

Tampilkan 3 keunggulan utama:

### Fresh Ingredients

Menggunakan bahan berkualitas untuk menjaga cita rasa terbaik.

### Handmade Daily

Dibuat setiap hari dengan proses yang higienis.

### Premium Quality

Menjaga kualitas produk pada setiap pesanan.

---

## Best Seller Products

Menampilkan beberapa produk unggulan dari database Supabase.

Card berisi:

- Foto Produk
- Nama Produk
- Harga
- Deskripsi Singkat

---

## About Keiki Preview

Tampilkan ringkasan cerita bakery dan tombol menuju section About Us.

---

## Follow Us on Instagram

Section ini digunakan untuk menampilkan postingan Instagram pilihan yang dapat diatur melalui Dashboard Admin.

### Title

Follow Us on Instagram

### Subtitle

Temukan inspirasi, produk terbaru, dan momen spesial Keiki melalui Instagram kami.

### Button

Follow Instagram

### Layout

Grid modern:

- Desktop: 4 kolom
- Tablet: 2 kolom
- Mobile: 1 kolom

Card menampilkan:

- Thumbnail Postingan
- Hover Effect
- Ikon Instagram

Saat card diklik:

- Membuka postingan Instagram pada tab baru

Jika belum ada data:

"Follow Instagram kami untuk melihat produk dan kreasi terbaru."

---

## Testimonials

Menampilkan ulasan pelanggan dalam bentuk card atau carousel.

---

## Order CTA

Section ajakan melakukan pemesanan.

CTA:

- Order Sekarang
- Hubungi Kami

---

# About Us

## Cerita Bakery

Tampilkan narasi berikut:

"Keiki hadir untuk menghadirkan kebahagiaan melalui setiap produk yang dibuat. Kami percaya bahwa makanan bukan sekadar untuk dinikmati, tetapi juga menjadi bagian dari momen berharga bersama keluarga, sahabat, dan orang terkasih. Dengan bahan berkualitas dan proses yang higienis, setiap produk Keiki dibuat dengan penuh perhatian agar selalu memberikan rasa yang hangat dan berkesan."

Tambahkan foto bakery yang relevan untuk memperkuat visual.

---

# Produk

Data produk berasal dari Supabase.

## Kategori

- Bread
- Cake
- Pastry
- Cookies

---

## Product Search

Pencarian real-time berdasarkan:

- Nama Produk

Tanpa reload halaman.

---

## Product Filter

Filter berdasarkan kategori.

Tanpa reload halaman.

---

## Product Grid

Layout:

- Desktop: 4 kolom
- Tablet: 2 kolom
- Mobile: 1 kolom

Card Produk menampilkan:

- Foto Produk
- Nama Produk
- Harga
- Deskripsi Singkat

Tidak perlu tombol order pada card produk.

---

## Product Gallery Modal

Saat gambar produk diklik:

Tampilkan modal/lightbox berisi:

- Foto Produk ukuran besar
- Nama Produk
- Harga
- Deskripsi Lengkap
- Kategori Produk

Modal harus:

- Responsive
- Smooth Animation
- Close Button
- Klik area luar untuk menutup
- Support swipe pada mobile

---

## Product Gallery

Produk dapat memiliki lebih dari satu foto.

Tampilkan:

- Foto Utama
- Thumbnail Gallery

Klik thumbnail untuk mengganti foto utama.

---

## Badge Produk

Admin dapat mengatur badge:

- Best Seller
- New Product

Badge tampil pada card produk.

---

## Loading State

Gunakan skeleton loading ketika data sedang dimuat.

---

## Empty State

Jika tidak ada produk ditemukan:

Tampilkan ilustrasi sederhana dan pesan:

"Produk yang Anda cari belum tersedia."

---

# Order Now

## Metode Pemesanan

Tampilkan:

- WhatsApp
- Marketplace

---

## Form Pemesanan

Field:

- Nama
- Nomor HP
- Produk
- Jumlah
- Catatan

Data tersimpan ke Supabase.

Setelah submit:

- Menampilkan notifikasi sukses
- Menampilkan tombol menuju WhatsApp

---

# FAQ

Gunakan Accordion FAQ.

Contoh pertanyaan:

- Apakah menerima custom cake?
- Berapa lama proses pembuatan?
- Apakah tersedia layanan delivery?
- Bagaimana cara pemesanan?

FAQ dapat dikelola dari Dashboard Admin.

---

# Footer

Tampilkan:

- Logo Keiki
- Alamat
- Nomor WhatsApp
- Email
- Social Media

Copyright otomatis mengikuti tahun berjalan.

---

# Dashboard Admin

Gunakan Supabase Authentication.

Hanya admin yang dapat mengakses dashboard.

---

## Dashboard Overview

Tampilkan:

- Total Produk
- Total Pesanan
- Total FAQ
- Total Testimoni

---

## Produk

Fitur:

- Tambah Produk
- Edit Produk
- Hapus Produk
- Upload Foto Produk
- Kelola Badge Produk
- Kelola Galeri Produk

---

## FAQ

CRUD FAQ.

---

## Testimoni

CRUD Testimoni.

Field:

- Nama Pelanggan
- Foto
- Ulasan

---

## Pesanan

Melihat seluruh pesanan yang masuk.

Status:

- Pending
- Diproses
- Selesai

Admin dapat mengubah status pesanan.

---

## Instagram Showcase

CRUD postingan Instagram.

Field:

- Thumbnail Image
- Instagram URL
- Display Order
- Is Active

Fitur:

- Tambah Postingan
- Edit Postingan
- Hapus Postingan
- Drag and Drop Sorting
- Atur Urutan Tampil
- Aktif / Nonaktifkan Postingan

---

# Database Supabase

## products

id
name
category
price
description
image_url
badge
created_at

---

## product_images

id
product_id
image_url
created_at

---

## faq

id
question
answer
created_at

---

## testimonials

id
name
photo
review
created_at

---

## orders

id
customer_name
phone
product_name
quantity
note
status
created_at

---

## instagram_showcase

id
thumbnail_url
instagram_url
display_order
is_active
created_at

---

# SEO

Tambahkan:

- Metadata per halaman
- Dynamic Meta Tags
- Open Graph
- Twitter Card
- Sitemap.xml
- Robots.txt

Keyword:

- Bakery
- Toko Roti
- Cake Shop
- Pastry
- Fresh Bread
- Keiki Bakery

---

# Performance Optimization

- Next.js Image Optimization
- Lazy Loading
- Dynamic Import
- Server Components
- Code Splitting
- Optimized Core Web Vitals
- Fast Loading

---

# Animation

Gunakan Framer Motion:

- Fade In
- Slide Up
- Hover Effect
- Smooth Scroll
- Page Transition
- Modal Animation

---

# Project Structure

Gunakan struktur folder yang scalable dan mudah dikelola.

Pisahkan:

- Components
- Features
- Services
- Hooks
- Types
- Utilities

Gunakan TypeScript secara konsisten.

---

# Assets

Saya akan menyediakan:

- Logo Keiki
- Foto Produk
- Link WhatsApp
- Link Marketplace
- Link Instagram
- Alamat
- Email

Gunakan seluruh aset tersebut secara dinamis sehingga mudah diperbarui melalui Dashboard Admin apabila diperlukan.

# Final Result

Buat project production-ready yang:

- Responsive di semua perangkat
- Mudah dikelola oleh admin
- Terhubung dengan Supabase
- Dapat deploy gratis ke Vercel
- Menggunakan best practice Next.js terbaru
- Memiliki desain premium sesuai identitas brand Keiki
- Memiliki performa tinggi dan SEO yang baik
- Siap digunakan untuk kebutuhan bisnis bakery secara profesional