'use client';

import { useEffect, useState, useMemo } from 'react';
import { PackageSearch } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import ProductSearch from './ProductSearch';
import ProductFilter from './ProductFilter';
import ProductSkeleton from './ProductSkeleton';
import { createClient } from '@/lib/supabase/client';
import type { Product, ProductImage } from '@/types/database';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient();
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category === '' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const handleProductClick = async (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);

    const supabase = createClient();
    const { data } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', product.id);

    if (data) setProductImages(data);
  };

  return (
    <div>
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <ProductSearch value={search} onChange={setSearch} />
        <ProductFilter selected={category} onChange={setCategory} />
      </div>

      {/* Products Grid */}
      {loading ? (
        <ProductSkeleton />
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <AnimatedSection key={product.id} delay={index * 0.05} variant="scaleUp">
              <ProductCard
                product={product}
                onClick={() => handleProductClick(product)}
              />
            </AnimatedSection>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20">
          <PackageSearch size={64} className="mx-auto text-border mb-4" />
          <h3
            className="text-xl font-bold text-text mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Produk Tidak Ditemukan
          </h3>
          <p className="text-text-light">
            Produk yang Anda cari belum tersedia.
          </p>
          {(search || category) && (
            <button
              onClick={() => {
                setSearch('');
                setCategory('');
              }}
              className="mt-4 px-6 py-2 bg-accent text-white rounded-full text-sm font-medium hover:bg-accent-dark transition-colors"
            >
              Reset Filter
            </button>
          )}
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        images={productImages}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
          setProductImages([]);
        }}
      />
    </div>
  );
}
