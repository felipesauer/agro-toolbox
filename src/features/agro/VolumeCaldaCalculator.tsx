"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularVolumeCalda } from "@/lib/calculators/agro/volumeCalda";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";

const defaultInputs = { vazaoBico: 0.8, numBicos: 14, espacamentoBicos: 50, velocidade: 6, areaTotal: 100 };

export default function VolumeCaldaCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularVolumeCalda, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((p) => ({ ...p, [k]: Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Vazão por bico (L/min)</Label>
          <Input type="number" min={0} step={0.01} value={inputs.vazaoBico} onChange={setN("vazaoBico")} />
        </div>
        <div className="space-y-2">
          <Label>Número de bicos</Label>
          <Input type="number" min={1} step={1} value={inputs.numBicos} onChange={setN("numBicos")} />
        </div>
        <div className="space-y-2">
          <Label>Espaçamento entre bicos (cm)</Label>
          <Input type="number" min={0} step={1} value={inputs.espacamentoBicos} onChange={setN("espacamentoBicos")} />
        </div>
        <div className="space-y-2">
          <Label>Velocidade de aplicação (km/h)</Label>
          <Input type="number" min={0} step={0.1} value={inputs.velocidade} onChange={setN("velocidade")} />
        </div>
        <div className="space-y-2">
          <Label>Área total (ha)</Label>
          <Input type="number" min={0} value={inputs.areaTotal} onChange={setN("areaTotal")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Volume de Calda">
          <ResultRow label="Volume por hectare" value={`${result.volumeHa} L/ha`} highlight />
          <ResultRow label="Vazão total da barra" value={`${result.vazaoTotalBarra} L/min`} />
          {result.volumeTotal && <ResultRow label="Volume total" value={`${result.volumeTotal} L`} />}
        </ResultPanel>
      )}
    </div>
  );
}
