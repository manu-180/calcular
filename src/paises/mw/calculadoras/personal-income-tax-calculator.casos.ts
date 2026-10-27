import { definirCasos } from "@/motor/calculo";
import calculadora from "./personal-income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "K6,000,000 a year",
    origen: { tipo: "recalculado", detalle: "First 2,040,000 at 0%; 3,960,000 at 30% = 1,188,000." },
    fecha: "2026-10-27",
    entrada: { renta: 6000000 },
    esperado: { impuesto: 1188000, neto: 4812000, efectiva: 19.8 },
  },
  {
    nombre: "K2,040,000 pays nothing",
    origen: { tipo: "recalculado", detalle: "The whole amount is in the 0% band." },
    fecha: "2026-10-27",
    entrada: { renta: 2040000 },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "Zero income is rejected",
    origen: { tipo: "recalculado", detalle: "Income has to be above zero." },
    fecha: "2026-10-27",
    entrada: { renta: 0 },
    esperaError: true,
  },
]);
