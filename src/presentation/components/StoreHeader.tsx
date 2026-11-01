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
      {/* Top Announcement Bar in Dark Forest Pine */}
      <div className="w-full bg-botanical-950 text-[#A8D5BA] border-b border-botanical-900 py-2 px-4 text-center">
        <p className="text-[11px] font-mono tracking-widest uppercase flex items-center justify-center gap-2 flex-wrap">
          <Sparkles className="w-3.5 h-3.5 text-atelier-champagne" />
          <span className="font-semibold text-white">Same-Day & H-3 Delivery Bandung</span>
          <span className="text-[#3E7B58]">•</span>
          <span>100% Curated Fresh & Preserved Stems</span>
          <span className="text-[#3E7B58]">•</span>
          <span>Free Wax-Seal Personalized Letter</span>
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-7 sm:py-8 space-y-7">
        {/* Brand Main Identity */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            {/* Atelier Brand Monogram in Fresh Sage Mint */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-botanical-100 border border-botanical-200 text-botanical-800 flex items-center justify-center shadow-xs shrink-0 transition-transform duration-300 hover:scale-105">
              <Flower2 className="w-8 h-8 sm:w-10 sm:h-10 text-botanical-800" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                  {studio.name}
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium bg-botanical-100 text-botanical-800 border border-botanical-200 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-botanical-600" />
                  Verified Atelier
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-stone-600">
                {studio.tagline} — Spesialis Rangkaian Buket Pengantin, Lamaran, & Hadiah Seremonial
              </p>

              {/* Location & Operational Hours */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-xs text-stone-500 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-botanical-600 shrink-0" />
                  <span>{studio.location}</span>
                </span>
                <span className="hidden sm:inline text-stone-300">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-botanical-600 shrink-0" />
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
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-botanical-800 hover:bg-botanical-900 text-white text-xs font-semibold shadow-xs hover:shadow transition-all border border-botanical-950/30"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat WhatsApp</span>
            </a>

            <a
              href={studio.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-botanical-50 hover:bg-botanical-100 text-botanical-800 text-xs font-medium transition-colors border border-botanical-200"
            >
              <Instagram className="w-3.5 h-3.5 text-botanical-700" />
              <span>Instagram</span>
            </a>

            <a
              href="#cara-pesan"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-botanical-50 hover:bg-botanical-100 text-botanical-800 text-xs font-medium transition-colors border border-botanical-200"
            >
              <HelpCircle className="w-3.5 h-3.5 text-botanical-700" />
              <span>Alur Pesan</span>
            </a>
          </div>
        </div>

        {/* Featured Editorial Hero Showcase Banner (Deep Botanical Forest Theme) */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-botanical-800 via-[#1E3F2D] to-botanical-950 text-white p-6 sm:p-8 shadow-md border border-[#27533B]">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#A8D5BA] bg-white/10 px-2.5 py-1 rounded-md inline-block">
              Haute Floristerie • Koleksi Resmi 2026
            </span>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-snug">
              Curated Bouquets for Life&apos;s Most Cherished Moments
            </h2>
            <p className="text-xs sm:text-sm text-[#D1E6D8] leading-relaxed">
              Jelajahi 38 desain buket bunga segar dan abadi dengan rincian komposisi transparan, kemasan eksklusif, dan kemudahan pemesanan langsung melalui WhatsApp.
            </p>
          </div>

          {/* Micro Trust Stats in Frosted Botanical Glass */}
          <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <Sparkles className="w-4 h-4 text-atelier-champagne shrink-0" />
              <div>
                <p className="font-serif font-bold text-white">{totalProducts} Desain Katalog</p>
                <p className="text-[11px] text-[#A8D5BA]">Arsip Portofolio</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#A8D5BA] shrink-0" />
              <div>
                <p className="font-serif font-bold text-white">100% Handcrafted</p>
                <p className="text-[11px] text-[#A8D5BA]">Bahan Pilihan</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <Gift className="w-4 h-4 text-atelier-champagne shrink-0" />
              <div>
                <p className="font-serif font-bold text-white">Free Wax-Seal Card</p>
                <p className="text-[11px] text-[#A8D5BA]">Amplop Elegan</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <Truck className="w-4 h-4 text-[#A8D5BA] shrink-0" />
              <div>
                <p className="font-serif font-bold text-white">Kurir & Ekspedisi</p>
                <p className="text-[11px] text-[#A8D5BA]">Bandung & Luar Kota</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
