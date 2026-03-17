import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FERRAMENTAS } from "@/data/ferramentas";
import { ToolCard } from "@/components/layout/ToolCard";

const SLUGS_DESTAQUE = [
  "retencao-funrural",
  "assistente-cfop",
  "simulador-cbs-ibs",
  "fundos-estaduais",
  "conversor-medidas",
  "custo-hora-maquina",
];

export function FeaturedTools() {
  const tools = SLUGS_DESTAQUE.map(
    (slug) => FERRAMENTAS.find((f) => f.slug === slug)!
  ).filter(Boolean);

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-2">
              Mais utilizadas
            </h2>
            <p className="text-muted-foreground">
              As ferramentas mais acessadas do AgroToolbox
            </p>
          </div>
          <Link
            href="#categorias"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline shrink-0"
          >
            Ver todas
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((ferramenta) => (
            <ToolCard key={ferramenta.slug} ferramenta={ferramenta} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="#categorias"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Ver todas as ferramentas
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
