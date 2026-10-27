import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave";

export default definirCasos(calculadora, [
  {
    nombre: "Three years of service, full year",
    origen: { tipo: "recalculado", detalle: "Labour Law art. 79: under five years, 3 weeks. Weekly 7,000 ÷ 30 × 7 = 1,633.33. 3 × 1,633.333… = 4,900." },
    fecha: "2026-10-26",
    entrada: { basico: 7000, anios: 3, meses: 12, tomadas: 0, metodoSemanal: "30" },
    esperado: { porAnio: 3, derecho: 3, pendientes: 3, pago: 4900 },
  },
  {
    nombre: "Five years of service, 6 months worked, 1 week taken",
    origen: { tipo: "recalculado", detalle: "Five years or more: 4 weeks. 4 × 6 ÷ 12 = 2 weeks earned. 2 - 1 = 1 week. Weekly 10,400 × 12 ÷ 52 = 2,400." },
    fecha: "2026-10-26",
    entrada: { basico: 10400, anios: 5, meses: 6, tomadas: 1, metodoSemanal: "52" },
    esperado: { porAnio: 4, derecho: 2, pendientes: 1, pago: 2400 },
  },
  {
    nombre: "Less than one year of service",
    origen: { tipo: "recalculado", detalle: "0.5 years < 1: no leave yet." },
    fecha: "2026-10-26",
    entrada: { basico: 5000, anios: 0.5, meses: 6, tomadas: 0, metodoSemanal: "30" },
    esperado: { pendientes: 0, pago: 0 },
  },
]);
