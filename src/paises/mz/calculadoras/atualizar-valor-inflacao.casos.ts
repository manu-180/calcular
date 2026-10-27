import { definirCasos } from "@/motor/calculo";
import atualizarValorInflacao from "./atualizar-valor-inflacao";

const BM = "https://www.bancomoc.mz/bmapi/inflation-rates/monthly";

export default definirCasos(atualizarValorInflacao, [
  {
    nombre: "De Dezembro de 2025 a Agosto de 2026",
    origen: { tipo: "recalculado", url: BM, detalle: "Produto de (1 + variação mensal) de Janeiro a Agosto de 2026: 1,26; 0,68; 0,22; 0,63; 2,32; 0,20; −0,26; −0,28 %. Factor 1,048438; 10 000 MT passam a 10 484,38 MT." },
    fecha: "2026-10-26",
    entrada: { valor: 10000, desde: "2025-12-01", hasta: "2026-08-31" },
    esperado: { atualizado: 10484.38, meses: 8 },
  },
  {
    nombre: "Pedido além do último mês publicado",
    origen: { tipo: "recalculado", url: BM, detalle: "O último mês é Agosto de 2026; o cálculo pára aí. De Novembro de 2023 a Agosto de 2026 há 33 meses." },
    fecha: "2026-10-26",
    entrada: { valor: 10000, desde: "2023-11-15", hasta: "2026-10-26" },
    esperado: { meses: 33 },
  },
  {
    nombre: "De Novembro de 2023 a Dezembro de 2025",
    origen: { tipo: "recalculado", url: BM, detalle: "Produto das 25 variações de Dezembro de 2023 a Dezembro de 2025: factor 1,089249; 10 000 MT passam a 10 892,49 MT." },
    fecha: "2026-10-26",
    entrada: { valor: 10000, desde: "2023-11-01", hasta: "2025-12-01" },
    esperado: { atualizado: 10892.49, meses: 25 },
  },
  {
    nombre: "Período que atravessa Novembro de 2023",
    origen: { tipo: "recalculado", url: BM, detalle: "O Banco de Moçambique não publica a inflação de Novembro de 2023." },
    fecha: "2026-10-26",
    entrada: { valor: 10000, desde: "2023-01-01", hasta: "2024-01-01" },
    esperaError: true,
  },
]);
