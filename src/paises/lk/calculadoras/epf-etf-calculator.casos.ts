import { definirCasos } from "@/motor/calculo";
import calculadora from "./epf-etf-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 100,000 for 12 months",
    origen: { tipo: "recalculado", detalle: "EPF 8% = 8,000 and 12% = 12,000. ETF 3% = 3,000. 23,000 a month, 276,000 in 12 months." },
    fecha: "2026-10-26",
    entrada: { ganancias: 100000, meses: 12 },
    esperado: { epfEmpleado: 8000, epfEmpleador: 12000, epfTotal: 20000, etf: 3000, totalMes: 23000, totalPeriodo: 276000, epfPeriodo: 240000, etfPeriodo: 36000 },
  },
  {
    nombre: "Minimum wage for one month",
    origen: { tipo: "recalculado", detalle: "30,000 × 8% = 2,400; × 12% = 3,600; × 3% = 900. Total 6,900." },
    fecha: "2026-10-26",
    entrada: { ganancias: 30000, meses: 1 },
    esperado: { epfEmpleado: 2400, epfEmpleador: 3600, etf: 900, totalMes: 6900 },
  },
]);
