import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import type { ProductCategory } from '../../domain/types';
import type { CategoryCount } from '../../application/catalog-service';

interface CategoryFilterProps {
  readonly categories: readonly CategoryCount[];
  readonly activeCategory: ProductCategory;
  readonly searchQuery: string;
  readonly onSelectCategory: (category: ProductCategory) => void;
  readonly onSearchChange: (query: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  searchQuery,
  onSelectCategory,
  onSearchChange,
}) => {
  return (
    <div className="w-full bg-botanical-50/95 backdrop-blur-md border-b border-botanical-200 sticky top-0 z-30 py-3 shadow-2xs transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-3">
        {/* Search Bar with Botanical Mint Outline */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-botanical-600">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari buket (contoh: mawar, baby's breath, sunflower, wedding, wisuda, SC-WED-01)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-botanical-200 bg-white text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-botanical-800 focus:border-botanical-800 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700"
              aria-label="Bersihkan pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Navigation (Fresh Sage Mint & Deep Forest Tabs) */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-0.5 no-scrollbar">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.category;
              return (
                <button
                  key={cat.category}
                  type="button"
                  onClick={() => onSelectCategory(cat.category)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-botanical-800 text-white font-semibold shadow-xs'
                      : 'bg-white hover:bg-botanical-100 text-botanical-800 border border-botanical-200 font-medium'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full transition-colors ${
                      isActive
                        ? 'bg-botanical-700 text-white'
                        : 'bg-botanical-100 text-botanical-800 font-bold'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-botanical-600 whitespace-nowrap pl-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Katalog Resmi</span>
          </div>
        </div>
      </div>
    </div>
  );
};
