"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { converterUnidadesNfe } from "@/lib/calculators/fiscal/conversorUnidadesNfe";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { UNIDADES_NFE_OPTIONS } from "@/lib/constants/conversoes";

const defaultInputs = { valor: 100, de: "SC60", para: "KG", cultura: "soja" };

export default function ConversorUnidadesNfeCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(converterUnidadesNfe, inputs);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({ ...p, [k]: k === "valor" ? Number(e.target.value) : e.target.value }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Quantidade</Label>
          <Input type="number" min={0} value={inputs.valor} onChange={set("valor")} />
        </div>
        <div className="space-y-2">
          <Label>Cultura (para SC agríc.)</Label>
          <Input value={inputs.cultura} onChange={set("cultura")} placeholder="ex: soja, milho" />
        </div>
        <div className="space-y-2">
          <Label>Unidade de origem</Label>
          <Select value={inputs.de} onChange={set("de")}>
            {UNIDADES_NFE_OPTIONS.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Unidade de destino</Label>
          <Select value={inputs.para} onChange={set("para")}>
            {UNIDADES_NFE_OPTIONS.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
          </Select>
        </div>
      </div>

      {result && (
        <ResultPanel title="Resultado">
          <ResultRow label="Resultado" value={`${result.resultado} ${result.para}`} highlight />
          <ResultRow label="Unidade origem" value={result.de} />
          <ResultRow label="Unidade destino" value={result.para} />
        </ResultPanel>
      )}
    </div>
  );
}
