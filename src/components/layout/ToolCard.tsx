import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Ferramenta, getCategoria } from "@/data/ferramentas";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  ferramenta: Ferramenta;
  className?: string;
}

export function ToolCard({ ferramenta, className }: ToolCardProps) {
  const categoria = getCategoria(ferramenta.categoria);
  const Icon = categoria?.icon;

  return (
    <Link
      href={`/ferramenta/${ferramenta.slug}`}
      className={cn(
        "group relative flex flex-col rounded-xl border bg-card p-5 shadow-sm",
        "hover:border-primary/40 hover:shadow-md hover:shadow-primary/5",
        "transition-all duration-200",
        className
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 mt-3" />
      </div>

      <h3 className="text-base font-semibold text-foreground leading-snug mb-1.5 group-hover:text-primary transition-colors">
        {ferramenta.nome}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
        {ferramenta.descricao}
      </p>

      {categoria && (
        <div className="mt-3 pt-3 border-t border-border/50">
          <span className="text-xs font-medium text-primary/70">
            {categoria.nome}
          </span>
        </div>
      )}
    </Link>
  );
}
