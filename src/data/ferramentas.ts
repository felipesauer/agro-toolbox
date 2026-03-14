import {
  Leaf,
  TrendingUp,
  Calculator,
  FileText,
  RefreshCw,
  Truck,
  type LucideIcon,
} from "lucide-react";

export interface Categoria {
  slug: string;
  nome: string;
  nomeAbrev: string;
  descricao: string;
  icon: LucideIcon;
  cor: string;
}

export interface Ferramenta {
  slug: string;
  nome: string;
  descricao: string;
  categoria: string;
  tags?: string[];
  destaque?: boolean;
}

export const CATEGORIAS: Categoria[] = [
  {
    slug: "agronomica",
    nome: "Agronômica",
    nomeAbrev: "Agro",
    descricao: "Conversores de medidas, sacas, calagem, volume de calda e mais",
    icon: Leaf,
    cor: "green",
  },
  {
    slug: "financeiro",
    nome: "Financeiro",
    nomeAbrev: "Financeiro",
    descricao: "Custo hora-máquina, depreciação, financiamento, comparativos",
    icon: TrendingUp,
    cor: "emerald",
  },
  {
    slug: "pecuaria",
    nome: "Pecuária",
    nomeAbrev: "Pecuária",
    descricao: "Peso vivo para arroba, lotação de pastagem",
    icon: Calculator,
    cor: "lime",
  },
  {
    slug: "fiscal",
    nome: "Fiscal",
    nomeAbrev: "Fiscal",
    descricao: "Funrural, IRPF rural, ITR, LCDPR, NFe, CFOP e mais",
    icon: FileText,
    cor: "teal",
  },
  {
    slug: "reforma",
    nome: "Reforma Tributária",
    nomeAbrev: "Reforma",
    descricao: "Simulador CBS/IBS, consultor NCM, crédito presumido",
    icon: RefreshCw,
    cor: "cyan",
  },
  {
    slug: "logistica",
    nome: "Logística",
    nomeAbrev: "Logística",
    descricao: "Análise de frete, quebra, capacidade de carga",
    icon: Truck,
    cor: "blue",
  },
];

export const FERRAMENTAS: Ferramenta[] = [
  // AGRONÔMICA
  {
    slug: "conversor-medidas",
    nome: "Conversor de Medidas",
    descricao: "Converta entre hectares, alqueires regionais, acres, tarefas e mais",
    categoria: "agronomica",
    tags: ["área", "conversão", "hectare", "alqueire"],
    destaque: true,
  },
  {
    slug: "conversor-sacas",
    nome: "Conversor de Sacas",
    descricao: "Converta sacas para kg ou toneladas por cultura",
    categoria: "agronomica",
    tags: ["sacas", "kg", "tonelada", "grãos"],
    destaque: true,
  },
  {
    slug: "quebra-umidade",
    nome: "Quebra de Umidade",
    descricao: "Calcule o peso líquido após descontos de umidade e impureza",
    categoria: "agronomica",
    tags: ["umidade", "impureza", "desconto", "peso"],
    destaque: true,
  },
  {
    slug: "ciclo-cultura",
    nome: "Ciclo da Cultura",
    descricao: "Estime a data de colheita a partir do plantio e do ciclo da cultivar",
    categoria: "agronomica",
    tags: ["colheita", "plantio", "ciclo", "safra"],
  },
  {
    slug: "necessidade-sementes",
    nome: "Necessidade de Sementes",
    descricao: "Calcule kg/ha necessários com base em população, PMS e germinação",
    categoria: "agronomica",
    tags: ["sementes", "plantio", "germinação", "PMS"],
  },
  {
    slug: "estimativa-produtividade",
    nome: "Estimativa de Produtividade",
    descricao: "Estime sacas/ha a partir de plantas, estruturas e grãos por planta",
    categoria: "agronomica",
    tags: ["produtividade", "sacas", "estimativa"],
  },
  {
    slug: "volume-calda",
    nome: "Volume de Calda",
    descricao: "Calcule o volume de calda por hectare para aplicações",
    categoria: "agronomica",
    tags: ["calda", "pulverização", "defensivo"],
  },
  {
    slug: "calagem",
    nome: "Necessidade de Calagem",
    descricao: "Calcule a dose de calcário pelo método da saturação por bases",
    categoria: "agronomica",
    tags: ["calcário", "CTC", "saturação", "solo"],
    destaque: true,
  },

  // FINANCEIRO
  {
    slug: "depreciacao",
    nome: "Depreciação",
    descricao: "Calcule a depreciação linear de equipamentos e máquinas",
    categoria: "financeiro",
    tags: ["depreciação", "máquinas", "ativo"],
    destaque: true,
  },
  {
    slug: "custo-hora-maquina",
    nome: "Custo Hora-Máquina",
    descricao: "Calcule o custo total por hora de operação de cada máquina",
    categoria: "financeiro",
    tags: ["máquina", "hora", "custo", "operação"],
    destaque: true,
  },
  {
    slug: "vender-vs-armazenar",
    nome: "Vender vs. Armazenar",
    descricao: "Compare receita de venda imediata versus armazenagem e venda futura",
    categoria: "financeiro",
    tags: ["armazenagem", "venda", "lucro", "decisão"],
    destaque: true,
  },
  {
    slug: "custo-financiamento",
    nome: "Custo de Financiamento",
    descricao: "Simule financiamentos SAC ou PRICE com juros, prazo e carência",
    categoria: "financeiro",
    tags: ["financiamento", "SAC", "PRICE", "juros"],
  },
  {
    slug: "acerto-safrista",
    nome: "Acerto Safrista",
    descricao: "Calcule o acerto final do trabalho temporário na safra (férias, 13º, FGTS)",
    categoria: "financeiro",
    tags: ["trabalhista", "safrista", "férias", "FGTS"],
  },

  // PECUÁRIA
  {
    slug: "peso-arroba",
    nome: "Peso em Arroba",
    descricao: "Converta peso vivo para arrobas com rendimento de carcaça",
    categoria: "pecuaria",
    tags: ["arroba", "carcaça", "bovino"],
    destaque: true,
  },
  {
    slug: "lotacao-pastagem",
    nome: "Lotação de Pastagem",
    descricao: "Calcule a lotação em UA/ha e avalie se está adequada",
    categoria: "pecuaria",
    tags: ["pastagem", "UA", "lotação", "bovino"],
    destaque: true,
  },

  // FISCAL
  {
    slug: "conversor-unidades-nfe",
    nome: "Conversor Unidades NF-e",
    descricao: "Converta entre unidades aceitas na NF-e (sacas, kg, ton, arroba)",
    categoria: "fiscal",
    tags: ["NF-e", "unidades", "conversão", "fiscal"],
  },
  {
    slug: "retencao-funrural",
    nome: "Retenção Funrural",
    descricao: "Calcule o Funrural, RAT e Senar a reter na compra de produtor rural",
    categoria: "fiscal",
    tags: ["Funrural", "RAT", "Senar", "retenção"],
    destaque: true,
  },
  {
    slug: "quebra-peso-nota",
    nome: "Quebra de Peso na Nota",
    descricao: "Calcule a NF complementar por diferença de peso entre nota e romaneio",
    categoria: "fiscal",
    tags: ["NF-e", "peso", "complementar", "diferença"],
  },
  {
    slug: "funrural-comparativo",
    nome: "Funrural Comparativo",
    descricao: "Compare o custo do Funrural sobre comercialização vs sobre folha",
    categoria: "fiscal",
    tags: ["Funrural", "folha", "comparativo"],
  },
  {
    slug: "irpf-rural",
    nome: "IRPF Rural",
    descricao: "Compare IRPF pelo resultado real vs. 20% de lucro presumido",
    categoria: "fiscal",
    tags: ["IRPF", "imposto de renda", "rural", "presumido"],
    destaque: true,
  },
  {
    slug: "estimativa-itr",
    nome: "Estimativa ITR",
    descricao: "Estime o Imposto Territorial Rural com base na área e utilização",
    categoria: "fiscal",
    tags: ["ITR", "imposto", "territorial", "rural"],
  },
  {
    slug: "termometro-lcdpr",
    nome: "Termômetro LCDPR",
    descricao: "Verifique se você é obrigado a entregar o LCDPR",
    categoria: "fiscal",
    tags: ["LCDPR", "obrigação", "receita bruta"],
  },
  {
    slug: "fundos-estaduais",
    nome: "Fundos Estaduais",
    descricao: "Calcule FETHAB (MT), FUNDEINFRA (GO), FUNDERSUL (MS) e outros",
    categoria: "fiscal",
    tags: ["FETHAB", "FUNDEINFRA", "fundo", "estadual"],
    destaque: true,
  },
  {
    slug: "assistente-cfop",
    nome: "Assistente CFOP",
    descricao: "Encontre o CFOP correto para cada operação fiscal",
    categoria: "fiscal",
    tags: ["CFOP", "NF-e", "operação", "fiscal"],
    destaque: true,
  },
  {
    slug: "pauta-fiscal",
    nome: "Pauta Fiscal",
    descricao: "Verifique se a pauta fiscal do estado incide sobre sua operação",
    categoria: "fiscal",
    tags: ["pauta", "ICMS", "fiscal", "estado"],
  },

  // REFORMA TRIBUTÁRIA
  {
    slug: "simulador-cbs-ibs",
    nome: "Simulador CBS/IBS",
    descricao: "Simule a carga tributária da Reforma com CBS e IBS por NCM e UF",
    categoria: "reforma",
    tags: ["CBS", "IBS", "reforma", "tributária"],
    destaque: true,
  },
  {
    slug: "consultor-ncm",
    nome: "Consultor NCM",
    descricao: "Consulte a cesta tributária e redução de alíquota pelo NCM",
    categoria: "reforma",
    tags: ["NCM", "cesta", "alíquota", "redução"],
    destaque: true,
  },
  {
    slug: "credito-presumido",
    nome: "Crédito Presumido",
    descricao: "Calcule o crédito presumido de CBS/IBS para produtor rural PF",
    categoria: "reforma",
    tags: ["crédito presumido", "CBS", "IBS", "produtor rural"],
  },

  // LOGÍSTICA
  {
    slug: "custo-frete",
    nome: "Custo de Frete",
    descricao: "Calcule o custo total do frete por modalidade e distância",
    categoria: "logistica",
    tags: ["frete", "custo", "transporte", "logística"],
    destaque: true,
  },
  {
    slug: "capacidade-carga",
    nome: "Capacidade de Carga",
    descricao: "Calcule a capacidade efetiva de carga do veículo e viagens necessárias",
    categoria: "logistica",
    tags: ["carga", "caminhão", "capacidade", "viagens"],
  },
  {
    slug: "quebra-frete",
    nome: "Quebra no Frete",
    descricao: "Verifique se a quebra de peso está dentro da tolerância e calcule o prejuízo",
    categoria: "logistica",
    tags: ["quebra", "tolerância", "peso", "frete"],
  },
];

export function getFerramenta(slug: string): Ferramenta | undefined {
  return FERRAMENTAS.find((f) => f.slug === slug);
}

export function getCategoria(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug);
}

export function getFerramentasByCategoria(categoriaSlug: string): Ferramenta[] {
  return FERRAMENTAS.filter((f) => f.categoria === categoriaSlug);
}

export function getFerramentasDestaque(): Ferramenta[] {
  return FERRAMENTAS.filter((f) => f.destaque);
}
