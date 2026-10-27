import { definirCasos } from "@/motor/calculo";
import calculadora from "./property-tax-penalty";

export default definirCasos(calculadora, [
  {
    nombre: "US$125 two months late",
    origen: { tipo: "recalculado", detalle: "Section 2002 as quoted by the LRA: 5% per month × 2 = 10% of 125 = 12.50." },
    fecha: "2026-10-27",
    entrada: { impuesto: 125, meses: 2 },
    esperado: { multa: 12.5, tasa: 10, total: 137.5 },
  },
  {
    nombre: "Eight months late hits the cap",
    origen: { tipo: "recalculado", detalle: "8 × 5% = 40%, capped at 25%: 25% of 400 = 100." },
    fecha: "2026-10-27",
    entrada: { impuesto: 400, meses: 8 },
    esperado: { multa: 100, tasa: 25 },
  },
  {
    nombre: "Paid on time",
    origen: { tipo: "recalculado", detalle: "No months late: no penalty." },
    fecha: "2026-10-27",
    entrada: { impuesto: 125, meses: 0 },
    esperado: { multa: 0, tasa: 0 },
  },
]);
