import { definirCasos } from "@/motor/calculo";
import calculadora from "./super-guarantee-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "$85,000 a year",
    origen: { tipo: "recalculado", detalle: "85,000 × 12% = 10,200. Package 95,200." },
    fecha: "2026-10-14",
    entrada: { ganancias: 85000, periodo: "anual" },
    esperado: { anual: 10200, porPeriodo: 10200, paquete: 95200, tasa: 12 },
  },
  {
    nombre: "$1,500 a week",
    origen: { tipo: "recalculado", detalle: "1,500 × 12% = 180 a week; 9,360 a year." },
    fecha: "2026-10-14",
    entrada: { ganancias: 1500, periodo: "semanal" },
    esperado: { porPeriodo: 180, anual: 9360 },
  },
  {
    nombre: "$300,000 a year, above the maximum contribution base",
    origen: { tipo: "recalculado", detalle: "Base 270,830 × 12% = 32,499.60; a year." },
    fecha: "2026-10-14",
    entrada: { ganancias: 300000, periodo: "anual" },
    esperado: { anual: 32499.6 },
  },
  {
    nombre: "Zero earnings",
    origen: { tipo: "recalculado", detalle: "The function asks for earnings above zero." },
    fecha: "2026-10-14",
    entrada: { ganancias: 0, periodo: "mensual" },
    esperaError: true,
  },
]);
