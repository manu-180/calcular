import { definirCasos } from "@/motor/calculo";
import calculadora from "./unfair-dismissal-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Four years on RWF 300,000",
    origen: { tipo: "recalculado", detalle: "Article 30: between 3 and 6 months of salary. 900,000 to 1,800,000." },
    fecha: "2026-10-26",
    entrada: { salario: 300000, anios: 4, neto: null },
    esperado: { minimo: 900000, maximo: 1800000, mesesMax: 6 },
  },
  {
    nombre: "Twelve years, net salary RWF 220,000",
    origen: { tipo: "recalculado", detalle: "More than 10 years: the top is 9 months of net salary. Minimum 3 × 300,000 = 900,000; maximum 9 × 220,000 = 1,980,000." },
    fecha: "2026-10-26",
    entrada: { salario: 300000, anios: 12, neto: 220000 },
    esperado: { minimo: 900000, maximo: 1980000, mesesMax: 9 },
  },
]);
