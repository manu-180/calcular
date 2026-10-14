import { definirCasos } from "@/motor/calculo";
import calculadora from "./medicare-levy-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "ATO example: Angie, $29,000",
    origen: {
      tipo: "oficial",
      url: "https://www.ato.gov.au/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-reduction/medicare-levy-reduction-for-low-income-earners",
      detalle: "The ATO example says Angie's Medicare levy is reduced to $98.90.",
    },
    fecha: "2026-10-14",
    entrada: { ingreso: 29000 },
    esperado: { levy: 98.9, pleno: 580, ahorro: 481.1 },
  },
  {
    nombre: "ATO example: Matthew, $75,000",
    origen: {
      tipo: "oficial",
      url: "https://www.ato.gov.au/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/what-is-the-medicare-levy",
      detalle: "$75,000 × 0.02 = $1,500.",
    },
    fecha: "2026-10-14",
    entrada: { ingreso: 75000 },
    esperado: { levy: 1500, ahorro: 0 },
  },
  {
    nombre: "At the threshold: no levy",
    origen: { tipo: "recalculado", detalle: "28,011 is the threshold amount in s 3 of the Medicare Levy Act; at or below it no levy is payable (s 7(1))." },
    fecha: "2026-10-14",
    entrada: { ingreso: 28011 },
    esperado: { levy: 0 },
  },
  {
    nombre: "At the phase-in limit",
    origen: { tipo: "recalculado", detalle: "(35,013 − 28,011) × 10% = 700.20, less than 2% (700.26)." },
    fecha: "2026-10-14",
    entrada: { ingreso: 35013 },
    esperado: { levy: 700.2 },
  },
  {
    nombre: "Negative income",
    origen: { tipo: "recalculado", detalle: "The function rejects incomes below zero." },
    fecha: "2026-10-14",
    entrada: { ingreso: -10 },
    esperaError: true,
  },
]);
