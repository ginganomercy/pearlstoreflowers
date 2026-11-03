<script lang="ts">
  import { MessageCircle } from 'lucide-svelte';
  import type { StudioInfo } from '../../domain/types';
  import { createWhatsAppConsultLink } from '../../application/whatsapp';

  interface Props {
    studio: StudioInfo;
  }

  let { studio }: Props = $props();

  const consultWaUrl = $derived(createWhatsAppConsultLink(studio));
</script>

<aside
  aria-label="Pusat Bantuan WhatsApp"
  class="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6"
>
  <a
    href={consultWaUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-softGreen-800 hover:bg-softGreen-700 text-white font-semibold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 border-2 border-white/90 group"
  >
    <MessageCircle class="w-5 h-5 fill-white group-hover:rotate-12 transition-transform duration-200" />
    <span class="hidden xs:inline font-sans tracking-normal">Konsultasi Florist</span>
    <span class="xs:hidden font-sans tracking-normal">Chat Florist</span>
  </a>
</aside>

