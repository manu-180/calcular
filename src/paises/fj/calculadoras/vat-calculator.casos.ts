import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 12.5% to FJ$1,000",
    origen: { tipo: "recalculado", url: "https://frcs.org.fj/our-services/taxation-section/non-individuals/reporting-and-paying-taxes/vat-guide/", detalle: "1,000 × 12.5% = 125. Total 1,125." },
    fecha: "2026-10-29",
    entrada: { importe: 1000, modo: "add" },
    esperado: { neto: 1000, iva: 125, total: 1125, tasa: 12.5 },
  },
  {
    nombre: "Take VAT out of FJ$1,125",
    origen: { tipo: "recalculado", detalle: "1,125 / 1.125 = 1,000. VAT 125." },
    fecha: "2026-10-29",
    entrada: { importe: 1125, modo: "remove" },
    esperado: { neto: 1000, iva: 125 },
  },
  {
    nombre: "Take VAT out of FJ$100",
    origen: { tipo: "recalculado", detalle: "100 / 1.125 = 88.89. VAT 11.11." },
    fecha: "2026-10-29",
    entrada: { importe: 100, modo: "remove" },
    esperado: { neto: 88.89, iva: 11.11 },
  },
  { nombre: "Zero amount is rejected", origen: { tipo: "recalculado", detalle: "Amount must be above zero." }, fecha: "2026-10-29", entrada: { importe: 0, modo: "add" }, esperaError: true },
]);
