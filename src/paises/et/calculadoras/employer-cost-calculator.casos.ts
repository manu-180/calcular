import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "One employee on ETB 10,000",
    origen: { tipo: "recalculado", detalle: "Cost 10,000 + 11% = 11,100. Withheld: tax 1,650 and pension 700. Net 7,650." },
    fecha: "2026-10-27",
    entrada: { bruto: 10000, empleados: 1 },
    esperado: { costo: 11100, pensionEmpleador: 1100, impuesto: 1650, pensionEmpleado: 700, neto: 7650, costoAnual: 133200 },
  },
  {
    nombre: "Five employees on ETB 6,000",
    origen: { tipo: "recalculado", detalle: "6,000 + 660 = 6,660 each; × 5 = 33,300 a month." },
    fecha: "2026-10-27",
    entrada: { bruto: 6000, empleados: 5 },
    esperado: { costo: 6660, costoTotal: 33300, impuesto: 700 },
  },
]);
