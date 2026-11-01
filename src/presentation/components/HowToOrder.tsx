import React from 'react';
import {
  Search,
  MessageCircle,
  CalendarCheck,
  Truck,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import type { StudioInfo } from '../../domain/types';
import { createWhatsAppConsultLink } from '../../application/whatsapp';

interface HowToOrderProps {
  readonly studio: StudioInfo;
}

export const HowToOrder: React.FC<HowToOrderProps> = ({ studio }) => {
  const consultWaUrl = createWhatsAppConsultLink(studio, 'Pemesanan Custom');

  return (
    <section
      id="cara-pesan"
      className="w-full bg-white text-stone-900 py-10 px-5 sm:px-8 rounded-2xl border border-stone-200 shadow-2xs my-10 max-w-5xl mx-auto space-y-8"
    >
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-atelier-terracotta uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          <Sparkles className="w-3.5 h-3.5" />
          Alur Transaksi & Pengiriman
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
          Tata Cara Pemesanan di Shelwa Craft
        </h2>
        <p className="text-xs sm:text-sm text-stone-600">
          Proses pemesanan cepat dan mudah via WhatsApp dengan format otomatis yang siap dikonfirmasi oleh tim florist kami.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#FAF9F5] border border-stone-200/80 space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-mono font-bold text-xs">
            01
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-sm text-stone-900">
            <Search className="w-4 h-4 text-stone-600" />
            <h3>Pilih Model Buket</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Eksplorasi 38 desain foto buket bunga asli (Wedding, Lamaran, Wisuda, atau Kustom) di etalase ini.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF9F5] border border-stone-200/80 space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-atelier-forest text-white flex items-center justify-center font-mono font-bold text-xs">
            02
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-sm text-stone-900">
            <MessageCircle className="w-4 h-4 text-atelier-forest" />
            <h3>Pesan via WhatsApp</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Format draf terisi otomatis dengan kode dan nama produk, menghemat waktu tanpa ketik ulang rincian.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF9F5] border border-stone-200/80 space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-mono font-bold text-xs">
            03
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-sm text-stone-900">
            <CalendarCheck className="w-4 h-4 text-stone-600" />
            <h3>Konfirmasi Tanggal</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Admin memverifikasi slot tanggal pengiriman, alamat penerima, dan draf kartu ucapan wax-seal Anda.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF9F5] border border-stone-200/80 space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-mono font-bold text-xs">
            04
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-sm text-stone-900">
            <Truck className="w-4 h-4 text-stone-600" />
            <h3>Rangkaian Diantar</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Buket dirangkai dengan teliti, difoto sebelum dikirim, dan diantar via kurir instan atau ekspedisi kargo.
          </p>
        </div>
      </div>

      {/* Policy & Consultation Action Bar */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#FAF9F5] border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-atelier-terracotta shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-semibold text-stone-900">
              Kebijakan Lead Time & Pengiriman
            </p>
            <p className="text-stone-600 leading-relaxed">
              Disarankan memesan minimal H-3 untuk buket pengantin & lamaran agar ketersediaan bunga segar pilihan terjamin dalam mekar terbaik. Khusus buket bunga kering/abadi dapat dikirim ke seluruh Indonesia.
            </p>
          </div>
        </div>

        <a
          href={consultWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-atelier-forest hover:bg-atelier-forestHover text-white text-xs font-semibold shrink-0 transition-colors shadow-xs"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Konsultasi Bebas Biaya</span>
        </a>
      </div>
    </section>
  );
};
