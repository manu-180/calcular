import { definirCasos } from "@/motor/calculo";
import segurancaSocialIndependentes from "./seguranca-social-independentes";

const CC = "https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-34514575";

export default definirCasos(segurancaSocialIndependentes, [
  {
    nombre: "Exemplo da Segurança Social: 1 200 + 1 000 + 1 300 €",
    origen: {
      tipo: "recalculado",
      url: CC,
      detalle: "Artigos 162.º, 163.º e 168.º: 3500 × 70 % / 3 = 816,67 de base; × 21,4 % = 174,77. A folha informativa da Segurança Social chega a 174,76 porque corta a base em 816,66.",
    },
    fecha: "2026-10-14",
    entrada: { faturado: 3500, atividade: "servicos", ajuste: "0" },
    esperado: { relevante: 2450, base: 816.67, mensal: 174.77, trimestre: 524.3 },
  },
  {
    nombre: "Venda de bens com ajuste de menos 25 %",
    origen: { tipo: "recalculado", url: CC, detalle: "9000 × 20 % = 1800; / 3 = 600; × 0,75 = 450; × 21,4 % = 96,30." },
    fecha: "2026-10-14",
    entrada: { faturado: 9000, atividade: "bens", ajuste: "-25" },
    esperado: { base: 450, mensal: 96.3 },
  },
  {
    nombre: "Faturação alta: limite de 12 IAS",
    origen: { tipo: "recalculado", url: CC, detalle: "60000 × 70 % / 3 = 14 000, acima de 12 × 537,13 = 6445,56. 6445,56 × 21,4 % = 1379,35." },
    fecha: "2026-10-14",
    entrada: { faturado: 60000, atividade: "servicos", ajuste: "0" },
    esperado: { base: 6445.56, mensal: 1379.35 },
  },
]);
