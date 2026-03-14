"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularCustoFinanciamento } from "@/lib/calculators/financeiro/custoFinanciamento";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";

const defaultInputs = {
  valorFinanciamento: 300000,
  taxaAnual: 15,
  prazoMeses: 36,
  sistemaAmortizacao: "SAC" as const,
};

export default function CustoFinanciamentoCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularCustoFinanciamento, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({ ...p, [k]: k === "sistemaAmortizacao" ? e.target.value : Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Valor financiado (R$)</Label>
          <Input type="number" min={0} value={inputs.valorFinanciamento} onChange={setN("valorFinanciamento")} />
        </div>
        <div className="space-y-2">
          <Label>Taxa de juros anual (%)</Label>
          <Input type="number" min={0} step={0.01} value={inputs.taxaAnual} onChange={setN("taxaAnual")} />
        </div>
        <div className="space-y-2">
          <Label>Prazo (meses)</Label>
          <Input type="number" min={1} max={360} value={inputs.prazoMeses} onChange={setN("prazoMeses")} />
        </div>
        <div className="space-y-2">
          <Label>Sistema de amortização</Label>
          <Select value={inputs.sistemaAmortizacao} onChange={setN("sistemaAmortizacao")}>
            <option value="SAC">SAC (parcelas decrescentes)</option>
            <option value="PRICE">PRICE (parcelas fixas)</option>
          </Select>
        </div>
      </div>

      {result && (
        <ResultPanel title="Custo do Financiamento">
          <ResultRow label="Custo total (juros)" value={formatBRL(result.totalJuros as number)} highlight />
          <ResultRow label="Montante total" value={formatBRL(result.totalPago as number)} />
          <ResultRow label="Primeira parcela" value={formatBRL(result.primeiraParcela as number)} />
          {result.ultimaParcela !== undefined && (
            <ResultRow label="Última parcela" value={formatBRL(result.ultimaParcela as number)} />
          )}
          <ResultRow label="CET anual" value={`${result.cetAnual}%`} />
        </ResultPanel>
      )}
    </div>
  );
}
