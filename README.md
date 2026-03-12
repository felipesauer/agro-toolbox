# 🌾 AgroToolbox

> Suite de ferramentas e calculadoras para o agronegócio brasileiro.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![CI](https://github.com/felipesauer/agro-toolbox/actions/workflows/ci.yml/badge.svg)](https://github.com/felipesauer/agro-toolbox/actions/workflows/ci.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/felipesauer/agro-toolbox/pulls)

---

## Funcionalidades

- **35 calculadoras** organizadas em 6 categorias
- **API REST** documentada com Swagger / OpenAPI (`/api-docs`)
- **PWA** — instalável no celular e com cache offline
- **Dark mode** — tema claro/escuro com persistência
- **Busca global** — encontre qualquer ferramenta instantaneamente
- **Gráficos interativos** — visualizações com Recharts
- **Animações** — transições suaves com Framer Motion
- **Responsivo** — Mobile-first com Tailwind CSS
- **Docker** — imagem multi-stage pronta para produção
- **CI/CD** — testes e build automatizados via GitHub Actions

---

## Ferramentas

<details>
<summary>🌾 <strong>Agronômica</strong> (8)</summary>

| Ferramenta | Descrição |
|------------|-----------|
| Conversor de Medidas Agrárias | Converte áreas entre medidas regionais brasileiras |
| Conversor Sacas ↔ Kg/Ton | Converte sacas para quilos e toneladas por cultura |
| Quebra de Umidade e Impureza | Calcula descontos por umidade e impureza na classificação |
| Ciclo da Cultura | Estima a data de colheita baseado no plantio e ciclo |
| Necessidade de Sementes/ha | Calcula kg de sementes por hectare |
| Estimativa de Produtividade | Estima produtividade da lavoura em sacas/ha |
| Volume de Calda | Calcula volume de calda por hectare na pulverização |
| Calculadora de Calagem | Calcula necessidade de calcário por hectare |

</details>

<details>
<summary>💰 <strong>Financeiro</strong> (5)</summary>

| Ferramenta | Descrição |
|------------|-----------|
| Depreciação de Maquinário | Calcula depreciação linear de máquinas e equipamentos |
| Custo de Hora-Máquina | Calcula o custo total por hora de operação |
| Vender vs. Armazenar | Compara vender na colheita ou armazenar para vender depois |
| Custos de Financiamento | Simula parcelas e custos de financiamento rural |
| Acerto de Safrista | Calcula o acerto de trabalhador com contrato de safra |

</details>

<details>
<summary>🐄 <strong>Pecuária</strong> (2)</summary>

| Ferramenta | Descrição |
|------------|-----------|
| Peso Vivo → Arroba | Converte peso vivo do animal para arrobas |
| Lotação de Pastagem | Calcula taxa de lotação UA/ha da pastagem |

</details>

<details>
<summary>📊 <strong>Fiscal</strong> (10)</summary>

| Ferramenta | Descrição |
|------------|-----------|
| Conversor Unidades NFe | Converte entre unidades aceitas na Nota Fiscal Eletrônica |
| Retenção Funrural e Senar | Calcula valores retidos de Funrural, RAT e Senar |
| Quebra de Peso para Nota Complementar | Calcula nota complementar por diferença de peso |
| Funrural: Comercialização vs. Folha | Compara custo do Funrural entre modalidades |
| IRPF Rural: Real vs. Presumido | Compara tributação do IRPF rural entre resultado real e presumido |
| Estimativa de ITR | Calcula estimativa do Imposto sobre a Propriedade Territorial Rural |
| Termômetro LCDPR | Verifica obrigatoriedade do LCDPR por receita bruta |
| Fundos Estaduais (FETHAB) | Calcula fundos estaduais como FETHAB e FUNDEINFRA |
| Assistente CFOP | Encontra o CFOP correto por tipo de operação |
| Base de Cálculo Pauta Fiscal | Verifica se aplica pauta fiscal como base de ICMS |

</details>

<details>
<summary>📋 <strong>Reforma Tributária</strong> (6)</summary>

| Ferramenta | Descrição |
|------------|-----------|
| Simulador CBS/IBS | Simula tributos da reforma tributária sobre operações agro |
| Consultor NCM Agro | Consulta informações tributárias por NCM |
| Crédito Presumido PF | Calcula crédito presumido para produtor pessoa física |
| Classificação Tributária | Consulta classificações tributárias CBS/IBS por NCM e DFe |
| Validador XML RTC | Valida campos da Reforma Tributária do Consumo em XML de NFe |
| Consulta Alíquotas CBS/IBS | Consulta alíquotas CBS e IBS por UF no período de transição |

</details>

<details>
<summary>🚚 <strong>Logística</strong> (3)</summary>

| Ferramenta | Descrição |
|------------|-----------|
| Quebra de Frete | Calcula tolerância de quebra no transporte de grãos |
| Custo de Frete | Calcula custo do frete por tonelada e por saca |
| Capacidade de Carga | Calcula número de viagens e aproveitamento do caminhão |

</details>

---

## Tech Stack

| Camada | Tecnologias |
|--------|-------------|
| Front-end | React 19 · Vite 7 · React Router 7 |
| Estilização | Tailwind CSS 4 |
| Gráficos | Recharts |
| Animações | Framer Motion |
| Back-end | Node.js · Express 5 |
| Validação | Zod 4 |
| Documentação API | Swagger UI · OpenAPI 3.0 |
| Testes | Vitest · Supertest |
| Infraestrutura | Docker · GitHub Actions |

---

## Primeiros Passos

### Pré-requisitos

- [Node.js](https://nodejs.org/) **>= 20**
- npm (incluso com Node.js)

### Instalação

```bash
git clone https://github.com/felipesauer/agro-toolbox.git
cd agro-toolbox
npm install
```

### Variáveis de ambiente

Copie o arquivo de exemplo e ajuste conforme necessário:

```bash
cp .env.example .env
```

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `PORT` | `3001` | Porta da API |
| `NODE_ENV` | `development` | Ambiente (`development` \| `production`) |

### Desenvolvimento

```bash
# API + Web em paralelo
npm run dev

# Apenas a API (porta 3001)
npm run dev:api

# Apenas o front-end (porta 5173)
npm run dev:web
```

### Build de produção

```bash
npm run build
```

---

## API

Base URL: `/api/v1`

Documentação interativa disponível em **[http://localhost:3001/api-docs](http://localhost:3001/api-docs)** (Swagger UI).

| Categoria | Endpoints | Exemplos |
|-----------|:---------:|----------|
| Agronômica | 8 | `/agronomica/calagem`, `/agronomica/conversor-sacas` |
| Financeiro | 5 | `/financeiro/depreciacao`, `/financeiro/custo-financiamento` |
| Pecuária | 2 | `/pecuaria/peso-arroba`, `/pecuaria/lotacao-pastagem` |
| Fiscal | 10 | `/fiscal/irpf-rural`, `/fiscal/funrural-comparativo` |
| Reforma Tributária | 8 | `/reforma/simulador-cbs-ibs`, `/reforma/consultor-ncm/:ncm` |
| Logística | 3 | `/logistica/custo-frete`, `/logistica/capacidade-carga` |
| Health | 1 | `GET /health` |

> Todos os endpoints de cálculo aceitam **POST** com body JSON. Validação via Zod com mensagens de erro detalhadas.

---

## Testes

31 arquivos de teste · 152+ testes · Vitest + Supertest

```bash
# Rodar todos os testes
npm test

# Apenas testes da API
npm run test:api

# Modo watch (API)
cd api && npm run test:watch
```

---

## Docker

A imagem usa **multi-stage build** (API + build do front-end) e serve tudo em uma única porta:

```bash
docker compose up -d
```

A aplicação estará disponível em **http://localhost:3001**.

Para build manual:

```bash
docker build -t agro-toolbox .
docker run -p 3001:3001 agro-toolbox
```

---

## Estrutura do Projeto

```
agro-toolbox/
├── api/
│   ├── src/
│   │   ├── server.js              # Entry point Express
│   │   ├── constants/             # Alíquotas, CFOP, conversões, pautas fiscais
│   │   ├── controllers/           # Handlers por categoria
│   │   ├── middlewares/           # Validação Zod
│   │   ├── routes/                # Definição de rotas
│   │   ├── services/              # Regras de negócio (34 serviços)
│   │   ├── utils/                 # Formatadores
│   │   └── validators/            # Schemas Zod por endpoint
│   └── tests/                     # 31 arquivos de teste
├── web/
│   ├── public/                    # Ícones PWA
│   ├── src/
│   │   ├── App.jsx                # Layout principal
│   │   ├── main.jsx               # Entry point React
│   │   ├── api/                   # Cliente HTTP (fetch)
│   │   ├── components/
│   │   │   ├── layout/            # Navbar, Footer, Breadcrumb
│   │   │   ├── tools/             # 35 componentes por categoria
│   │   │   └── ui/                # Input, Select, ResultPanel, SearchModal
│   │   ├── data/                  # Catálogo de ferramentas e categorias
│   │   ├── hooks/                 # useCalculation, useDarkMode, useDebounce
│   │   ├── pages/                 # Home, CategoryPage, ToolPage
│   │   ├── routes/                # Definição de rotas React Router
│   │   └── styles/                # CSS global
│   └── vite.config.js             # Vite + Tailwind + PWA
├── .github/workflows/ci.yml       # Pipeline CI
├── Dockerfile                     # Multi-stage build
├── docker-compose.yml
├── .env.example
└── package.json                   # Workspaces root
```

---

## Contribuição

1. Fork o repositório
2. Crie sua branch: `git checkout -b feat/minha-feature`
3. Commit suas alterações: `git commit -m "feat: descrição da alteração"`
4. Push para a branch: `git push origin feat/minha-feature`
5. Abra um **Pull Request**

> Use [Conventional Commits](https://www.conventionalcommits.org/) para mensagens de commit.

---

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais informações.
