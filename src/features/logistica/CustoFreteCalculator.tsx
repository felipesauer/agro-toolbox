"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularCustoFrete } from "@/lib/calculators/logistica/custoFrete";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";

const defaultInputs = { distanciaKm: 500, valorFretePorKm: 4.5, pesoTotalKg: 30000, pedagios: 120, custoSeguro: 0 };

export default function CustoFreteCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularCustoFrete, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((p) => ({ ...p, [k]: Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Distância (km)</Label>
          <Input type="number" min={0} value={inputs.distanciaKm} onChange={setN("distanciaKm")} />
        </div>
        <div className="space-y-2">
          <Label>Frete por km (R$/km)</Label>
          <Input type="number" min={0} step={0.01} value={inputs.valorFretePorKm} onChange={setN("valorFretePorKm")} />
        </div>
        <div className="space-y-2">
          <Label>Peso total (kg)</Label>
          <Input type="number" min={0} value={inputs.pesoTotalKg} onChange={setN("pesoTotalKg")} />
        </div>
        <div className="space-y-2">
          <Label>Pedágios (R$)</Label>
          <Input type="number" min={0} value={inputs.pedagios} onChange={setN("pedagios")} />
        </div>
        <div className="space-y-2">
          <Label>Seguro (R$)</Label>
          <Input type="number" min={0} value={inputs.custoSeguro} onChange={setN("custoSeguro")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Custo de Frete">
          <ResultRow label="Custo total" value={formatBRL(result.custoTotal)} highlight />
          <ResultRow label="Custo por tonelada" value={formatBRL(result.custoPorTonelada)} />
          <ResultRow label="Custo por saca 60kg" value={formatBRL(result.custoPorSaca60kg)} />
          <ResultRow label="Frete puro" value={formatBRL(result.composicao.frete)} />
          <ResultRow label="Pedágios" value={formatBRL(result.composicao.pedagios)} />
          <ResultRow label="Seguro" value={formatBRL(result.composicao.seguro)} />
        </ResultPanel>
      )}
    </div>
  );
}
