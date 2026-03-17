"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularQuebraPesoNota } from "@/lib/calculators/fiscal/quebraPesoNota";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";

const defaultInputs = {
  pesoNota: 1000,
  pesoReal: 985,
  valorUnitario: 120,
  aliquotaICMS: 12,
};

export default function QuebraPesoNotaCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularQuebraPesoNota, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((p) => ({ ...p, [k]: Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Peso na nota (kg)</Label>
          <Input type="number" min={0} value={inputs.pesoNota} onChange={setN("pesoNota")} />
        </div>
        <div className="space-y-2">
          <Label>Peso real apurado (kg)</Label>
          <Input type="number" min={0} value={inputs.pesoReal} onChange={setN("pesoReal")} />
        </div>
        <div className="space-y-2">
          <Label>Valor unitário (R$/kg)</Label>
          <Input type="number" min={0} step={0.01} value={inputs.valorUnitario} onChange={setN("valorUnitario")} />
        </div>
        <div className="space-y-2">
          <Label>Alíquota ICMS (%)</Label>
          <Input type="number" min={0} max={30} value={inputs.aliquotaICMS} onChange={setN("aliquotaICMS")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Quebra de Peso na Nota">
          <ResultRow label="Diferença de peso" value={`${result.diferenca} kg`} highlight />
          <ResultRow label="Valor complementar" value={formatBRL(result.valorComplementar ?? 0)} />
          <ResultRow label="ICMS complementar" value={formatBRL(result.icmsComplementar ?? 0)} />
          {result.funruralComplementar !== undefined && (
            <ResultRow label="FUNRURAL complementar" value={formatBRL(result.funruralComplementar)} />
          )}
          <ResultRow label="Total impostos" value={formatBRL(result.totalImpostosComplementar ?? 0)} />
          <ResultRow label="Valor líquido complementar" value={formatBRL(result.valorLiquidoComplementar ?? 0)} />
        </ResultPanel>
      )}
    </div>
  );
}
