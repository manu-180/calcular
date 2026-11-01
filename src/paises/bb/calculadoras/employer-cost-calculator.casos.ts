import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "One employee on $4,500 a month",
    origen: { tipo: "recalculado", detalle: "NIS 4,500 × 12.75% = 573.75. RRF 4,500 × 0.25% = 11.25. Cost 5,085.00 a month, 61,020.00 a year." },
    fecha: "2026-10-27",
    entrada: { bruto: 4500, empleados: 1 },
    esperado: { costoMes: 5085, nis: 573.75, rrf: 11.25, costoAnual: 61020 },
  },
  {
    nombre: "Three employees on $9,000 a month",
    origen: { tipo: "recalculado", detalle: "NIS on the ceiling 5,360 × 12.75% = 683.40. RRF 22.50. Cost 9,705.90 each, 29,117.70 for three." },
    fecha: "2026-10-27",
    entrada: { bruto: 9000, empleados: 3 },
    esperado: { costoMes: 9705.9, nis: 683.4, equipoMes: 29117.7 },
  },
  {
    nombre: "No salary",
    origen: { tipo: "recalculado", detalle: "A zero salary is rejected." },
    fecha: "2026-10-27",
    entrada: { bruto: 0, empleados: 1 },
    esperaError: true,
  },
]);
