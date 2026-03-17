"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularNecessidadeSementes } from "@/lib/calculators/agro/necessidadeSementes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";

const defaultInputs = {
  area: 100,
  populacaoDesejada: 280000,
  pms: 160,
  germinacao: 85,
};

export default function NecessidadeSementesCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularNecessidadeSementes, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({ ...p, [k]: k === "cultura" ? e.target.value : Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Área (ha)</Label>
          <Input type="number" min={0} value={inputs.area} onChange={setN("area")} />
        </div>
        <div className="space-y-2">
          <Label>População desejada (plantas/ha)</Label>
          <Input type="number" min={0} value={inputs.populacaoDesejada} onChange={setN("populacaoDesejada")} />
        </div>
        <div className="space-y-2">
          <Label>PMS — Massa de mil sementes (g)</Label>
          <Input type="number" min={0} value={inputs.pms} onChange={setN("pms")} />
        </div>
        <div className="space-y-2">
          <Label>Germinação (%)</Label>
          <Input type="number" min={0} max={100} value={inputs.germinacao} onChange={setN("germinacao")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Necessidade de Sementes">
          <ResultRow label="Total (kg)" value={`${result.totalKg} kg`} highlight />
          <ResultRow label="Sacas de 40 kg" value={String(result.totalSacas)} />
          <ResultRow label="Sementes por metro linear" value={`${result.sementesPorMetro}`} />
          <ResultRow label="Kg/ha" value={`${result.kgPorHa} kg/ha`} />
        </ResultPanel>
      )}
    </div>
  );
}
