import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIAS, getFerramentasByCategoria } from "@/data/ferramentas";
import { cn } from "@/lib/utils";

const categoriaSize: Record<string, string> = {
  fiscal: "sm:col-span-2",
  agronomica: "sm:col-span-2",
  reforma: "sm:col-span-2",
};

export function CategoriesGrid() {
  return (
    <section id="categorias" className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-3">
            Explore por categoria
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ferramentas organizadas por área de atuação. Cada categoria tem
            calculadoras específicas para as necessidades do segmento.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIAS.map((cat, index) => {
            const Icon = cat.icon;
            const ferramentas = getFerramentasByCategoria(cat.slug);
            const isLarge = categoriaSize[cat.slug];

            return (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={cn(
                  "group relative flex flex-col justify-between rounded-2xl border",
                  "bg-card hover:bg-accent/30 dark:hover:bg-accent/10",
                  "p-6 transition-all duration-200",
                  "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
                  "hover:-translate-y-0.5",
                  isLarge && "lg:col-span-1",
                  (index === 0 || index === 3) && "lg:col-span-2"
                )}
              >
                {/* Icon + count */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground bg-muted rounded-full px-2.5 py-1">
                    {ferramentas.length} {ferramentas.length === 1 ? "ferramenta" : "ferramentas"}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {cat.nome}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                    {cat.descricao}
                  </p>

                  {/* Preview tools */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {ferramentas.slice(0, 3).map((f) => (
                      <span
                        key={f.slug}
                        className="text-xs rounded-full bg-primary/8 text-primary px-2 py-0.5"
                      >
                        {f.nome}
                      </span>
                    ))}
                    {ferramentas.length > 3 && (
                      <span className="text-xs rounded-full bg-muted text-muted-foreground px-2 py-0.5">
                        +{ferramentas.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver todas
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
