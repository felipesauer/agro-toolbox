import { fetchSafe, getNcm, getClassificacoesTributarias, getFundamentacoesLegais } from '../clients/cbsApi.js';

// Tabela de NCMs agropecuários com informações tributárias (100+ entries)
// Fonte: LC 214/2025 Anexos, TIPI, NT 2016.003 v3.70
const NCM_AGRO = {
  // Cap 01 — Animais vivos
  '0102': { descricao: 'Bovinos vivos', cesta: 'reduzida', reducao: 60, capitulo: 'Animais vivos', is: false },
  '0103': { descricao: 'Suínos vivos', cesta: 'reduzida', reducao: 60, capitulo: 'Animais vivos', is: false },
  '0104': { descricao: 'Ovinos e caprinos vivos', cesta: 'reduzida', reducao: 60, capitulo: 'Animais vivos', is: false },
  '0105': { descricao: 'Aves vivas (galinhas, patos, perus)', cesta: 'reduzida', reducao: 60, capitulo: 'Animais vivos', is: false },

  // Cap 02 — Carnes e miudezas
  '0201': { descricao: 'Carnes de bovinos, frescas ou refrigeradas', cesta: 'reduzida', reducao: 60, capitulo: 'Carnes', is: false },
  '0202': { descricao: 'Carnes de bovinos, congeladas', cesta: 'reduzida', reducao: 60, capitulo: 'Carnes', is: false },
  '0203': { descricao: 'Carnes de suínos, frescas, refrigeradas ou congeladas', cesta: 'reduzida', reducao: 60, capitulo: 'Carnes', is: false },
  '0204': { descricao: 'Carnes de ovinos ou caprinos', cesta: 'reduzida', reducao: 60, capitulo: 'Carnes', is: false },
  '0206': { descricao: 'Miudezas comestíveis de bovinos, suínos, ovinos', cesta: 'reduzida', reducao: 60, capitulo: 'Carnes', is: false },
  '0207': { descricao: 'Carnes e miudezas de aves', cesta: 'reduzida', reducao: 60, capitulo: 'Carnes', is: false },
  '0208': { descricao: 'Outras carnes e miudezas (coelho, rã)', cesta: 'reduzida', reducao: 60, capitulo: 'Carnes', is: false },
  '0209': { descricao: 'Toucinho e gorduras de porco/aves', cesta: 'reduzida', reducao: 60, capitulo: 'Carnes', is: false },
  '0210': { descricao: 'Carnes salgadas, secas ou defumadas (charque, jerked beef)', cesta: 'reduzida', reducao: 60, capitulo: 'Carnes', is: false },

  // Cap 03 — Peixes, crustáceos, moluscos
  '0301': { descricao: 'Peixes vivos', cesta: 'reduzida', reducao: 60, capitulo: 'Peixes', is: false },
  '0302': { descricao: 'Peixes frescos ou refrigerados', cesta: 'reduzida', reducao: 60, capitulo: 'Peixes', is: false },
  '0303': { descricao: 'Peixes congelados', cesta: 'reduzida', reducao: 60, capitulo: 'Peixes', is: false },
  '0304': { descricao: 'Filés e carnes de peixes', cesta: 'reduzida', reducao: 60, capitulo: 'Peixes', is: false },
  '0306': { descricao: 'Crustáceos (camarão, lagosta, caranguejo)', cesta: 'reduzida', reducao: 60, capitulo: 'Peixes', is: false },

  // Cap 04 — Laticínios, ovos, mel
  '0401': { descricao: 'Leite e creme de leite', cesta: 'reduzida', reducao: 60, capitulo: 'Laticínios', is: false },
  '0402': { descricao: 'Leite concentrado, em pó', cesta: 'reduzida', reducao: 60, capitulo: 'Laticínios', is: false },
  '0403': { descricao: 'Iogurte e leites fermentados', cesta: 'reduzida', reducao: 60, capitulo: 'Laticínios', is: false },
  '0404': { descricao: 'Soro de leite', cesta: 'reduzida', reducao: 60, capitulo: 'Laticínios', is: false },
  '0405': { descricao: 'Manteiga', cesta: 'reduzida', reducao: 60, capitulo: 'Laticínios', is: false },
  '0406': { descricao: 'Queijos e requeijão', cesta: 'reduzida', reducao: 60, capitulo: 'Laticínios', is: false },
  '0407': { descricao: 'Ovos de aves, com casca', cesta: 'zero', reducao: 100, capitulo: 'Ovos', is: false },
  '0408': { descricao: 'Ovos sem casca e gemas', cesta: 'reduzida', reducao: 60, capitulo: 'Ovos', is: false },
  '0409': { descricao: 'Mel natural', cesta: 'zero', reducao: 100, capitulo: 'Mel', is: false },

  // Cap 06 — Plantas vivas
  '0601': { descricao: 'Bulbos, tubérculos e rizomas para plantio', cesta: 'normal', reducao: 0, capitulo: 'Plantas vivas', is: false },
  '0602': { descricao: 'Outras plantas vivas (mudas, enxertos)', cesta: 'normal', reducao: 0, capitulo: 'Plantas vivas', is: false },

  // Cap 07 — Hortaliças, plantas, raízes
  '0701': { descricao: 'Batatas, frescas ou refrigeradas', cesta: 'zero', reducao: 100, capitulo: 'Hortaliças', is: false },
  '0702': { descricao: 'Tomates, frescos ou refrigerados', cesta: 'zero', reducao: 100, capitulo: 'Hortaliças', is: false },
  '0703': { descricao: 'Cebolas, alhos, alhos-porros', cesta: 'zero', reducao: 100, capitulo: 'Hortaliças', is: false },
  '0704': { descricao: 'Couves, brócolis, couve-flor', cesta: 'zero', reducao: 100, capitulo: 'Hortaliças', is: false },
  '0705': { descricao: 'Alfaces e chicórias', cesta: 'zero', reducao: 100, capitulo: 'Hortaliças', is: false },
  '0706': { descricao: 'Cenouras, nabos, beterrabas', cesta: 'zero', reducao: 100, capitulo: 'Hortaliças', is: false },
  '0707': { descricao: 'Pepinos e pepininhos (cornichons)', cesta: 'zero', reducao: 100, capitulo: 'Hortaliças', is: false },
  '0708': { descricao: 'Leguminosas frescas (ervilhas, favas)', cesta: 'zero', reducao: 100, capitulo: 'Hortaliças', is: false },
  '0709': { descricao: 'Outros legumes frescos (pimentões, abobrinhas)', cesta: 'zero', reducao: 100, capitulo: 'Hortaliças', is: false },
  '0710': { descricao: 'Legumes congelados', cesta: 'zero', reducao: 100, capitulo: 'Hortaliças', is: false },
  '0713': { descricao: 'Leguminosas secas (feijão, lentilha, grão-de-bico)', cesta: 'reduzida', reducao: 60, capitulo: 'Leguminosas', is: false },
  '0714': { descricao: 'Mandioca, batata-doce, inhame', cesta: 'zero', reducao: 100, capitulo: 'Raízes', is: false },

  // Cap 08 — Frutas
  '0801': { descricao: 'Cocos, castanha-do-pará, castanha de caju', cesta: 'zero', reducao: 100, capitulo: 'Frutas', is: false },
  '0803': { descricao: 'Bananas', cesta: 'zero', reducao: 100, capitulo: 'Frutas', is: false },
  '0804': { descricao: 'Tâmaras, figos, abacaxis, abacates, mangas, goiabas', cesta: 'zero', reducao: 100, capitulo: 'Frutas', is: false },
  '0805': { descricao: 'Cítricos (laranja, limão, tangerina)', cesta: 'zero', reducao: 100, capitulo: 'Frutas', is: false },
  '0806': { descricao: 'Uvas frescas', cesta: 'zero', reducao: 100, capitulo: 'Frutas', is: false },
  '0807': { descricao: 'Melões e melancias', cesta: 'zero', reducao: 100, capitulo: 'Frutas', is: false },
  '0808': { descricao: 'Maçãs e peras', cesta: 'zero', reducao: 100, capitulo: 'Frutas', is: false },
  '0809': { descricao: 'Damascos, cerejas, pêssegos, ameixas', cesta: 'zero', reducao: 100, capitulo: 'Frutas', is: false },
  '0810': { descricao: 'Outras frutas (morangos, framboesas, acerola)', cesta: 'zero', reducao: 100, capitulo: 'Frutas', is: false },
  '0811': { descricao: 'Frutas congeladas', cesta: 'reduzida', reducao: 60, capitulo: 'Frutas', is: false },
  '0813': { descricao: 'Frutas secas (damascos, ameixas, passas)', cesta: 'reduzida', reducao: 60, capitulo: 'Frutas', is: false },

  // Cap 09 — Café, chá, mate, especiarias
  '0901': { descricao: 'Café, mesmo torrado ou descafeinado', cesta: 'reduzida', reducao: 60, capitulo: 'Café e chá', is: false },
  '0902': { descricao: 'Chá', cesta: 'reduzida', reducao: 60, capitulo: 'Café e chá', is: false },
  '0903': { descricao: 'Mate (erva-mate)', cesta: 'zero', reducao: 100, capitulo: 'Café e chá', is: false },
  '0904': { descricao: 'Pimenta e pimentão secos', cesta: 'reduzida', reducao: 60, capitulo: 'Especiarias', is: false },
  '0910': { descricao: 'Gengibre, açafrão, tomilho, louro', cesta: 'reduzida', reducao: 60, capitulo: 'Especiarias', is: false },

  // Cap 10 — Cereais
  '1001': { descricao: 'Trigo e mistura de trigo com centeio', cesta: 'reduzida', reducao: 60, capitulo: 'Cereais', is: false },
  '1002': { descricao: 'Centeio', cesta: 'reduzida', reducao: 60, capitulo: 'Cereais', is: false },
  '1003': { descricao: 'Cevada', cesta: 'reduzida', reducao: 60, capitulo: 'Cereais', is: false },
  '1004': { descricao: 'Aveia', cesta: 'reduzida', reducao: 60, capitulo: 'Cereais', is: false },
  '1005': { descricao: 'Milho', cesta: 'reduzida', reducao: 60, capitulo: 'Cereais', is: false },
  '1006': { descricao: 'Arroz', cesta: 'reduzida', reducao: 60, capitulo: 'Cereais', is: false },
  '1007': { descricao: 'Sorgo de grão', cesta: 'reduzida', reducao: 60, capitulo: 'Cereais', is: false },
  '1008': { descricao: 'Trigo mourisco, painço, alpiste, outros cereais', cesta: 'reduzida', reducao: 60, capitulo: 'Cereais', is: false },

  // Cap 11 — Produtos de moagem
  '1101': { descricao: 'Farinhas de trigo ou de mistura', cesta: 'zero', reducao: 100, capitulo: 'Farinhas', is: false },
  '1102': { descricao: 'Farinhas de cereais (exceto trigo)', cesta: 'reduzida', reducao: 60, capitulo: 'Farinhas', is: false },

  // Cap 12 — Oleaginosas e plantas industriais
  '1201': { descricao: 'Soja, mesmo triturada', cesta: 'reduzida', reducao: 60, capitulo: 'Oleaginosas', is: false },
  '1202': { descricao: 'Amendoins não torrados', cesta: 'reduzida', reducao: 60, capitulo: 'Oleaginosas', is: false },
  '1204': { descricao: 'Sementes de linhaça', cesta: 'reduzida', reducao: 60, capitulo: 'Oleaginosas', is: false },
  '1205': { descricao: 'Sementes de nabo silvestre ou colza (canola)', cesta: 'reduzida', reducao: 60, capitulo: 'Oleaginosas', is: false },
  '1206': { descricao: 'Sementes de girassol', cesta: 'reduzida', reducao: 60, capitulo: 'Oleaginosas', is: false },
  '1207': { descricao: 'Outras sementes oleaginosas (mamona, gergelim)', cesta: 'reduzida', reducao: 60, capitulo: 'Oleaginosas', is: false },
  '1209': { descricao: 'Sementes para semeadura (forrageiras, hortícolas)', cesta: 'reduzida', reducao: 60, capitulo: 'Sementes', is: false },
  '1211': { descricao: 'Plantas para perfumaria, medicina, inseticidas', cesta: 'normal', reducao: 0, capitulo: 'Plantas industriais', is: false },

  // Cap 15 — Gorduras e óleos
  '1507': { descricao: 'Óleo de soja e frações', cesta: 'reduzida', reducao: 60, capitulo: 'Óleos vegetais', is: false },
  '1508': { descricao: 'Óleo de amendoim', cesta: 'reduzida', reducao: 60, capitulo: 'Óleos vegetais', is: false },
  '1509': { descricao: 'Azeite de oliva', cesta: 'reduzida', reducao: 60, capitulo: 'Óleos vegetais', is: false },
  '1511': { descricao: 'Óleo de dendê (palma)', cesta: 'reduzida', reducao: 60, capitulo: 'Óleos vegetais', is: false },
  '1512': { descricao: 'Óleos de girassol, cártamo, algodão', cesta: 'reduzida', reducao: 60, capitulo: 'Óleos vegetais', is: false },
  '1514': { descricao: 'Óleos de nabo silvestre, colza, mostarda', cesta: 'reduzida', reducao: 60, capitulo: 'Óleos vegetais', is: false },
  '1515': { descricao: 'Outras gorduras e óleos vegetais (milho, gergelim)', cesta: 'reduzida', reducao: 60, capitulo: 'Óleos vegetais', is: false },
  '1517': { descricao: 'Margarina e misturas alimentícias de gorduras', cesta: 'reduzida', reducao: 60, capitulo: 'Gorduras', is: false },

  // Cap 17 — Açúcares
  '1701': { descricao: 'Açúcares de cana ou beterraba', cesta: 'reduzida', reducao: 60, capitulo: 'Açúcares', is: false },
  '1702': { descricao: 'Outros açúcares (lactose, maltose, glicose)', cesta: 'reduzida', reducao: 60, capitulo: 'Açúcares', is: false },
  '1703': { descricao: 'Melaços resultantes da extração de açúcar', cesta: 'normal', reducao: 0, capitulo: 'Açúcares', is: false },

  // Cap 19 — Preparações de cereais, farinhas
  '1901': { descricao: 'Farinhas lácteas, preparações alimentícias de farinhas', cesta: 'zero', reducao: 100, capitulo: 'Preparações', is: false },
  '1902': { descricao: 'Massas alimentícias (macarrão, espaguete)', cesta: 'zero', reducao: 100, capitulo: 'Preparações', is: false },
  '1905': { descricao: 'Pão, bolachas, biscoitos', cesta: 'zero', reducao: 100, capitulo: 'Preparações', is: false },

  // Cap 22 — Bebidas
  '2201': { descricao: 'Águas minerais e gaseificadas', cesta: 'normal', reducao: 0, capitulo: 'Bebidas', is: false },
  '2202': { descricao: 'Águas com adição de açúcar (refrigerantes)', cesta: 'normal', reducao: 0, capitulo: 'Bebidas', is: true },
  '2203': { descricao: 'Cerveja de malte', cesta: 'normal', reducao: 0, capitulo: 'Bebidas', is: true },
  '2204': { descricao: 'Vinhos de uvas frescas', cesta: 'normal', reducao: 0, capitulo: 'Bebidas', is: true },
  '2205': { descricao: 'Vermutes e vinhos aromatizados', cesta: 'normal', reducao: 0, capitulo: 'Bebidas', is: true },
  '2206': { descricao: 'Outras bebidas fermentadas (sidra, hidromel)', cesta: 'normal', reducao: 0, capitulo: 'Bebidas', is: true },
  '2207': { descricao: 'Álcool etílico não desnaturado (>= 80%)', cesta: 'normal', reducao: 0, capitulo: 'Bebidas', is: true },
  '2208': { descricao: 'Bebidas destiladas (cachaça, vodca, uísque)', cesta: 'normal', reducao: 0, capitulo: 'Bebidas', is: true },
  '2209': { descricao: 'Vinagres', cesta: 'reduzida', reducao: 60, capitulo: 'Bebidas', is: false },

  // Cap 23 — Resíduos alimentares, rações
  '2301': { descricao: 'Farinhas de carne, peixe, para alimentação animal', cesta: 'reduzida', reducao: 60, capitulo: 'Rações', is: false },
  '2302': { descricao: 'Sêmeas, farelos e outros resíduos de cereais', cesta: 'reduzida', reducao: 60, capitulo: 'Rações', is: false },
  '2303': { descricao: 'Resíduos de amido, polpas de beterraba, bagaço de cana', cesta: 'reduzida', reducao: 60, capitulo: 'Rações', is: false },
  '2304': { descricao: 'Tortas e resíduos de extração do óleo de soja (farelo de soja)', cesta: 'reduzida', reducao: 60, capitulo: 'Rações', is: false },
  '2306': { descricao: 'Tortas de outras oleaginosas (algodão, girassol)', cesta: 'reduzida', reducao: 60, capitulo: 'Rações', is: false },
  '2309': { descricao: 'Preparações para alimentação animal (ração, suplemento)', cesta: 'reduzida', reducao: 60, capitulo: 'Rações', is: false },

  // Cap 31 — Adubos e fertilizantes
  '3101': { descricao: 'Adubos de origem animal ou vegetal', cesta: 'reduzida', reducao: 60, capitulo: 'Fertilizantes', is: false },
  '3102': { descricao: 'Adubos minerais ou químicos, nitrogenados', cesta: 'reduzida', reducao: 60, capitulo: 'Fertilizantes', is: false },
  '3103': { descricao: 'Adubos minerais ou químicos, fosfatados', cesta: 'reduzida', reducao: 60, capitulo: 'Fertilizantes', is: false },
  '3104': { descricao: 'Adubos minerais ou químicos, potássicos (KCl)', cesta: 'reduzida', reducao: 60, capitulo: 'Fertilizantes', is: false },
  '3105': { descricao: 'Adubos NPK e misturas de fertilizantes', cesta: 'reduzida', reducao: 60, capitulo: 'Fertilizantes', is: false },

  // Cap 38 — Produtos químicos diversos (defensivos)
  '3808': { descricao: 'Inseticidas, fungicidas, herbicidas, desinfetantes', cesta: 'reduzida', reducao: 60, capitulo: 'Defensivos', is: false },
  '3824': { descricao: 'Preparações químicas diversas (adjuvantes)', cesta: 'normal', reducao: 0, capitulo: 'Químicos', is: false },

  // Cap 52 — Algodão
  '5201': { descricao: 'Algodão, não cardado nem penteado', cesta: 'normal', reducao: 0, capitulo: 'Fibras', is: false },
  '5202': { descricao: 'Desperdícios de algodão', cesta: 'normal', reducao: 0, capitulo: 'Fibras', is: false },

  // Cap 24 — Tabaco
  '2401': { descricao: 'Fumo (tabaco) não manufaturado', cesta: 'normal', reducao: 0, capitulo: 'Tabaco', is: true },
  '2402': { descricao: 'Charutos, cigarrilhas e cigarros', cesta: 'normal', reducao: 0, capitulo: 'Tabaco', is: true },

  // Cap 84 — Máquinas e implementos agrícolas
  '8432': { descricao: 'Máquinas para agricultura (arados, grades, plantadeiras)', cesta: 'reduzida', reducao: 60, capitulo: 'Máquinas agrícolas', is: false },
  '8433': { descricao: 'Máquinas para colheita (colheitadeiras, ceifadoras)', cesta: 'reduzida', reducao: 60, capitulo: 'Máquinas agrícolas', is: false },
  '8434': { descricao: 'Máquinas de ordenha e tratamento do leite', cesta: 'reduzida', reducao: 60, capitulo: 'Máquinas agrícolas', is: false },
  '8436': { descricao: 'Outras máquinas agrícolas (incubadoras, avicultura)', cesta: 'reduzida', reducao: 60, capitulo: 'Máquinas agrícolas', is: false },
  '8424': { descricao: 'Pulverizadores agrícolas', cesta: 'reduzida', reducao: 60, capitulo: 'Máquinas agrícolas', is: false },

  // Cap 87 — Tratores
  '8701': { descricao: 'Tratores (exceto para vias férreas)', cesta: 'reduzida', reducao: 60, capitulo: 'Tratores', is: false },
  '8716': { descricao: 'Reboques e semirreboques (carretas agrícolas)', cesta: 'reduzida', reducao: 60, capitulo: 'Tratores', is: false },
};

export function consultarNcm(ncm) {
  const ncm4 = ncm.substring(0, 4);
  const info = NCM_AGRO[ncm4];

  if (!info) {
    return {
      ncm,
      encontrado: false,
      mensagem: `NCM ${ncm} não encontrado na base agropecuária. Verifique o código ou consulte a TIPI completa.`,
    };
  }

  const capitulo = ncm4.substring(0, 2);
  const posicao = ncm4;

  return {
    ncm,
    ncmBase: ncm4,
    encontrado: true,
    descricao: info.descricao,
    capitulo: info.capitulo,
    capituloNumero: capitulo,
    posicao,
    cestaTributaria: info.cesta,
    reducaoAliquota: `${info.reducao}%`,
    impostoSeletivo: info.is || false,
    observacao: info.cesta === 'zero'
      ? 'Produto com alíquota zero de CBS/IBS (cesta básica nacional — LC 214/2025, Art. 8).'
      : info.cesta === 'reduzida'
        ? 'Produto com redução de 60% na alíquota de CBS/IBS (cesta básica ampliada — LC 214/2025, Anexo).'
        : 'Produto tributado na alíquota cheia de CBS/IBS.',
    fonteAliquotas: 'local',
  };
}

// Async version — enriches with CBS API data
export async function consultarNcmAsync(ncm) {
  const base = consultarNcm(ncm);

  const [apiNcm, apiClassificacoes, apiFundamentacoes] = await Promise.all([
    fetchSafe(getNcm, ncm),
    fetchSafe(getClassificacoesTributarias),
    fetchSafe(getFundamentacoesLegais),
  ]);

  if (apiNcm) {
    base.apiData = {
      descricaoCompleta: apiNcm.descricao || null,
      capitulo: apiNcm.capitulo || null,
      posicao: apiNcm.posicao || null,
      subposicao: apiNcm.subposicao || null,
      item: apiNcm.item || null,
      subitem: apiNcm.subitem || null,
      unidade: apiNcm.unidade || null,
      tributadoPeloImpostoSeletivo: apiNcm.tributadoPeloImpostoSeletivo ?? base.impostoSeletivo,
      aliquotaAdValorem: apiNcm.aliquotaAdValorem || null,
      aliquotaAdRem: apiNcm.aliquotaAdRem || null,
    };
    base.fonteAliquotas = 'CBS API (Dados Abertos) + local';
  }

  if (apiClassificacoes && Array.isArray(apiClassificacoes)) {
    base.classificacoesTributarias = apiClassificacoes
      .filter((c) => c.ncm === ncm || c.ncm === ncm.substring(0, 4))
      .map((c) => ({
        cClassTrib: c.cClassTrib,
        reducaoCbs: c.percentualReducaoCbs,
        reducaoIbsUf: c.percentualReducaoIbsUf,
        reducaoIbsMun: c.percentualReducaoIbsMun,
      }));
  }

  if (apiFundamentacoes && Array.isArray(apiFundamentacoes)) {
    const relevant = apiFundamentacoes.filter(
      (f) => f.ncm === ncm || f.ncm === ncm.substring(0, 4),
    );
    if (relevant.length > 0) {
      base.fundamentacoesLegais = relevant.map((f) => f.texto || f.descricao || f);
    }
  }

  return base;
}
