import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "One employee on Ushs 1,500,000",
    origen: {
      tipo: "recalculado",
      detalle: "Employer NSSF 10% = 150,000; cost 1,650,000. PAYE 338,250 + NSSF 75,000 + 150,000 = 563,250 to remit. Take-home 1,086,750.",
    },
    fecha: "2026-10-24",
    entrada: { mensual: 1500000, personas: 1 },
    esperado: { costo: 1650000, nssfEmpleador: 150000, remesa: 563250, neto: 1086750, total: 1650000, anual: 19800000 },
  },
  {
    nombre: "Five employees on Ushs 600,000",
    origen: { tipo: "recalculado", detalle: "Cost 600,000 + 60,000 = 660,000 each; × 5 = 3,300,000 a month; × 12 = 39,600,000." },
    fecha: "2026-10-24",
    entrada: { mensual: 600000, personas: 5 },
    esperado: { costo: 660000, total: 3300000, anual: 39600000 },
  },
]);
