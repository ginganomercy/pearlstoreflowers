import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Flower2, RefreshCw, MessageCircle, AlertTriangle } from 'lucide-react';

interface Props {
  readonly children: ReactNode;
  readonly fallbackWhatsAppNumber?: string;
}

interface State {
  readonly hasError: boolean;
  readonly error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Structured error logging for diagnostics without leaking sensitive data
    console.error('[ShelwaCraft:ErrorBoundary] Uncaught component error:', {
      name: error.name,
      message: error.message,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      const emergencyWa = this.props.fallbackWhatsAppNumber || '6281234567890';
      const waUrl = `https://wa.me/${emergencyWa}?text=${encodeURIComponent(
        'Halo Shelwa Craft, saya mengalami kendala saat membuka katalog di web. Mohon dibantu untuk pemesanan manual.'
      )}`;

      return (
        <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl border border-stone-200 shadow-xl p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#EBF4EB] border border-[#CCE2CC] text-[#183324] flex items-center justify-center">
              <Flower2 className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                <AlertTriangle className="w-3.5 h-3.5" />
                Gangguan Tampilan Sementara
              </span>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Mohon Maaf, Terjadi Kendala
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Antarmuka mengalami kendala tak terduga saat memuat komponen. Anda dapat memuat ulang halaman atau langsung berkonsultasi via WhatsApp.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#183324] hover:bg-[#12261B] text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Muat Ulang Halaman</span>
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF9F5] text-stone-700 text-xs font-semibold transition-colors border border-stone-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Hubungi Admin WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
