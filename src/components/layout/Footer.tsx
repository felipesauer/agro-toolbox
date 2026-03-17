import Link from "next/link";
import { Github, Leaf, ExternalLink } from "lucide-react";
import { CATEGORIAS } from "@/data/ferramentas";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-primary-950 text-primary-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-400 text-primary-900">
                <Leaf className="h-4.5 w-4.5" />
              </div>
              AgroToolbox
            </Link>
            <p className="text-sm leading-relaxed text-primary-300 mb-4">
              Ferramentas gratuitas e precisas para o agronegócio brasileiro.
              Agronomia, fiscal, financeiro e muito mais.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/felipesauer/agro-toolbox"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-primary-700 px-3 py-1.5 text-xs font-medium text-primary-300 hover:border-primary-500 hover:text-white transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
                <ExternalLink className="h-3 w-3" />
              </a>
              <span className="rounded-full bg-accent-400/10 border border-accent-400/20 px-3 py-1.5 text-xs font-semibold text-accent-400">
                v2.0.0
              </span>
            </div>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Categorias
            </h3>
            <ul className="space-y-2.5">
              {CATEGORIAS.map((cat) => {
                const Icon = cat.icon;
                return (
                  <li key={cat.slug}>
                    <Link
                      href={`/${cat.slug}`}
                      className="flex items-center gap-2 text-sm text-primary-300 hover:text-white transition-colors"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {cat.nome}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Ferramentas Populares */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Ferramentas
            </h3>
            <ul className="space-y-2.5">
              {[
                { slug: "retencao-funrural", nome: "Retenção Funrural" },
                { slug: "conversor-medidas", nome: "Conversor de Medidas" },
                { slug: "simulador-cbs-ibs", nome: "Simulador CBS/IBS" },
                { slug: "fundos-estaduais", nome: "Fundos Estaduais" },
                { slug: "custo-hora-maquina", nome: "Custo Hora-Máquina" },
                { slug: "assistente-cfop", nome: "Assistente CFOP" },
              ].map((f) => (
                <li key={f.slug}>
                  <Link
                    href={`/ferramenta/${f.slug}`}
                    className="text-sm text-primary-300 hover:text-white transition-colors"
                  >
                    {f.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Sobre
            </h3>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-primary-300">
                  31 ferramentas disponíveis
                </span>
              </li>
              <li>
                <span className="text-sm text-primary-300">
                  100% gratuito e open-source
                </span>
              </li>
              <li>
                <span className="text-sm text-primary-300">
                  Sem cadastro necessário
                </span>
              </li>
              <li>
                <a
                  href="https://github.com/felipesauer/agro-toolbox/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary-300 hover:text-white transition-colors"
                >
                  Reportar problema
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-primary-800/50" />

        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-primary-400">
            © {year} AgroToolbox. Distribuído sob licença MIT.
          </p>
          <p className="text-xs text-primary-500">
            As calculadoras são estimativas. Consulte um profissional habilitado para decisões importantes.
          </p>
        </div>
      </div>
    </footer>
  );
}
