"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularQuebraFrete } from "@/lib/calculators/logistica/quebraFrete";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const defaultInputs = {
  pesoOrigem: 30000,
  pesoDestino: 29850,
  tipoCarga: "graos" as const,
  precoUnitario: 2,
  distanciaKm: 500,
};

export default function QuebraFreteCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularQuebraFrete, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({ ...p, [k]: k === "tipoCarga" ? e.target.value : Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Peso na origem (kg)</Label>
          <Input type="number" min={0} value={inputs.pesoOrigem} onChange={setN("pesoOrigem")} />
        </div>
        <div className="space-y-2">
          <Label>Peso no destino (kg)</Label>
          <Input type="number" min={0} value={inputs.pesoDestino} onChange={setN("pesoDestino")} />
        </div>
        <div className="space-y-2">
          <Label>Tipo de carga</Label>
          <Select value={inputs.tipoCarga} onChange={setN("tipoCarga")}>
            <option value="graos">Grãos (tol. 0,25%)</option>
            <option value="liquidos">Líquidos (tol. 0,30%)</option>
            <option value="fertilizantes">Fertilizantes (tol. 0,50%)</option>
            <option value="pecuaria">Pecuária (tol. 0%)</option>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Preço unitário (R$/kg)</Label>
          <Input type="number" min={0} step={0.01} value={inputs.precoUnitario} onChange={setN("precoUnitario")} />
        </div>
        <div className="space-y-2">
          <Label>Distância (km)</Label>
          <Input type="number" min={0} value={inputs.distanciaKm} onChange={setN("distanciaKm")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Quebra de Frete">
          <div className="col-span-2 flex items-center gap-2">
            <Badge variant={result.dentroTolerancia ? "secondary" : "destructive"}>
              {result.dentroTolerancia ? "Dentro da tolerância" : "Acima da tolerância"}
            </Badge>
          </div>
          <ResultRow label="Quebra real" value={`${result.quebraReal} kg`} highlight />
          <ResultRow label="Quebra (%)" value={`${result.quebraPercentual}%`} />
          <ResultRow label="Tolerância" value={`${result.tolerancia}%`} />
          <ResultRow label="Quebra excedente" value={`${result.quebraExcedente} kg`} />
          {result.valorPrejuizo !== undefined && (
            <ResultRow label="Valor do prejuízo" value={formatBRL(result.valorPrejuizo)} />
          )}
          {result.quebraAtipica && (
            <div className="col-span-2 text-sm text-orange-600 dark:text-orange-400">
              ⚠ Quebra atípica — verifique possível fraude ou erro na pesagem.
            </div>
          )}
        </ResultPanel>
      )}
    </div>
  );
}
