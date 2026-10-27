import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "General minimum, 45 hours a week",
    origen: { tipo: "recalculado", detalle: "N$18 × 45 = 810 a week. 810 × 4.333 = 3,509.73 a month." },
    fecha: "2026-10-27",
    entrada: { sector: "general", horas: 45, pago: null },
    esperado: { hora: 18, semanal: 810, mensual: 3509.73 },
  },
  {
    nombre: "Domestic worker in 2026, paid N$2,500",
    origen: { tipo: "recalculado", detalle: "N$15 × 45 = 675; × 4.333 = 2,924.78. 2,500 − 2,924.78 = −424.78." },
    fecha: "2026-10-27",
    entrada: { sector: "domestic", horas: 45, pago: 2500 },
    esperado: { hora: 15, mensual: 2924.78, diferencia: -424.78 },
  },
  {
    nombre: "Agricultural worker in 2025",
    origen: { tipo: "recalculado", detalle: "GN 218 of 2024: N$10 from 1 January 2025. 10 × 45 × 4.333 = 1,949.85." },
    fecha: "2025-06-01",
    entrada: { sector: "agricultural", horas: 45, pago: null },
    esperado: { hora: 10, mensual: 1949.85 },
  },
  {
    nombre: "Security worker in 2026, 60 hours",
    origen: { tipo: "recalculado", detalle: "GN 6 of 2025: N$16 from 1 January 2026. 16 × 60 = 960; × 4.333 = 4,159.68." },
    fecha: "2026-10-27",
    entrada: { sector: "security", horas: 60, pago: null },
    esperado: { hora: 16, semanal: 960, mensual: 4159.68 },
  },
  {
    nombre: "Domestic worker from January 2027",
    origen: { tipo: "recalculado", detalle: "All categories reach N$18 on 1 January 2027." },
    fecha: "2027-01-01",
    entrada: { sector: "domestic", horas: 45, pago: null },
    esperado: { hora: 18 },
  },
]);
