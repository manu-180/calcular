import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₱1,000 from January 2018",
    origen: { tipo: "recalculado", detalle: "PSA CPI January 2018 = 97.2, September 2026 = 137.7. 1,000 × 137.7 / 97.2 = 1,416.67." },
    fecha: "2026-10-16",
    entrada: { importe: 1000, anio: 2018, mes: "01" },
    esperado: { actualizado: 1416.67, diferencia: 416.67, periodo: "January 2018 to September 2026" },
  },
  {
    nombre: "₱1,000 from September 2025",
    origen: { tipo: "recalculado", detalle: "CPI September 2025 = 128.5. 1,000 × 137.7 / 128.5 = 1,071.60; inflation 7.16%." },
    fecha: "2026-10-16",
    entrada: { importe: 1000, anio: 2025, mes: "09" },
    esperado: { actualizado: 1071.6, acumulada: 7.1595, promedio: 7.1595 },
    tolerancia: 0.001,
  },
  {
    nombre: "Backcasted value from January 2015",
    origen: { tipo: "recalculado", detalle: "Backcasted CPI January 2015 = 91.05. 1,000 × 137.7 / 91.05 = 1,512.36." },
    fecha: "2026-10-16",
    entrada: { importe: 1000, anio: 2015, mes: "01" },
    esperado: { actualizado: 1512.36 },
  },
  {
    nombre: "The latest month has nothing to compare",
    origen: { tipo: "recalculado", detalle: "September 2026 is the latest CPI." },
    fecha: "2026-10-16",
    entrada: { importe: 1000, anio: 2026, mes: "09" },
    esperaError: true,
  },
]);
