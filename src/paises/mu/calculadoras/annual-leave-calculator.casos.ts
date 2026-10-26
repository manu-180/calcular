import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

const WRA = "https://www.mra.mu/download/WorkersRightsAct2019.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Full-time worker after two years",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 45(1): 20 working days, plus 2 days under section 45(2) = 22. 5 taken leaves 17." },
    fecha: "2026-10-24",
    entrada: { meses: 24, jornada: "full", diasSemana: null, diasCompleto: null, tomados: 5, sueldo: null },
    esperado: { total: 22, base: 20, adicional: 2, restantes: 17 },
  },
  {
    nombre: "Part-time, 3 days out of 5",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 45(5): 3 / 5 × 20 = 12, plus 2 = 14." },
    fecha: "2026-10-24",
    entrada: { meses: 18, jornada: "part", diasSemana: 3, diasCompleto: "5", tomados: 0, sueldo: null },
    esperado: { total: 14, base: 12 },
  },
  {
    nombre: "Nine months in",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 45(4): one day for each month after the sixth: 9 − 6 = 3." },
    fecha: "2026-10-24",
    entrada: { meses: 9, jornada: "full", diasSemana: null, diasCompleto: null, tomados: 0, sueldo: null },
    esperado: { total: 3, adicional: 0 },
  },
  {
    nombre: "Four months in",
    origen: { tipo: "recalculado", url: WRA, detalle: "Less than 6 months: no annual leave yet." },
    fecha: "2026-10-24",
    entrada: { meses: 4, jornada: "full", diasSemana: null, diasCompleto: null, tomados: 0, sueldo: null },
    esperado: { total: 0 },
  },
]);
