<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Search,
    RefreshCcw,
    Box,
    Info,
    MessageCircle,
    CheckCircle2,
    Sparkles,
    ExternalLink,
    Flower2,
    GraduationCap,
    Sun,
    Leaf,
    Gem,
    Gift
  } from 'lucide-svelte';
  import type { FlowerProduct, ProductCategory, StudioInfo } from '../../domain/types';
  import {
    TOTAL_CATALOG_PRODUCTS_COUNT,
    SEARCH_DEBOUNCE_DELAY_MS,
    IMAGE_TARGET_WIDTH_PX,
    IMAGE_TARGET_QUALITY_PERCENT,
    ABOVE_THE_FOLD_PRIORITY_COUNT,
    QUICK_SEARCH_SUGGESTIONS
  } from '../../domain/constants';
  import { createCatalogSearchEngine } from '../../application/search-engine';
  import { createWhatsAppOrderLink, createWhatsAppConsultLink } from '../../application/whatsapp';
  import { optimizeImageUrl } from '../../application/image-optimizer';
  import ProductQuickModal from './ProductQuickModal.svelte';
  import AtelierProductSkeleton from './AtelierProductSkeleton.svelte';

  interface Props {
    products: readonly FlowerProduct[];
    studio: StudioInfo;
  }

  let { products, studio }: Props = $props();

  let activeCategory: ProductCategory = $state('Semua');
  let rawSearchQuery: string = $state('');
  let debouncedSearchQuery: string = $state('');
  let selectedProduct: FlowerProduct | null = $state(null);
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  // MiniSearch reactive instance
  const searchEngine = $derived(createCatalogSearchEngine(products));

  function handleSearchInput(e: Event) {
    const target = e.target as HTMLInputElement;
    rawSearchQuery = target.value;

    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      debouncedSearchQuery = rawSearchQuery;
    }, SEARCH_DEBOUNCE_DELAY_MS);
  }

  function handleQuickChipClick(query: string) {
    rawSearchQuery = query;
    debouncedSearchQuery = query;
  }

  function resetFilters() {
    activeCategory = 'Semua';
    rawSearchQuery = '';
    debouncedSearchQuery = '';
  }

  // Reactive matching products
  const filteredProducts = $derived.by(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'Semua') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // MiniSearch multi-token query
    const trimmed = debouncedSearchQuery.trim();
    if (trimmed.length > 0) {
      const matchedIds = new Set(searchEngine.search(trimmed));
      result = result.filter((p) => matchedIds.has(p.id));
    }

    return result;
  });

  // Category counts
  const categories: readonly { name: ProductCategory; count: number }[] = $derived.by(() => {
    return [
      { name: 'Semua', count: products.length },
      { name: 'Wedding', count: products.filter((p) => p.category === 'Wedding').length },
      { name: 'Engagement', count: products.filter((p) => p.category === 'Engagement').length },
      { name: 'Graduation', count: products.filter((p) => p.category === 'Graduation').length },
      { name: 'Custom', count: products.filter((p) => p.category === 'Custom').length },
    ];
  });

  /** Solid Soft Color Helpers: Richer & Defined Solid Soft Palette (Zero Gradient Policy) */
  function getCategoryBadgeClasses(cat: string): string {
    switch (cat) {
      case 'Wedding':
        return 'bg-softPink-200 text-softPink-950 border-2 border-softPink-400 font-bold shadow-2xs';
      case 'Engagement':
        return 'bg-softGreen-200 text-softGreen-950 border-2 border-softGreen-400 font-bold shadow-2xs';
      case 'Graduation':
        return 'bg-softBlue-200 text-softBlue-950 border-2 border-softBlue-400 font-bold shadow-2xs';
      case 'Custom':
        return 'bg-softYellow-200 text-softYellow-950 border-2 border-softYellow-400 font-bold shadow-2xs';
      default:
        return 'bg-stone-200 text-stone-900 border-2 border-stone-400 font-bold shadow-2xs';
    }
  }

  function getCategoryTabClasses(catName: ProductCategory, isActive: boolean): string {
    if (isActive) {
      switch (catName) {
        case 'Wedding':
          return 'bg-softPink-200 text-softPink-950 border-2 border-softPink-500 font-extrabold shadow-xs';
        case 'Engagement':
          return 'bg-softGreen-200 text-softGreen-950 border-2 border-softGreen-500 font-extrabold shadow-xs';
        case 'Graduation':
          return 'bg-softBlue-200 text-softBlue-950 border-2 border-softBlue-500 font-extrabold shadow-xs';
        case 'Custom':
          return 'bg-softYellow-200 text-softYellow-950 border-2 border-softYellow-500 font-extrabold shadow-xs';
        default:
          return 'bg-stone-900 text-white font-extrabold shadow-xs border-2 border-stone-900';
      }
    } else {
      switch (catName) {
        case 'Wedding':
          return 'bg-softPink-100 hover:bg-softPink-200 text-softPink-950 border-2 border-softPink-400 font-bold';
        case 'Engagement':
          return 'bg-softGreen-100 hover:bg-softGreen-200 text-softGreen-950 border-2 border-softGreen-400 font-bold';
        case 'Graduation':
          return 'bg-softBlue-100 hover:bg-softBlue-200 text-softBlue-950 border-2 border-softBlue-400 font-bold';
        case 'Custom':
          return 'bg-softYellow-100 hover:bg-softYellow-200 text-softYellow-950 border-2 border-softYellow-400 font-bold';
        default:
          return 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-2 border-stone-400 font-bold';
      }
    }
  }

  function getQuickChipClasses(colorTheme: string, isActive: boolean): string {
    const base = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-bold transition-all duration-150 border-2 cursor-pointer shadow-2xs';
    switch (colorTheme) {
      case 'softPink':
        return isActive
          ? `${base} bg-softPink-300 text-softPink-950 border-softPink-500 shadow-xs`
          : `${base} bg-softPink-200 hover:bg-softPink-300 text-softPink-950 border-softPink-400`;
      case 'softBlue':
        return isActive
          ? `${base} bg-softBlue-300 text-softBlue-950 border-softBlue-500 shadow-xs`
          : `${base} bg-softBlue-200 hover:bg-softBlue-300 text-softBlue-950 border-softBlue-400`;
      case 'softYellow':
        return isActive
          ? `${base} bg-softYellow-300 text-softYellow-950 border-softYellow-500 shadow-xs`
          : `${base} bg-softYellow-200 hover:bg-softYellow-300 text-softYellow-950 border-softYellow-400`;
      case 'softGreen':
      default:
        return isActive
          ? `${base} bg-softGreen-300 text-softGreen-950 border-softGreen-500 shadow-xs`
          : `${base} bg-softGreen-200 hover:bg-softGreen-300 text-softGreen-950 border-softGreen-400`;
    }
  }

  const emptyWaConsultUrl = $derived(
    createWhatsAppConsultLink(
      studio,
      debouncedSearchQuery ? `Pencarian Kustom: ${debouncedSearchQuery}` : 'Konsultasi Katalog'
    )
  );
</script>

<section id="katalog" class="w-full">
  <!-- Interactive Category Pills & Search Controls in Solid Soft Palette -->
  <div class="sticky top-0 z-30 bg-white/95 backdrop-blur-md py-4 border-b border-stone-200/90 mb-6 transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3.5">
      <!-- Search Input with Typo Tolerance Indicator -->
      <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-softGreen-900">
          <Search class="w-4 h-4" strokeWidth={2.75} />
        </div>
        <input
          type="text"
          value={rawSearchQuery}
          oninput={handleSearchInput}
          placeholder="Cari buket (misal: Mawar Pink, Sunflower, PSF-WED-01, Rustic, Wisuda)..."
          class="w-full pl-10 pr-10 py-3 rounded-2xl bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-softGreen-300 focus:border-softGreen-300 shadow-2xs font-sans transition-all"
        />
        {#if rawSearchQuery}
          <button
            type="button"
            onclick={() => {
              rawSearchQuery = '';
              debouncedSearchQuery = '';
            }}
            class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700"
            aria-label="Bersihkan pencarian"
          >
            <RefreshCcw class="w-4 h-4" strokeWidth={2.75} />
          </button>
        {/if}
      </div>

      <!-- Quick Search Suggestion Pills (Smooth Momentum Scrolling & Centering) -->
      <div
        class="no-swipe flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
        style="-webkit-overflow-scrolling: touch; overscroll-behavior-x: contain; touch-action: pan-x pan-y;"
      >
        <span class="text-[11px] font-sans text-stone-500 shrink-0 font-bold uppercase tracking-wider">
          Rekomendasi:
        </span>
        {#each QUICK_SEARCH_SUGGESTIONS as chip}
          {@const isActive = debouncedSearchQuery.toLowerCase() === chip.query.toLowerCase()}
          <button
            type="button"
            onclick={(e) => {
              handleQuickChipClick(chip.query);
              (e.currentTarget as HTMLElement)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }}
            class={getQuickChipClasses(chip.colorTheme, isActive)}
            title={chip.description}
          >
            {#if chip.iconType === 'flower'}
              <Flower2 class="w-3.5 h-3.5 shrink-0" strokeWidth={2.75} />
            {:else if chip.iconType === 'graduation'}
              <GraduationCap class="w-3.5 h-3.5 shrink-0" strokeWidth={2.75} />
            {:else if chip.iconType === 'sun'}
              <Sun class="w-3.5 h-3.5 shrink-0" strokeWidth={2.75} />
            {:else if chip.iconType === 'leaf'}
              <Leaf class="w-3.5 h-3.5 shrink-0" strokeWidth={2.75} />
            {:else if chip.iconType === 'gem'}
              <Gem class="w-3.5 h-3.5 shrink-0" strokeWidth={2.75} />
            {:else if chip.iconType === 'gift'}
              <Gift class="w-3.5 h-3.5 shrink-0" strokeWidth={2.75} />
            {/if}
            <span class="font-bold">{chip.label}</span>
          </button>
        {/each}
      </div>

      <!-- Category Filter Tabs: Smooth Momentum Scrolling & Auto-Centering -->
      <div
        class="no-swipe flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1"
        style="-webkit-overflow-scrolling: touch; overscroll-behavior-x: contain; touch-action: pan-x pan-y;"
      >
        {#each categories as cat}
          {@const isActive = activeCategory === cat.name}
          <button
            type="button"
            onclick={(e) => {
              activeCategory = cat.name;
              (e.currentTarget as HTMLElement)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }}
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-sans whitespace-nowrap transition-all duration-150 {getCategoryTabClasses(cat.name, isActive)}"
          >
            {#if cat.name === 'Wedding'}
              <Flower2 class="w-3.5 h-3.5 shrink-0" strokeWidth={2.75} />
            {:else if cat.name === 'Engagement'}
              <Leaf class="w-3.5 h-3.5 shrink-0" strokeWidth={2.75} />
            {:else if cat.name === 'Graduation'}
              <GraduationCap class="w-3.5 h-3.5 shrink-0" strokeWidth={2.75} />
            {:else if cat.name === 'Custom'}
              <Gift class="w-3.5 h-3.5 shrink-0" strokeWidth={2.75} />
            {:else}
              <Sparkles class="w-3.5 h-3.5 shrink-0" strokeWidth={2.75} />
            {/if}
            <span>{cat.name}</span>
            <span
              class="px-1.5 py-0.2 rounded-full text-[10px] {isActive
                ? 'bg-black/10 font-bold'
                : 'bg-stone-100 text-stone-600'}"
            >
              {cat.count}
            </span>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Active Result Status Bar -->
    <div class="flex items-center justify-between pb-3.5 mb-5 border-b border-stone-200 text-xs text-stone-500">
      <div class="flex items-center gap-2 font-sans flex-wrap">
        <span class="font-medium text-stone-700">
          Menampilkan {filteredProducts.length} dari {products.length} koleksi buket
        </span>
        {#if activeCategory !== 'Semua'}
          <span class="text-stone-300">•</span>
          <span class="inline-flex items-center px-2 py-0.5 rounded-md border text-[11px] font-semibold {getCategoryBadgeClasses(activeCategory)}">
            Koleksi {activeCategory}
          </span>
        {/if}
        {#if debouncedSearchQuery}
          <span class="text-stone-300">•</span>
          <span class="text-stone-700 italic">
            Kata kunci &ldquo;{debouncedSearchQuery}&rdquo;
          </span>
        {/if}
      </div>

      {#if activeCategory !== 'Semua' || debouncedSearchQuery}
        <button
          type="button"
          onclick={resetFilters}
          class="inline-flex items-center gap-1.5 font-sans text-xs text-softGreen-800 hover:text-softGreen-900 font-semibold transition-colors"
        >
          <RefreshCcw class="w-3 h-3" />
          <span>Reset Filter</span>
        </button>
      {/if}
    </div>

    <!-- Product Grid: 2 Columns on Mobile, 4 Columns on Desktop with Refined Proportions -->
    {#if filteredProducts.length > 0}
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {#each filteredProducts as product, index (product.id)}
          {@const isPriority = index < ABOVE_THE_FOLD_PRIORITY_COUNT}
          {@const optimizedImg = product.imageUrl ? optimizeImageUrl(product.imageUrl, IMAGE_TARGET_WIDTH_PX, IMAGE_TARGET_QUALITY_PERCENT) : ''}
          {@const waLink = createWhatsAppOrderLink(product, studio.whatsappNumber, studio.name)}

          <article class="group bg-white rounded-2xl border border-stone-200 shadow-2xs hover:shadow-xl hover:border-softGreen-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div>
              <!-- Bouquet Photography (Accessible Button - Zero Gradient Policy) -->
              <button
                type="button"
                class="w-full text-left relative aspect-[4/5] overflow-hidden bg-stone-100 cursor-pointer block p-0 border-0"
                onclick={() => (selectedProduct = product)}
                aria-label="Lihat spesifikasi {product.title}"
              >
                {#if optimizedImg}
                  <img
                    src={optimizedImg}
                    alt={product.title}
                    loading={isPriority ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchpriority={isPriority ? 'high' : 'auto'}
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                {:else}
                  <AtelierProductSkeleton {product} />
                {/if}
                <div class="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex justify-center z-10">
                  <span class="inline-flex items-center gap-1.5 text-xs text-stone-900 font-medium bg-white px-3 py-1.5 rounded-xl shadow-xs border border-stone-200">
                    <Info class="w-3.5 h-3.5 text-softGreen-800" strokeWidth={2.75} />
                    <span>Lihat Spesifikasi</span>
                  </span>
                </div>
                <div class="absolute top-2 left-2 z-10">
                  <span class="font-sans text-[9px] sm:text-[10px] font-semibold tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-white text-stone-800 shadow-xs border border-stone-200">
                    {product.code}
                  </span>
                </div>
              </button>

              <!-- Card Body with Solid Soft Category Pill -->
              <div class="p-2.5 sm:p-4 flex flex-col space-y-1.5 sm:space-y-2.5">
                <div class="flex items-center justify-between gap-1 text-xs">
                  <span class="font-sans text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold px-1.5 py-0.5 rounded-md border whitespace-nowrap shrink-0 {getCategoryBadgeClasses(product.category)}">
                    {product.category}
                  </span>
                  <span class="font-sans text-[10px] sm:text-[11px] text-stone-500 hidden sm:flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                    <Box class="w-3.5 h-3.5 text-stone-600 shrink-0" strokeWidth={2.75} />
                    <span>{product.dimension.split(',')[0]}</span>
                  </span>
                </div>

                <h3 class="font-serif text-xs sm:text-base font-bold text-stone-900 leading-snug">
                  <button
                    type="button"
                    onclick={() => (selectedProduct = product)}
                    class="text-left group-hover:text-softGreen-800 transition-colors cursor-pointer line-clamp-2 min-h-[2rem] sm:min-h-[2.6rem] block w-full"
                  >
                    {product.title}
                  </button>
                </h3>

                <!-- Composition Chips: Desktop Only for Clean Mobile Density -->
                <div class="hidden sm:block space-y-1.5 pt-2 border-t border-stone-100">
                  <div class="flex items-center justify-between text-[11px] font-sans text-stone-600 font-medium">
                    <span>Komposisi Rangkaian:</span>
                    {#if product.flowerComposition.length > 2}
                      <span class="text-[10px] text-stone-400 font-sans font-normal">
                        +{product.flowerComposition.length - 2} varian
                      </span>
                    {/if}
                  </div>
                  <div class="flex flex-wrap gap-1 min-h-[1.6rem]">
                    {#each product.flowerComposition.slice(0, 2) as flower}
                      <span class="inline-block text-[11px] bg-stone-50 text-stone-700 px-2 py-0.5 rounded-md border border-stone-200 font-medium whitespace-nowrap">
                        {flower}
                      </span>
                    {/each}
                    {#if product.flowerComposition.length > 2}
                      <button
                        type="button"
                        onclick={() => (selectedProduct = product)}
                        class="inline-block text-[10px] font-sans bg-stone-100 hover:bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded-md border border-stone-200 transition-colors cursor-pointer font-medium"
                        title="Klik untuk melihat komposisi lengkap"
                      >
                        +{product.flowerComposition.length - 2}
                      </button>
                    {/if}
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Action Footer -->
            <div class="p-2.5 sm:p-4 pt-2 sm:pt-3 border-t border-stone-100 bg-[#FCFBF8]">
              <div class="flex items-baseline justify-between mb-2">
                <div>
                  <span class="font-sans text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-400 block font-medium">
                    Mulai Dari
                  </span>
                  <span class="font-serif text-xs sm:text-lg font-bold text-stone-900 tracking-tight">
                    {product.priceDisplay}
                  </span>
                </div>

                <div class="flex items-center gap-1">
                  <a
                    href="/koleksi/{product.slug}"
                    class="text-[11px] sm:text-xs font-medium text-stone-500 hover:text-softGreen-800 p-1 sm:p-1.5 rounded-lg hover:bg-stone-100 transition-colors inline-flex items-center gap-1"
                    title="Buka halaman permanen buket ini"
                  >
                    <span class="hidden sm:inline">Detail</span>
                    <ExternalLink class="w-3.5 h-3.5" strokeWidth={2.75} />
                  </a>
                </div>
              </div>

              <!-- WhatsApp Direct Order CTA (Solid Soft Green) -->
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl bg-softGreen-800 hover:bg-softGreen-700 text-white font-bold text-[11px] sm:text-xs shadow-xs hover:shadow transition-all active:scale-[0.98] border border-softGreen-900"
                title="Pesan buket ini langsung via WhatsApp"
              >
                <MessageCircle class="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" strokeWidth={2.75} />
                <span class="sm:hidden">Pesan</span>
                <span class="hidden sm:inline">Pesan via WhatsApp</span>
              </a>
            </div>
          </article>
        {/each}
      </div>
    {:else}
      <!-- Empty State with Concierge WhatsApp Fallback (Solid Soft Yellow - Zero Gradient) -->
      <div class="text-center py-16 px-6 bg-softYellow-100 border-2 border-softYellow-400 rounded-3xl max-w-lg mx-auto my-8 space-y-4 shadow-2xs">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-white border-2 border-softYellow-400 flex items-center justify-center text-softYellow-900 shadow-2xs">
          <Search class="w-7 h-7" strokeWidth={2.75} />
        </div>
        <div class="space-y-1.5">
          <h3 class="font-serif font-bold text-stone-900 text-lg">
            Tidak Menemukan Rangkaian yang Pas?
          </h3>
          <p class="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
            Tidak ada buket yang persis cocok dengan &ldquo;{debouncedSearchQuery}&rdquo;. Pearl Store Flowers menerima pesanan custom sesuai tema warna, budget, atau foto referensi impian Anda.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          <button
            type="button"
            onclick={resetFilters}
            class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 font-sans text-xs font-semibold transition-colors"
          >
            Tampilkan Semua Buket
          </button>
          <a
            href={emptyWaConsultUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-softGreen-800 hover:bg-softGreen-700 text-white font-sans text-xs font-semibold shadow-xs transition-colors"
          >
            <MessageCircle class="w-4 h-4 fill-white" />
            <span>Konsultasi Custom via WA</span>
          </a>
        </div>
      </div>
    {/if}
  </div>
</section>

<!-- Quick View Modal Island -->
<ProductQuickModal
  product={selectedProduct}
  studio={studio}
  onClose={() => (selectedProduct = null)}
/>
