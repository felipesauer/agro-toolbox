"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularPesoArroba } from "@/lib/calculators/pecuaria/pesoArroba";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";

const defaultInputs = {
  pesoVivo: 480,
  categoria: "boi" as const,
  precoArroba: 290,
};

export default function PesoArrobaCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularPesoArroba, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({ ...p, [k]: k === "categoria" ? e.target.value : Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Peso vivo (kg)</Label>
          <Input type="number" min={0} value={inputs.pesoVivo} onChange={setN("pesoVivo")} />
        </div>
        <div className="space-y-2">
          <Label>Categoria</Label>
          <Select value={inputs.categoria} onChange={setN("categoria")}>
            {["boi", "vaca", "novilho", "novilha", "bezerro"].map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Preço por arroba (R$/@)</Label>
          <Input type="number" min={0} step={0.01} value={inputs.precoArroba} onChange={setN("precoArroba")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Peso e Valor em Arrobas">
          <ResultRow label="Arrobas" value={`${result.arrobas} @`} highlight />
          <ResultRow label="Valor total" value={formatBRL(result.valorTotal as number)} highlight />
          <ResultRow label="Rendimento carcaça" value={`${result.rendimentoCarcaca}%`} />
          <ResultRow label="Peso carcaça" value={`${result.pesoCarcaca} kg`} />
        </ResultPanel>
      )}
    </div>
  );
}
