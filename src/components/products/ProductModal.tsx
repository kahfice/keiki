'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import type { Product, ProductImage } from '@/types/database';

interface ProductModalProps {
  product: Product | null;
  images: ProductImage[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, images, isOpen, onClose }: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const allImages = [
    product.image_url,
    ...images.map((img) => img.image_url),
  ].filter(Boolean) as string[];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image Gallery */}
        <div className="relative bg-secondary/50">
          {/* Main Image */}
          <div className="relative aspect-square">
            <Image
              src={allImages[selectedImage] || '/images/products/Burger Croissant.png'}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.badge && (
              <span
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase shadow-lg z-10 ${
                  product.badge === 'Best Seller'
                    ? 'bg-accent text-white'
                    : 'bg-emerald-500 text-white'
                }`}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImage === index
                      ? 'border-accent shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-8 flex flex-col justify-center">
          <span className="inline-block w-fit text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full mb-4">
            {product.category}
          </span>
          <h2
            className="text-2xl sm:text-3xl font-bold text-text mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {product.name}
          </h2>
          <p className="text-2xl font-bold text-accent mb-6">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          {product.description && (
            <div>
              <h4 className="text-sm font-semibold text-text mb-2 uppercase tracking-wider">
                Deskripsi
              </h4>
              <p className="text-text-light leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
