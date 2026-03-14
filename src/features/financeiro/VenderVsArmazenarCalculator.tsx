"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularVenderVsArmazenar } from "@/lib/calculators/financeiro/venderVsArmazenar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";

const defaultInputs = {
  precoAtual: 120,
  precoFuturo: 135,
  quantidade: 5000,
  custoArmazenagemMes: 3.5,
  mesesArmazenagem: 4,
  taxaOportunidade: 0.8,
};

export default function VenderVsArmazenarCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularVenderVsArmazenar, inputs);

  const setN = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((p) => ({ ...p, [k]: Number(e.target.value) }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Preço atual (R$/sc)</Label>
          <Input type="number" min={0} step={0.01} value={inputs.precoAtual} onChange={setN("precoAtual")} />
        </div>
        <div className="space-y-2">
          <Label>Preço futuro esperado (R$/sc)</Label>
          <Input type="number" min={0} step={0.01} value={inputs.precoFuturo} onChange={setN("precoFuturo")} />
        </div>
        <div className="space-y-2">
          <Label>Quantidade (sacas)</Label>
          <Input type="number" min={0} value={inputs.quantidade} onChange={setN("quantidade")} />
        </div>
        <div className="space-y-2">
          <Label>Custo armazenagem (R$/sc/mês)</Label>
          <Input type="number" min={0} step={0.01} value={inputs.custoArmazenagemMes} onChange={setN("custoArmazenagemMes")} />
        </div>
        <div className="space-y-2">
          <Label>Meses de armazenagem</Label>
          <Input type="number" min={1} max={24} value={inputs.mesesArmazenagem} onChange={setN("mesesArmazenagem")} />
        </div>
        <div className="space-y-2">
          <Label>Taxa de oportunidade mensal (%)</Label>
          <Input type="number" min={0} step={0.01} value={inputs.taxaOportunidade} onChange={setN("taxaOportunidade")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Vender vs. Armazenar">
          <ResultRow
            label="Recomendação"
            value={result.recomendacao as string}
            highlight
          />
          <ResultRow label="Receita venda imediata" value={formatBRL(result.receitaVendaImediata)} />
          <ResultRow label="Receita armazenagem" value={formatBRL(result.receitaArmazenagem)} />
          <ResultRow label="Custo total armazenagem" value={formatBRL(result.custoTotalArmazenagem)} />
          <ResultRow label="Custo oportunidade" value={formatBRL(result.detalhamento.custoOportunidade)} />
          <ResultRow label="Preço de equilíbrio" value={`R$ ${result.precoEquilibrio}/sc`} />
          <ResultRow label="Diferença líquida" value={formatBRL(result.diferencaLiquida)} />
        </ResultPanel>
      )}
    </div>
  );
}
