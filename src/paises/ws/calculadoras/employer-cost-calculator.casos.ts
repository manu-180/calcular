import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "One employee on WST 3,000",
    origen: { tipo: "recalculado", url: "https://www.npf.ws/employers-guide", detalle: "NPF 10% = 300. Cost 3,300. Hours a month 40 × 52 / 12 = 173.33, so 3,300 / 173.33 = 19.04." },
    fecha: "2026-10-29",
    entrada: { bruto: 3000, empleados: 1 },
    esperado: { costoEmpleado: 3300, npf: 300, costoMensual: 3300, costoAnual: 39600, costoPorHora: 19.04 },
  },
  {
    nombre: "Five employees on WST 2,000",
    origen: { tipo: "recalculado", detalle: "NPF 200. Cost 2,200 each, 11,000 a month, 132,000 a year." },
    fecha: "2026-10-29",
    entrada: { bruto: 2000, empleados: 5 },
    esperado: { costoMensual: 11000, costoAnual: 132000 },
  },
]);
