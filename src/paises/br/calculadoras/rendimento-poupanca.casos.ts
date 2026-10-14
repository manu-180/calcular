import { definirCasos } from "@/motor/calculo";
import rendimentoPoupanca from "./rendimento-poupanca";

export default definirCasos(rendimentoPoupanca, [
  {
    nombre: "R$ 10.000 por 12 meses com Selic de 13,75 %",
    origen: {
      tipo: "recalculado",
      detalle: "Selic 13,75 % > 8,5 %: 0,5 % ao mês. TR de outubro de 2026: 0,1616 %. Taxa (1,001616 × 1,005) − 1 = 0,662408 %. 10000 × 1,00662408^12 = 10824,50.",
    },
    fecha: "2026-10-14",
    entrada: { inicial: 10000, aporte: 0, meses: 12 },
    esperado: { selic: 13.75, tr: 0.1616, saldo: 10824.5, rendimento: 824.5 },
  },
  {
    nombre: "R$ 500 por mês durante um ano",
    origen: { tipo: "recalculado", detalle: "Doze depósitos de 500 no fim de cada mês, com 0,662408 % ao mês: 6223,49." },
    fecha: "2026-10-14",
    entrada: { inicial: 0, aporte: 500, meses: 12 },
    esperado: { depositado: 6000, saldo: 6223.49 },
  },
  {
    nombre: "Selic de 8 %: 70 % da Selic mensalizada",
    origen: { tipo: "recalculado", detalle: "Com Selic de 8 %: (1 + 0,7 × 8 %)^(1/12) − 1 = 0,455101 % e TR zero. 10000 × 1,00455101 = 10045,51." },
    fecha: "2026-10-14",
    entrada: { inicial: 10000, aporte: 0, meses: 1 },
    valores: { "br.selic-meta": { fecha: "2026-10-14", valor: 8 }, "br.tr": { fecha: "2026-10-01", valor: 0 } },
    esperado: { regra: "70 % da Selic mais TR", saldo: 10045.51 },
  },
]);
