import { definirCasos } from "@/motor/calculo";
import calculadora from "./nasscorp-contribution";

export default definirCasos(calculadora, [
  {
    nombre: "L$40,000 a month",
    origen: {
      tipo: "recalculado",
      detalle: "NASSCORP FAQ: employee 4% = 1,600; employer pension 4% = 1,600; employment injury 2% = 800. Employer 2,400, total 4,000, pension 3,200.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 40000 },
    esperado: { empleado: 1600, pensionEmpleador: 1600, riesgo: 800, empleador: 2400, total: 4000, pension: 3200 },
  },
  {
    nombre: "L$12,345.50 a month",
    origen: { tipo: "recalculado", detalle: "4% = 493.82; 2% = 246.91. Employer 740.73, total 1,234.55." },
    fecha: "2026-10-27",
    entrada: { salario: 12345.5 },
    esperado: { empleado: 493.82, riesgo: 246.91, empleador: 740.73, total: 1234.55 },
  },
  {
    nombre: "No earnings",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { salario: 0 },
    esperaError: true,
  },
]);
