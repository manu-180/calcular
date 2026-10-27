import { definirCasos } from "@/motor/calculo";
import calculadora from "./rental-income-tax";

export default definirCasos(calculadora, [
  {
    nombre: "€1,000 a month",
    origen: { tipo: "recalculado", detalle: "Income Tax Act, art. 31D(2): 15 cents on every euro of gross rent. 12,000 × 15% = 1,800." },
    fecha: "2026-10-26",
    entrada: { renta: 1000, periodo: "mes" },
    esperado: { impuesto: 1800, anual: 12000, neto: 10200, mensual: 150 },
  },
  {
    nombre: "€9,500 a year",
    origen: { tipo: "recalculado", detalle: "9,500 × 15% = 1,425." },
    fecha: "2026-10-26",
    entrada: { renta: 9500, periodo: "anio" },
    esperado: { impuesto: 1425 },
  },
]);
