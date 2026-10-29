import { definirCasos } from "@/motor/calculo";
import calculadora from "./presumptive-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Turnover of SCR 600,000",
    origen: { tipo: "recalculado", detalle: "1.5 % of 600,000 = 9,000, which is 750 a month." },
    fecha: "2026-10-29",
    entrada: { ventas: 600000 },
    esperado: { impuesto: 9000, mensual: 750, despues: 591000 },
  },
  {
    nombre: "Turnover just under SCR 1 million",
    origen: { tipo: "recalculado", detalle: "1.5 % of 999,999 = 14,999.985, rounded to 14,999.99." },
    fecha: "2026-10-29",
    entrada: { ventas: 999999 },
    esperado: { impuesto: 14999.99 },
  },
  {
    nombre: "Turnover of SCR 1 million is outside the regime",
    origen: { tipo: "recalculado", detalle: "The regime applies below SCR 1 million." },
    fecha: "2026-10-29",
    entrada: { ventas: 1000000 },
    esperaError: true,
  },
]);
