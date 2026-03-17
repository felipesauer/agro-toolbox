"use client";

import { useState } from "react";
import { consultarCfop } from "@/lib/calculators/fiscal/assistenteCfop";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect as Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ResultPanel, ResultRow } from "@/components/calculator/ResultPanel";
import { Badge } from "@/components/ui/badge";

type Mode = "forward" | "reverse";

export default function AssistenteCfopCalculator() {
  const [mode, setMode] = useState<Mode>("forward");
  const [tipo, setTipo] = useState<"saida" | "entrada">("saida");
  const [destino, setDestino] = useState<"mesmo_estado" | "outro_estado" | "exterior">("outro_estado");
  const [operacao, setOperacao] = useState("venda_producao_propria");
  const [cfopCode, setCfopCode] = useState("");
  const [result, setResult] = useState<ReturnType<typeof consultarCfop> | null>(null);

  const handleSearch = () => {
    if (mode === "reverse") {
      setResult(consultarCfop({ cfop: cfopCode }));
    } else {
      setResult(consultarCfop({ tipo, destino, operacao }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button
          variant={mode === "forward" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("forward")}
        >
          Busca por operação
        </Button>
        <Button
          variant={mode === "reverse" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("reverse")}
        >
          Busca por código CFOP
        </Button>
      </div>

      {mode === "forward" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select value={tipo} onChange={(e) => setTipo(e.target.value as typeof tipo)}>
              <option value="saida">Saída</option>
              <option value="entrada">Entrada</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Destino</Label>
            <Select value={destino} onChange={(e) => setDestino(e.target.value as typeof destino)}>
              <option value="mesmo_estado">Mesmo estado</option>
              <option value="outro_estado">Outro estado</option>
              <option value="exterior">Exterior</option>
            </Select>
          </div>
          <div className="col-span-2 space-y-2">
            <Label>Operação (ex: venda_producao_propria)</Label>
            <Input value={operacao} onChange={(e) => setOperacao(e.target.value)} />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Label>Código CFOP (ex: 6.101)</Label>
          <Input value={cfopCode} onChange={(e) => setCfopCode(e.target.value)} placeholder="Digite o código CFOP" />
        </div>
      )}

      <Button onClick={handleSearch}>Consultar CFOP</Button>

      {result && (
        <ResultPanel title="Resultado">
          {result.cfop ? (
            <>
              <div className="col-span-2 flex items-center gap-3">
                <Badge className="text-lg px-4 py-1 font-mono bg-primary/10 text-primary">{result.cfop}</Badge>
              </div>
              <ResultRow label="Descrição" value={result.descricao ?? ""} highlight />
              {result.tipo && <ResultRow label="Tipo" value={result.tipo} />}
              {result.destino && <ResultRow label="Destino" value={result.destino.replace(/_/g, " ")} />}
              {result.operacao && <ResultRow label="Operação" value={result.operacao.replace(/_/g, " ")} />}
              {result.mensagem && (
                <div className="col-span-2 text-sm text-yellow-600 dark:text-yellow-400">{result.mensagem}</div>
              )}
            </>
          ) : (
            <div className="col-span-2 text-sm text-muted-foreground">
              {result.mensagem}
              {(result as { sugestoes?: string[] }).sugestoes && (
                <div className="mt-2">
                  <p className="font-medium">Operações disponíveis:</p>
                  <ul className="list-disc pl-4 mt-1 space-y-1">
                    {((result as { sugestoes?: string[] }).sugestoes ?? []).map((s) => (
                      <li key={s} className="font-mono text-xs">{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </ResultPanel>
      )}
    </div>
  );
}
