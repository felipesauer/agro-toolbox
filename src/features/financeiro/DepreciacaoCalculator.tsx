"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularDepreciacao } from "@/lib/calculators/financeiro/depreciacao";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";

const defaultInputs = { valorAquisicao: 500000, vidaUtilAnos: 10, valorResidual: 50000, metodo: "linear" as const };

export default function DepreciacaoCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularDepreciacao, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({ ...p, [k]: k === "metodo" ? e.target.value : Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Valor de aquisição (R$)</Label>
          <Input type="number" min={0} value={inputs.valorAquisicao} onChange={setN("valorAquisicao")} />
        </div>
        <div className="space-y-2">
          <Label>Vida útil (anos)</Label>
          <Input type="number" min={1} max={50} value={inputs.vidaUtilAnos} onChange={setN("vidaUtilAnos")} />
        </div>
        <div className="space-y-2">
          <Label>Valor residual (R$)</Label>
          <Input type="number" min={0} value={inputs.valorResidual} onChange={setN("valorResidual")} />
        </div>
        <div className="space-y-2">
          <Label>Método</Label>
          <Select value={inputs.metodo} onChange={setN("metodo")}>
            <option value="linear">Linear (cotas iguais)</option>
            <option value="horas">Por horas de uso</option>
          </Select>
        </div>
      </div>

      {result && (
        <ResultPanel title="Depreciação Anual">
          {'depreciacaoAnual' in result && (
            <>
              <ResultRow label="Depreciação anual" value={formatBRL(result.depreciacaoAnual ?? 0)} highlight />
              <ResultRow label="Depreciação mensal" value={formatBRL(result.depreciacaoMensal ?? 0)} />
            </>
          )}
          <ResultRow label="Valor atual" value={formatBRL(result.valorAtual)} />
          <ResultRow label="Depreciado acumulado" value={`${result.percentualDepreciado}%`} />
        </ResultPanel>
      )}
    </div>
  );
}
