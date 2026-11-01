import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage-calculator";

const URL = "https://labour.gov.bb/wp-content/uploads/2025/04/Minimum-Wage-National-and-Sectoral-Minimum-Wage-Order-2025.2.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "40 hours under the Order of June 2025",
    origen: { tipo: "recalculado", url: URL, detalle: "10.50 × 40 = 420.00 a week, which matches the weekly figure in the Order. Monthly 420 × 52 / 12 = 1,820.00." },
    fecha: "2025-11-15",
    entrada: { horas: 40, pagoHora: 0 },
    esperado: { porHora: 10.5, porSemana: 420, semanaOficial: 420, porMes: 1820 },
  },
  {
    nombre: "Paid Bds$9 an hour",
    origen: { tipo: "recalculado", url: URL, detalle: "9.00 − 10.50 = −1.50, below the minimum." },
    fecha: "2025-11-15",
    entrada: { horas: 40, pagoHora: 9 },
    esperado: { diferencia: -1.5 },
  },
  {
    nombre: "No hours",
    origen: { tipo: "recalculado", detalle: "Zero hours are rejected." },
    fecha: "2025-11-15",
    entrada: { horas: 0, pagoHora: 0 },
    esperaError: true,
  },
]);
