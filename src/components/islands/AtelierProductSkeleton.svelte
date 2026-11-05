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
  class="relative w-full h-full overflow-hidden select-none flex flex-col items-center justify-between p-3.5 sm:p-5 {categoryTheme.bg} border {categoryTheme.border} transition-all duration-300 group-hover:scale-[1.01]"
>
  <!-- Animated Luxury Shimmer Beam -->
  <div class="atelier-shimmer-beam"></div>

  <!-- Subtle Vintage Grid Background Pattern -->
  <div class="absolute inset-2 border border-black/5 rounded-xl pointer-events-none"></div>

  <!-- Top: Atelier Signature Hallmark Pill -->
  <div class="relative z-10 flex items-center justify-center w-full pt-1">
    <span
      class="inline-flex items-center gap-1.5 px-2.5 py-0.8 rounded-full font-sans text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest shadow-2xs border bg-white/90 text-stone-800 border-stone-200"
    >
      <span class="text-amber-600 text-[10px]">✦</span>
      <span>Kurasi Atelier 2024</span>
      <span class="text-amber-600 text-[10px]">✦</span>
    </span>
  </div>

  <!-- Center: Pearl Store Flowers Medallion & Brand Identity -->
  <div class="relative z-10 flex flex-col items-center text-center my-auto py-2">
    <!-- Outer Medallion Halo with Gold Accent Ring -->
    <div
      class="relative w-14 h-14 sm:w-18 sm:h-18 rounded-full p-1 bg-white shadow-md border-2 border-amber-300/80 mb-2.5 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
    >
      <img
        src="/images/pearl_profile_avatar.jpg"
        alt="Pearl Store Flowers Official Avatar"
        width="64"
        height="64"
        class="w-full h-full rounded-full object-cover border border-stone-200"
        loading="eager"
      />
      <!-- Little Gold Star Sparkle -->
      <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-stone-900 text-[9px] font-bold flex items-center justify-center shadow-xs">
        ✦
      </span>
    </div>

    <h4 class="font-serif font-bold text-xs sm:text-sm text-stone-900 tracking-tight leading-tight">
      Pearl Store Flowers
    </h4>
    <p class="font-sans text-[9px] sm:text-[10px] text-stone-500 uppercase tracking-widest font-bold mt-0.5">
      Foto Dalam Kurasi Studio
    </p>

    <!-- Flower Composition Micro-Pill -->
    <div class="mt-2.5 px-2.5 py-1 rounded-full bg-white/95 border border-stone-200/90 shadow-2xs max-w-[90%]">
      <p class="font-sans text-[9px] sm:text-[10px] text-stone-700 font-medium truncate">
        💐 {flowersSummary}
      </p>
    </div>
  </div>

  <!-- Bottom: Order Availability Reassurance -->
  <div class="relative z-10 w-full text-center pb-0.5">
    <span class="inline-block text-[9px] sm:text-[10px] font-sans font-semibold text-softGreen-900 bg-softGreen-100/90 border border-softGreen-300 px-2.5 py-0.5 rounded-full shadow-2xs">
      ✓ Rangkaian Siap Dipesan Langsung
    </span>
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

