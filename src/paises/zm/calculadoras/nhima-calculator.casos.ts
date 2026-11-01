import { definirCasos } from "@/motor/calculo";
import calculadora from "./nhima-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "K10,000 basic pay",
    origen: { tipo: "recalculado", url: "https://nhima.co.zm/elementor-1783/", detalle: "1% × 10,000 = 100 from the employee and 100 from the employer." },
    fecha: "2026-10-26",
    entrada: { basico: 10000 },
    esperado: { empleado: 100, empleador: 100, total: 200, anual: 1200 },
  },
  {
    nombre: "K1,487 basic pay (category I minimum)",
    origen: { tipo: "recalculado", detalle: "1% × 1,487 = 14.87." },
    fecha: "2026-10-26",
    entrada: { basico: 1487 },
    esperado: { empleado: 14.87, total: 29.74 },
  },
]);
