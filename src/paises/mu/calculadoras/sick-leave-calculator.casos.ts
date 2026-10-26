import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-calculator";

const WRA = "https://www.mra.mu/download/WorkersRightsAct2019.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Full-time with days carried over",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 46(1): 15 days. 4 taken leaves 11, plus 20 accumulated = 31." },
    fecha: "2026-10-24",
    entrada: { meses: 36, jornada: "full", diasSemana: null, diasCompleto: null, tomados: 4, acumulados: 20, sueldo: null },
    esperado: { anual: 15, restantes: 11, disponibles: 31 },
  },
  {
    nombre: "Part-time, 2 days out of 5",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 46(2): 2 / 5 × 15 = 6." },
    fecha: "2026-10-24",
    entrada: { meses: 14, jornada: "part", diasSemana: 2, diasCompleto: "5", tomados: 0, acumulados: 0, sueldo: null },
    esperado: { anual: 6 },
  },
  {
    nombre: "Ten months in",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 46(3): 10 − 6 = 4 days." },
    fecha: "2026-10-24",
    entrada: { meses: 10, jornada: "full", diasSemana: null, diasCompleto: null, tomados: 1, acumulados: 0, sueldo: null },
    esperado: { anual: 4, restantes: 3 },
  },
]);
