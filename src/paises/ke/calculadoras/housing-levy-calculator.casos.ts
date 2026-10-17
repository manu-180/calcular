import { definirCasos } from "@/motor/calculo";
import calculadora from "./housing-levy-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "KSh 80,000 gross",
    origen: { tipo: "recalculado", detalle: "1.5% × 80,000 = 1,200 from the employee and 1,200 from the employer." },
    fecha: "2026-10-17",
    entrada: { bruto: 80000 },
    esperado: { empleado: 1200, empleador: 1200, total: 2400, anualEmpleado: 14400 },
  },
  {
    nombre: "KSh 33,333 gross",
    origen: { tipo: "recalculado", detalle: "1.5% × 33,333 = 499.995, rounded to 500.00." },
    fecha: "2026-10-17",
    entrada: { bruto: 33333 },
    esperado: { empleado: 500 },
  },
]);
