<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
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
    ExternalLink
  } from 'lucide-svelte';
  import type { FlowerProduct, StudioInfo } from '../../domain/types';
  import { createWhatsAppOrderLink } from '../../application/whatsapp';
  import { optimizeImageUrl } from '../../application/image-optimizer';
  import { MODAL_IMAGE_TARGET_WIDTH_PX, IMAGE_TARGET_QUALITY_PERCENT } from '../../domain/constants';

  interface Props {
    product: FlowerProduct | null;
    studio: StudioInfo;
    onClose: () => void;
  }

  let { product, studio, onClose }: Props = $props();

  let closeBtnEl: HTMLButtonElement | null = $state(null);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  $effect(() => {
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtnEl?.focus(), 50);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  });

  const waOrderUrl = $derived(
    product ? createWhatsAppOrderLink(product, studio.whatsappNumber, studio.name) : ''
  );

  const optimizedImage = $derived(
    product?.imageUrl
      ? optimizeImageUrl(product.imageUrl, MODAL_IMAGE_TARGET_WIDTH_PX, IMAGE_TARGET_QUALITY_PERCENT)
      : ''
  );
</script>

{#if product}
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-product-title"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-900/65 backdrop-blur-xs transition-opacity duration-200"
  >
    <!-- Backdrop Button -->
    <button
      type="button"
      class="fixed inset-0 bg-transparent border-0 cursor-default p-0"
      aria-label="Tutup modal latar belakang"
      onclick={onClose}
    ></button>

    <!-- Modal Dialog Body -->
    <div
      class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200"
    >
      <!-- Header Bar -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-[#FCFBF8]">
        <div class="flex items-center gap-2">
          <span class="font-mono text-xs font-semibold px-2.5 py-0.5 rounded bg-botanical-100 text-botanical-800 border border-botanical-200">
            {product.code}
          </span>
          <span class="font-mono text-xs font-medium text-botanical-800 bg-botanical-50 px-2 py-0.5 rounded border border-botanical-200">
            {product.categoryLabel}
          </span>
        </div>
        <button
          bind:this={closeBtnEl}
          type="button"
          onclick={onClose}
          class="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors focus:outline-none focus:ring-2 focus:ring-botanical-600"
          aria-label="Tutup Detail Produk"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Modal Scrollable Content -->
      <div class="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-6">
        <!-- Visual Display -->
        {#if optimizedImage}
          <div class="w-full aspect-video rounded-xl overflow-hidden bg-stone-100 shadow-xs border border-stone-200">
            <img
              src={optimizedImage}
              alt={product.title}
              loading="eager"
              decoding="async"
              class="w-full h-full object-cover"
            />
          </div>
        {/if}

        <!-- Title & Price -->
        <div>
          <h2
            id="modal-product-title"
            class="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight"
          >
            {product.title}
          </h2>
          <div class="mt-2 flex items-baseline justify-between flex-wrap gap-2">
            <span class="font-serif text-2xl font-extrabold text-stone-900 tracking-tight">
              {product.priceDisplay}
            </span>
            <span class="inline-flex items-center gap-1 font-mono text-xs font-medium text-botanical-800 bg-botanical-100 px-3 py-1 rounded-full border border-botanical-200">
              <Clock class="w-3.5 h-3.5 text-botanical-600" />
              {product.leadTime}
            </span>
          </div>
        </div>

        <!-- Description -->
        <div class="p-4 bg-botanical-50/70 rounded-xl border border-botanical-200/70">
          <p class="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {product.description}
          </p>
        </div>

        <!-- Specifications Grid -->
        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="p-3.5 rounded-xl border border-stone-200 bg-white shadow-2xs">
            <div class="flex items-center gap-1.5 text-botanical-600 font-mono text-[11px] mb-1">
              <Box class="w-3.5 h-3.5 text-botanical-600" />
              <span>Dimensi Rangkaian</span>
            </div>
            <p class="font-semibold text-stone-800">{product.dimension}</p>
          </div>

          <div class="p-3.5 rounded-xl border border-stone-200 bg-white shadow-2xs">
            <div class="flex items-center gap-1.5 text-botanical-600 font-mono text-[11px] mb-1">
              <Palette class="w-3.5 h-3.5 text-botanical-600" />
              <span>Nuansa Warna</span>
            </div>
            <p class="font-semibold text-stone-800">{product.colorTheme}</p>
          </div>

          <div class="col-span-2 p-3.5 rounded-xl border border-stone-200 bg-white shadow-2xs">
            <div class="flex items-center gap-1.5 text-botanical-600 font-mono text-[11px] mb-1">
              <Layers class="w-3.5 h-3.5 text-botanical-600" />
              <span>Wrapping & Finishing</span>
            </div>
            <p class="font-semibold text-stone-800">{product.wrappingMaterial}</p>
          </div>
        </div>

        <!-- Flower Composition List -->
        <div class="space-y-2">
          <div class="flex items-center gap-1.5 font-mono text-xs font-bold text-botanical-800 uppercase tracking-wide">
            <Sparkles class="w-3.5 h-3.5 text-botanical-600" />
            <span>Komposisi Rangkaian Bunga:</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {#each product.flowerComposition as stem}
              <div class="flex items-center gap-2 p-2.5 rounded-lg bg-botanical-50 border border-botanical-200 text-xs text-botanical-900 font-medium">
                <Check class="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{stem}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Atelier Standard Box -->
        <div class="p-4 rounded-xl bg-botanical-900 text-white text-xs space-y-2 border border-botanical-700 shadow-xs">
          <div class="flex items-center gap-1.5 font-serif font-bold text-white text-sm">
            <HeartHandshake class="w-4 h-4 text-[#A8D5BA]" />
            <span>Standar Pengerjaan {studio.name}</span>
          </div>
          <ul class="space-y-1 text-[#D1E6D8] text-[11px] list-disc list-inside">
            <li>Gratis kartu ucapan cetak premium dengan amplop segel wax personal.</li>
            <li>Pengepakan kokoh menggunakan box tebal khusus kurir instan dan kargo luar kota.</li>
            <li>Bisa request warna pita satin dan kertas pembungkus tanpa biaya tambahan.</li>
          </ul>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="p-4 border-t border-stone-100 bg-[#FCFBF8] flex flex-wrap items-center gap-2">
        <a
          href="/koleksi/{product.slug}"
          class="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
        >
          <span>Buka Halaman Lengkap</span>
          <ExternalLink class="w-3.5 h-3.5" />
        </a>
        <a
          href={waOrderUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-botanical-800 hover:bg-botanical-900 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-[0.99] border border-botanical-950/20"
        >
          <MessageCircle class="w-4 h-4 fill-white" />
          <span>Pesan via WhatsApp</span>
        </a>
      </div>
    </div>
  </div>
{/if}

