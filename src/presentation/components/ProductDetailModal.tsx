import React, { useEffect } from 'react';
import {
  X,
  MessageCircle,
  Clock,
  Sparkles,
  Layers,
  Box,
  Palette,
  HeartHandshake,
  Check,
} from 'lucide-react';
import type { FlowerProduct, StudioInfo } from '../../domain/types';
import { createWhatsAppOrderLink } from '../../application/whatsapp';

interface ProductDetailModalProps {
  readonly product: FlowerProduct | null;
  readonly studio: StudioInfo;
  readonly onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  studio,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [product, onClose]);

  if (!product) return null;

  const waOrderUrl = createWhatsAppOrderLink(product, studio.whatsappNumber);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-xs animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 my-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-[#FCFBF8]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded bg-botanical-100 text-botanical-800 border border-botanical-200">
              {product.code}
            </span>
            <span className="font-mono text-xs font-medium text-botanical-800 bg-botanical-50 px-2 py-0.5 rounded border border-botanical-200">
              {product.categoryLabel}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Tutup Detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Main Visual Display */}
          {product.imageUrl && (
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-stone-100 shadow-xs border border-stone-200">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title & Price */}
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
              {product.title}
            </h2>
            <div className="mt-2 flex items-baseline justify-between flex-wrap gap-2">
              <span className="font-serif text-2xl font-extrabold text-stone-900 tracking-tight">
                {product.priceDisplay}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-xs font-medium text-botanical-800 bg-botanical-100 px-3 py-1 rounded-full border border-botanical-200">
                <Clock className="w-3.5 h-3.5 text-botanical-600" />
                {product.leadTime}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 bg-botanical-50/70 rounded-xl border border-botanical-200/70">
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-stone-200 bg-white shadow-2xs">
              <div className="flex items-center gap-1.5 text-botanical-600 font-mono text-[11px] mb-1">
                <Box className="w-3.5 h-3.5 text-botanical-600" />
                <span>Dimensi Rangkaian</span>
              </div>
              <p className="font-semibold text-stone-800">{product.dimension}</p>
            </div>

            <div className="p-3.5 rounded-xl border border-stone-200 bg-white shadow-2xs">
              <div className="flex items-center gap-1.5 text-botanical-600 font-mono text-[11px] mb-1">
                <Palette className="w-3.5 h-3.5 text-botanical-600" />
                <span>Nuansa Warna</span>
              </div>
              <p className="font-semibold text-stone-800">{product.colorTheme}</p>
            </div>

            <div className="col-span-2 p-3.5 rounded-xl border border-stone-200 bg-white shadow-2xs">
              <div className="flex items-center gap-1.5 text-botanical-600 font-mono text-[11px] mb-1">
                <Layers className="w-3.5 h-3.5 text-botanical-600" />
                <span>Wrapping & Finishing</span>
              </div>
              <p className="font-semibold text-stone-800">{product.wrappingMaterial}</p>
            </div>
          </div>

          {/* Flower Composition List */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-botanical-800 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-botanical-600" />
              <span>Komposisi Rangkaian Bunga:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.flowerComposition.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-botanical-50 border border-botanical-200 text-xs text-botanical-900 font-medium"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Atelier Standard Box in Deep Botanical Pine */}
          <div className="p-4 rounded-xl bg-botanical-900 text-white text-xs space-y-2 border border-botanical-700 shadow-xs">
            <div className="flex items-center gap-1.5 font-serif font-bold text-white text-sm">
              <HeartHandshake className="w-4 h-4 text-[#A8D5BA]" />
              <span>Standar Pengerjaan Shelwa Craft</span>
            </div>
            <ul className="space-y-1 text-[#D1E6D8] text-[11px] list-disc list-inside">
              <li>Gratis kartu ucapan cetak premium dengan amplop segel wax personal.</li>
              <li>Pengepakan kokoh menggunakan box kardus tebal untuk kurir instan dan kargo.</li>
              <li>Bisa request warna pita satin dan kertas pembungkus tanpa biaya tambahan.</li>
            </ul>
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="p-4 border-t border-stone-100 bg-[#FCFBF8] flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-white transition-colors"
          >
            Tutup
          </button>
          <a
            href={waOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-botanical-800 hover:bg-botanical-900 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all active:scale-[0.99] border border-botanical-950/20"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Pesan Produk via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
