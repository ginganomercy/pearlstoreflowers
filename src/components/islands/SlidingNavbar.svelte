<script lang="ts">
  import { onMount, tick } from 'svelte';

  interface Props {
    currentPath?: string;
    totalProducts?: number;
  }

  const { currentPath = '/', totalProducts = 21 }: Props = $props();

  const navLinks = $derived([
    { href: '/', label: 'Beranda' },
    { href: '/koleksi', label: 'Koleksi Buket', badge: totalProducts },
    { href: '/panduan', label: 'Panduan Order' },
    { href: '/tentang', label: 'Tentang Atelier' }
  ]);

  let activePath = $state(currentPath);
  let navContainer: HTMLElement | null = $state(null);
  let linkRefs: (HTMLAnchorElement | null)[] = $state([]);

  let indicatorLeft = $state(0);
  let indicatorWidth = $state(0);
  let isReady = $state(false);
  let isHovered = $state(false);

  function getActiveIndex(): number {
    const cleanPath = activePath.replace(/\/$/, '') || '/';
    const idx = navLinks.findIndex((link) => {
      if (link.href === '/') {
        return cleanPath === '/';
      }
      return cleanPath.startsWith(link.href);
    });
    return idx >= 0 ? idx : 0;
  }

  function updateIndicatorToElement(el: HTMLAnchorElement | null) {
    if (!el || !navContainer) return;
    if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
      requestAnimationFrame(() => {
        if (!el || !navContainer) return;
        const containerRect = navContainer.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        indicatorLeft = elRect.left - containerRect.left;
        indicatorWidth = elRect.width;
      });
    } else {
      const containerRect = navContainer.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      indicatorLeft = elRect.left - containerRect.left;
      indicatorWidth = elRect.width;
    }
  }

  function handleMouseEnter(index: number) {
    isHovered = true;
    updateIndicatorToElement(linkRefs[index]);
  }

  function handleMouseLeave() {
    isHovered = false;
    const activeIdx = getActiveIndex();
    updateIndicatorToElement(linkRefs[activeIdx]);
  }

  function syncActiveIndicator() {
    if (typeof window !== 'undefined') {
      activePath = window.location.pathname;
    }
    const activeIdx = getActiveIndex();
    updateIndicatorToElement(linkRefs[activeIdx]);
  }

  onMount(async () => {
    await tick();
    syncActiveIndicator();

    // Small delay before enabling CSS transitions so initial load doesn't jump
    setTimeout(() => {
      isReady = true;
    }, 50);

    // Listen to Astro ViewTransitions page-load lifecycle to glide pill across route changes
    const onPageLoad = () => {
      syncActiveIndicator();
    };

    document.addEventListener('astro:page-load', onPageLoad);
    window.addEventListener('popstate', onPageLoad);

    return () => {
      document.removeEventListener('astro:page-load', onPageLoad);
      window.removeEventListener('popstate', onPageLoad);
    };
  });
</script>

<nav
  bind:this={navContainer}
  onmouseleave={handleMouseLeave}
  aria-label="Menu Utama Desktop"
  class="relative hidden md:flex items-center gap-1 p-1 rounded-2xl bg-stone-100/80 border border-stone-200 text-xs font-sans font-bold select-none"
>
  <!-- Magnetic Sliding Pill Indicator (Buttery-smooth 120 FPS glide) -->
  <div
    style="
      transform: translate3d({indicatorLeft}px, 0, 0);
      width: {indicatorWidth}px;
      transition: {isReady ? 'transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1), width 260ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 180ms ease' : 'none'};
      will-change: transform, width;
    "
    class="absolute top-1 bottom-1 left-0 rounded-xl bg-softGreen-200 border-2 border-softGreen-400 shadow-2xs pointer-events-none z-0 {indicatorWidth > 0 ? 'opacity-100' : 'opacity-0'}"
  ></div>

  <!-- Navigation Tab Items -->
  {#each navLinks as link, index}
    {@const cleanPath = activePath.replace(/\/$/, '') || '/'}
    {@const isActive = cleanPath === link.href || (link.href !== '/' && cleanPath.startsWith(link.href))}
    <a
      bind:this={linkRefs[index]}
      href={link.href}
      onmouseenter={() => handleMouseEnter(index)}
      class="relative z-10 px-3.5 py-1.5 rounded-xl transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap {isActive ? 'text-softGreen-950 font-extrabold' : 'text-stone-700 hover:text-stone-950'}"
    >
      <span>{link.label}</span>
      {#if link.badge}
        <span
          class="text-[10px] px-1.5 py-0.2 rounded-full font-bold border transition-colors {isActive ? 'bg-white text-softGreen-950 border-softGreen-400' : 'bg-softPink-200 text-softPink-950 border-softPink-400'}"
        >
          {link.badge}
        </span>
      {/if}
    </a>
  {/each}
</nav>

