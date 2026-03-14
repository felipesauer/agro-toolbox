"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import {
  calcularCreditoPresumido,
  type TipoProdutor,
} from "@/lib/calculators/reforma/creditoPresumido";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";

const TIPO_OPTIONS: { value: TipoProdutor; label: string }[] = [
  { value: "produtor_rural_pf", label: "Produtor Rural PF (8%)" },
  { value: "agricultor_familiar", label: "Agricultor Familiar (6%)" },
  { value: "cooperativa", label: "Cooperativa (10%)" },
];

export default function CreditoPresumidoCalculator() {
  const [inputs, setInputs] = useState({
    receitaBruta: 500000,
    custos: 320000,
    tipo: "produtor_rural_pf" as TipoProdutor,
    ncmPrincipal: "",
    meses: 12,
  });

  const { result } = useAutoCalculation(calcularCreditoPresumido, inputs);

  const set = (k: string, v: string | number) =>
    setInputs((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Receita Bruta (R$)</Label>
          <Input
            type="number"
            value={inputs.receitaBruta}
            onChange={(e) => set("receitaBruta", Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label>Custos Tributados (R$)</Label>
          <Input
            type="number"
            value={inputs.custos}
            onChange={(e) => set("custos", Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label>Tipo de Produtor</Label>
          <Select value={inputs.tipo} onValueChange={(v) => set("tipo", v as TipoProdutor)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIPO_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Meses de Apuração</Label>
          <Input
            type="number"
            min={1}
            max={12}
            value={inputs.meses}
            onChange={(e) => set("meses", Number(e.target.value))}
          />
        </div>
        <div className="col-span-1 sm:col-span-2 space-y-2">
          <Label>NCM Principal (opcional)</Label>
          <Input
            value={inputs.ncmPrincipal}
            onChange={(e) => set("ncmPrincipal", e.target.value)}
            placeholder="ex: 1201"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <ResultPanel title="Crédito Presumido CBS/IBS">
            <ResultRow
              label="Percentual de Crédito"
              value={`${result.percentualCredito}%`}
              highlight
            />
            <ResultRow label="Crédito Presumido" value={formatBRL(result.creditoPresumido)} highlight />
            <ResultRow label="Crédito Mensal" value={formatBRL(result.creditoMensal)} />
            <ResultRow label="Carga Tributária Estimada" value={formatBRL(result.cargaTributariaEstimada)} />
            <ResultRow label="Economia com o Crédito" value={formatBRL(result.economiaCredito)} />
            <ResultRow label="Carga Líquida" value={formatBRL(result.cargaLiquida)} highlight />
            <ResultRow label="Margem Operacional" value={formatBRL(result.margemOperacional)} />
          </ResultPanel>

          <ResultPanel title="Comparativo: Presumido vs Real">
            <ResultRow
              label="Crédito Presumido"
              value={formatBRL(result.comparativo.creditoPresumido)}
            />
            <ResultRow
              label="Crédito Real Estimado"
              value={formatBRL(result.comparativo.creditoRealEstimado)}
            />
            <ResultRow
              label="Diferença"
              value={formatBRL(Math.abs(result.comparativo.diferenca))}
              highlight
            />
            <ResultRow
              label="Mais Vantajoso"
              value={result.comparativo.maisVantajoso}
              highlight
            />
          </ResultPanel>

          <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg space-y-1">
            <p>{result.fundamentacaoLegal}</p>
            <p className="italic">{result.aviso}</p>
          </div>
        </div>
      )}
    </div>
  );
}
