<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Search,
    RefreshCcw,
    Sparkles,
    Box,
    Info,
    MessageCircle,
    CheckCircle2,
    SlidersHorizontal,
    ExternalLink
  } from 'lucide-svelte';
  import type { FlowerProduct, ProductCategory, StudioInfo, CategorySummary } from '../../domain/types';
  import {
    TOTAL_CATALOG_PRODUCTS_COUNT,
    SEARCH_DEBOUNCE_DELAY_MS,
    IMAGE_TARGET_WIDTH_PX,
    IMAGE_TARGET_QUALITY_PERCENT,
    ABOVE_THE_FOLD_PRIORITY_COUNT
  } from '../../domain/constants';
  import { createCatalogSearchEngine } from '../../application/search-engine';
  import { createWhatsAppOrderLink } from '../../application/whatsapp';
  import { optimizeImageUrl } from '../../application/image-optimizer';
  import ProductQuickModal from './ProductQuickModal.svelte';

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

    // MiniSearch fuzzy query
    const trimmed = debouncedSearchQuery.trim();
    if (trimmed.length > 0) {
      const matchedIds = new Set(searchEngine.search(trimmed));
      // Fallback substring search to ensure 100% recall
      const lower = trimmed.toLowerCase();
      result = result.filter((p) => {
        if (matchedIds.has(p.id)) return true;
        return (
          p.title.toLowerCase().includes(lower) ||
          p.code.toLowerCase().includes(lower) ||
          p.flowerComposition.some((f) => f.toLowerCase().includes(lower)) ||
          p.description.toLowerCase().includes(lower)
        );
      });
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
</script>

<section id="katalog" class="w-full">
  <!-- Interactive Category Pills & Search Controls -->
  <div class="sticky top-0 z-30 bg-atelier-bg/95 backdrop-blur-md py-4 border-b border-botanical-200/80 mb-8 transition-all">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
      <!-- Search Input with Typo Tolerance Indicator -->
      <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-botanical-600">
          <Search class="w-4 h-4" />
        </div>
        <input
          type="text"
          value={rawSearchQuery}
          oninput={handleSearchInput}
          placeholder="Cari buket (misal: Mawar Putih, Sunflower, PSF-WED-01, Rustic)..."
          class="w-full pl-10 pr-10 py-3 rounded-2xl bg-white border border-botanical-200 text-stone-900 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-botanical-600 focus:border-transparent shadow-2xs font-sans transition-all"
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
            <RefreshCcw class="w-4 h-4" />
          </button>
        {/if}
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {#each categories as cat}
          <button
            type="button"
            onclick={() => (activeCategory = cat.name)}
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 {activeCategory === cat.name
              ? 'bg-botanical-800 text-white shadow-xs font-semibold'
              : 'bg-white hover:bg-botanical-50 text-stone-700 border border-botanical-200'}"
          >
            <span>{cat.name}</span>
            <span
              class="px-1.5 py-0.2 rounded-full text-[10px] {activeCategory === cat.name
                ? 'bg-botanical-700 text-white'
                : 'bg-botanical-100 text-botanical-800'}"
            >
              {cat.count}
            </span>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <!-- Active Result Status Bar -->
    <div class="flex items-center justify-between pb-4 mb-6 border-b border-botanical-200 text-xs text-stone-500">
      <div class="flex items-center gap-2 font-mono flex-wrap">
        <span class="w-1.5 h-1.5 rounded-full bg-botanical-600 animate-pulse"></span>
        <span class="font-medium text-stone-800">
          Menampilkan {filteredProducts.length} dari {products.length} koleksi buket
        </span>
        {#if activeCategory !== 'Semua'}
          <span class="text-botanical-700 hidden sm:inline font-semibold">
            • [Koleksi: {activeCategory}]
          </span>
        {/if}
        {#if debouncedSearchQuery}
          <span class="text-stone-400 hidden sm:inline">
            • [Pencarian: &ldquo;{debouncedSearchQuery}&rdquo;]
          </span>
        {/if}
      </div>

      {#if activeCategory !== 'Semua' || debouncedSearchQuery}
        <button
          type="button"
          onclick={resetFilters}
          class="inline-flex items-center gap-1.5 font-mono text-xs text-botanical-800 hover:text-botanical-950 font-bold transition-colors underline"
        >
          <RefreshCcw class="w-3 h-3" />
          <span>Reset Filter</span>
        </button>
      {/if}
    </div>

    <!-- Product Grid -->
    {#if filteredProducts.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {#each filteredProducts as product, index (product.id)}
          {@const isPriority = index < ABOVE_THE_FOLD_PRIORITY_COUNT}
          {@const optimizedImg = product.imageUrl ? optimizeImageUrl(product.imageUrl, IMAGE_TARGET_WIDTH_PX, IMAGE_TARGET_QUALITY_PERCENT) : ''}
          {@const waLink = createWhatsAppOrderLink(product, studio.whatsappNumber, studio.name)}

          <article class="group bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-botanical-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div>
              <!-- Bouquet Photography (Accessible Button) -->
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
                {/if}
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span class="inline-flex items-center gap-1 text-xs text-white font-medium bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                    <Info class="w-3.5 h-3.5" />
                    <span>Lihat Spesifikasi Rangkaian</span>
                  </span>
                </div>
                <div class="absolute top-3 left-3">
                  <span class="font-mono text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/95 text-stone-900 shadow-xs border border-white/40">
                    {product.code}
                  </span>
                </div>
              </button>

              <!-- Card Body -->
              <div class="p-4 sm:p-5 flex flex-col space-y-3">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-mono text-[10px] tracking-wider uppercase font-bold text-botanical-800 bg-botanical-100 border border-botanical-200 px-2.5 py-0.5 rounded-md">
                    {product.categoryLabel}
                  </span>
                  <span class="font-mono text-[11px] text-stone-400 flex items-center gap-1">
                    <Box class="w-3 h-3 text-stone-400" />
                    {product.dimension.split(',')[0]}
                  </span>
                </div>

                <h3 class="font-serif text-base sm:text-lg font-bold text-stone-900 line-clamp-1">
                  <button
                    type="button"
                    onclick={() => (selectedProduct = product)}
                    class="text-left group-hover:text-botanical-800 transition-colors cursor-pointer"
                  >
                    {product.title}
                  </button>
                </h3>

                <!-- Composition Chips -->
                <div class="space-y-1.5 pt-1 border-t border-stone-100">
                  <div class="flex items-center gap-1 text-[11px] font-mono text-botanical-700 font-medium">
                    <Sparkles class="w-3.5 h-3.5 text-botanical-600 shrink-0" />
                    <span>Komposisi Bunga:</span>
                  </div>
                  <div class="flex flex-wrap gap-1">
                    {#each product.flowerComposition as flower}
                      <span class="inline-block text-[11px] bg-botanical-100/70 text-botanical-800 px-2 py-0.5 rounded-md border border-botanical-200 font-medium">
                        {flower}
                      </span>
                    {/each}
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Action Footer -->
            <div class="p-4 sm:p-5 pt-3 border-t border-stone-100 bg-[#FCFBF8]">
              <div class="flex items-baseline justify-between mb-3">
                <div>
                  <span class="font-mono text-[10px] uppercase tracking-wider text-stone-400 block">
                    Mulai Dari
                  </span>
                  <span class="font-serif text-xl font-bold text-stone-900 tracking-tight">
                    {product.priceDisplay}
                  </span>
                </div>

                <div class="flex items-center gap-1">
                  <button
                    type="button"
                    onclick={() => (selectedProduct = product)}
                    class="text-xs font-medium text-stone-600 hover:text-botanical-800 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-botanical-100 transition-colors"
                  >
                    <Info class="w-3.5 h-3.5 text-stone-500" />
                    <span>Detail</span>
                  </button>
                  <a
                    href="/koleksi/{product.slug}"
                    class="text-xs font-medium text-stone-500 hover:text-botanical-800 p-1.5 rounded-lg hover:bg-botanical-100 transition-colors"
                    title="Buka halaman permanen buket ini"
                  >
                    <ExternalLink class="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <!-- WhatsApp Direct Order CTA -->
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-botanical-800 hover:bg-botanical-900 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all duration-150 active:scale-[0.99] border border-botanical-950/20"
              >
                <MessageCircle class="w-4 h-4 fill-white" />
                <span>Pesan via WhatsApp</span>
              </a>
            </div>
          </article>
        {/each}
      </div>
    {:else}
      <!-- Empty State -->
      <div class="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-botanical-300 max-w-md mx-auto my-8">
        <div class="w-12 h-12 mx-auto rounded-2xl bg-botanical-100 border border-botanical-200 flex items-center justify-center text-botanical-700 mb-3">
          <Sparkles class="w-6 h-6" />
        </div>
        <h3 class="font-serif font-bold text-stone-900 text-base mb-1">
          Buket Tidak Ditemukan
        </h3>
        <p class="text-xs text-stone-500 mb-4 leading-relaxed">
          Tidak ada buket yang cocok dengan &ldquo;{debouncedSearchQuery}&rdquo;. Silakan ganti kata kunci atau diskusikan pesanan buket kustom Anda langsung dengan florist kami.
        </p>
        <button
          type="button"
          onclick={resetFilters}
          class="px-4 py-2 rounded-xl bg-botanical-800 text-white font-mono text-xs font-semibold hover:bg-botanical-900 transition-colors shadow-xs"
        >
          Tampilkan Semua Koleksi
        </button>
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

