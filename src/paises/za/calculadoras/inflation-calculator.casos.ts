import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "R1 000 from August 2015 to August 2026",
    origen: {
      tipo: "recalculado",
      detalle: "Annual CPI in August 2016 to 2026: 5.9, 4.8, 4.9, 4.3, 3.1, 4.9, 7.6, 4.8, 4.4, 3.3, 4.4%. Chained factor 1.667347, so 1 000 becomes 1 667.35.",
    },
    fecha: "2026-10-14",
    entrada: { importe: 1000, anio: 2015 },
    esperado: { actualizado: 1667.35, diferencia: 667.35, ultimaTasa: 4.4, periodo: "August 2015 to August 2026" },
    tolerancia: 0.01,
  },
  {
    nombre: "R1 000 from August 2020",
    origen: { tipo: "recalculado", detalle: "4.9, 7.6, 4.8, 4.4, 3.3, 4.4%: factor 1.331835, so 1 331.83." },
    fecha: "2026-10-14",
    entrada: { importe: 1000, anio: 2020 },
    esperado: { actualizado: 1331.83 },
    tolerancia: 0.01,
  },
  {
    nombre: "One year to January 2026",
    origen: { tipo: "recalculado", detalle: "Annual CPI in January 2026 was 3.5%, so 1 000 becomes 1 035." },
    fecha: "2026-01-15",
    entrada: { importe: 1000, anio: 2025 },
    esperado: { actualizado: 1035, periodo: "January 2025 to January 2026" },
  },
  {
    nombre: "Start year too early",
    origen: { tipo: "recalculado", detalle: "The series starts in January 2000, so the earliest start year is 1999." },
    fecha: "2026-10-14",
    entrada: { importe: 1000, anio: 1998 },
    esperaError: true,
  },
]);
