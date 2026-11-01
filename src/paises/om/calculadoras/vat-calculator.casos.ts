import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Sumar el 5 %",
    origen: { tipo: "recalculado", detalle: "100 × 5 % = 5; total 105." },
    fecha: "2026-10-26",
    entrada: { operacion: "add", monto: 100 },
    esperado: { impuesto: 5, neto: 100, total: 105, tasa: 5 },
  },
  {
    nombre: "Quitar el 5 %",
    origen: { tipo: "recalculado", detalle: "105 / 1,05 = 100; impuesto 5." },
    fecha: "2026-10-26",
    entrada: { operacion: "extract", monto: 105 },
    esperado: { impuesto: 5, neto: 100, total: 105 },
  },
  {
    nombre: "Baisas",
    origen: { tipo: "recalculado", detalle: "12,345 × 5 % = 0,61725 → 0,617; total 12,962." },
    fecha: "2026-10-26",
    entrada: { operacion: "add", monto: 12.345 },
    esperado: { impuesto: 0.617, total: 12.962 },
  },
]);
