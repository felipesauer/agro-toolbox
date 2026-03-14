"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularRetencaoFunrural } from "@/lib/calculators/fiscal/retencaoFunrural";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";

const defaultInputs = {
  valorBruto: 100000,
  tipoPessoa: "PF" as "PF" | "PJ",
  optanteFolha: false,
};

export default function RetencaoFunruralCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularRetencaoFunrural, inputs);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Valor bruto (R$)</Label>
          <Input
            type="number"
            min={0}
            value={inputs.valorBruto}
            onChange={(e) => setInputs((p) => ({ ...p, valorBruto: Number(e.target.value) }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Tipo de produtor</Label>
          <Select
            value={inputs.tipoPessoa}
            onChange={(e) => setInputs((p) => ({ ...p, tipoPessoa: e.target.value as "PF" | "PJ" }))}
          >
            <option value="PF">Pessoa Física (PF)</option>
            <option value="PJ">Pessoa Jurídica (PJ)</option>
          </Select>
        </div>
        {inputs.tipoPessoa === "PF" && (
          <div className="flex items-center gap-2">
            <input
              id="optanteFolha"
              type="checkbox"
              checked={inputs.optanteFolha}
              onChange={(e) => setInputs((p) => ({ ...p, optanteFolha: e.target.checked }))}
              className="w-4 h-4"
            />
            <Label htmlFor="optanteFolha">Optante pela folha de pagamento</Label>
          </div>
        )}
      </div>

      {result && (
        <ResultPanel title="Retenção FUNRURAL">
          <ResultRow label="Total retido" value={formatBRL(result.totalRetido as number)} highlight />
          <ResultRow label="Valor líquido" value={formatBRL(result.valorLiquido as number)} />
          <ResultRow label="RAT/SENAR" value={formatBRL(result.rat as number)} />
          {result.funrural !== undefined && !inputs.optanteFolha && (
            <ResultRow label="FUNRURAL (Previdência)" value={formatBRL(result.funrural as number)} />
          )}
          <ResultRow label="SENAR" value={formatBRL(result.senar as number)} />
        </ResultPanel>
      )}
    </div>
  );
}
