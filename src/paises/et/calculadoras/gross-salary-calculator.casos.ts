import { definirCasos } from "@/motor/calculo";
import calculadora from "./gross-salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "ETB 7,650 net needs ETB 10,000 gross",
    origen: { tipo: "recalculado", detalle: "10,000 − tax 1,650 − pension 700 = 7,650." },
    fecha: "2026-10-27",
    entrada: { neto: 7650 },
    esperado: { bruto: 10000, impuesto: 1650, pension: 700 },
  },
  {
    nombre: "ETB 13,650 net needs ETB 20,000 gross",
    origen: { tipo: "recalculado", detalle: "20,000 − tax 4,950 − pension 1,400 = 13,650." },
    fecha: "2026-10-27",
    entrada: { neto: 13650 },
    esperado: { bruto: 20000, impuesto: 4950, marginal: 35 },
  },
  {
    nombre: "ETB 1,860 net needs ETB 2,000 gross",
    origen: { tipo: "recalculado", detalle: "2,000 is tax free; 2,000 − pension 140 = 1,860." },
    fecha: "2026-10-27",
    entrada: { neto: 1860 },
    esperado: { bruto: 2000, impuesto: 0 },
  },
]);
