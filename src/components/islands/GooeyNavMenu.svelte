<script lang="ts">
  import { onMount } from 'svelte';
  import { Store, Flower2, BookOpenCheck, MapPin, Menu, X } from 'lucide-svelte';
  import type { StudioInfo } from '../../domain/types';
  import { createWhatsAppConsultLink } from '../../application/whatsapp';

  interface Props {
    studio: StudioInfo;
    currentPath?: string;
  }

  const { studio, currentPath = '/' }: Props = $props();
  let activePath = $state(currentPath);
  let isOpen = $state(false);

  const consultWaUrl = $derived(createWhatsAppConsultLink(studio, 'Konsultasi Menu Navigasi Mobile'));

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      closeMenu();
    }
  }

  onMount(() => {
    const syncActive = () => {
      if (typeof window !== 'undefined') {
        activePath = window.location.pathname;
      }
    };
    syncActive();
    document.addEventListener('astro:page-load', syncActive);
    return () => {
      document.removeEventListener('astro:page-load', syncActive);
    };
  });

  const navItems = [
    {
      label: 'Beranda',
      href: '/',
      icon: Store,
      bg: 'bg-softGreen-200',
      border: 'border-softGreen-400',
      text: 'text-softGreen-950',
      description: 'Halaman Utama & Showcase Atelier'
    },
    {
      label: 'Koleksi Buket',
      href: '/koleksi',
      icon: Flower2,
      bg: 'bg-softPink-200',
      border: 'border-softPink-400',
      text: 'text-softPink-950',
      description: '21 Rangkaian Buket & Pencarian Lengkap'
    },
    {
      label: 'Panduan Order',
      href: '/panduan',
      icon: BookOpenCheck,
      bg: 'bg-softBlue-200',
      border: 'border-softBlue-400',
      text: 'text-softBlue-950',
      description: 'Alur Pesan, Pengiriman & Segel Lilin'
    },
    {
      label: 'Tentang Atelier',
      href: '/tentang',
      icon: MapPin,
      bg: 'bg-softYellow-200',
      border: 'border-softYellow-400',
      text: 'text-softYellow-950',
      description: 'Kisah Studio, Lokasi Slawi & Jam Buka'
    }
  ];
</script>

<svelte:window onkeydown={handleKeyDown} />

<!-- Mobile Exclusive Dim Backdrop on Open State -->
{#if isOpen}
  <div
    role="button"
    tabindex="-1"
    aria-label="Tutup menu navigasi"
    onclick={closeMenu}
    onkeydown={(e) => e.key === 'Escape' && closeMenu()}
    class="md:hidden fixed inset-0 bg-stone-900/30 z-40 transition-opacity duration-200"
  ></div>
{/if}

<!-- Mobile Exclusive Floating Action Hub (Hidden on Desktop: md:hidden) -->
<nav
  aria-label="Navigasi Menu Utama Mobile"
  class="md:hidden fixed bottom-5 right-4 z-50 flex flex-col items-end select-none pointer-events-auto"
>
  <!-- Interactive Sharp Content Layer (120 FPS GPU Accelerated) -->
  <div class="relative z-10 flex flex-col items-end justify-end p-1">
    <!-- Petals Stack with Organic Staggered Spring Animation -->
    <div
      class="flex flex-col items-end gap-3 mb-3 origin-bottom transition-all duration-300 {isOpen ? 'pointer-events-auto' : 'pointer-events-none'}"
    >
      <!-- Petal 0: Direct WhatsApp Consultation -->
      <div
        style="transition: transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 250ms ease; transition-delay: {isOpen ? '200ms' : '0ms'}; will-change: transform, opacity;"
        class="flex items-center gap-2.5 {isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-75'}"
      >
        <span class="px-3 py-1 rounded-full bg-softGreen-950 text-white font-sans text-xs font-bold border-2 border-softGreen-400 shadow-sm whitespace-nowrap">
          Chat Florist (WA)
        </span>
        <a
          href={consultWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="w-12 h-12 rounded-full bg-softGreen-800 hover:bg-softGreen-700 border-2 border-softGreen-400 text-white flex items-center justify-center shadow-md active:scale-90 transition-transform shrink-0"
          title="Konsultasi cepat via WhatsApp"
          aria-label="Konsultasi cepat via WhatsApp"
        >
          <svg class="w-5 h-5 fill-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.677.15-.201.301-.778.979-.953 1.18-.175.201-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.201-.301.301-.501.101-.201.05-.377-.025-.527-.075-.15-.677-1.631-.928-2.233-.244-.587-.492-.507-.677-.517-.175-.009-.376-.011-.577-.011s-.527.075-.803.377c-.276.301-1.053 1.029-1.053 2.509 0 1.48 1.079 2.909 1.229 3.109.15.201 2.123 3.242 5.143 4.547.718.311 1.279.497 1.716.636.721.23 1.377.197 1.896.12.578-.087 1.78-.728 2.031-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.004 21.75c-1.75 0-3.465-.458-4.978-1.328l-.357-.205-3.699.97 1.002-3.606-.23-.377A9.708 9.708 0 0 1 2.25 12.004c0-5.377 4.377-9.754 9.754-9.754 2.606 0 5.056 1.015 6.899 2.858a9.697 9.697 0 0 1 2.858 6.896c0 5.38-4.377 9.754-9.757 9.754zm0-17.508c-4.275 0-7.754 3.479-7.754 7.758 0 1.365.357 2.698 1.034 3.873l.161.279-.611 2.203 2.261-.593.271.161a7.71 7.71 0 0 0 3.888 1.078c4.277 0 7.757-3.48 7.757-7.758 0-2.072-.807-4.021-2.273-5.487a7.71 7.71 0 0 0-5.488-2.274z"/>
          </svg>
        </a>
      </div>

      <!-- Petals 1-4: Core Page Routes -->
      {#each navItems as item, index}
        {@const cleanPath = activePath.replace(/\/$/, '') || '/'}
        {@const isActive = cleanPath === item.href || (item.href !== '/' && cleanPath.startsWith(item.href))}
        {@const delayMs = isOpen ? (navItems.length - 1 - index) * 50 + 40 : index * 30}
        <div
          style="transition: transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 250ms ease; transition-delay: {delayMs}ms; will-change: transform, opacity;"
          class="flex items-center gap-2.5 {isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-75'}"
        >
          <span class="px-3 py-1 rounded-full bg-white text-stone-900 font-sans text-xs font-bold border-2 border-stone-200 shadow-sm whitespace-nowrap">
            {item.label}
          </span>
          <a
            href={item.href}
            onclick={closeMenu}
            class="w-12 h-12 rounded-full border-2 {item.bg} {item.border} {item.text} flex items-center justify-center shadow-md active:scale-90 transition-transform shrink-0 {isActive ? 'ring-2 ring-stone-900' : ''}"
            title={item.description}
            aria-label={item.label}
          >
            <item.icon class="w-5 h-5 shrink-0" strokeWidth={2.75} />
          </a>
        </div>
      {/each}
    </div>

    <!-- Main Floating Trigger Button: Pearl Bud / Morphing Icon (Menu <-> Close) -->
    <button
      type="button"
      onclick={toggleMenu}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Tutup Menu Atelier' : 'Buka Menu Navigasi Atelier'}
      class="w-14 h-14 rounded-full bg-stone-900 hover:bg-stone-800 text-white border-2 border-stone-800 flex items-center justify-center shadow-lg active:scale-90 transition-all duration-300 z-30 cursor-pointer"
    >
      {#if isOpen}
        <X class="w-6 h-6 text-white shrink-0" strokeWidth={2.75} />
      {:else}
        <Menu class="w-6 h-6 text-white shrink-0" strokeWidth={2.75} />
      {/if}
    </button>
  </div>
</nav>
