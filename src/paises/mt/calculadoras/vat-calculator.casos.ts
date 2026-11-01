import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 18% VAT to €100",
    origen: { tipo: "recalculado", detalle: "Article 19(1) of the VAT Act: 100 × 18% = 18, total 118." },
    fecha: "2026-10-26",
    entrada: { importe: 100, modo: "sin", tasa: "standard" },
    esperado: { total: 118, neto: 100, iva: 18, tasa: 18 },
  },
  {
    nombre: "Remove 18% VAT from €59",
    origen: { tipo: "recalculado", detalle: "59 / 1.18 = 50, VAT 9." },
    fecha: "2026-10-26",
    entrada: { importe: 59, modo: "con", tasa: "standard" },
    esperado: { neto: 50, iva: 9 },
  },
  {
    nombre: "Hotel stay at 7%",
    origen: { tipo: "recalculado", detalle: "Eighth Schedule, item 1: 200 × 7% = 14, total 214." },
    fecha: "2026-10-26",
    entrada: { importe: 200, modo: "sin", tasa: "accommodation" },
    esperado: { total: 214, iva: 14 },
  },
  {
    nombre: "Remove 5% VAT from €52.50",
    origen: { tipo: "recalculado", detalle: "52.50 / 1.05 = 50, VAT 2.50." },
    fecha: "2026-10-26",
    entrada: { importe: 52.5, modo: "con", tasa: "reduced" },
    esperado: { neto: 50, iva: 2.5 },
  },
  {
    nombre: "Add 12% VAT",
    origen: { tipo: "recalculado", detalle: "Eighth Schedule, items 12 to 15: 250 × 12% = 30, total 280." },
    fecha: "2026-10-26",
    entrada: { importe: 250, modo: "sin", tasa: "intermediate" },
    esperado: { total: 280 },
  },
  { nombre: "Zero price", origen: { tipo: "recalculado", detalle: "Nothing to tax." }, fecha: "2026-10-26", entrada: { importe: 0, modo: "sin", tasa: "standard" }, esperaError: true },
]);
