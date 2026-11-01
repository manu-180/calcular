import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "RWF 100,000 from January 2020",
    origen: {
      tipo: "recalculado",
      detalle: "Urban CPI 123.5 in January 2020 and 223.7 in September 2026. 100,000 × 223.7 ÷ 123.5 = 181,133.6, rounded to 181,134. September 2025 was 190.9, so 12-month inflation is 17.2%.",
    },
    fecha: "2026-10-26",
    entrada: { importe: 100000, anio: 2020, mes: "01" },
    esperado: { actualizado: 181134, diferencia: 81134, anual: 17.1818, periodo: "January 2020 to September 2026" },
    tolerancia: 0.01,
  },
  {
    nombre: "A month after the latest data",
    origen: { tipo: "recalculado", detalle: "The latest index is September 2026, so October 2026 cannot be the start." },
    fecha: "2026-10-26",
    entrada: { importe: 100000, anio: 2026, mes: "10" },
    esperaError: true,
  },
]);
