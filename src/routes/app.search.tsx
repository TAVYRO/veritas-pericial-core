import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, ArrowLeft, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/search")({
  component: SearchPage,
});

function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const categories = ["Processo", "Pessoa", "Documento", "Entrevista", "Fonte", "Quesito"];

  return (
    <div className="min-h-[100dvh] veritas-hero-gradient p-6 text-white">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="text-veritas-silver hover:bg-white/5"
          onClick={() => navigate({ to: "/app" })}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-veritas-silver/40" />
          <Input
            autoFocus
            placeholder="Pesquisar..."
            className="pl-11 bg-veritas-graphite/40 border-white/5 focus-visible:ring-veritas-electric/20"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => setQuery("")}
            >
              <X className="w-4 h-4 text-veritas-silver/40" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
          Categorias
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant="outline"
              className="rounded-full bg-white/5 border-white/5 text-xs h-8"
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className="mt-8 text-center text-veritas-silver/20 text-sm">
          Use a busca para localizar rapidamente qualquer informação técnica ou processual em seus
          casos.
        </div>
      </div>
    </div>
  );
}
