import { definirCasos } from "@/motor/calculo";
import calculadora from "./eobi-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Federal minimum wage, one worker",
    origen: { tipo: "recalculado", detalle: "5% of 40,700 = 2,035; 1% = 407; total 2,442 a month." },
    fecha: "2026-10-17",
    entrada: { base: null, empleados: 1 },
    esperado: { total: 2442, empleador: 2035, empleado: 407, anualTodos: 29304 },
  },
  {
    nombre: "Ten workers on Rs. 42,000",
    origen: { tipo: "recalculado", detalle: "6% of 42,000 = 2,520 × 10 = 25,200 a month." },
    fecha: "2026-10-17",
    entrada: { base: 42000, empleados: 10 },
    esperado: { mensualTodos: 25200 },
  },
]);
