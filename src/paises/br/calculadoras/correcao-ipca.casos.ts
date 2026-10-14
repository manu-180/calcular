import { definirCasos } from "@/motor/calculo";
import correcaoIpca from "./correcao-ipca";

const SIDRA = "https://apisidra.ibge.gov.br/values/t/1737/n1/all/v/2266/p/all";

export default definirCasos(correcaoIpca, [
  {
    nombre: "R$ 1.000 de janeiro de 2025 a setembro de 2026",
    origen: { tipo: "oficial", url: SIDRA, detalle: "Números-índice do IBGE: dezembro de 2024 = 7100,50 e setembro de 2026 = 7695,82. 1000 × 7695,82 / 7100,50 = 1083,84." },
    fecha: "2026-10-14",
    entrada: { valor: 1000, de: "2025-01-15", ate: "2026-09-30" },
    esperado: { corrigido: 1083.84, diferenca: 83.84, indiceInicial: 7100.5, indiceFinal: 7695.82, mensal: 0.8199674318735362 },
    tolerancia: 0.0001,
  },
  {
    nombre: "Doze meses até setembro de 2026",
    origen: { tipo: "oficial", url: SIDRA, detalle: "Setembro de 2025 = 7359,06. 1000 × 7695,82 / 7359,06 = 1045,76." },
    fecha: "2026-10-14",
    entrada: { valor: 1000, de: "2025-10-01", ate: "2026-09-01" },
    esperado: { corrigido: 1045.76, dozeMeses: 4.576127929382276 },
    tolerancia: 0.0001,
  },
  {
    nombre: "Data final depois do último IPCA divulgado",
    origen: { tipo: "recalculado", detalle: "Dezembro de 2026 ainda não saiu: a correção para em setembro de 2026. 5000 desde janeiro de 2020: 5000 × 7695,82 / 5320,25 = 7232,57." },
    fecha: "2026-10-14",
    entrada: { valor: 5000, de: "2020-01-10", ate: "2026-12-31" },
    esperado: { corrigido: 7232.57, mesFinal: "setembro de 2026" },
  },
  {
    nombre: "Mês inicial ainda sem IPCA",
    origen: { tipo: "recalculado", detalle: "Outubro de 2026 ainda não foi divulgado." },
    fecha: "2026-10-14",
    entrada: { valor: 1000, de: "2026-10-01", ate: "2026-10-14" },
    esperaError: true,
  },
]);
