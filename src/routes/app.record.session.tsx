import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Mic,
  Pause,
  Play,
  Square,
  Flag,
  AlertCircle,
  CheckCircle2,
  MessageSquare,
  Eye,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/record/session")({
  component: RecordSessionPage,
});

function RecordSessionPage() {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [markers, setMarkers] = useState<string[]>([]);
  const [waveforms, setWaveforms] = useState<number[]>(Array(40).fill(10));
  const requestRef = useRef<number>(undefined);

  // Timer logic
  useEffect(() => {
    let interval: any;
    if (!isPaused) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  // Waveform animation simulation
  useEffect(() => {
    const animate = () => {
      if (!isPaused) {
        setWaveforms((prev) => prev.map(() => Math.max(10, Math.random() * 80)));
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPaused]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const addMarker = (type: string) => {
    setMarkers((prev) => [...prev, type]);
    // In a real app, we'd store the timestamp here
  };

  const markerButtons = [
    {
      label: "Importante",
      color: "bg-veritas-violet/20 text-veritas-violet border-veritas-violet/30",
      icon: <Flag className="w-4 h-4" />,
    },
    {
      label: "Conferir",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      icon: <Info className="w-4 h-4" />,
    },
    {
      label: "Contradição",
      color: "bg-red-500/20 text-red-400 border-red-500/30",
      icon: <AlertCircle className="w-4 h-4" />,
    },
    {
      label: "Observação",
      color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      label: "Sensível",
      color: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      icon: <Eye className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-veritas-graphite-dark pb-[calc(6rem+env(safe-area-inset-bottom))] text-white flex flex-col relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square bg-veritas-electric/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Session Info */}
      <header className="px-6 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-8 text-center space-y-2 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 animate-pulse mb-4">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-[10px] font-black uppercase tracking-widest">Gravando agora</span>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-mono text-veritas-silver/40 uppercase tracking-tighter">
            Proc. 0003512-93.2025.8.16
          </p>
          <h2 className="text-xl font-bold text-veritas-silver">Marta Silva</h2>
          <p className="text-xs text-veritas-electric font-medium">Dra. Mônica Hazama</p>
        </div>
      </header>

      {/* Waveform Visualization */}
      <div className="flex-1 flex items-center justify-center px-8 relative z-10">
        <div className="flex items-center gap-1.5 h-32 w-full justify-center">
          {waveforms.map((h, i) => (
            <div
              key={i}
              className={cn(
                "w-1.5 rounded-full transition-all duration-75",
                isPaused
                  ? "bg-veritas-silver/10"
                  : "bg-veritas-electric shadow-[0_0_15px_rgba(30,174,255,0.3)]",
              )}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* Timer & Controls */}
      <div className="px-6 pt-8 pb-12 text-center space-y-10 relative z-10">
        <div className="space-y-1">
          <span className="text-6xl font-black font-mono tracking-tighter tabular-nums">
            {formatTime(seconds)}
          </span>
          <p className="text-[10px] text-veritas-silver/30 font-bold uppercase tracking-widest">
            Duração da sessão
          </p>
        </div>

        {/* Central Controls */}
        <div className="flex items-center justify-center gap-8">
          <Button
            variant="ghost"
            size="icon"
            className="w-16 h-16 rounded-full border border-white/5 bg-white/5 text-veritas-silver hover:bg-white/10"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? (
              <Play className="w-6 h-6 fill-current" />
            ) : (
              <Pause className="w-6 h-6 fill-current" />
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 bg-veritas-electric/20 rounded-full blur-2xl animate-pulse" />
            <Button
              className="w-24 h-24 rounded-full bg-veritas-electric veritas-button-glow relative z-10 shadow-2xl p-0 hover:scale-105 active:scale-95 transition-transform"
              onClick={() => navigate({ to: "/app/record/complete" })}
            >
              <Square className="w-8 h-8 text-white fill-current" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="w-16 h-16 rounded-full border border-white/5 bg-white/5 text-veritas-silver hover:bg-white/10"
          >
            <Flag className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Quick Markers */}
      <section className="px-6 space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold text-veritas-silver/40 uppercase tracking-widest">
            Marcadores Rápidos
          </h3>
          <span className="text-[10px] font-mono text-veritas-electric/60">
            {markers.length} registrados
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
          {markerButtons.map((btn) => (
            <button
              key={btn.label}
              onClick={() => addMarker(btn.label)}
              className={cn(
                "flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all active:scale-95 shrink-0 min-w-[90px]",
                btn.color,
              )}
            >
              <div className="p-2 rounded-lg bg-black/20">{btn.icon}</div>
              <span className="text-[10px] font-bold uppercase tracking-wider">{btn.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
