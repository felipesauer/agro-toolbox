"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { converterMedidas as calcularConversorMedidas } from "@/lib/calculators/agro/conversorMedidas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { UNIDADES_AREA_OPTIONS } from "@/lib/constants/conversoes";

const defaultInputs = { valor: 0, de: "hectare", para: "acre" };

export default function ConversorMedidasCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularConversorMedidas, inputs);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({ ...p, [k]: k === "valor" ? Number(e.target.value) : e.target.value }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Valor</Label>
          <Input type="number" min={0} value={inputs.valor} onChange={set("valor")} />
        </div>
        <div className="space-y-2">
          <Label>De</Label>
          <Select value={inputs.de} onChange={set("de")}>
            {UNIDADES_AREA_OPTIONS.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Para</Label>
          <Select value={inputs.para} onChange={set("para")}>
            {UNIDADES_AREA_OPTIONS.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </Select>
        </div>
      </div>

      {result && (
        <ResultPanel title="Resultado da Conversão">
          <ResultRow label="Resultado" value={`${result.resultado} ${result.unidadeDestino}`} highlight />
          <ResultRow label="Valor original" value={`${inputs.valor} ${result.unidadeOrigem}`} />
          {result.equivalencias && (
            <>
              <div className="col-span-2 mt-2 text-sm font-medium text-muted-foreground">Equivalências</div>
              {Object.entries(result.equivalencias).map(([k, v]) => (
                <ResultRow key={k} label={k} value={String(v)} />
              ))}
            </>
          )}
        </ResultPanel>
      )}
    </div>
  );
}
