import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "P1 000 from September 2024 to September 2026",
    origen: {
      tipo: "recalculado",
      detalle: "Annual inflation in September: 2025 3.7%, 2026 7.8% (Statistics Botswana, CPI September 2026). 1 000 × 1.037 × 1.078 = 1 117.89.",
    },
    fecha: "2026-10-27",
    entrada: { importe: 1000, anio: 2024 },
    esperado: { actualizado: 1117.89, diferencia: 117.89, ultimaTasa: 7.8, periodo: "September 2024 to September 2026" },
  },
  {
    nombre: "P1 000 from September 2020",
    origen: {
      tipo: "recalculado",
      detalle: "September rates 2021 8.4, 2022 13.8, 2023 3.2, 2024 1.5, 2025 3.7, 2026 7.8. Product 1.084 × 1.138 × 1.032 × 1.015 × 1.037 × 1.078 = 1.444491, so 1 444.49.",
    },
    fecha: "2026-10-27",
    entrada: { importe: 1000, anio: 2020 },
    esperado: { actualizado: 1444.49 },
    tolerancia: 0.01,
  },
  {
    nombre: "Year before the series",
    origen: { tipo: "recalculado", detalle: "The series starts in 2021, so 2019 has no rate for September 2020." },
    fecha: "2026-10-27",
    entrada: { importe: 1000, anio: 2019 },
    esperaError: true,
  },
  {
    nombre: "Current year",
    origen: { tipo: "recalculado", detalle: "The latest point is September 2026, so 2026 is not valid." },
    fecha: "2026-10-27",
    entrada: { importe: 1000, anio: 2026 },
    esperaError: true,
  },
]);
