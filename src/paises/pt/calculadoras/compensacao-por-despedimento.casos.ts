import { definirCasos } from "@/motor/calculo";
import compensacaoPorDespedimento from "./compensacao-por-despedimento";

const CT = "https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-34546475";

export default definirCasos(compensacaoPorDespedimento, [
  {
    nombre: "Despedimento coletivo com 5 anos",
    origen: { tipo: "recalculado", url: CT, detalle: "Artigo 366.º: 1500 / 30 = 50 por dia; 50 × 14 × 5 = 3500." },
    fecha: "2026-10-14",
    entrada: { motivo: "despedimento", retribuicao: 1500, inicio: "2021-10-15", fim: "2026-10-14" },
    esperado: { compensacao: 3500, antiguidade: 5, valorDiario: 50 },
  },
  {
    nombre: "Fim de contrato a termo com 2 anos",
    origen: { tipo: "recalculado", url: CT, detalle: "Artigo 344.º, n.º 2: 24 dias por ano. 50 × 24 × 2 = 2400." },
    fecha: "2026-10-14",
    entrada: { motivo: "termo", retribuicao: 1500, inicio: "2024-10-15", fim: "2026-10-14" },
    esperado: { compensacao: 2400, diasPorAno: 24 },
  },
  {
    nombre: "Fração de ano proporcional",
    origen: { tipo: "recalculado", url: CT, detalle: "3 anos e 181 dias de 365: 3,49589. 1200 / 30 × 14 × 3,49589 = 1957,70." },
    fecha: "2026-10-14",
    entrada: { motivo: "despedimento", retribuicao: 1200, inicio: "2023-01-01", fim: "2026-06-30" },
    esperado: { compensacao: 1957.7 },
  },
  {
    nombre: "Limite de 12 retribuições",
    origen: { tipo: "recalculado", url: CT, detalle: "2000 / 30 × 14 × 37 = 34 533,33, acima de 12 × 2000 = 24 000." },
    fecha: "2026-10-14",
    entrada: { motivo: "despedimento", retribuicao: 2000, inicio: "1990-01-01", fim: "2026-12-31" },
    esperado: { compensacao: 24000, limite: 24000 },
  },
  {
    nombre: "Retribuição acima de 20 salários mínimos",
    origen: { tipo: "recalculado", url: CT, detalle: "Retribuição considerada 20 × 920 = 18 400; 613,33 × 14 × 36 = 309 120, acima de 240 × 920 = 220 800." },
    fecha: "2026-10-14",
    entrada: { motivo: "despedimento", retribuicao: 30000, inicio: "1990-01-01", fim: "2025-12-31" },
    esperado: { retribuicaoConsiderada: 18400, compensacao: 220800 },
  },
  {
    nombre: "Datas trocadas",
    origen: { tipo: "recalculado", detalle: "Cessação antes do início." },
    fecha: "2026-10-14",
    entrada: { motivo: "despedimento", retribuicao: 1500, inicio: "2026-10-14", fim: "2025-10-14" },
    esperaError: true,
  },
]);
