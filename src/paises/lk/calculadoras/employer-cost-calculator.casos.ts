import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 150,000 salary",
    origen: { tipo: "recalculado", detalle: "EPF 12% = 18,000. ETF 3% = 4,500. Cost 172,500 a month, 2,070,000 a year, 15% on top." },
    fecha: "2026-10-26",
    entrada: { bruto: 150000, empleados: 1 },
    esperado: { costoMes: 172500, epf: 18000, etf: 4500, costoAnual: 2070000, recargo: 15 },
  },
  {
    nombre: "Ten employees on Rs. 40,000",
    origen: { tipo: "recalculado", detalle: "40,000 + 4,800 + 1,200 = 46,000 each. × 10 = 460,000 a month, 5,520,000 a year." },
    fecha: "2026-10-26",
    entrada: { bruto: 40000, empleados: 10 },
    esperado: { costoMes: 46000, costoTotalMes: 460000, costoTotalAnual: 5520000 },
  },
]);
