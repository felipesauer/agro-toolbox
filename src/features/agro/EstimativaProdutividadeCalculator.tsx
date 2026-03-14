"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularEstimativaProdutividade as estimarProdutividade } from "@/lib/calculators/agro/estimativaProdutividade";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { CULTURAS_OPTIONS } from "@/lib/constants/culturas";

const defaultInputs = {
  cultura: "soja",
  area: 100,
  plantasPorM2: 26,
  estruturasPorPlanta: 40,
  graosPorEstrutura: 2.5,
  pms: 160,
};

export default function EstimativaProdutividadeCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(estimarProdutividade, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({ ...p, [k]: k === "cultura" ? e.target.value : Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Cultura</Label>
          <Select value={inputs.cultura} onChange={setN("cultura")}>
            {CULTURAS_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Área (ha)</Label>
          <Input type="number" min={0} value={inputs.area} onChange={setN("area")} />
        </div>
        <div className="space-y-2">
          <Label>Plantas por m² (plantas/m²)</Label>
          <Input type="number" min={0} step={0.1} value={inputs.plantasPorM2} onChange={setN("plantasPorM2")} />
        </div>
        <div className="space-y-2">
          <Label>Estruturas por planta (vagens/espigas)</Label>
          <Input type="number" min={0} step={0.1} value={inputs.estruturasPorPlanta} onChange={setN("estruturasPorPlanta")} />
        </div>
        <div className="space-y-2">
          <Label>Grãos por estrutura</Label>
          <Input type="number" min={0} step={0.1} value={inputs.graosPorEstrutura} onChange={setN("graosPorEstrutura")} />
        </div>
        <div className="space-y-2">
          <Label>PMS (g)</Label>
          <Input type="number" min={0} value={inputs.pms} onChange={setN("pms")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Estimativa de Produtividade">
          <ResultRow label="Produtividade estimada" value={`${result.sacasPorHa} sc/ha`} highlight />
          <ResultRow label="Produção (kg/ha)" value={`${result.kgPorHa} kg/ha`} />
          <ResultRow label="Produção (t/ha)" value={`${result.tonPorHa} t/ha`} />
          {result.producaoTotalSacas && <ResultRow label="Produção total" value={`${result.producaoTotalSacas} sacas`} />}
          {result.producaoTotalTon && <ResultRow label="Produção total (ton)" value={`${result.producaoTotalTon} t`} />}
        </ResultPanel>
      )}
    </div>
  );
}
