"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

interface CalculatorLoaderProps {
  slug: string;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4 rounded-xl border bg-card p-6">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-10 w-1/2" />
    </div>
  );
}

// Dynamic imports for all 31 calculators
const CALCULATORS: Record<string, React.ComponentType> = {
  // AGRO
  "conversor-medidas": dynamic(
    () => import("@/features/agro/ConversorMedidasCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "conversor-sacas": dynamic(
    () => import("@/features/agro/ConversorSacasCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "quebra-umidade": dynamic(
    () => import("@/features/agro/QuebraUmidadeCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "ciclo-cultura": dynamic(
    () => import("@/features/agro/CicloCulturaCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "necessidade-sementes": dynamic(
    () => import("@/features/agro/NecessidadeSementesCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "estimativa-produtividade": dynamic(
    () => import("@/features/agro/EstimativaProdutividadeCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "volume-calda": dynamic(
    () => import("@/features/agro/VolumeCaldaCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  calagem: dynamic(
    () => import("@/features/agro/CalagemCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),

  // FINANCEIRO
  depreciacao: dynamic(
    () => import("@/features/financeiro/DepreciacaoCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "custo-hora-maquina": dynamic(
    () => import("@/features/financeiro/CustoHoraMaquinaCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "vender-vs-armazenar": dynamic(
    () => import("@/features/financeiro/VenderVsArmazenarCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "custo-financiamento": dynamic(
    () => import("@/features/financeiro/CustoFinanciamentoCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "acerto-safrista": dynamic(
    () => import("@/features/financeiro/AcertoSafristaCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),

  // PECUÁRIA
  "peso-arroba": dynamic(
    () => import("@/features/pecuaria/PesoArrobaCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "lotacao-pastagem": dynamic(
    () => import("@/features/pecuaria/LotacaoPastagemCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),

  // FISCAL
  "conversor-unidades-nfe": dynamic(
    () => import("@/features/fiscal/ConversorUnidadesNfeCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "retencao-funrural": dynamic(
    () => import("@/features/fiscal/RetencaoFunruralCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "quebra-peso-nota": dynamic(
    () => import("@/features/fiscal/QuebraPesoNotaCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "funrural-comparativo": dynamic(
    () => import("@/features/fiscal/FunruralComparativoCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "irpf-rural": dynamic(
    () => import("@/features/fiscal/IrpfRuralCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "estimativa-itr": dynamic(
    () => import("@/features/fiscal/EstimativaItrCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "termometro-lcdpr": dynamic(
    () => import("@/features/fiscal/TermometroLcdprCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "fundos-estaduais": dynamic(
    () => import("@/features/fiscal/FundosEstaduaisCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "assistente-cfop": dynamic(
    () => import("@/features/fiscal/AssistenteCfopCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "pauta-fiscal": dynamic(
    () => import("@/features/fiscal/PautaFiscalCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),

  // REFORMA TRIBUTÁRIA
  "simulador-cbs-ibs": dynamic(
    () => import("@/features/reforma/SimuladorCbsIbsCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "consultor-ncm": dynamic(
    () => import("@/features/reforma/ConsultorNcmCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "credito-presumido": dynamic(
    () => import("@/features/reforma/CreditoPresumidoCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),

  // LOGÍSTICA
  "custo-frete": dynamic(
    () => import("@/features/logistica/CustoFreteCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "capacidade-carga": dynamic(
    () => import("@/features/logistica/CapacidadeCargaCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
  "quebra-frete": dynamic(
    () => import("@/features/logistica/QuebraFreteCalculator"),
    { loading: () => <LoadingSkeleton /> }
  ),
};

import { CalculatorSlugProvider } from "./CalculatorContext";

export function CalculatorLoader({ slug }: CalculatorLoaderProps) {
  const Calculator = CALCULATORS[slug];

  if (!Calculator) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
        <p>Calculadora não encontrada para &ldquo;{slug}&rdquo;.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <CalculatorSlugProvider slug={slug}>
        <Calculator />
      </CalculatorSlugProvider>
    </div>
  );
}
