import React from 'react';
import {
  Flower2,
  CheckCircle2,
  MapPin,
  Clock,
  Instagram,
  MessageCircle,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Gift,
  Truck,
} from 'lucide-react';
import type { StudioInfo } from '../../domain/types';
import { createWhatsAppConsultLink } from '../../application/whatsapp';

interface StoreHeaderProps {
  readonly studio: StudioInfo;
  readonly totalProducts: number;
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({
  studio,
  totalProducts,
}) => {
  const consultWaUrl = createWhatsAppConsultLink(studio);

  return (
    <header className="w-full bg-white border-b border-stone-200/80">
      {/* Top Announcement Bar (Madame Florist Style) */}
      <div className="w-full bg-[#F5F2EB] border-b border-stone-200/70 py-2 px-4 text-center">
        <p className="text-[11px] font-mono tracking-widest uppercase text-stone-700 flex items-center justify-center gap-2 flex-wrap">
          <Sparkles className="w-3.5 h-3.5 text-atelier-champagne" />
          <span>Same-Day & H-3 Delivery Bandung</span>
          <span className="text-stone-300">•</span>
          <span>100% Curated Fresh Stems</span>
          <span className="text-stone-300">•</span>
          <span>Free Personalized Wax-Seal Card</span>
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Main Brand Centered Masthead */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            {/* Atelier Brand Monogram */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F5F2EB] border border-[#E8E2D5] text-stone-900 flex items-center justify-center shadow-xs shrink-0 transition-transform duration-300 hover:scale-105">
              <Flower2 className="w-8 h-8 sm:w-10 sm:h-10 text-atelier-forest" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                  {studio.name}
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium bg-[#F5F2EB] text-stone-800 border border-stone-300 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  Verified Atelier
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-stone-600">
                {studio.tagline} — Spesialis Rangkaian Buket Pengantin, Lamaran, & Hadiah Seremonial
              </p>

              {/* Location & Operational Hours */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-xs text-stone-500 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{studio.location}</span>
                </span>
                <span className="hidden sm:inline text-stone-300">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{studio.operatingHours}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
            <a
              href={consultWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-atelier-forest hover:bg-atelier-forestHover text-white text-xs font-semibold shadow-xs hover:shadow transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat WhatsApp</span>
            </a>

            <a
              href={studio.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#FAF9F5] hover:bg-[#F2EFE9] text-stone-800 text-xs font-medium transition-colors border border-stone-200"
            >
              <Instagram className="w-3.5 h-3.5 text-stone-600" />
              <span>Instagram</span>
            </a>

            <a
              href="#cara-pesan"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#FAF9F5] hover:bg-[#F2EFE9] text-stone-800 text-xs font-medium transition-colors border border-stone-200"
            >
              <HelpCircle className="w-3.5 h-3.5 text-stone-600" />
              <span>Alur Pesan</span>
            </a>
          </div>
        </div>

        {/* Featured Editorial Hero Ribbon (Madame Florist Aesthetic) */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#FAF6F0] via-[#F4EFE6] to-[#ECE5D8] border border-[#E5DEC9] p-6 sm:p-8">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-atelier-terracotta">
              Haute Floristerie • Koleksi Resmi 2026
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
              Curated Bouquets for Life&apos;s Most Cherished Moments
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Jelajahi 38 desain buket bunga segar dan abadi dengan rincian komposisi transparan, kemasan eksklusif, dan kemudahan pemesanan langsung melalui WhatsApp.
            </p>
          </div>

          {/* Micro Trust Stats */}
          <div className="mt-6 pt-5 border-t border-stone-300/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-atelier-champagne shrink-0" />
              <div>
                <p className="font-serif font-bold text-stone-900">{totalProducts} Desain Katalog</p>
                <p className="text-[11px] text-stone-500">Pilihan Rangkaian</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0" />
              <div>
                <p className="font-serif font-bold text-stone-900">100% Handcrafted</p>
                <p className="text-[11px] text-stone-500">Bahan Terkurasi</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-atelier-terracotta shrink-0" />
              <div>
                <p className="font-serif font-bold text-stone-900">Free Wax-Seal Card</p>
                <p className="text-[11px] text-stone-500">Pesan Personal</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-800 shrink-0" />
              <div>
                <p className="font-serif font-bold text-stone-900">Kurir & Ekspedisi</p>
                <p className="text-[11px] text-stone-500">Bandung & Luar Kota</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
