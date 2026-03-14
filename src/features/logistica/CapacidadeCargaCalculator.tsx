"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularCapacidadeCarga } from "@/lib/calculators/logistica/capacidadeCarga";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";

const defaultInputs = { pesoTotalKg: 200000, capacidadeCaminhaoKg: 37000, distanciaKm: 300, velocidadeMedia: 60 };

export default function CapacidadeCargaCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularCapacidadeCarga, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((p) => ({ ...p, [k]: Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Peso total a transportar (kg)</Label>
          <Input type="number" min={0} value={inputs.pesoTotalKg} onChange={setN("pesoTotalKg")} />
        </div>
        <div className="space-y-2">
          <Label>Capacidade do caminhão (kg)</Label>
          <Input type="number" min={0} value={inputs.capacidadeCaminhaoKg} onChange={setN("capacidadeCaminhaoKg")} />
        </div>
        <div className="space-y-2">
          <Label>Distância (km)</Label>
          <Input type="number" min={0} value={inputs.distanciaKm} onChange={setN("distanciaKm")} />
        </div>
        <div className="space-y-2">
          <Label>Velocidade média (km/h)</Label>
          <Input type="number" min={1} value={inputs.velocidadeMedia} onChange={setN("velocidadeMedia")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Capacidade de Carga">
          <ResultRow label="Número de viagens" value={String(result.numeroViagens)} highlight />
          <ResultRow label="Carga na última viagem" value={`${result.cargaUltimaViagem} kg`} />
          <ResultRow label="Aproveitamento última viagem" value={`${result.aproveitamentoUltimaViagem}%`} />
          {result.tempoEstimadoTotal !== undefined && (
            <ResultRow label="Tempo total estimado" value={`${result.tempoEstimadoTotal} h`} />
          )}
        </ResultPanel>
      )}
    </div>
  );
}
