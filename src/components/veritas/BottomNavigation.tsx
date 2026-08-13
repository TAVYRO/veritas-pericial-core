import { useNavigate, useLocation } from "@tanstack/react-router";
import { Home, Briefcase, Mic, Zap, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Início", icon: Home, route: "/app" },
    { label: "Casos", icon: Briefcase, route: "/app/cases" },
    { label: "Gravar", icon: Mic, route: "/app/record", isCenter: true },
    { label: "Veritas", icon: Zap, route: "/app/veritas" },
    { label: "Perfil", icon: User, route: "/app/profile" },
  ];

  const isActive = (route: string) => {
    if (route === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(route);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-veritas-graphite-dark/95 backdrop-blur-xl border-t border-white/5 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-20 items-stretch">
        {navItems.map((item) => {
          const active = isActive(item.route);
          
          if (item.isCenter) {
            return (
              <div key={item.route} className="relative flex justify-center">
                <div className="absolute -top-6 flex flex-col items-center">
                  <div className="relative group">
                    <div className={cn(
                      "absolute inset-0 bg-veritas-electric/20 rounded-full blur-xl transition-opacity",
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )} />
                    <Button 
                      className={cn(
                        "w-14 h-14 rounded-full bg-veritas-electric veritas-button-glow relative z-10 p-0 shadow-2xl shadow-veritas-electric/40 transition-transform active:scale-90",
                        active && "ring-2 ring-white/20"
                      )}
                      onClick={() => navigate({ to: item.route as any })}
                    >
                      <item.icon className="w-7 h-7 text-white" />
                    </Button>
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold mt-1 transition-colors",
                    active ? "text-veritas-electric" : "text-veritas-silver/40"
                  )}>
                    {item.label}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <button
              key={item.route}
              onClick={() => navigate({ to: item.route as any })}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors min-w-0 px-1 outline-none",
                active ? "text-veritas-electric" : "text-veritas-silver/40"
              )}
            >
              <item.icon className={cn("w-6 h-6 transition-transform", active && "scale-110")} />
              <span className="text-[10px] font-bold truncate w-full text-center">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
