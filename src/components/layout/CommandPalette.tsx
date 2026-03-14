"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { FERRAMENTAS, CATEGORIAS, getCategoria } from "@/data/ferramentas";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filtered = useCallback(() => {
    if (!query.trim()) return FERRAMENTAS.slice(0, 8);
    const q = query.toLowerCase();
    return FERRAMENTAS.filter(
      (f) =>
        f.nome.toLowerCase().includes(q) ||
        f.descricao.toLowerCase().includes(q) ||
        f.categoria.toLowerCase().includes(q) ||
        f.tags?.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 12);
  }, [query]);

  const handleSelect = (slug: string) => {
    router.push(`/ferramenta/${slug}`);
    onOpenChange(false);
    setQuery("");
  };

  const results = filtered();

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[20%] z-50 w-full max-w-lg translate-x-[-50%]",
            "rounded-xl border bg-background shadow-2xl",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[20%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[20%]"
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            Buscar ferramenta
          </DialogPrimitive.Title>

          {/* Search Input */}
          <div className="flex items-center gap-3 border-b px-4 py-3.5">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar ferramenta..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden sm:flex items-center gap-0.5 rounded border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
              Esc
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2">
            {results.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Nenhuma ferramenta encontrada para &ldquo;{query}&rdquo;
              </p>
            ) : (
              <>
                {!query && (
                  <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    Ferramentas populares
                  </p>
                )}
                <div className="space-y-0.5">
                  {results.map((ferramenta) => {
                    const categoria = getCategoria(ferramenta.categoria);
                    const Icon = categoria?.icon;
                    return (
                      <button
                        key={ferramenta.slug}
                        onClick={() => handleSelect(ferramenta.slug)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-accent transition-colors group"
                      >
                        {Icon && (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                            <Icon className="h-4 w-4" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {ferramenta.nome}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {ferramenta.descricao}
                          </p>
                        </div>
                        {categoria && (
                          <span className="shrink-0 text-xs text-muted-foreground hidden sm:block">
                            {categoria.nome}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 border-t px-4 py-2.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-muted px-1 py-0.5 font-mono">↑↓</kbd>
              navegar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-muted px-1 py-0.5 font-mono">↵</kbd>
              abrir
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-muted px-1 py-0.5 font-mono">Esc</kbd>
              fechar
            </span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
