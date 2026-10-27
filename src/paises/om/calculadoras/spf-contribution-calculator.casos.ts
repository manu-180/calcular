import { definirCasos } from "@/motor/calculo";
import calculadora from "./spf-contribution-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Omaní con 800 de salario",
    origen: { tipo: "recalculado", detalle: "Empleado 7,5 % + 0,5 % de 800 = 64. Empleador 11 % + 1 % + 0,5 % + 1 % + 1 % = 14,5 % de 800 = 116. Total 180." },
    fecha: "2026-10-26",
    entrada: { salario: 800, nacionalidad: "omani" },
    esperado: { empleado: 64, vejezEmpleador: 88, lesiones: 8, seguridadEmpleador: 4, maternidad: 8, enfermedad: 8, empleador: 116, total: 180 },
  },
  {
    nombre: "Omaní por encima del tope",
    origen: { tipo: "recalculado", detalle: "Salario 4.000, tope 3.000. Empleado 225 + 20 = 245. Empleador 330 + 30 + 20 + 40 + 40 = 460. Total 705." },
    fecha: "2026-10-26",
    entrada: { salario: 4000, nacionalidad: "omani" },
    esperado: { empleado: 245, empleador: 460, total: 705 },
  },
  {
    nombre: "Extranjero",
    origen: { tipo: "recalculado", detalle: "Sin ramos vigentes para extranjeros: 0." },
    fecha: "2026-10-26",
    entrada: { salario: 800, nacionalidad: "expat" },
    esperado: { total: 0 },
  },
]);
