import { lazy } from 'react';

const toolComponents = {
  // Agronomica
  'conversor-medidas': lazy(() => import('./agronomica/ConversorMedidas.jsx')),
  'conversor-sacas': lazy(() => import('./agronomica/ConversorSacas.jsx')),
  'calagem': lazy(() => import('./agronomica/Calagem.jsx')),
  'volume-calda': lazy(() => import('./agronomica/VolumeCalda.jsx')),
  'ciclo-cultura': lazy(() => import('./agronomica/CicloCultura.jsx')),
  'quebra-umidade': lazy(() => import('./agronomica/QuebraUmidade.jsx')),
  'necessidade-sementes': lazy(() => import('./agronomica/NecessidadeSementes.jsx')),
  'estimativa-produtividade': lazy(() => import('./agronomica/EstimativaProdutividade.jsx')),
  // Pecuária
  'peso-arroba': lazy(() => import('./pecuaria/PesoArroba.jsx')),
  'lotacao-pastagem': lazy(() => import('./pecuaria/LotacaoPastagem.jsx')),
  // Financeiro
  'depreciacao': lazy(() => import('./financeiro/Depreciacao.jsx')),
  'custo-hora-maquina': lazy(() => import('./financeiro/CustoHoraMaquina.jsx')),
  'vender-vs-armazenar': lazy(() => import('./financeiro/VenderVsArmazenar.jsx')),
  'custo-financiamento': lazy(() => import('./financeiro/CustoFinanciamento.jsx')),
  'acerto-safrista': lazy(() => import('./financeiro/AcertoSafrista.jsx')),
  // Fiscal
  'conversor-unidades-nfe': lazy(() => import('./fiscal/ConversorUnidadesNfe.jsx')),
  'retencao-funrural': lazy(() => import('./fiscal/RetencaoFunrural.jsx')),
  'quebra-peso-nota': lazy(() => import('./fiscal/QuebraPesoNota.jsx')),
  'funrural-comparativo': lazy(() => import('./fiscal/FunruralComparativo.jsx')),
  'irpf-rural': lazy(() => import('./fiscal/IrpfRural.jsx')),
  'estimativa-itr': lazy(() => import('./fiscal/EstimativaItr.jsx')),
  'termometro-lcdpr': lazy(() => import('./fiscal/TermometroLcdpr.jsx')),
  'fundos-estaduais': lazy(() => import('./fiscal/FundosEstaduais.jsx')),
  'assistente-cfop': lazy(() => import('./fiscal/AssistenteCfop.jsx')),
  'pauta-fiscal': lazy(() => import('./fiscal/PautaFiscal.jsx')),
  // Reforma Tributária
  'simulador-cbs-ibs': lazy(() => import('./reforma/SimuladorCbsIbs.jsx')),
  'consultor-ncm': lazy(() => import('./reforma/ConsultorNcm.jsx')),
  'credito-presumido': lazy(() => import('./reforma/CreditoPresumido.jsx')),
  'classificacao-tributaria': lazy(() => import('./reforma/ClassificacaoTributaria.jsx')),
  'validador-xml-rtc': lazy(() => import('./reforma/ValidadorXmlRtc.jsx')),
  'consulta-aliquotas': lazy(() => import('./reforma/ConsultaAliquotas.jsx')),
  // Logística
  'quebra-frete': lazy(() => import('./logistica/QuebraFrete.jsx')),
  'custo-frete': lazy(() => import('./logistica/CustoFrete.jsx')),
  'capacidade-carga': lazy(() => import('./logistica/CapacidadeCarga.jsx')),
};

export default toolComponents;
