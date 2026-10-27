import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension-contribution-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "ETB 10,000 salary",
    origen: { tipo: "recalculado", detalle: "Employee 7% = 700, employer 11% = 1,100, total 18% = 1,800." },
    fecha: "2026-10-27",
    entrada: { salario: 10000 },
    esperado: { total: 1800, empleado: 700, empleador: 1100, tasaTotal: 18, anual: 21600 },
  },
  {
    nombre: "ETB 4,250 salary",
    origen: { tipo: "recalculado", detalle: "7% = 297.50, 11% = 467.50, total 765." },
    fecha: "2026-10-27",
    entrada: { salario: 4250 },
    esperado: { total: 765, empleado: 297.5, empleador: 467.5 },
  },
]);
