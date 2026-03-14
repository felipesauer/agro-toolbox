"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { simularCbsIbs } from "@/lib/calculators/reforma/simuladorCbsIbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";
import { UFS_BRASIL } from "@/lib/constants/cbsReferencia";

const defaultInputs = { ncm: "1201", valorOperacao: 100000, uf: "MT", creditosEntrada: 0 };

export default function SimuladorCbsIbsCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(simularCbsIbs, inputs);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({ ...p, [k]: ["valorOperacao", "creditosEntrada"].includes(k) ? Number(e.target.value) : e.target.value }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>NCM (4 dígitos)</Label>
          <Input value={inputs.ncm} onChange={set("ncm")} placeholder="ex: 1201 (soja)" maxLength={8} />
        </div>
        <div className="space-y-2">
          <Label>UF da operação</Label>
          <Select value={inputs.uf} onChange={set("uf")}>
            {UFS_BRASIL.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Valor da operação (R$)</Label>
          <Input type="number" min={0} value={inputs.valorOperacao} onChange={set("valorOperacao")} />
        </div>
        <div className="space-y-2">
          <Label>Créditos de entrada (R$)</Label>
          <Input type="number" min={0} value={inputs.creditosEntrada} onChange={set("creditosEntrada")} />
        </div>
      </div>

      {result && !("erro" in result) && "valores" in result && (
        <ResultPanel title="CBS/IBS Simulado">
          <ResultRow label="Redução de alíquota" value={result.reducao as string} />
          <ResultRow label="Alíquota CBS efetiva" value={`${(result.aliquotas as Record<string, number>).cbs}%`} />
          <ResultRow label="Alíquota IBS efetiva" value={`${(result.aliquotas as Record<string, number>).ibs}%`} />
          <ResultRow label="CBS" value={formatBRL((result.valores as Record<string, number>).cbs)} />
          <ResultRow label="IBS" value={formatBRL((result.valores as Record<string, number>).ibs)} />
          <ResultRow label="Total bruto" value={formatBRL((result.valores as Record<string, number>).totalBruto)} highlight />
          {(result.valores as Record<string, number>).creditosEntrada > 0 && (
            <ResultRow label="Créditos utilizados" value={formatBRL((result.valores as Record<string, number>).creditosEntrada)} />
          )}
          <ResultRow label="Total líquido" value={formatBRL((result.valores as Record<string, number>).totalLiquido)} highlight />
          <div className="col-span-2 text-xs text-muted-foreground mt-2">{result.aviso as string}</div>
        </ResultPanel>
      )}
    </div>
  );
}
