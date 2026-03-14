"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularCalagem } from "@/lib/calculators/agro/calagem";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";

const defaultInputs = {
  area: 100,
  saturacaoAtual: 40,
  saturacaoDesejada: 65,
  ctc: 3.2,
  prnt: 80,
};

export default function CalagemCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularCalagem, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((p) => ({ ...p, [k]: Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Área (ha)</Label>
          <Input type="number" min={0} value={inputs.area} onChange={setN("area")} />
        </div>
        <div className="space-y-2">
          <Label>CTC (cmolc/dm³)</Label>
          <Input type="number" min={0} step={0.1} value={inputs.ctc} onChange={setN("ctc")} />
        </div>
        <div className="space-y-2">
          <Label>Saturação de bases atual — V1 (%)</Label>
          <Input type="number" min={0} max={100} value={inputs.saturacaoAtual} onChange={setN("saturacaoAtual")} />
        </div>
        <div className="space-y-2">
          <Label>Saturação desejada — V2 (%)</Label>
          <Input type="number" min={0} max={100} value={inputs.saturacaoDesejada} onChange={setN("saturacaoDesejada")} />
        </div>
        <div className="space-y-2">
          <Label>PRNT do calcário (%)</Label>
          <Input type="number" min={1} max={100} value={inputs.prnt} onChange={setN("prnt")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Necessidade de Calagem">
          <ResultRow label="NC (t/ha)" value={`${result.ncTHa} t/ha`} highlight />
          <ResultRow label="Calcário corrigido (t/ha)" value={`${result.calcarioCorrigido} t/ha`} />
          <ResultRow label="Total para a área (t)" value={`${result.totalToneladas} t`} />
          {result.gessagem && (
            <>
              <ResultRow label="Gesso agrícola (t/ha)" value={`${result.gessagem.gessagemTHa} t/ha`} />
              <ResultRow label="Total gesso (t)" value={`${result.gessagem.gessagemTotal} t`} />
            </>
          )}
        </ResultPanel>
      )}
    </div>
  );
}
