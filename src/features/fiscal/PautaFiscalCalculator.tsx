"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularPautaFiscal } from "@/lib/calculators/fiscal/pautaFiscal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";
import { PAUTAS } from "@/lib/constants/pautas";
import { Badge } from "@/components/ui/badge";

const ESTADOS = Object.keys(PAUTAS);

const defaultInputs = { estado: "MT", produto: "soja", precoVenda: 120, quantidade: 1000 };

export default function PautaFiscalCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularPautaFiscal, inputs);

  const produtos = (PAUTAS as Record<string, Record<string, unknown>>)[inputs.estado]
    ? Object.keys((PAUTAS as Record<string, Record<string, unknown>>)[inputs.estado])
    : [];

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputs((p) => ({
      ...p,
      [k]: ["precoVenda", "quantidade"].includes(k) ? Number(e.target.value) : e.target.value,
      ...(k === "estado" ? { produto: Object.keys((PAUTAS as Record<string, Record<string, unknown>>)[e.target.value] ?? {})[0] ?? "" } : {}),
    }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Estado (UF)</Label>
          <Select value={inputs.estado} onChange={set("estado")}>
            {ESTADOS.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Produto</Label>
          <Select value={inputs.produto} onChange={set("produto")}>
            {produtos.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Preço de venda (R$/ton)</Label>
          <Input type="number" min={0} step={0.01} value={inputs.precoVenda} onChange={set("precoVenda")} />
        </div>
        <div className="space-y-2">
          <Label>Quantidade (ton)</Label>
          <Input type="number" min={0} value={inputs.quantidade} onChange={set("quantidade")} />
        </div>
      </div>

      {result && (
        <ResultPanel title="Pauta Fiscal">
          <div className="col-span-2 flex items-center gap-2">
            <Badge variant={result.usouPauta ? "destructive" : "secondary"}>
              {result.usouPauta ? "Pauta aplicada" : "Preço de venda usado"}
            </Badge>
          </div>
          <ResultRow label="Base de cálculo" value={formatBRL(result.baseCalculo)} highlight />
          <ResultRow label="Base unitária (R$/ton)" value={`R$ ${result.baseUnitaria}`} />
          <ResultRow label="Valor da pauta (R$/ton)" value={`R$ ${result.valorPauta}`} />
          {result.usouPauta && (
            <ResultRow label="Diferença ajustada" value={formatBRL(result.diferencaPauta ?? 0)} />
          )}
          {result.vigenciaPauta && (
            <ResultRow label="Vigência da pauta" value={result.vigenciaPauta as string} />
          )}
          <div className="col-span-2 text-sm text-muted-foreground mt-1">{result.mensagem as string}</div>
        </ResultPanel>
      )}
    </div>
  );
}
