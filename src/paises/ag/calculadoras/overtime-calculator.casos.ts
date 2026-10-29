import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "10 hours in one day at EC$20 an hour",
    origen: { tipo: "recalculado", url: "https://laws.gov.ag/wp-content/uploads/2018/08/cap-27.pdf", detalle: "Sections C26 and C27: 2 hours over 8 at 1.5 x 20 = 60. Normal pay 8 x 20 = 160. Total 220." },
    fecha: "2026-10-29",
    entrada: { tarifa: 20, periodo: "day", horas: 10 },
    esperado: { horasExtra: 2, pagoExtra: 60, pagoNormal: 160, total: 220 },
  },
  {
    nombre: "52 hours in a week at EC$15 an hour",
    origen: { tipo: "recalculado", detalle: "4 hours over 48 at 1.5 x 15 = 22.50 each, so 90. Normal pay 48 x 15 = 720." },
    fecha: "2026-10-29",
    entrada: { tarifa: 15, periodo: "week", horas: 52 },
    esperado: { horasExtra: 4, pagoExtra: 90, pagoNormal: 720, total: 810 },
  },
  {
    nombre: "Exactly 8 hours has no overtime",
    origen: { tipo: "recalculado", detalle: "No hour is above 8, so no premium pay." },
    fecha: "2026-10-29",
    entrada: { tarifa: 20, periodo: "day", horas: 8 },
    esperado: { horasExtra: 0, pagoExtra: 0, total: 160 },
  },
]);
