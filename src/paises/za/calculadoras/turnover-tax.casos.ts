import { definirCasos } from "@/motor/calculo";
import calculadora from "./turnover-tax";

export default definirCasos(calculadora, [
  {
    nombre: "R800 000 turnover",
    origen: { tipo: "recalculado", detalle: "1% of the turnover above 600 000: 200 000 × 1% = 2 000." },
    fecha: "2026-10-14",
    entrada: { facturacion: 800000 },
    esperado: { impuesto: 2000 },
  },
  {
    nombre: "R1 200 000 turnover",
    origen: { tipo: "recalculado", detalle: "3 500 + 2% × (1 200 000 − 950 000) = 8 500." },
    fecha: "2026-10-14",
    entrada: { facturacion: 1200000 },
    esperado: { impuesto: 8500 },
  },
  {
    nombre: "R2 000 000 turnover",
    origen: { tipo: "recalculado", detalle: "12 500 + 3% × (2 000 000 − 1 400 000) = 30 500." },
    fecha: "2026-10-14",
    entrada: { facturacion: 2000000 },
    esperado: { impuesto: 30500, efectiva: 1.525 },
  },
  {
    nombre: "R500 000 turnover",
    origen: { tipo: "recalculado", detalle: "0% up to 600 000." },
    fecha: "2026-10-14",
    entrada: { facturacion: 500000 },
    esperado: { impuesto: 0 },
  },
]);
