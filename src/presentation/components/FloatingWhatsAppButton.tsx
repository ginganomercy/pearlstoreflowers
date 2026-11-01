import React from 'react';
import { MessageCircle } from 'lucide-react';
import type { StudioInfo } from '../../domain/types';
import { createWhatsAppConsultLink } from '../../application/whatsapp';

interface FloatingWhatsAppButtonProps {
  readonly studio: StudioInfo;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  studio,
}) => {
  const consultWaUrl = createWhatsAppConsultLink(studio);

  return (
    <aside
      aria-label="Pusat Bantuan WhatsApp"
      className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6"
    >
      <a
        href={consultWaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-atelier-forest hover:bg-atelier-forestHover text-white font-semibold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 border-2 border-white/90 group"
      >
        <MessageCircle className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform duration-200" />
        <span className="hidden xs:inline font-mono tracking-tight">Konsultasi Florist</span>
        <span className="xs:hidden font-mono tracking-tight">Chat Florist</span>
      </a>
    </aside>
  );
};
