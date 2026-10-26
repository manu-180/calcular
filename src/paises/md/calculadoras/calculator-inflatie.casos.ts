import { definirCasos } from "@/motor/calculo";
import calculatorInflatie from "./calculator-inflatie";

const BNS = "https://statbank.statistica.md/PxWeb/pxweb/ro/40%20Statistica%20economica/40%20Statistica%20economica__05%20PRE__PRE010__serii%20lunare/PRE012300.px/";

export default definirCasos(calculatorInflatie, [
  {
    nombre: "1.000 de lei din ianuarie 2020 până în septembrie 2026",
    origen: { tipo: "oficial", url: BNS, detalle: "BNS, IPC (decembrie 1993 = 100): ianuarie 2020 = 2.619,75; septembrie 2026 = 4.924,08. 1.000 × 4.924,08 / 2.619,75 = 1.879,60." },
    fecha: "2026-10-26",
    entrada: { suma: 1000, de: "2020-01-15", pana: "2026-09-30" },
    esperado: { actualizata: 1879.6, lunaDe: "ianuarie 2020", lunaPana: "septembrie 2026" },
  },
  {
    nombre: "Un an: septembrie 2025 până în septembrie 2026",
    origen: { tipo: "oficial", url: BNS, detalle: "4.924,08 / 4.534,04 = 1,08603; 1.000 × 1,08603 = 1.086,03; inflația 8,6 %." },
    fecha: "2026-10-26",
    entrada: { suma: 1000, de: "2025-09-01", pana: "2026-09-01" },
    esperado: { actualizata: 1086.03 },
    tolerancia: 0.01,
  },
  {
    nombre: "Luna de sosire fără indice publicat",
    origen: { tipo: "recalculado", url: BNS, detalle: "Octombrie 2026 nu are încă indice; calculul se oprește la septembrie 2026." },
    fecha: "2026-10-26",
    entrada: { suma: 1000, de: "2020-01-01", pana: "2026-10-26" },
    esperado: { lunaPana: "septembrie 2026", actualizata: 1879.6 },
  },
  {
    nombre: "Lună de pornire înainte de datele disponibile",
    origen: { tipo: "recalculado", url: BNS, detalle: "Seria din calculator începe în ianuarie 2000." },
    fecha: "2026-10-26",
    entrada: { suma: 1000, de: "1999-01-01", pana: "2026-01-01" },
    esperaError: true,
  },
]);
