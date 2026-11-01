import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage-calculator";

const NMW = "https://www.moice.gov.bt/wp-content/uploads/2017/12/Revised-National-Minimum-Wage-2013-English-Adv.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "30 days at the minimum",
    origen: { tipo: "recalculado", url: NMW, detalle: "Circular of 31 October 2013: Nu. 125 per day or Nu. 3,750 per month." },
    fecha: "2026-10-31",
    entrada: { dias: 30, pago: null },
    esperado: { minimo: 3750, diario: 125, mensual: 3750, hora: 15.63, diferencia: null },
  },
  {
    nombre: "20 days paid Nu. 2,000",
    origen: { tipo: "recalculado", url: NMW, detalle: "20 × 125 = 2,500. Paid 2,000, which is 500 short." },
    fecha: "2026-10-31",
    entrada: { dias: 20, pago: 2000 },
    esperado: { minimo: 2500, diferencia: -500 },
  },
]);
