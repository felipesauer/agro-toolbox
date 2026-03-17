import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIAS, getCategoria, getFerramentasByCategoria } from "@/data/ferramentas";
import { ToolCard } from "@/components/layout/ToolCard";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

interface Props {
  params: Promise<{ categoria: string }>;
}

export async function generateStaticParams() {
  return CATEGORIAS.map((cat) => ({ categoria: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria: slug } = await params;
  const cat = getCategoria(slug);
  if (!cat) return {};

  return {
    title: cat.nome,
    description: cat.descricao,
    openGraph: {
      title: `${cat.nome} | AgroToolbox`,
      description: cat.descricao,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categoria: slug } = await params;
  const categoria = getCategoria(slug);

  if (!categoria) notFound();

  const ferramentas = getFerramentasByCategoria(slug);
  const Icon = categoria.icon;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: categoria.nome }]}
            className="mb-4"
          />
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1.5">
                {categoria.nome}
              </h1>
              <p className="text-muted-foreground text-lg">
                {categoria.descricao}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {ferramentas.length}{" "}
                {ferramentas.length === 1 ? "ferramenta disponível" : "ferramentas disponíveis"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {ferramentas.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">Nenhuma ferramenta disponível nesta categoria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ferramentas.map((ferramenta) => (
              <ToolCard key={ferramenta.slug} ferramenta={ferramenta} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
