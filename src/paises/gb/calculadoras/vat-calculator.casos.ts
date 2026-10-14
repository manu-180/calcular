import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add standard rate VAT to £100",
    origen: { tipo: "recalculado", detalle: "100 × 20% = 20. Gross 120." },
    fecha: "2026-10-14",
    entrada: { importe: 100, sentido: "add", tasa: "standard" },
    esperado: { iva: 20, bruto: 120, neto: 100, tasa: 20 },
  },
  {
    nombre: "Remove standard rate VAT from £120",
    origen: { tipo: "recalculado", detalle: "120 / 1.2 = 100 net. VAT 20." },
    fecha: "2026-10-14",
    entrada: { importe: 120, sentido: "remove", tasa: "standard" },
    esperado: { neto: 100, iva: 20 },
  },
  {
    nombre: "Reduced rate on home energy",
    origen: { tipo: "recalculado", detalle: "250 × 5% = 12.50. Gross 262.50." },
    fecha: "2026-10-14",
    entrada: { importe: 250, sentido: "add", tasa: "reduced" },
    esperado: { iva: 12.5, bruto: 262.5 },
  },
  {
    nombre: "Remove VAT from £99.99",
    origen: { tipo: "recalculado", detalle: "99.99 / 1.2 = 83.325, rounded 83.33. VAT 16.66." },
    fecha: "2026-10-14",
    entrada: { importe: 99.99, sentido: "remove", tasa: "standard" },
    esperado: { neto: 83.33, iva: 16.66 },
  },
  {
    nombre: "Zero rate",
    origen: { tipo: "recalculado", detalle: "0% VAT: the price does not change." },
    fecha: "2026-10-14",
    entrada: { importe: 80, sentido: "add", tasa: "zero" },
    esperado: { iva: 0, bruto: 80 },
  },
]);
