import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 13% to NPR 10,000",
    origen: { tipo: "recalculado", url: "https://ird.gov.np/content/13632/economic-act--2083---information-booklet-on/", detalle: "10,000 × 13% = 1,300. Total 11,300." },
    fecha: "2026-10-29",
    entrada: { importe: 10000, modo: "add" },
    esperado: { neto: 10000, iva: 1300, total: 11300, tasa: 13 },
  },
  {
    nombre: "Take VAT out of NPR 11,300",
    origen: { tipo: "recalculado", detalle: "11,300 / 1.13 = 10,000. VAT 1,300." },
    fecha: "2026-10-29",
    entrada: { importe: 11300, modo: "remove" },
    esperado: { neto: 10000, iva: 1300 },
  },
  {
    nombre: "Take VAT out of NPR 1,000",
    origen: { tipo: "recalculado", detalle: "1,000 / 1.13 = 884.96. VAT 115.04." },
    fecha: "2026-10-29",
    entrada: { importe: 1000, modo: "remove" },
    esperado: { neto: 884.96, iva: 115.04 },
  },
]);
