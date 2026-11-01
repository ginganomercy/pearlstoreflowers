import React from 'react';
import { MessageCircle, Info, Sparkles, Box } from 'lucide-react';
import type { FlowerProduct, StudioInfo } from '../../domain/types';
import { createWhatsAppOrderLink } from '../../application/whatsapp';
import { ProductPhotoVisual } from './ProductPhotoVisual';

interface ProductCardProps {
  readonly product: FlowerProduct;
  readonly studio: StudioInfo;
  readonly onOpenDetail: (product: FlowerProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  studio,
  onOpenDetail,
}) => {
  const waOrderUrl = createWhatsAppOrderLink(product, studio.whatsappNumber);

  return (
    <article className="group bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-stone-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* High-Resolution Bouquet Photography Header */}
      <div>
        <ProductPhotoVisual
          product={product}
          onClick={() => onOpenDetail(product)}
        />

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex flex-col space-y-2.5">
          {/* Category & Dimension */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-atelier-terracotta">
              {product.categoryLabel}
            </span>
            <span className="font-mono text-[11px] text-stone-400 flex items-center gap-1">
              <Box className="w-3 h-3 text-stone-400" />
              {product.dimension.split(',')[0]}
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenDetail(product)}
            className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-atelier-terracotta transition-colors cursor-pointer line-clamp-1"
          >
            {product.title}
          </h3>

          {/* Flower Composition Summary */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 pt-0.5">
            <Sparkles className="w-3.5 h-3.5 text-atelier-champagne shrink-0" />
            <span className="line-clamp-1">
              {product.flowerComposition.join(' • ')}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer: Price & WhatsApp Action */}
      <div className="p-4 sm:p-5 pt-3 border-t border-stone-100 bg-[#FCFBF8]">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400 block">
              Mulai Dari
            </span>
            <span className="font-serif text-xl font-bold text-stone-900 tracking-tight">
              {product.priceDisplay}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onOpenDetail(product)}
            className="text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <Info className="w-3.5 h-3.5 text-stone-500" />
            <span>Spesifikasi</span>
          </button>
        </div>

        {/* Direct WhatsApp Order CTA */}
        <a
          href={waOrderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-atelier-forest hover:bg-atelier-forestHover text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all duration-150 active:scale-[0.99]"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Pesan via WhatsApp</span>
        </a>
      </div>
    </article>
  );
};
