import { definirCasos } from "@/motor/calculo";
import calculadora from "./spf-contribution-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Employee on SCR 25,000",
    origen: { tipo: "recalculado", detalle: "Employee 5 % = 1,250 and employer 5 % = 1,250. Total 2,500." },
    fecha: "2026-10-29",
    entrada: { situacion: "employee", bruto: 25000 },
    esperado: { empleado: 1250, empleador: 1250, total: 2500 },
  },
  {
    nombre: "Self-employed declaring SCR 20,000",
    origen: { tipo: "recalculado", detalle: "10 % of 20,000 = 2,000." },
    fecha: "2026-10-29",
    entrada: { situacion: "self", bruto: 20000 },
    esperado: { propio: 2000, total: 2000 },
  },
  {
    nombre: "Employee on SCR 12,345.67",
    origen: { tipo: "recalculado", detalle: "5 % of 12,345.67 = 617.2835, rounded to 617.28 for each side. Total 1,234.56." },
    fecha: "2026-10-29",
    entrada: { situacion: "employee", bruto: 12345.67 },
    esperado: { empleado: 617.28, empleador: 617.28, total: 1234.56 },
  },
]);
