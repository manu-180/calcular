import { definirCasos } from "@/motor/calculo";
import calculadora from "./corporate-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "N$1,000,000 taxable income",
    origen: { tipo: "recalculado", detalle: "Income Tax Amendment Act 2024: 30 cents per dollar from years starting 1 January 2025. 300,000." },
    fecha: "2026-10-27",
    entrada: { renta: 1000000 },
    esperado: { impuesto: 300000, despues: 700000, tasa: 30 },
  },
  {
    nombre: "N$2,450,000 taxable income",
    origen: { tipo: "recalculado", detalle: "30% × 2,450,000 = 735,000." },
    fecha: "2026-10-27",
    entrada: { renta: 2450000 },
    esperado: { impuesto: 735000 },
  },
]);
