import { definirCasos } from "@/motor/calculo";
import isrRentasDeCapital from "./isr-rentas-de-capital";

export default definirCasos(isrRentasDeCapital, [
  {
    nombre: "Alquiler de Q5,000",
    origen: { tipo: "recalculado", detalle: "Decreto 10-2012 arts. 88 y 92: 5000 − 30 % = 3500 × 10 % = 350." },
    fecha: "2026-10-12",
    entrada: { tipo: "alquiler", monto: 5000 },
    esperado: { base: 3500, tasa: 10, isr: 350, neto: 4650 },
  },
  {
    nombre: "Dividendos de Q10,000",
    origen: { tipo: "recalculado", detalle: "Art. 93: 5 % de 10000 = 500." },
    fecha: "2026-10-12",
    entrada: { tipo: "dividendos", monto: 10000 },
    esperado: { tasa: 5, isr: 500 },
  },
  {
    nombre: "Intereses",
    origen: { tipo: "recalculado", detalle: "10 % de 1234.56 = 123.456 → 123.46." },
    fecha: "2026-10-12",
    entrada: { tipo: "intereses", monto: 1234.56 },
    esperado: { isr: 123.46 },
  },
]);
