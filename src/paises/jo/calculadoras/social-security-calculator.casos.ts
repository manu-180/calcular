import { definirCasos } from "@/motor/calculo";
import calculadora from "./social-security-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "600 al mes",
    origen: { tipo: "recalculado", detalle: "Trabajador 6,5 % + 1 % = 7,5 % de 600 = 45. Empleador 11 + 0,5 + 2 + 0,75 = 14,25 % = 85,5. Total 130,5." },
    fecha: "2026-10-24",
    entrada: { salario: 600 },
    esperado: { empleado: 45, empleador: 85.5, total: 130.5, vejezEmpleado: 39, desempleoEmpleado: 6, lesiones: 12, maternidad: 4.5, tasaEmpleado: 7.5, tasaEmpleador: 14.25 },
  },
  {
    nombre: "Salario por encima del tope de 2026",
    origen: { tipo: "recalculado", detalle: "Base 3.733. Trabajador 7,5 % = 279,975. Empleador 14,25 % = 531,9525." },
    fecha: "2026-10-24",
    entrada: { salario: 5000 },
    esperado: { base: 3733, empleado: 279.975, empleador: 531.953 },
    tolerancia: 0.002,
  },
  {
    nombre: "Tope de 2025",
    origen: { tipo: "recalculado", detalle: "Base 3.668. Trabajador 7,5 % = 275,1." },
    fecha: "2025-03-01",
    entrada: { salario: 4000 },
    esperado: { base: 3668, empleado: 275.1 },
  },
  {
    nombre: "Sin salario",
    origen: { tipo: "recalculado", detalle: "Salario 0." },
    fecha: "2026-10-24",
    entrada: { salario: 0 },
    esperaError: true,
  },
]);
