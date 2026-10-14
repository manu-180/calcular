import { definirCasos } from "@/motor/calculo";
import acertoDeContas from "./acerto-de-contas";

const CT = "https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-34546475";

export default definirCasos(acertoDeContas, [
  {
    nombre: "Demissão a 30 de junho",
    origen: { tipo: "recalculado", url: CT, detalle: "Artigos 245.º e 263.º: 181 dias de 365 no ano. 1200 × 181 / 365 = 595,07 por cada proporcional (férias, subsídio de férias e Natal). Total 1785,21." },
    fecha: "2026-10-14",
    entrada: { retribuicao: 1200, inicio: "2020-03-01", fim: "2026-06-30", feriasPorGozar: 0, subsidioPorPagar: false, motivo: "nenhuma" },
    esperado: { feriasProporcionais: 595.07, natalProporcional: 595.07, total: 1785.21, diasServico: 181 },
  },
  {
    nombre: "Despedimento com férias por gozar e subsídio em dívida",
    origen: {
      tipo: "recalculado",
      url: CT,
      detalle: "Proporcionais 1785,21; férias vencidas 1200 × 5 / 22 = 272,73; subsídio vencido 1200; compensação 40 × 14 × (6 + 122/365) = 3547,18. Total 6805,12.",
    },
    fecha: "2026-10-14",
    entrada: { retribuicao: 1200, inicio: "2020-03-01", fim: "2026-06-30", feriasPorGozar: 5, subsidioPorPagar: true, motivo: "despedimento" },
    esperado: { feriasVencidas: 272.73, subsidioVencido: 1200, compensacao: 3547.18, total: 6805.12 },
  },
  {
    nombre: "Admitido e saído no mesmo ano",
    origen: { tipo: "recalculado", url: CT, detalle: "De 01/02 a 31/07: 181 dias. 1000 × 181 / 365 = 495,89; × 3 = 1487,67." },
    fecha: "2026-10-14",
    entrada: { retribuicao: 1000, inicio: "2026-02-01", fim: "2026-07-31", feriasPorGozar: 0, subsidioPorPagar: false, motivo: "nenhuma" },
    esperado: { natalProporcional: 495.89, total: 1487.67 },
  },
]);
