import { definirCasos } from "@/motor/calculo";
import simuladorIrs from "./simulador-irs";

const CIRS68 = "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cirs_rep/Pages/irs68.aspx";
const CIRS70 = "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cirs_rep/Pages/irs70.aspx";

const BASE = { tributacao: "individual", rendimento2: 0, dependentes: 0, ate3: 0, de4a6: 0, outrasDeducoes: 0, retencoes: null } as const;

export default definirCasos(simuladorIrs, [
  {
    nombre: "20 000 € individual, sem mínimo de existência",
    origen: {
      tipo: "recalculado",
      url: CIRS68,
      detalle: "Dedução específica 8,54 × 537,13 = 4587,09. Coletável 15 412,91. Coleta 8342 × 12,5 % + 4245 × 15,7 % + 2825,91 × 21,2 % = 1042,75 + 666,47 + 599,09 = 2308,31. Despesas gerais 1000 × 35 % = 350, limite 250. IRS 2058,31.",
    },
    fecha: "2026-10-14",
    entrada: { ...BASE, rendimento1: 20000, despesasGerais: 1000 },
    esperado: { deducaoEspecifica: 4587.09, abatimento: 0, coletavel: 15412.91, coleta: 2308.31, deducoes: 250, imposto: 2058.31 },
  },
  {
    nombre: "Salário mínimo do ano (12 880 €): IRS zero",
    origen: {
      tipo: "recalculado",
      url: CIRS70,
      detalle: "Rendimento igual ao valor de referência: abatimento = 12880 − (4587,09 + 250 / 12,5 %) = 6292,91. Coletável 2000. Coleta 250, menos 250 de despesas gerais = 0.",
    },
    fecha: "2026-10-14",
    entrada: { ...BASE, rendimento1: 12880, despesasGerais: 1000 },
    esperado: { abatimento: 6292.91, coletavel: 2000, coleta: 250, imposto: 0 },
  },
  {
    nombre: "14 000 €: entre o valor de referência e L",
    origen: {
      tipo: "recalculado",
      url: CIRS70,
      detalle: "Abatimento = 12880 − 2,6 × (14000 − 12880) − (4587,09 + 2000) = 3380,91. Coletável 14000 − 4587,09 − 3380,91 = 6032. Coleta 754.",
    },
    fecha: "2026-10-14",
    entrada: { ...BASE, rendimento1: 14000, despesasGerais: 0 },
    esperado: { abatimento: 3380.91, coletavel: 6032, coleta: 754, imposto: 754 },
  },
  {
    nombre: "15 000 €: acima de L",
    origen: {
      tipo: "recalculado",
      url: CIRS70,
      detalle: "L = 12880 − 250 / (12,5 % × 3,6) + 8342 / 3,6 = 14641,67. Abatimento = 14641,67 − 8342 − 1,35 × (15000 − 14641,67) − 4587,09 = 1228,83. Coletável 9184,08. Coleta 1042,75 + 842,08 × 15,7 % = 1174,96. Menos 250 = 924,96.",
    },
    fecha: "2026-10-14",
    entrada: { ...BASE, rendimento1: 15000, despesasGerais: 800 },
    esperado: { abatimento: 1228.83, coletavel: 9184.08, coleta: 1174.96, imposto: 924.96 },
  },
  {
    nombre: "Conjunta 30 000 € + 10 000 €, dois dependentes, um com até 3 anos",
    origen: {
      tipo: "recalculado",
      url: CIRS68,
      detalle: "Rendimentos acima de 2,2 × 14 × IAS × 2: sem mínimo de existência. Coletável 40000 − 2 × 4587,09 = 30825,82; quociente 2: coleta 2 × 2308,31 = 4616,62. Dependentes 2 × 600 + 300 (2.º até 6 anos) = 1500; despesas gerais 500. IRS 2616,62. Retido 3000: reembolso 383,38.",
    },
    fecha: "2026-10-14",
    entrada: { ...BASE, tributacao: "conjunta", rendimento1: 30000, rendimento2: 10000, dependentes: 2, ate3: 1, despesasGerais: 2000, retencoes: 3000 },
    esperado: { coletavel: 30825.82, coleta: 4616.62, deducoes: 2000, imposto: 2616.62, reembolso: 383.38 },
  },
  {
    nombre: "Um só dependente com 2 anos",
    origen: { tipo: "recalculado", url: CIRS68, detalle: "Dependente 600 + 126 (até 3 anos) = 726 de dedução." },
    fecha: "2026-10-14",
    entrada: { ...BASE, rendimento1: 20000, despesasGerais: 0, dependentes: 1, ate3: 1 },
    esperado: { deducoes: 726, imposto: 1582.31 },
  },
  {
    nombre: "Dependentes pequenos a mais",
    origen: { tipo: "recalculado", detalle: "Dois dependentes até 3 anos com um total de um dependente." },
    fecha: "2026-10-14",
    entrada: { ...BASE, rendimento1: 20000, despesasGerais: 0, dependentes: 1, ate3: 2 },
    esperaError: true,
  },
]);
