import { definirCasos } from "@/motor/calculo";
import brutopalga from "./brutopalga-kalkulaator";

const TUMS = "https://www.riigiteataja.ee/akt/TuMS";

export default definirCasos(brutopalga, [
  {
    nombre: "Neto 1657,84 annab bruto 2000",
    origen: { tipo: "recalculado", url: TUMS, detalle: "Pöördarvutus palgakalkulaatori juhtumist: 2000 bruto annab 1657,84 neto." },
    fecha: "2026-10-15",
    entrada: { neto: 1657.84, sammas: "2", maksuvaba: true },
    esperado: { bruto: 2000, tulumaks: 270.16 },
  },
  {
    nombre: "Neto 1000 eurot",
    origen: { tipo: "recalculado", url: TUMS, detalle: "(1000 - 0,22 × 700) / (0,964 × 0,78) = 1125,12; kontroll: 18 + 22,5 + 84,62 maha annab 1000." },
    fecha: "2026-10-15",
    entrada: { neto: 1000, sammas: "2", maksuvaba: true },
    esperado: { bruto: 1125.12 },
  },
  {
    nombre: "Neto alla maksuvaba piiri",
    origen: { tipo: "recalculado", url: TUMS, detalle: "482 / 0,964 = 500: tulumaksu ei teki." },
    fecha: "2026-10-15",
    entrada: { neto: 482, sammas: "2", maksuvaba: true },
    esperado: { bruto: 500, tulumaks: 0 },
  },
]);
