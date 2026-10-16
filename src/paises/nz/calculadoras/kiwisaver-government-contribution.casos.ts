import { definirCasos } from "@/motor/calculo";
import calculadora from "./kiwisaver-government-contribution";

const IRD = "https://www.ird.govt.nz/en/kiwisaver/kiwisaver-individuals/growing-my-kiwisaver-account/getting-the-kiwisaver-government-contribution";

export default definirCasos(calculadora, [
  {
    nombre: "$800 contributed",
    origen: { tipo: "recalculado", detalle: "800 × 25% = 200. Still to contribute for the full amount: 1,042.86 − 800 = 242.86." },
    fecha: "2026-10-14",
    entrada: { aportado: 800, ingreso: 50000, edad: 30 },
    esperado: { gobierno: 200, faltante: 242.86, necesario: 1042.86 },
  },
  {
    nombre: "Full amount at $1,042.86",
    origen: { tipo: "oficial", url: IRD, detalle: "Inland Revenue: contribute at least $1,042.86 of your own money between 1 July and 30 June to get the maximum $260.72." },
    fecha: "2026-10-14",
    entrada: { aportado: 1042.86, ingreso: 50000, edad: 30 },
    esperado: { gobierno: 260.72, faltante: 0 },
  },
  {
    nombre: "More than needed is still capped",
    origen: { tipo: "recalculado", detalle: "3,000 × 25% = 750, capped at 260.72." },
    fecha: "2026-10-14",
    entrada: { aportado: 3000, ingreso: 90000, edad: 40 },
    esperado: { gobierno: 260.72 },
  },
  {
    nombre: "Income over $180,000",
    origen: { tipo: "oficial", url: IRD, detalle: "Taxable income over $180,000 does not qualify." },
    fecha: "2026-10-14",
    entrada: { aportado: 2000, ingreso: 190000, edad: 40 },
    esperado: { gobierno: 0 },
  },
  {
    nombre: "Negative contribution",
    origen: { tipo: "recalculado", detalle: "A negative amount is not valid." },
    fecha: "2026-10-14",
    entrada: { aportado: -1, ingreso: 50000, edad: 30 },
    esperaError: true,
  },
]);
