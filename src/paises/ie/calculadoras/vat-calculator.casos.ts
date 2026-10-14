import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 23% to €100",
    origen: { tipo: "recalculado", detalle: "100 × 23% = 23. Gross 123." },
    fecha: "2026-10-14",
    entrada: { importe: 100, sentido: "add", tasa: "standard" },
    esperado: { iva: 23, bruto: 123, neto: 100, tasa: 23 },
  },
  {
    nombre: "Take 13.5% out of €113.50",
    origen: { tipo: "recalculado", detalle: "113.50 / 1.135 = 100. VAT 13.50." },
    fecha: "2026-10-14",
    entrada: { importe: 113.5, sentido: "remove", tasa: "reduced" },
    esperado: { neto: 100, iva: 13.5, tasa: 13.5 },
  },
  {
    nombre: "Add 9% to €45.80",
    origen: { tipo: "recalculado", detalle: "45.80 × 9% = 4.122, rounded 4.12. Gross 49.92." },
    fecha: "2026-10-14",
    entrada: { importe: 45.8, sentido: "add", tasa: "second-reduced" },
    esperado: { iva: 4.12, bruto: 49.92 },
  },
  {
    nombre: "Livestock rate on €1,000",
    origen: { tipo: "recalculado", detalle: "1,000 × 4.8% = 48." },
    fecha: "2026-10-14",
    entrada: { importe: 1000, sentido: "add", tasa: "livestock" },
    esperado: { iva: 48, bruto: 1048 },
  },
  {
    nombre: "Zero rate",
    origen: { tipo: "recalculado", detalle: "0% adds nothing." },
    fecha: "2026-10-14",
    entrada: { importe: 80, sentido: "add", tasa: "zero" },
    esperado: { iva: 0, bruto: 80 },
  },
  {
    nombre: "Negative amount",
    origen: { tipo: "recalculado", detalle: "A negative amount is not valid." },
    fecha: "2026-10-14",
    entrada: { importe: -5, sentido: "add", tasa: "standard" },
    esperaError: true,
  },
]);
