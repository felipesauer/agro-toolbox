# 🌾 AgroToolbox

Suite de ferramentas e calculadoras para o agronegócio brasileiro.

## Categorias

- **Agronômica** — Conversores de medidas, sacas, calagem, volume de calda, ciclo de cultura
- **Financeiro** — Custo hora-máquina, depreciação, financiamento, vender vs armazenar
- **Pecuária** — Peso vivo → arroba, lotação de pastagem
- **Fiscal** — Funrural, IRPF rural, ITR, LCDPR, CFOP, NFe
- **Reforma Tributária** — Simulador CBS/IBS, consultor NCM, crédito presumido
- **Logística** — Quebra de frete

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Front-end | React + Vite |
| Estilização | Tailwind CSS |
| Back-end | Node.js + Express |
| Validação | Zod |
| Testes | Vitest |

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento (API + Web)
npm run dev

# Rodar apenas a API
npm run dev:api

# Rodar apenas o front
npm run dev:web

# Testes
npm test

# Build de produção
npm run build
```

## Estrutura

```
agro-toolbox/
├── api/          # Back-end Express
│   └── src/
├── web/          # Front-end React + Vite
│   └── src/
└── package.json  # Workspaces root
```

## Licença

MIT
