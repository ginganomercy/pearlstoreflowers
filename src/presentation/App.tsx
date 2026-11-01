import React, { useState, useMemo } from 'react';
import type { FlowerProduct, ProductCategory, StudioInfo } from '../domain/types';
import catalogData from '../data/catalog.json';
import { filterProducts, getCategoryCounts } from '../application/catalog-service';
import { StoreHeader } from './components/StoreHeader';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { HowToOrder } from './components/HowToOrder';
import { StoreFooter } from './components/StoreFooter';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { Sparkles, RefreshCcw } from 'lucide-react';

export const App: React.FC = () => {
  const studio: StudioInfo = catalogData.studio;
  const allProducts: readonly FlowerProduct[] = catalogData.products as FlowerProduct[];

  const [activeCategory, setActiveCategory] = useState<ProductCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<FlowerProduct | null>(null);

  // Compute category statistics
  const categoryCounts = useMemo(() => {
    return getCategoryCounts(allProducts);
  }, [allProducts]);

  // Filter products reactively
  const filteredProducts = useMemo(() => {
    return filterProducts(allProducts, activeCategory, searchQuery);
  }, [allProducts, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-atelier-bg text-atelier-text">
      {/* Studio Header & Brand Value */}
      <StoreHeader studio={studio} totalProducts={allProducts.length} />

      {/* Category Navigation & Live Search */}
      <CategoryFilter
        categories={categoryCounts}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onSelectCategory={setActiveCategory}
        onSearchChange={setSearchQuery}
      />

      {/* Catalog Main Content (Madame Florist Grid) */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Results Counter & Active Context */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200/80 text-xs text-stone-500">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-atelier-terracotta" />
            <span className="font-medium text-stone-800">
              Menampilkan {filteredProducts.length} dari {allProducts.length} koleksi buket
            </span>
            {activeCategory !== 'Semua' && (
              <span className="text-stone-400 hidden sm:inline">
                • [Koleksi: {activeCategory}]
              </span>
            )}
            {searchQuery && (
              <span className="text-stone-400 hidden sm:inline">
                • [Pencarian: &ldquo;{searchQuery}&rdquo;]
              </span>
            )}
          </div>

          {(activeCategory !== 'Semua' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory('Semua');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-700 hover:text-stone-900 font-medium transition-colors"
            >
              <RefreshCcw className="w-3 h-3" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                studio={studio}
                onOpenDetail={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-stone-300 max-w-md mx-auto my-8">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#FAF9F5] border border-stone-200 flex items-center justify-center text-stone-400 mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base mb-1">
              Buket Tidak Ditemukan
            </h3>
            <p className="text-xs text-stone-500 mb-4 leading-relaxed">
              Tidak ada buket yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;. Silakan ganti kata kunci atau konsultasikan pesanan custom Anda ke admin florist.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('Semua');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-stone-900 text-white font-mono text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
            >
              Tampilkan Semua Koleksi
            </button>
          </div>
        )}

        {/* Ordering Guide */}
        <HowToOrder studio={studio} />
      </main>

      {/* Footer */}
      <StoreFooter studio={studio} />

      {/* Floating WhatsApp Action for Mobile */}
      <FloatingWhatsAppButton studio={studio} />

      {/* Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        studio={studio}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
