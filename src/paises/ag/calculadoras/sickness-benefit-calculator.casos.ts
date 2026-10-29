import { definirCasos } from "@/motor/calculo";
import calculadora from "./sickness-benefit-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "EC$800 a week for 4 weeks",
    origen: { tipo: "recalculado", url: "https://socialsecurity.gov.ag/sickness/", detalle: "60% of 800 = 480 a week. 4 weeks = 1,920." },
    fecha: "2026-10-29",
    entrada: { semanal: 800, semanas: 4 },
    esperado: { base: 800, semanal: 480, total: 1920 },
  },
  {
    nombre: "Earnings above the weekly ceiling",
    origen: { tipo: "recalculado", url: "https://socialsecurity.gov.ag/contributions-faqs/", detalle: "Ceiling 1,500. 60% of 1,500 = 900 a week. 2 weeks = 1,800." },
    fecha: "2026-10-29",
    entrada: { semanal: 2000, semanas: 2 },
    esperado: { base: 1500, semanal: 900, total: 1800 },
  },
  {
    nombre: "More than 26 weeks is refused",
    origen: { tipo: "recalculado", detalle: "27 weeks is above the 26-week limit on the Board's sickness page." },
    fecha: "2026-10-29",
    entrada: { semanal: 800, semanas: 27 },
    esperaError: true,
  },
]);
