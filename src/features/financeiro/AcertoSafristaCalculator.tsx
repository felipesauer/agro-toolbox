"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularAcertoSafrista } from "@/lib/calculators/financeiro/acertoSafrista";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";

const defaultInputs = {
  salarioMensal: 2000,
  mesesTrabalhados: 8,
  motivoRescisao: "termino_contrato" as const,
};

export default function AcertoSafristaCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularAcertoSafrista, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({ ...p, [k]: k === "motivoRescisao" ? e.target.value : Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Salário mensal (R$)</Label>
          <Input type="number" min={0} value={inputs.salarioMensal} onChange={setN("salarioMensal")} />
        </div>
        <div className="space-y-2">
          <Label>Meses trabalhados</Label>
          <Input type="number" min={1} max={24} value={inputs.mesesTrabalhados} onChange={setN("mesesTrabalhados")} />
        </div>
        <div className="space-y-2">
          <Label>Motivo da rescisão</Label>
          <Select value={inputs.motivoRescisao} onChange={setN("motivoRescisao")}>
            <option value="termino_contrato">Término de contrato</option>
            <option value="dispensa_sem_justa_causa">Dispensa sem justa causa</option>
            <option value="rescisao_indireta">Rescisão indireta</option>
            <option value="acordo">Acordo mútuo</option>
            <option value="pedido_demissao">Pedido de demissão</option>
          </Select>
        </div>
      </div>

      {result && (
        <ResultPanel title="Acerto Rescisório">
          <ResultRow label="Total do acerto" value={formatBRL(result.totalAcerto)} highlight />
          <ResultRow label="Salário bruto" value={formatBRL(result.salarioBruto)} />
          <ResultRow label="FGTS" value={formatBRL(result.fgts)} />
          <ResultRow label="Férias proporcionais" value={formatBRL(result.feriasProporcionais)} />
          <ResultRow label="13º proporcional" value={formatBRL(result.decimoTerceiro)} />
          {result.multaFgts > 0 && (
            <ResultRow label="Multa FGTS (40%)" value={formatBRL(result.multaFgts)} />
          )}
          <ResultRow label="Desconto INSS" value={formatBRL(result.inssEmpregado * -1)} />
          <ResultRow label="Custo total empregador" value={formatBRL(result.custoEmpregadorTotal)} />
        </ResultPanel>
      )}
    </div>
  );
}
