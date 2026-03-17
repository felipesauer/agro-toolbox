import { MousePointerClick, Keyboard, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    step: "01",
    title: "Escolha a ferramenta",
    description:
      "Navegue pelas categorias ou use a busca (⌘K) para encontrar a calculadora certa.",
  },
  {
    icon: Keyboard,
    step: "02",
    title: "Insira os dados",
    description:
      "Preencha os campos do formulário. O resultado aparece automaticamente enquanto você digita.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Resultado instantâneo",
    description:
      "Veja o resultado detalhado com fórmula, exporte em PDF ou Excel, ou compartilhe a URL.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-3">
            Simples e direto
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Sem cadastro, sem anúncios, sem complexidade. Resultado na hora.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map(({ icon: Icon, step, title, description }, index) => (
            <div key={step} className="relative flex flex-col items-center text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-[calc(50%+3rem)] right-[calc(-50%+3rem)] h-[1px] bg-gradient-to-r from-primary/40 to-transparent hidden md:block" />
              )}

              {/* Icon */}
              <div className="relative mb-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-primary-950">
                  {step}
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
