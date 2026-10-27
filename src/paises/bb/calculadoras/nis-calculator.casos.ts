import { definirCasos } from "@/motor/calculo";
import calculadora from "./nis-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "$4,000 a month in October 2026",
    origen: {
      tipo: "recalculado",
      detalle: "Employee NIS 4,000 × 11% = 440.00, RRF 10.00, total 450.00. Employer NIS 4,000 × 12.75% = 510.00, RRF 10.00, total 520.00. Together 970.00.",
    },
    fecha: "2026-10-27",
    entrada: { bruto: 4000, periodo: "mes" },
    esperado: { empleado: 450, nisEmpleado: 440, empleador: 520, nisEmpleador: 510, total: 970 },
  },
  {
    nombre: "$7,000 a month, above the 2026 ceiling",
    origen: { tipo: "recalculado", detalle: "Insurable 5,360. Employee NIS 589.60 + RRF 17.50 = 607.10. Employer NIS 683.40 + RRF 17.50 = 700.90." },
    fecha: "2026-10-27",
    entrada: { bruto: 7000, periodo: "mes" },
    esperado: { empleado: 607.1, empleador: 700.9, asegurable: 5360 },
  },
  {
    nombre: "$1,500 a week, above the weekly ceiling",
    origen: { tipo: "recalculado", detalle: "Weekly ceiling 1,238. Employee NIS 136.18 + RRF 3.75 = 139.93. Employer NIS 157.85 (157.845 rounded up) + RRF 3.75 = 161.60." },
    fecha: "2026-10-27",
    entrada: { bruto: 1500, periodo: "semana" },
    esperado: { empleado: 139.93, empleador: 161.6, tope: 1238 },
  },
  {
    nombre: "$7,000 a month in 2025",
    origen: { tipo: "recalculado", detalle: "2025 monthly ceiling 5,280. Employee NIS 580.80." },
    fecha: "2025-11-15",
    entrada: { bruto: 7000, periodo: "mes" },
    valores: { "bb.nis-ceiling-weekly": 1219 },
    esperado: { nisEmpleado: 580.8, tope: 5280 },
  },
  {
    nombre: "No pay",
    origen: { tipo: "recalculado", detalle: "Zero pay is rejected." },
    fecha: "2026-10-27",
    entrada: { bruto: 0, periodo: "mes" },
    esperaError: true,
  },
]);
