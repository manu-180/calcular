import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-calculator";

const URL = "https://www.fairwork.gov.au/leave/sick-and-carers-leave/paid-sick-and-carers-leave";

export default definirCasos(calculadora, [
  {
    nombre: "Fair Work example: Suzanne, full time 38 hours",
    origen: { tipo: "oficial", url: URL, detalle: "Suzanne gets 76 hours of paid sick and carer's leave per year (10 days)." },
    fecha: "2026-10-14",
    entrada: { horas: 38, semanas: 52, tasa: null },
    esperado: { acumuladas: 76, anuales: 76, dias: 10 },
  },
  {
    nombre: "Fair Work example: Rebecca, part time 19 hours",
    origen: { tipo: "oficial", url: URL, detalle: "Rebecca gets half of Suzanne's leave (38 hours) per year." },
    fecha: "2026-10-14",
    entrada: { horas: 19, semanas: 52, tasa: null },
    esperado: { acumuladas: 38 },
  },
  {
    nombre: "13 weeks at 38 hours, $32 an hour",
    origen: { tipo: "recalculado", detalle: "38 × 13 / 26 = 19 hours; 19 × 32 = 608." },
    fecha: "2026-10-14",
    entrada: { horas: 38, semanas: 13, tasa: 32 },
    esperado: { acumuladas: 19, dias: 2.5, valor: 608 },
  },
  {
    nombre: "Negative weeks",
    origen: { tipo: "recalculado", detalle: "The function rejects negative weeks." },
    fecha: "2026-10-14",
    entrada: { horas: 38, semanas: -1, tasa: null },
    esperaError: true,
  },
]);
