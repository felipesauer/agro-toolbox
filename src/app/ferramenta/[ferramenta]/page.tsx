import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { FERRAMENTAS, getCategoria, getFerramenta, getFerramentasByCategoria } from "@/data/ferramentas";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ToolCard } from "@/components/layout/ToolCard";
import { CalculatorLoader } from "@/components/calculator/CalculatorLoader";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";

interface Props {
  params: Promise<{ ferramenta: string }>;
  searchParams: Promise<Record<string, string>>;
}

export async function generateStaticParams() {
  return FERRAMENTAS.map((f) => ({ ferramenta: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ferramenta: slug } = await params;
  const ferramenta = getFerramenta(slug);
  const categoria = ferramenta ? getCategoria(ferramenta.categoria) : null;

  if (!ferramenta) return {};

  return {
    title: ferramenta.nome,
    description: ferramenta.descricao,
    openGraph: {
      title: `${ferramenta.nome} | AgroToolbox`,
      description: ferramenta.descricao,
    },
    keywords: ferramenta.tags,
    alternates: {
      canonical: `/ferramenta/${slug}`,
    },
  };
}

function CalculatorSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-2/3" />
    </div>
  );
}

export default async function FerramentaPage({ params }: Props) {
  const { ferramenta: slug } = await params;
  const ferramenta = getFerramenta(slug);

  if (!ferramenta) notFound();

  const categoria = getCategoria(ferramenta.categoria);
  const ferramentasRelacionadas = getFerramentasByCategoria(ferramenta.categoria)
    .filter((f) => f.slug !== slug)
    .slice(0, 4);

  const Icon = categoria?.icon;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: categoria?.nome ?? ferramenta.categoria, href: `/${ferramenta.categoria}` },
              { label: ferramenta.nome },
            ]}
            className="mb-4"
          />
          <div className="flex items-start gap-4">
            {Icon && (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                <Icon className="h-6 w-6" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl mb-1">
                {ferramenta.nome}
              </h1>
              <p className="text-muted-foreground">{ferramenta.descricao}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Calculator — 2/3 width */}
          <div className="lg:col-span-2">
            <Suspense fallback={<CalculatorSkeleton />}>
              <CalculatorLoader slug={slug} />
            </Suspense>
          </div>

          {/* Sidebar — 1/3 width */}
          <div className="space-y-6">
            {/* Disclaimer */}
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-900/10 p-4">
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-0.5">
                  Ferramenta de apoio
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                  Os resultados são estimativas baseados em legislação vigente.
                  Consulte um profissional habilitado para decisões definitivas.
                </p>
              </div>
            </div>

            {/* Related tools */}
            {ferramentasRelacionadas.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  Da mesma categoria
                </h2>
                <div className="space-y-2.5">
                  {ferramentasRelacionadas.map((f) => (
                    <ToolCard key={f.slug} ferramenta={f} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
