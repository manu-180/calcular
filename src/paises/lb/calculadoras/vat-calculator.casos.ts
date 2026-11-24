import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Sumar el 11 %",
    origen: { tipo: "recalculado", detalle: "1.000.000 × 11 % = 110.000; total 1.110.000." },
    fecha: "2026-11-01",
    entrada: { operacion: "add", monto: 1000000, otraTasa: null },
    esperado: { impuesto: 110000, neto: 1000000, total: 1110000, tasa: 11, umbral: 5000000000 },
  },
  {
    nombre: "Extraer de un precio con impuesto",
    origen: { tipo: "recalculado", detalle: "1.110.000 / 1,11 = 1.000.000; impuesto 110.000." },
    fecha: "2026-11-01",
    entrada: { operacion: "extract", monto: 1110000, otraTasa: null },
    esperado: { impuesto: 110000, neto: 1000000, total: 1110000 },
  },
  {
    nombre: "Con tasa escrita a mano",
    origen: { tipo: "recalculado", detalle: "1.000.000 × 12 % = 120.000." },
    fecha: "2026-11-01",
    entrada: { operacion: "add", monto: 1000000, otraTasa: 12 },
    esperado: { impuesto: 120000, tasa: 12 },
  },
]);
