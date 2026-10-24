import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 80,000 salary",
    origen: { tipo: "recalculado", detalle: "EOBI 5% of 40,700 = 2,035. Cost 82,035 a month; 984,420 a year." },
    fecha: "2026-10-17",
    entrada: { sueldo: 80000, pf: 0, empleados: 1 },
    esperado: { costo: 82035, eobi: 2035, anual: 984420 },
  },
  {
    nombre: "With 8.33% provident fund",
    origen: { tipo: "recalculado", detalle: "100,000 + 2,035 + 8,330 = 110,365." },
    fecha: "2026-10-17",
    entrada: { sueldo: 100000, pf: 8.33, empleados: 1 },
    esperado: { costo: 110365, pf: 8330 },
  },
]);
