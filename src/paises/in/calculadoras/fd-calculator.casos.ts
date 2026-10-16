import { definirCasos } from "@/motor/calculo";
import calculadora from "./fd-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₹1 lakh for 1 year at 7%, quarterly",
    origen: { tipo: "recalculado", detalle: "1,00,000 × (1 + 0.07 / 4)^4 = 1,07,185.90." },
    fecha: "2026-10-15",
    entrada: { monto: 100000, tasa: 7, meses: 12, capitalizacion: "4" },
    esperado: { madurez: 107185.9, interes: 7185.9 },
  },
  {
    nombre: "₹5 lakh for 5 years at 7.5%",
    origen: { tipo: "recalculado", detalle: "5,00,000 × (1.01875)^20 = 7,24,974.01." },
    fecha: "2026-10-15",
    entrada: { monto: 500000, tasa: 7.5, meses: 60, capitalizacion: "4" },
    esperado: { madurez: 724974.01 },
  },
  {
    nombre: "18 months at 6.5%",
    origen: { tipo: "recalculado", detalle: "1,00,000 × (1.01625)^6 = 1,10,154.78." },
    fecha: "2026-10-15",
    entrada: { monto: 100000, tasa: 6.5, meses: 18, capitalizacion: "4" },
    esperado: { madurez: 110154.78 },
  },
  {
    nombre: "Yearly compounding",
    origen: { tipo: "recalculado", detalle: "1,00,000 × 1.08^2 = 1,16,640." },
    fecha: "2026-10-15",
    entrada: { monto: 100000, tasa: 8, meses: 24, capitalizacion: "1" },
    esperado: { madurez: 116640, efectiva: 8 },
  },
]);
