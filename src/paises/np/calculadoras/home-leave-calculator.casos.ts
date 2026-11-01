import { definirCasos } from "@/motor/calculo";
import calculadora from "./home-leave-calculator";

const ACT = "https://ssf.gov.np/images/news/16430171669623_labor-act-2074.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "300 days worked, 5 days taken",
    origen: { tipo: "recalculado", url: ACT, detalle: "300 / 20 = 15 days earned. 15 − 5 = 10 days. Daily pay 30,000 / 30 = 1,000. Value 10,000." },
    fecha: "2026-10-29",
    entrada: { trabajados: 300, tomados: 5, basico: 30000, diasMes: 30 },
    esperado: { ganados: 15, saldo: 10, exceso: 0, valorSaldo: 10000 },
  },
  {
    nombre: "2,000 days worked passes the 90-day limit",
    origen: { tipo: "recalculado", url: ACT, detalle: "2,000 / 20 = 100 days. Limit 90. 10 days above the limit are paid: 10 × 1,000 = 10,000." },
    fecha: "2026-10-29",
    entrada: { trabajados: 2000, tomados: 0, basico: 30000, diasMes: 30 },
    esperado: { ganados: 100, saldo: 90, exceso: 10, valorSaldo: 90000, valorExceso: 10000 },
  },
  {
    nombre: "More leave taken than earned",
    origen: { tipo: "recalculado", detalle: "100 days worked earn 5 days. Taking 8 is not possible." },
    fecha: "2026-10-29",
    entrada: { trabajados: 100, tomados: 8, basico: null, diasMes: 30 },
    esperaError: true,
  },
]);
