"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularLotacaoPastagem } from "@/lib/calculators/pecuaria/lotacaoPastagem";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { FORRAGEIRAS } from "@/lib/calculators/pecuaria/lotacaoPastagem";

const defaultInputs = { areaPastagem: 100, forrageira: "braquiaria_brizantha", pesoMedio: 450, numAnimais: 100 };

export default function LotacaoPastagemCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularLotacaoPastagem, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({ ...p, [k]: k === "forrageira" ? e.target.value : Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Área do pasto (ha)</Label>
          <Input type="number" min={0} value={inputs.areaPastagem} onChange={setN("areaPastagem")} />
        </div>
        <div className="space-y-2">
          <Label>Forrageira</Label>
          <Select value={inputs.forrageira} onChange={setN("forrageira")}>
            {Object.keys(FORRAGEIRAS).map((k) => (
              <option key={k} value={k}>{FORRAGEIRAS[k as keyof typeof FORRAGEIRAS].nome}</option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Peso médio do animal (kg)</Label>
          <Input type="number" min={0} value={inputs.pesoMedio} onChange={setN("pesoMedio")} />
        </div>
        <div className="space-y-2">
          <Label>Número de animais</Label>
          <Input type="number" min={0} value={inputs.numAnimais} onChange={setN("numAnimais")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Capacidade de Suporte">
          <ResultRow label="Total UA" value={`${result.totalUA} UA`} highlight />
          <ResultRow label="Lotação (UA/ha)" value={`${result.uaPorHa} UA/ha`} />
          <ResultRow label="Classificação" value={result.classificacao} />
          {result.animaisMaximos !== undefined && (
            <ResultRow label="Capacidade máxima (animais)" value={String(result.animaisMaximos)} />
          )}
          {result.excedente !== undefined && result.excedente > 0 && (
            <ResultRow label="Excedente" value={String(result.excedente)} />
          )}
        </ResultPanel>
      )}
    </div>
  );
}
