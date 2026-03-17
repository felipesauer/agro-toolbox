"use client";

import { useRef } from "react";
import { BarChart3, Printer, Share2, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResultPanelProps {
  title?: string;
  visible?: boolean;
  children: React.ReactNode;
  className?: string;
  onShare?: () => void;
}

export function ResultPanel({
  title = "Resultado",
  visible = true,
  children,
  className,
}: ResultPanelProps) {
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => window.print();

  if (!visible) return null;

  return (
    <div
      ref={panelRef}
      data-result-panel
      className={cn(
        "rounded-xl border-2 border-primary/20 bg-primary/5 dark:bg-primary/10",
        "p-5 space-y-4",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <BarChart3 className="h-5 w-5" />
          <span>{title}</span>
        </div>

        <div className="flex items-center gap-1 no-print">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-primary"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Share2 className="h-3.5 w-3.5" />
            )}
            {copied ? "Copiado!" : "Compartilhar"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrint}
            className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-primary"
          >
            <Printer className="h-3.5 w-3.5" />
            Imprimir
          </Button>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}

interface ResultRowProps {
  label: string;
  value: string | number;
  highlight?: boolean;
  className?: string;
}

export function ResultRow({ label, value, highlight, className }: ResultRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 py-2 border-b border-primary/10 last:border-0",
        highlight && "font-semibold text-primary",
        className
      )}
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn("text-sm tabular-nums text-right", highlight && "text-base text-primary")}>
        {value}
      </span>
    </div>
  );
}

interface ComparisonCardProps {
  titulo: string;
  valor: string;
  descricao?: string;
  recomendado?: boolean;
  variante?: "default" | "warning" | "success";
}

export function ComparisonCard({
  titulo,
  valor,
  descricao,
  recomendado,
  variante = "default",
}: ComparisonCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border-2 p-5 transition-all",
        recomendado
          ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-md shadow-primary/10"
          : "border-border bg-card",
        variante === "warning" && "border-amber-300 bg-amber-50 dark:bg-amber-900/10",
        variante === "success" && "border-green-300 bg-green-50 dark:bg-green-900/10"
      )}
    >
      {recomendado && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-white">
          Recomendado
        </span>
      )}
      <p className="text-sm font-medium text-muted-foreground mb-1">{titulo}</p>
      <p className={cn(
        "text-2xl font-bold tabular-nums",
        recomendado ? "text-primary" : "text-foreground"
      )}>
        {valor}
      </p>
      {descricao && (
        <p className="mt-1.5 text-xs text-muted-foreground">{descricao}</p>
      )}
    </div>
  );
}
