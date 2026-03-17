"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularCicloCultura } from "@/lib/calculators/agro/cicloCultura";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { CULTURAS_OPTIONS } from "@/lib/constants/culturas";

const defaultInputs = { cultura: "soja", dataPlantio: new Date().toISOString().split("T")[0] };

export default function CicloCulturaCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularCicloCultura, inputs);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Cultura</Label>
          <Select value={inputs.cultura} onChange={set("cultura")}>
            {CULTURAS_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Data de semeadura</Label>
          <Input type="date" value={inputs.dataPlantio} onChange={set("dataPlantio")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Ciclo da Cultura">
          <ResultRow label="Previsão de colheita" value={result.dataEstimadaColheita} highlight />
          <ResultRow label="Ciclo (dias)" value={`${result.cicloDias} dias`} />
          <ResultRow label="Dias restantes" value={`${result.diasRestantes} dias`} />
          <ResultRow label="Progresso" value={`${result.progresso}%`} />
          {result.segundaSafra && (
            <>
              <ResultRow label="2ª safra — plantio estimado" value={result.segundaSafra.dataPlantioEstimada} />
              <ResultRow label="2ª safra — colheita estimada" value={result.segundaSafra.dataColheitaEstimada} />
              <ResultRow label="Dentro da janela ideal" value={result.segundaSafra.dentroJanelaIdeal ? "Sim" : "Não"} />
            </>
          )}
        </ResultPanel>
      )}
    </div>
  );
}
