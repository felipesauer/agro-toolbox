"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularFundosEstaduais } from "@/lib/calculators/fiscal/fundosEstaduais";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";
import { FUNDOS } from "@/lib/constants/fundos";

const ESTADOS = Object.keys(FUNDOS);

const defaultInputs = { estado: "MT", produto: "soja", quantidade: 1000, valorOperacao: 300000 };

export default function FundosEstaduaisCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularFundosEstaduais, inputs);

  const produtos = FUNDOS[inputs.estado]
    ? Object.keys(FUNDOS[inputs.estado].fundos)
    : [];

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({
      ...p,
      [k]: ["quantidade", "valorOperacao"].includes(k) ? Number(e.target.value) : e.target.value,
      ...(k === "estado" ? { produto: Object.keys(FUNDOS[e.target.value]?.fundos ?? {})[0] ?? "" } : {}),
    }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Estado (UF)</Label>
          <Select value={inputs.estado} onChange={set("estado")}>
            {ESTADOS.map((uf) => <option key={uf} value={uf}>{uf} — {FUNDOS[uf].nome}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Produto</Label>
          <Select value={inputs.produto} onChange={set("produto")}>
            {produtos.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Quantidade (ton ou cabeças)</Label>
          <Input type="number" min={0} value={inputs.quantidade} onChange={set("quantidade")} />
        </div>
        <div className="space-y-2">
          <Label>Valor da operação (R$)</Label>
          <Input type="number" min={0} value={inputs.valorOperacao} onChange={set("valorOperacao")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Fundos Estaduais">
          {result.valorFundo !== undefined ? (
            <>
              <ResultRow label="Fundo" value={result.fundo as string} />
              <ResultRow label="Valor do fundo" value={formatBRL(result.valorFundo)} highlight />
              <ResultRow label="Valor por unidade" value={`R$ ${result.valorPorUnidade} ${result.unidade}`} />
              <ResultRow label="% sobre operação" value={`${result.percentualSobreOperacao}%`} />
            </>
          ) : (
            <div className="col-span-2 text-sm text-muted-foreground">{result.mensagem as string}</div>
          )}
        </ResultPanel>
      )}
    </div>
  );
}
