"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularEstimativaItr } from "@/lib/calculators/fiscal/estimativaItr";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";

const defaultInputs = {
  areaTotal: 1000,
  areaUtilizada: 700,
  areaPreservacao: 200,
  vtn: 5000000,
};

export default function EstimativaItrCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularEstimativaItr, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((p) => ({ ...p, [k]: Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Área total (ha)</Label>
          <Input type="number" min={0} value={inputs.areaTotal} onChange={setN("areaTotal")} />
        </div>
        <div className="space-y-2">
          <Label>Área utilizada (ha)</Label>
          <Input type="number" min={0} value={inputs.areaUtilizada} onChange={setN("areaUtilizada")} />
        </div>
        <div className="space-y-2">
          <Label>Área de preservação (ha)</Label>
          <Input type="number" min={0} value={inputs.areaPreservacao} onChange={setN("areaPreservacao")} />
        </div>
        <div className="space-y-2">
          <Label>VTN total (R$)</Label>
          <Input type="number" min={0} value={inputs.vtn} onChange={setN("vtn")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Estimativa do ITR">
          <ResultRow label="ITR estimado" value={formatBRL(result.itrEstimado as number)} highlight />
          <ResultRow label="Grau de utilização" value={`${result.grauUtilizacao}%`} />
          <ResultRow label="Faixa de área" value={result.faixaArea as string} />
          <ResultRow label="Faixa GU" value={result.faixaGU as string} />
          <ResultRow label="Alíquota" value={`${result.aliquota}%`} />
          <ResultRow label="VTN tributável" value={formatBRL(result.vtnTributavel as number)} />
          <ResultRow label="ITR por hectare" value={formatBRL(result.itrPorHa as number)} />
        </ResultPanel>
      )}
    </div>
  );
}
