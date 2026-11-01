import React from 'react';
import { Flower2, Instagram, MessageCircle, ArrowUp, MapPin, Clock } from 'lucide-react';
import type { StudioInfo } from '../../domain/types';
import { createWhatsAppConsultLink } from '../../application/whatsapp';

interface StoreFooterProps {
  readonly studio: StudioInfo;
}

export const StoreFooter: React.FC<StoreFooterProps> = ({ studio }) => {
  const consultWaUrl = createWhatsAppConsultLink(studio);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-botanical-950 text-[#D0E2D6] border-t border-botanical-900 mt-16 pt-12 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-botanical-900">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-botanical-900 border border-botanical-700 text-[#A8D5BA] flex items-center justify-center">
                <Flower2 className="w-5 h-5" />
              </div>
              <span className="font-serif text-lg font-bold text-white">
                {studio.name}
              </span>
            </div>
            <p className="text-xs text-[#9EBEA8] leading-relaxed">
              Studio perangkai buket bunga tangan estetik untuk momen sakral pernikahan, lamaran, kelulusan, dan hadiah personal berstandar artisanal.
            </p>
          </div>

          {/* Operational & Location */}
          <div className="space-y-2 text-xs text-[#9EBEA8]">
            <p className="font-semibold text-white text-sm mb-3 font-serif">
              Lokasi & Layanan
            </p>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#A8D5BA] shrink-0 mt-0.5" />
              <span>{studio.location}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#A8D5BA] shrink-0 mt-0.5" />
              <span>{studio.operatingHours}</span>
            </div>
          </div>

          {/* Navigation & Contact */}
          <div className="space-y-3">
            <p className="font-semibold text-white text-sm font-serif">
              Kontak Resmi Atelier
            </p>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href={consultWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#A8D5BA] hover:text-white font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Admin: {studio.whatsappDisplay}</span>
              </a>
              <a
                href={studio.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#9EBEA8] hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram: {studio.handle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9EBEA8]">
          <p className="text-center sm:text-left">
            © 2026 Shelwa Craft. Dikembangkan oleh <span className="font-semibold text-white">Rafly Ashraffi Rachmat</span>. Seluruh hak cipta dilindungi undang-undang.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-botanical-900 hover:bg-botanical-800 text-white font-medium transition-colors border border-botanical-800"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#A8D5BA]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
