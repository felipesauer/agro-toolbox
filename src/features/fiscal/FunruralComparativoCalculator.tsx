"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularFunruralComparativo } from "@/lib/calculators/fiscal/funruralComparativo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";

const defaultInputs = {
  receitaBrutaAnual: 2000000,
  folhaPagamentoMensal: 15000,
  numEmpregados: 3,
};

export default function FunruralComparativoCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularFunruralComparativo, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((p) => ({ ...p, [k]: Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Receita bruta anual (R$)</Label>
          <Input type="number" min={0} value={inputs.receitaBrutaAnual} onChange={setN("receitaBrutaAnual")} />
        </div>
        <div className="space-y-2">
          <Label>Folha de pagamento mensal (R$)</Label>
          <Input type="number" min={0} value={inputs.folhaPagamentoMensal} onChange={setN("folhaPagamentoMensal")} />
        </div>
        <div className="space-y-2">
          <Label>Número de empregados</Label>
          <Input type="number" min={0} value={inputs.numEmpregados} onChange={setN("numEmpregados")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Comparativo FUNRURAL">
          <ResultRow label="Recomendado" value={result.recomendacao} highlight />
          <ResultRow label="Contribuição sobre comercialização" value={formatBRL(result.custoComercializacao)} />
          <ResultRow label="Contribuição sobre folha" value={formatBRL(result.custoFolha)} />
          <ResultRow label="Economia potencial" value={formatBRL(result.economiaAnual)} />
          <ResultRow label="Receita de equilíbrio" value={formatBRL(result.receitaEquilibrio)} />
        </ResultPanel>
      )}
    </div>
  );
}
