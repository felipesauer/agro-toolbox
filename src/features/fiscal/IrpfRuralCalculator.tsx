"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularIrpfRural } from "@/lib/calculators/fiscal/irpfRural";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";

const defaultInputs = {
  receitaBruta: 1000000,
  despesasDedutiveis: 650000,
};

export default function IrpfRuralCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularIrpfRural, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((p) => ({ ...p, [k]: Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Receita bruta (R$)</Label>
          <Input type="number" min={0} value={inputs.receitaBruta} onChange={setN("receitaBruta")} />
        </div>
        <div className="space-y-2">
          <Label>Despesas dedutíveis (R$)</Label>
          <Input type="number" min={0} value={inputs.despesasDedutiveis} onChange={setN("despesasDedutiveis")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="IRPF da Atividade Rural">
          <ResultRow label="Base real" value={formatBRL(result.baseReal)} highlight />
          <ResultRow label="IRPF (resultado real)" value={formatBRL(result.irpfReal)} highlight />
          <ResultRow label="Base presumida (20%)" value={formatBRL(result.basePresumida)} />
          <ResultRow label="IRPF (resultado presumido)" value={formatBRL(result.irpfPresumido)} />
          <ResultRow label="Regime recomendado" value={result.melhorOpcao} />
          <ResultRow label="Economia" value={formatBRL(result.economia)} />
        </ResultPanel>
      )}
    </div>
  );
}
