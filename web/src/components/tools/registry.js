import { lazy } from 'react';

const toolComponents = {
  // Phase 1 — Agronomica
  'conversor-medidas': lazy(() => import('./agronomica/ConversorMedidas.jsx')),
  'conversor-sacas': lazy(() => import('./agronomica/ConversorSacas.jsx')),
  'calagem': lazy(() => import('./agronomica/Calagem.jsx')),
  'volume-calda': lazy(() => import('./agronomica/VolumeCalda.jsx')),
  'ciclo-cultura': lazy(() => import('./agronomica/CicloCultura.jsx')),
  // Phase 1 — Pecuária
  'peso-arroba': lazy(() => import('./pecuaria/PesoArroba.jsx')),
  // Phase 1 — Financeiro
  'depreciacao': lazy(() => import('./financeiro/Depreciacao.jsx')),
  // Phase 1 — Fiscal
  'conversor-unidades-nfe': lazy(() => import('./fiscal/ConversorUnidadesNfe.jsx')),
};

export default toolComponents;
