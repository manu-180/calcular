import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add VAT to TT$1,000",
    origen: { tipo: "oficial", url: "https://www.ird.gov.tt/VAT", detalle: "VAT is charged at 12.5%. 1,000 × 12.5% = 125. Total 1,125." },
    fecha: "2026-10-27",
    entrada: { modo: "add", importe: 1000 },
    esperado: { total: 1125, neto: 1000, vat: 125, tasa: 12.5 },
  },
  {
    nombre: "Take VAT out of TT$450",
    origen: { tipo: "recalculado", detalle: "450 ÷ 1.125 = 400. VAT 50." },
    fecha: "2026-10-27",
    entrada: { modo: "remove", importe: 450 },
    esperado: { neto: 400, vat: 50, total: 450 },
  },
  {
    nombre: "Take VAT out of TT$99.99",
    origen: { tipo: "recalculado", detalle: "99.99 ÷ 1.125 = 88.88. VAT 11.11." },
    fecha: "2026-10-27",
    entrada: { modo: "remove", importe: 99.99 },
    esperado: { neto: 88.88, vat: 11.11 },
  },
]);
