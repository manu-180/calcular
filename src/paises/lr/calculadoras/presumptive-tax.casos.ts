import { definirCasos } from "@/motor/calculo";
import calculadora from "./presumptive-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Small business: L$500,000 in the quarter, L$2,000,000 a year",
    origen: { tipo: "recalculado", detalle: "Below L$3,000,000: Small Tax Division, 4% × 500,000 = 20,000. Year 80,000." },
    fecha: "2026-10-27",
    entrada: { ventas: 500000, anual: 2000000 },
    esperado: { impuesto: 20000, tasa: 4, anualEstimado: 80000 },
  },
  {
    nombre: "Medium business: L$2,000,000 in the quarter, L$8,000,000 a year",
    origen: { tipo: "recalculado", detalle: "Above L$3,000,000: advance tax 2% × 2,000,000 = 40,000." },
    fecha: "2026-10-27",
    entrada: { ventas: 2000000, anual: 8000000 },
    esperado: { impuesto: 40000, tasa: 2 },
  },
  {
    nombre: "Exactly L$3,000,000 a year",
    origen: { tipo: "recalculado", detalle: "The small division is for turnover of less than L$3,000,000, so 3,000,000 pays 2%: 2% × 750,000 = 15,000." },
    fecha: "2026-10-27",
    entrada: { ventas: 750000, anual: 3000000 },
    esperado: { impuesto: 15000, tasa: 2 },
  },
  {
    nombre: "Year lower than the quarter",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { ventas: 500000, anual: 100000 },
    esperaError: true,
  },
]);
