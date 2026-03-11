export const CATEGORIAS = [
  {
    slug: 'agronomica',
    nome: 'Agronômica',
    icone: '🌾',
    descricao: 'Conversores de medidas, sacas, calagem, volume de calda e mais',
  },
  {
    slug: 'financeiro',
    nome: 'Financeiro',
    icone: '💰',
    descricao: 'Custo hora-máquina, depreciação, financiamento, comparativos',
  },
  {
    slug: 'pecuaria',
    nome: 'Pecuária',
    icone: '🐄',
    descricao: 'Peso vivo para arroba, lotação de pastagem',
  },
  {
    slug: 'fiscal',
    nome: 'Fiscal',
    icone: '📊',
    descricao: 'Funrural, IRPF rural, ITR, LCDPR, NFe, CFOP',
  },
  {
    slug: 'reforma',
    nome: 'Reforma Tributária',
    icone: '📋',
    descricao: 'Simulador CBS/IBS, consultor NCM, crédito presumido',
  },
  {
    slug: 'logistica',
    nome: 'Logística',
    icone: '🚚',
    descricao: 'Quebra de frete e tolerância de peso',
  },
];

export const FERRAMENTAS = [
  // Agronômica
  { slug: 'conversor-medidas', nome: 'Conversor de Medidas Agrárias', descricao: 'Converte áreas entre medidas regionais brasileiras', categoria: 'agronomica', endpoint: '/agronomica/conversor-medidas' },
  { slug: 'conversor-sacas', nome: 'Conversor Sacas ↔ Kg/Ton', descricao: 'Converte sacas para quilos e toneladas por cultura', categoria: 'agronomica', endpoint: '/agronomica/conversor-sacas' },
  { slug: 'quebra-umidade', nome: 'Quebra de Umidade e Impureza', descricao: 'Calcula descontos por umidade e impureza na classificação', categoria: 'agronomica', endpoint: '/agronomica/quebra-umidade' },
  { slug: 'ciclo-cultura', nome: 'Ciclo da Cultura', descricao: 'Estima a data de colheita baseado no plantio e ciclo', categoria: 'agronomica', endpoint: '/agronomica/ciclo-cultura' },
  { slug: 'necessidade-sementes', nome: 'Necessidade de Sementes/ha', descricao: 'Calcula kg de sementes por hectare', categoria: 'agronomica', endpoint: '/agronomica/necessidade-sementes' },
  { slug: 'estimativa-produtividade', nome: 'Estimativa de Produtividade', descricao: 'Estima produtividade da lavoura em sacas/ha', categoria: 'agronomica', endpoint: '/agronomica/estimativa-produtividade' },
  { slug: 'volume-calda', nome: 'Volume de Calda', descricao: 'Calcula volume de calda por hectare na pulverização', categoria: 'agronomica', endpoint: '/agronomica/volume-calda' },
  { slug: 'calagem', nome: 'Calculadora de Calagem', descricao: 'Calcula necessidade de calcário por hectare', categoria: 'agronomica', endpoint: '/agronomica/calagem' },

  // Financeiro
  { slug: 'depreciacao', nome: 'Depreciação de Maquinário', descricao: 'Calcula depreciação linear de máquinas e equipamentos', categoria: 'financeiro', endpoint: '/financeiro/depreciacao' },
  { slug: 'custo-hora-maquina', nome: 'Custo de Hora-Máquina', descricao: 'Calcula o custo total por hora de operação', categoria: 'financeiro', endpoint: '/financeiro/custo-hora-maquina' },
  { slug: 'vender-vs-armazenar', nome: 'Vender vs. Armazenar', descricao: 'Compara vender na colheita ou armazenar para vender depois', categoria: 'financeiro', endpoint: '/financeiro/vender-vs-armazenar' },
  { slug: 'custo-financiamento', nome: 'Custos de Financiamento', descricao: 'Simula parcelas e custos de financiamento rural', categoria: 'financeiro', endpoint: '/financeiro/custo-financiamento' },
  { slug: 'acerto-safrista', nome: 'Acerto de Safrista', descricao: 'Calcula o acerto de trabalhador com contrato de safra', categoria: 'financeiro', endpoint: '/financeiro/acerto-safrista' },

  // Pecuária
  { slug: 'peso-arroba', nome: 'Peso Vivo → Arroba', descricao: 'Converte peso vivo do animal para arrobas', categoria: 'pecuaria', endpoint: '/pecuaria/peso-arroba' },
  { slug: 'lotacao-pastagem', nome: 'Lotação de Pastagem', descricao: 'Calcula taxa de lotação UA/ha da pastagem', categoria: 'pecuaria', endpoint: '/pecuaria/lotacao-pastagem' },

  // Fiscal
  { slug: 'conversor-unidades-nfe', nome: 'Conversor Unidades NFe', descricao: 'Converte entre unidades aceitas na Nota Fiscal Eletrônica', categoria: 'fiscal', endpoint: '/fiscal/conversor-unidades-nfe' },
  { slug: 'retencao-funrural', nome: 'Retenção Funrural e Senar', descricao: 'Calcula valores retidos de Funrural, RAT e Senar', categoria: 'fiscal', endpoint: '/fiscal/retencao-funrural' },
  { slug: 'quebra-peso-nota', nome: 'Quebra de Peso para Nota Complementar', descricao: 'Calcula nota complementar por diferença de peso', categoria: 'fiscal', endpoint: '/fiscal/quebra-peso-nota' },
  { slug: 'funrural-comparativo', nome: 'Funrural: Comercialização vs. Folha', descricao: 'Compara custo do Funrural entre modalidades', categoria: 'fiscal', endpoint: '/fiscal/funrural-comparativo' },
  { slug: 'irpf-rural', nome: 'IRPF Rural: Real vs. Presumido', descricao: 'Compara tributação do IRPF rural entre resultado real e presumido', categoria: 'fiscal', endpoint: '/fiscal/irpf-rural' },
  { slug: 'estimativa-itr', nome: 'Estimativa de ITR', descricao: 'Calcula estimativa do Imposto sobre a Propriedade Territorial Rural', categoria: 'fiscal', endpoint: '/fiscal/estimativa-itr' },
  { slug: 'termometro-lcdpr', nome: 'Termômetro LCDPR', descricao: 'Verifica obrigatoriedade do LCDPR por receita bruta', categoria: 'fiscal', endpoint: '/fiscal/termometro-lcdpr' },
  { slug: 'fundos-estaduais', nome: 'Fundos Estaduais (FETHAB)', descricao: 'Calcula fundos estaduais como FETHAB e FUNDEINFRA', categoria: 'fiscal', endpoint: '/fiscal/fundos-estaduais' },
  { slug: 'assistente-cfop', nome: 'Assistente CFOP', descricao: 'Encontra o CFOP correto por tipo de operação', categoria: 'fiscal', endpoint: '/fiscal/assistente-cfop' },
  { slug: 'pauta-fiscal', nome: 'Base de Cálculo Pauta Fiscal', descricao: 'Verifica se aplica pauta fiscal como base de ICMS', categoria: 'fiscal', endpoint: '/fiscal/pauta-fiscal' },

  // Reforma Tributária
  { slug: 'simulador-cbs-ibs', nome: 'Simulador CBS/IBS', descricao: 'Simula tributos da reforma tributária sobre operações agro', categoria: 'reforma', endpoint: '/reforma/simulador-cbs-ibs' },
  { slug: 'consultor-ncm', nome: 'Consultor NCM Agro', descricao: 'Consulta informações tributárias por NCM', categoria: 'reforma', endpoint: '/reforma/consultor-ncm' },
  { slug: 'credito-presumido', nome: 'Crédito Presumido PF', descricao: 'Calcula crédito presumido para produtor pessoa física', categoria: 'reforma', endpoint: '/reforma/credito-presumido' },

  // Logística
  { slug: 'quebra-frete', nome: 'Quebra de Frete', descricao: 'Calcula tolerância de quebra no transporte de grãos', categoria: 'logistica', endpoint: '/logistica/quebra-frete' },
];
