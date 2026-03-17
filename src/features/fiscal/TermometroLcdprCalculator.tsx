"use client";

import { useState } from "react";
import { useAutoCalculation } from "@/hooks/useAutoCalculation";
import { calcularTermometroLcdpr } from "@/lib/calculators/fiscal/termometroLcdpr";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { formatBRL } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const STATUS_COLORS = {
  tranquilo: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  atencao: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  alerta: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  obrigatorio: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
} as const;

const defaultInputs = { receitaBrutaTotal: 100000 };

export default function TermometroLcdprCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const { result } = useAutoCalculation(calcularTermometroLcdpr, inputs);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Receita bruta total no ano (R$)</Label>
          <Input
            type="number"
            min={0}
            value={inputs.receitaBrutaTotal}
            onChange={(e) => setInputs({ receitaBrutaTotal: Number(e.target.value) })}
          />
        </div>
      </div>

      {result && (
        <ResultPanel title="Termômetro LCDPR">
          <div className="col-span-2 flex items-center gap-3 py-1">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Badge className={STATUS_COLORS[result.status as keyof typeof STATUS_COLORS]}>
              {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
            </Badge>
          </div>
          <ResultRow label="Receita bruta" value={formatBRL(result.receitaBrutaTotal)} />
          <ResultRow label="Limite LCDPR" value={formatBRL(result.limiteLcdpr)} />
          <ResultRow label="Percentual do limite" value={`${result.percentual}%`} highlight />
          <ResultRow label="Saldo restante" value={formatBRL(result.saldoRestante)} />
          <div className="col-span-2 text-sm text-muted-foreground mt-2 p-3 bg-muted/50 rounded-lg">
            {result.mensagem}
          </div>
        </ResultPanel>
      )}
    </div>
  );
}
