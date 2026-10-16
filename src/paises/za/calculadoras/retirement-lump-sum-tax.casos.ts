import { definirCasos } from "@/motor/calculo";
import calculadora from "./retirement-lump-sum-tax";

export default definirCasos(calculadora, [
  {
    nombre: "R800 000 at retirement",
    origen: { tipo: "recalculado", detalle: "Retirement table: 39 600 + (800 000 − 770 000) × 27% = 47 700." },
    fecha: "2026-10-14",
    entrada: { tipo: "retirement", monto: 800000, anteriores: null },
    esperado: { impuesto: 47700, neto: 752300, libre: 550000 },
  },
  {
    nombre: "R100 000 withdrawal",
    origen: { tipo: "recalculado", detalle: "Withdrawal table: (100 000 − 27 500) × 18% = 13 050." },
    fecha: "2026-10-14",
    entrada: { tipo: "withdrawal", monto: 100000, anteriores: null },
    esperado: { impuesto: 13050, neto: 86950, libre: 27500 },
  },
  {
    nombre: "R800 000 withdrawal",
    origen: { tipo: "recalculado", detalle: "125 730 + (800 000 − 726 000) × 27% = 145 710." },
    fecha: "2026-10-14",
    entrada: { tipo: "withdrawal", monto: 800000, anteriores: null },
    esperado: { impuesto: 145710 },
  },
  {
    nombre: "R300 000 at retirement after an earlier R400 000",
    origen: { tipo: "recalculado", detalle: "Tax on 700 000 = 150 000 × 18% = 27 000, less tax on 400 000 = 0. Tax 27 000." },
    fecha: "2026-10-14",
    entrada: { tipo: "retirement", monto: 300000, anteriores: 400000 },
    esperado: { impuesto: 27000 },
  },
]);
