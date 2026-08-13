import { usePWAMode } from "@/hooks/use-pwa-mode";
import { Info, X } from "lucide-react";
import { useState, useEffect } from "react";

export function PWABrowserNotice() {
  const { displayMode } = usePWAMode();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if in browser mode and not recently dismissed
    if (displayMode === 'browser') {
      const dismissed = localStorage.getItem('veritas-pwa-notice-dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
      }
    return undefined;
  }, [displayMode]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('veritas-pwa-notice-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-6 left-6 right-6 z-[100] animate-fade-in-down">
      <div className="bg-veritas-graphite/95 backdrop-blur-xl border border-veritas-electric/20 p-4 rounded-2xl shadow-2xl flex items-start gap-3">
        <div className="p-2 rounded-full bg-veritas-electric/10 text-veritas-electric shrink-0">
          <Info className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-white">Experiência Profissional</h4>
          <p className="text-xs text-veritas-silver/60 mt-0.5">
            Instale o Veritas na sua tela inicial para usar em tela cheia e ter uma experiência mais fluida.
          </p>
        </div>
        <button 
          onClick={handleDismiss}
          className="p-1 text-veritas-silver/40 hover:text-veritas-silver transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
