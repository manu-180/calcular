import { definirCasos } from "@/motor/calculo";
import plazoFijo from "./plazo-fijo";

export default definirCasos(plazoFijo, [
  {
    nombre: "Tasa de referencia del Banguat a 180 días",
    origen: {
      tipo: "recalculado",
      detalle: "Tasa pasiva de septiembre de 2026: 4.62 %. 100000 × 4.62 % × 180 / 365 = 2278.36; ISR 10 % (Decreto 10-2012 art. 92) = 227.84; neto 2050.52.",
    },
    fecha: "2026-10-12",
    entrada: { monto: 100000, tasa: null, dias: 180 },
    esperado: { tasa: 4.62, referencia: 4.62, interes: 2278.36, isr: 227.84, neto: 2050.52, total: 102050.52 },
  },
  {
    nombre: "Tasa propia del 5 % a un año",
    origen: { tipo: "recalculado", detalle: "10000 × 5 % = 500; ISR 50; neto 450." },
    fecha: "2026-10-12",
    entrada: { monto: 10000, tasa: 5, dias: 365 },
    esperado: { interes: 500, isr: 50, neto: 450, total: 10450 },
  },
]);
