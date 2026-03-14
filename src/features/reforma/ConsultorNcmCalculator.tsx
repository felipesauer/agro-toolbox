"use client";

import { useState } from "react";
import { consultarNcm, listarNcms } from "@/lib/calculators/reforma/consultorNcm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { Badge } from "@/components/ui/badge";

const CESTA_BADGE = {
  zero: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  reduzida: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  normal: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
} as const;

export default function ConsultorNcmCalculator() {
  const [ncm, setNcm] = useState("1201");
  const [result, setResult] = useState<ReturnType<typeof consultarNcm> | null>(null);
  const [capitulos, setCapitulos] = useState<string[]>([]);

  const handleSearch = () => {
    const r = consultarNcm(ncm);
    setResult(r);
    if (r.encontrado) {
      const caps = Array.from(new Set(listarNcms().map((n) => n.capitulo))).sort();
      setCapitulos(caps);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3 items-end">
        <div className="flex-1 space-y-2">
          <Label>Código NCM (4 dígitos mínimo)</Label>
          <Input
            value={ncm}
            onChange={(e) => setNcm(e.target.value)}
            placeholder="ex: 1201 ou 12011000"
            maxLength={10}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch}>Consultar</Button>
      </div>

      {result && (
        <ResultPanel title="Resultado da Consulta NCM">
          {result.encontrado ? (
            <>
              <div className="col-span-2 flex flex-wrap items-center gap-2">
                <Badge className="font-mono text-base px-3">{result.ncmBase}</Badge>
                <Badge className={CESTA_BADGE[result.cestaTributaria as keyof typeof CESTA_BADGE]}>
                  Cesta {result.cestaTributaria}
                </Badge>
                {result.impostoSeletivo && <Badge variant="destructive">Imposto Seletivo</Badge>}
              </div>
              <ResultRow label="Descrição" value={result.descricao ?? ""} highlight />
              <ResultRow label="Capítulo" value={`${result.capituloNumero} — ${result.capitulo}`} />
              <ResultRow label="Redução de alíquota" value={result.reducaoAliquota ?? ""} />
              <div className="col-span-2 text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg mt-1">
                {result.observacao}
              </div>
            </>
          ) : (
            <div className="col-span-2 text-sm text-muted-foreground">{result.mensagem}</div>
          )}
        </ResultPanel>
      )}
    </div>
  );
}
