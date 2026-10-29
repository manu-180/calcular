import { definirCasos } from "@/motor/calculo";
import calculadora from "./nis-calculator";

const NIB = "https://nibtt.net/Contribution_Rates/NISContributions_20260105.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "TT$10,000 a month, 4 Mondays",
    origen: { tipo: "oficial", url: NIB, detalle: "Monthly earnings 9,273 to 10,312.99 is class XII: employee 122.00, employer 244.00 a week. Four weeks: 488 and 976." },
    fecha: "2026-10-27",
    entrada: { frecuencia: "mensual", pago: 10000, lunes: "4" },
    esperado: { empleado: 488, empleador: 976, total: 1464, clase: 12, empleadoAnual: 6344 },
  },
  {
    nombre: "TT$820 a week (minimum wage)",
    origen: { tipo: "oficial", url: NIB, detalle: "Weekly earnings 760 to 929.99 is class V: employee 45.60, employer 91.20, total 136.80." },
    fecha: "2026-10-27",
    entrada: { frecuencia: "semanal", pago: 820, lunes: null },
    esperado: { empleado: 45.6, empleador: 91.2, total: 136.8, clase: 5 },
  },
  {
    nombre: "Top class, 5 Mondays",
    origen: { tipo: "oficial", url: NIB, detalle: "13,600 and over is class XVI: 169.50 and 339.00 a week. Five weeks: 847.50 and 1,695." },
    fecha: "2026-10-27",
    entrada: { frecuencia: "mensual", pago: 25000, lunes: "5" },
    esperado: { empleado: 847.5, empleador: 1695, clase: 16 },
  },
  {
    nombre: "Edge of class I and II by the week",
    origen: { tipo: "oficial", url: NIB, detalle: "340.00 a week is the first dollar of class II: employee 21.30." },
    fecha: "2026-10-27",
    entrada: { frecuencia: "semanal", pago: 340, lunes: null },
    esperado: { empleado: 21.3, clase: 2 },
  },
]);
