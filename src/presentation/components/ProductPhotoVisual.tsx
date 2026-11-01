import React, { useState } from 'react';
import { Flower2, Sparkles, CheckCircle2, Clock, Eye } from 'lucide-react';
import type { FlowerProduct } from '../../domain/types';

interface ProductPhotoVisualProps {
  readonly product: FlowerProduct;
  readonly onClick?: () => void;
}

export const ProductPhotoVisual: React.FC<ProductPhotoVisualProps> = ({
  product,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const hasImage = Boolean(product.imageUrl) && !imageError;

  return (
    <div
      onClick={onClick}
      className="relative w-full aspect-[4/5] overflow-hidden cursor-pointer select-none bg-[#F5F2EB] flex items-center justify-center transition-all duration-300"
    >
      {/* Loading Shimmer */}
      {hasImage && !isLoaded && (
        <div className="absolute inset-0 bg-[#ECE7DE] animate-pulse" />
      )}

      {hasImage ? (
        <img
          src={product.imageUrl}
          alt={product.title}
          onLoad={() => setIsLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      ) : (
        /* Fallback Botanical Plate */
        <div className="relative w-full h-full flex flex-col justify-between p-4 bg-gradient-to-b from-[#F7F4EE] via-[#ECE7DE] to-[#E2DDD3]">
          <div className="w-full flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold text-stone-700 bg-white/90 px-2 py-0.5 rounded shadow-2xs">
              {product.code}
            </span>
          </div>

          <div className="flex flex-col items-center my-auto">
            <div className="w-16 h-16 rounded-full bg-botanical-100 shadow-sm border border-botanical-200 flex items-center justify-center mb-2">
              <Flower2 className="w-8 h-8 text-botanical-800" />
            </div>
            <p className="font-serif text-sm font-semibold text-stone-900 text-center">
              {product.colorTheme}
            </p>
          </div>

          <div className="w-full flex items-center justify-between text-xs text-stone-600">
            <span>{product.leadTime}</span>
          </div>
        </div>
      )}

      {/* Subtle Bottom Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />

      {/* Floating Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        <span className="font-mono text-[10px] font-semibold tracking-wider text-stone-900 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-stone-200/80">
          {product.code}
        </span>

        {product.isReadyStock ? (
          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-emerald-950 bg-emerald-50/95 backdrop-blur-md border border-emerald-300 px-2.5 py-1 rounded-full shadow-sm">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            Ready Stock
          </span>
        ) : product.isPopular ? (
          <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-amber-950 bg-amber-50/95 backdrop-blur-md border border-amber-300 px-2.5 py-1 rounded-full shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-700" />
            Best Seller
          </span>
        ) : (
          <span className="font-mono text-[10px] text-botanical-800 bg-botanical-50/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-botanical-200">
            {product.category}
          </span>
        )}
      </div>

      {/* Bottom Floating Bar */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none text-white">
        <span className="inline-flex items-center gap-1 text-[11px] font-mono bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-stone-100 shadow-sm">
          <Clock className="w-3 h-3 text-stone-300" />
          {product.leadTime}
        </span>

        <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-white/90 text-stone-900 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm group-hover:bg-white transition-colors">
          <Eye className="w-3 h-3 text-botanical-700" />
          <span>Lihat Detail</span>
        </span>
      </div>
    </div>
  );
};
