"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularQuebraUmidade } from "@/lib/calculators/agro/quebraUmidade";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { CULTURAS_OPTIONS } from "@/lib/constants/culturas";

const defaultInputs = {
  pesoBruto: 1000,
  umidadeRecebida: 15,
  impurezaRecebida: 1,
  cultura: "soja",
};

export default function QuebraUmidadeCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularQuebraUmidade, inputs);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({ ...p, [k]: k === "cultura" ? e.target.value : Number(e.target.value) }));

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
          <Label>Peso bruto (kg)</Label>
          <Input type="number" min={0} value={inputs.pesoBruto} onChange={set("pesoBruto")} />
        </div>
        <div className="space-y-2">
          <Label>Umidade recebida (%)</Label>
          <Input type="number" min={0} max={40} step={0.1} value={inputs.umidadeRecebida} onChange={set("umidadeRecebida")} />
        </div>
        <div className="space-y-2">
          <Label>Impureza recebida (%)</Label>
          <Input type="number" min={0} max={10} step={0.1} value={inputs.impurezaRecebida} onChange={set("impurezaRecebida")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Quebra de Umidade">
          <ResultRow label="Peso líquido" value={`${result.pesoLiquido} kg`} highlight />
          <ResultRow label="Kg descontados" value={`${result.kgDescontados} kg`} />
          <ResultRow label="Umidade padrão" value={`${result.umidadePadrao}%`} />
          <ResultRow label="Desconto umidade" value={`${result.descontoUmidade}%`} />
          <ResultRow label="Desconto impureza" value={`${result.descontoImpureza}%`} />
          <ResultRow label="Desconto total" value={`${result.descontoTotal}%`} />
        </ResultPanel>
      )}
    </div>
  );
}
