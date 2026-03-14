"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { converterSacas as calcularConversorSacas, type ConversorSacasInput } from "@/lib/calculators/agro/conversorSacas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { CULTURAS_OPTIONS } from "@/lib/constants/culturas";

const defaultInputs: ConversorSacasInput = { valor: 0, de: "sacas", para: "toneladas", cultura: "soja" };

export default function ConversorSacasCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularConversorSacas, inputs);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({ ...p, [k]: k === "valor" ? Number(e.target.value) : e.target.value }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Cultura</Label>
          <Select value={inputs.cultura} onChange={set("cultura")}>
            {CULTURAS_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Valor</Label>
          <Input type="number" min={0} value={inputs.valor} onChange={set("valor")} />
        </div>
        <div className="space-y-2">
          <Label>De</Label>
          <Select value={inputs.de} onChange={set("de")}>
            {["sacas", "kg", "toneladas"].map((u) => <option key={u} value={u}>{u}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Para</Label>
          <Select value={inputs.para} onChange={set("para")}>
            {["sacas", "kg", "toneladas"].map((u) => <option key={u} value={u}>{u}</option>)}
          </Select>
        </div>
      </div>

      {result && (
        <ResultPanel title="Resultado">
          <ResultRow label="Resultado" value={`${result.resultado} ${result.para}`} highlight />
          <ResultRow label="Peso da saca" value={`${result.pesoSaca} kg`} />
          <ResultRow label="Fórmula" value={result.formula} />
        </ResultPanel>
      )}
    </div>
  );
}
