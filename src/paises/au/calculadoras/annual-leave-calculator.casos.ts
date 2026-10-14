import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Fair Work example: Jane, part time 20 hours a week",
    origen: {
      tipo: "oficial",
      url: "https://www.fairwork.gov.au/leave/annual-leave",
      detalle: "Jane works 20 hours per week and accumulates 80 hours of annual leave during the year.",
    },
    fecha: "2026-10-14",
    entrada: { horas: 20, semanas: 52, tasa: null, loading: "no" },
    esperado: { acumuladas: 80, anuales: 80, dias: 20 },
  },
  {
    nombre: "Half a year full time with 17.5% loading",
    origen: { tipo: "recalculado", detalle: "38 × 26 × 4 / 52 = 76 hours. 76 × $30 = 2,280; loading 17.5% = 399; total 2,679." },
    fecha: "2026-10-14",
    entrada: { horas: 38, semanas: 26, tasa: 30, loading: "si" },
    esperado: { acumuladas: 76, dias: 10, base: 2280, recargo: 399, total: 2679 },
  },
  {
    nombre: "Full year, no loading",
    origen: { tipo: "recalculado", detalle: "38 × 4 = 152 hours. 152 × $35 = 5,320." },
    fecha: "2026-10-14",
    entrada: { horas: 38, semanas: 52, tasa: 35, loading: "no" },
    esperado: { acumuladas: 152, base: 5320, recargo: 0, total: 5320 },
  },
  {
    nombre: "Zero hours",
    origen: { tipo: "recalculado", detalle: "The function asks for ordinary hours above zero." },
    fecha: "2026-10-14",
    entrada: { horas: 0, semanas: 52, tasa: null, loading: "no" },
    esperaError: true,
  },
]);
