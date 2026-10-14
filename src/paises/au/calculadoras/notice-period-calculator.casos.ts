import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "6 months of service",
    origen: { tipo: "recalculado", detalle: "1 year or less: 1 week." },
    fecha: "2026-10-14",
    entrada: { anios: 0.5, edad: 30, semanal: null },
    esperado: { semanas: 1 },
  },
  {
    nombre: "2 years, aged 50",
    origen: { tipo: "recalculado", detalle: "More than 1 year to 3 years: 2 weeks; over 45 with at least 2 years: plus 1 week = 3." },
    fecha: "2026-10-14",
    entrada: { anios: 2, edad: 50, semanal: 1200 },
    esperado: { semanas: 3, extra: 1, pago: 3600 },
  },
  {
    nombre: "1.5 years, aged 50: no extra week yet",
    origen: { tipo: "recalculado", detalle: "Less than 2 years of service, so no extra week: 2 weeks." },
    fecha: "2026-10-14",
    entrada: { anios: 1.5, edad: 50, semanal: null },
    esperado: { semanas: 2, extra: 0 },
  },
  {
    nombre: "4 years, aged exactly 45",
    origen: { tipo: "recalculado", detalle: "More than 3 to 5 years: 3 weeks. The extra week is for employees over 45." },
    fecha: "2026-10-14",
    entrada: { anios: 4, edad: 45, semanal: null },
    esperado: { semanas: 3, extra: 0 },
  },
  {
    nombre: "6 years, aged 46",
    origen: { tipo: "recalculado", detalle: "More than 5 years: 4 weeks, plus 1 = 5." },
    fecha: "2026-10-14",
    entrada: { anios: 6, edad: 46, semanal: 2000 },
    esperado: { semanas: 5, pago: 10000 },
  },
]);
