"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularCustoHoraMaquina } from "@/lib/calculators/financeiro/custoHoraMaquina";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";

const defaultInputs = {
  consumoCombustivel: 18,
  precoCombustivel: 6.5,
  custoManutencaoAnual: 15000,
  horasAnoUso: 1200,
  valorMaquina: 500000,
  vidaUtilAnos: 10,
  custoOperador: 35,
  seguroAnual: 5000,
};

export default function CustoHoraMaquinaCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularCustoHoraMaquina, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((p) => ({ ...p, [k]: Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { key: "consumoCombustivel", label: "Consumo combustível (L/h)" },
          { key: "precoCombustivel", label: "Preço combustível (R$/L)" },
          { key: "custoManutencaoAnual", label: "Manutenção anual (R$)" },
          { key: "horasAnoUso", label: "Horas trabalhadas/ano" },
          { key: "valorMaquina", label: "Valor da máquina (R$)" },
          { key: "vidaUtilAnos", label: "Vida útil (anos)" },
          { key: "custoOperador", label: "Custo operador (R$/h)" },
          { key: "seguroAnual", label: "Seguro anual (R$)" },
        ].map(({ key, label }) => (
          <div key={key} className="space-y-2">
            <Label>{label}</Label>
            <Input type="number" min={0} step="any" value={(inputs as Record<string, number>)[key]} onChange={setN(key)} />
          </div>
        ))}
      </div>

      {result && (
        <ResultPanel title="Custo por Hora">
          <ResultRow label="Custo total por hora" value={formatBRL(result.custoHoraTotal)} highlight />
          <ResultRow label="Combustível" value={formatBRL(result.detalhamento.combustivel)} />
          <ResultRow label="Manutenção" value={formatBRL(result.detalhamento.manutencao)} />
          <ResultRow label="Depreciação" value={formatBRL(result.detalhamento.depreciacao)} />
          <ResultRow label="Operador" value={formatBRL(result.detalhamento.operador)} />
          <ResultRow label="Seguro" value={formatBRL(result.detalhamento.seguro)} />
          <ResultRow label="Custo anual total" value={formatBRL(result.custoAnualTotal)} />
        </ResultPanel>
      )}
    </div>
  );
}
