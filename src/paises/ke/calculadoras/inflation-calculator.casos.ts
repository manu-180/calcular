import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "KSh 1,000 from September 2025",
    origen: { tipo: "recalculado", url: "https://www.centralbank.go.ke/inflation-rates/", detalle: "12-month inflation to September 2026 is 6.76%: 1,000 × 1.0676 = 1,067.60." },
    fecha: "2026-10-17",
    entrada: { importe: 1000, anio: 2025 },
    esperado: { actualizado: 1067.6, ultimaTasa: 6.76, periodo: "September 2025 to September 2026" },
  },
  {
    nombre: "Year after the latest data",
    origen: { tipo: "recalculado", detalle: "The latest point is September 2026, so 2026 is not allowed." },
    fecha: "2026-10-17",
    entrada: { importe: 1000, anio: 2026 },
    esperaError: true,
  },
]);
