<script lang="ts">
  import type { FlowerProduct } from '../../domain/types';

  interface Props {
    product: FlowerProduct;
    variant?: 'card' | 'modal' | 'hero';
  }

  const { product, variant = 'card' }: Props = $props();

  const categoryTheme = $derived.by(() => {
    switch (product.category) {
      case 'Engagement':
        return {
          bg: 'bg-[#F2F7F3]',
          border: 'border-softGreen-300',
          badgeBg: 'bg-softGreen-200 text-softGreen-950 border-softGreen-400',
          ring: 'border-softGreen-500'
        };
      case 'Graduation':
        return {
          bg: 'bg-[#F2F5FB]',
          border: 'border-softBlue-300',
          badgeBg: 'bg-softBlue-200 text-softBlue-950 border-softBlue-400',
          ring: 'border-softBlue-500'
        };
      case 'Wedding':
        return {
          bg: 'bg-[#FDF2F5]',
          border: 'border-softPink-300',
          badgeBg: 'bg-softPink-200 text-softPink-950 border-softPink-400',
          ring: 'border-softPink-500'
        };
      default:
        return {
          bg: 'bg-[#FAF6EC]',
          border: 'border-softYellow-300',
          badgeBg: 'bg-softYellow-200 text-softYellow-950 border-softYellow-400',
          ring: 'border-softYellow-500'
        };
    }
  });

  const flowersSummary = $derived(
    product.flowerComposition?.slice(0, 2).join(' • ') || 'Kuntum Segar Pilihan Atelier'
  );
</script>

<div
  class="relative w-full h-full overflow-hidden select-none flex flex-col items-center justify-between p-2.5 sm:p-4 {categoryTheme.bg} border {categoryTheme.border} transition-all duration-300"
>
  <!-- Animated Luxury Shimmer Beam -->
  <div class="atelier-shimmer-beam"></div>

  <!-- Subtle Vintage Border Frame -->
  <div class="absolute inset-1.5 sm:inset-2 border border-black/5 rounded-xl pointer-events-none"></div>

  <!-- Top-Right: Atelier Hallmark Status Badge (Opposite to top-left SKU to prevent ANY overlap) -->
  <div class="absolute top-2 right-2 z-10">
    <span
      class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-sans text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider shadow-2xs border bg-white/95 text-stone-700 border-stone-200/90"
    >
      <span class="text-amber-600 text-[9px]">✦</span>
      <span>Kurasi Foto</span>
    </span>
  </div>

  <!-- Center: Pearl Store Flowers Medallion & Brand Identity (Compact & Scaled for Mobile) -->
  <div class="relative z-10 flex flex-col items-center text-center my-auto pt-5 sm:pt-4 pb-1">
    <!-- Outer Medallion Halo with Gold Accent Ring -->
    <div
      class="relative {variant === 'modal' ? 'w-10 h-10 sm:w-14 sm:h-14' : 'w-11 h-11 sm:w-14 sm:h-14'} rounded-full p-0.5 bg-white shadow-sm border-2 border-amber-300/80 mb-1.5 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
    >
      <img
        src="/images/pearl_profile_avatar.jpg"
        alt="Pearl Store Flowers Official Avatar"
        width="56"
        height="56"
        class="w-full h-full rounded-full object-cover border border-stone-200"
        loading="eager"
      />
      <!-- Little Gold Star Sparkle -->
      <span class="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 text-stone-900 text-[8px] font-bold flex items-center justify-center shadow-xs">
        ✦
      </span>
    </div>

    <h4 class="font-serif font-bold text-xs sm:text-sm text-stone-900 tracking-tight leading-tight">
      Pearl Store Flowers
    </h4>
    <p class="font-sans text-[8px] sm:text-[9px] text-stone-500 uppercase tracking-widest font-extrabold mt-0.5">
      Foto Dalam Kurasi
    </p>
  </div>

  <!-- Bottom: Compact Single Pill for Florals & Availability -->
  <div class="relative z-10 w-full flex justify-center pb-0.5">
    <div class="inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-sans font-medium text-stone-700 bg-white/90 border border-stone-200/90 px-2 py-0.5 rounded-full shadow-2xs max-w-[92%]">
      <span class="shrink-0 text-amber-600 text-[9px]">💐</span>
      <span class="truncate">{flowersSummary}</span>
    </div>
  </div>
</div>

<style>
  .atelier-shimmer-beam {
    position: absolute;
    top: 0;
    left: -150%;
    width: 150%;
    height: 100%;
    background: linear-gradient(
      115deg,
      transparent 20%,
      rgba(255, 255, 255, 0.45) 50%,
      transparent 80%
    );
    animation: atelier-shimmer 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    pointer-events: none;
    z-index: 5;
  }

  @keyframes atelier-shimmer {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(200%);
    }
  }
</style>

