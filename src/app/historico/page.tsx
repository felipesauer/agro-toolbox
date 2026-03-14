"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getFerramenta } from "@/data/ferramentas";
import { formatDate } from "@/lib/utils";

interface HistoryEntry {
  id: string;
  slug: string;
  inputs: Record<string, unknown>;
  result: Record<string, unknown>;
  timestamp: number;
}

const STORAGE_KEY = "agrotoolbox:historico";

function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function HistoricoPage() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setEntries(loadHistory().sort((a, b) => b.timestamp - a.timestamp));
    setMounted(true);
  }, []);

  function removeEntry(id: string) {
    const next = entries.filter((e) => e.id !== id);
    setEntries(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function clearAll() {
    setEntries([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  if (!mounted) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Histórico</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Últimos cálculos realizados neste dispositivo
          </p>
        </div>
        {entries.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            <Trash2 className="mr-2 h-4 w-4 text-destructive" />
            Limpar tudo
          </Button>
        )}
      </div>

      {entries.length === 0 ? (
        <div className="rounded-xl border bg-card py-20 text-center text-muted-foreground">
          <Clock className="mx-auto mb-3 h-10 w-10 opacity-30" />
          <p className="font-medium">Nenhum cálculo no histórico</p>
          <p className="mt-1 text-sm">
            Seus cálculos aparecerão aqui após o primeiro uso.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Explorar ferramentas</Link>
          </Button>
        </div>
      ) : (
        <ul className="space-y-3">
          {entries.map((entry, i) => {
            const ferramenta = getFerramenta(entry.slug);
            return (
              <li key={entry.id}>
                <div className="flex items-center gap-4 rounded-xl border bg-card p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">
                        {ferramenta?.nome ?? entry.slug}
                      </span>
                      {ferramenta && (
                        <Badge variant="secondary" className="text-xs">
                          {ferramenta.categoria}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatDate(new Date(entry.timestamp))}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {ferramenta && (
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/ferramenta/${entry.slug}`}>
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEntry(entry.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                {i < entries.length - 1 && <Separator className="mt-3" />}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
